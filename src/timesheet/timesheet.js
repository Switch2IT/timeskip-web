import 'bootstrap';
import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Home{
   
    constructor(router){
        this.title = 'Home';
        this.minutes = 0;
        this.workDays = [];
        this.logDate = (new Date).toISOString().slice(0,10);
        this.Update = false;
        this.api = new RestApi();
        this.router = router;
        this.memberships =[];
        this.organizations = [];
        this.organization;
        this.projects = [];
        this.project;
        this.allLogs = [];
        this.logs = [];
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Log tijden');
        
        await this.getCurrentUser();
        this.workDays = this.user.workDays;
        
        await this.getMemberships();        
        await this.getOrganisationsWithMembership();
        //await this.getProjects();
        //await this.getActivities();
        //await this.getWorklogs()       
    }


    async changeOrganization(){
        await this.getProjects();
    }

    async changeProject(){
        await this.getActivities();
    }

    async changeActivity(){
        await this.getWorklogs();
    }

    async getCurrentUser(){
        var user = await this.api.getCurrentUser();
        this.user = JSON.parse(user);
        this.hours = parseInt(this.user.defaultHoursPerDay);
    }

    async getMemberships(){
        var memberships = await this.api.getUserMemberships(this.user.id);
        this.memberships = JSON.parse(memberships);
    }

    async getOrganisationsWithMembership(){
        var doc = this;
        var orgJson = await doc.api.getOrganizations();
        var orgs = JSON.parse(orgJson)
        this.organizations = orgs.filter(function(org){
            for (var i = 0; i < doc.memberships.length; ++i){
                if (org.id == doc.memberships[i].organizationId){
                    return true;
                }
                return false;
            }
        });
        
        this.organization = this.organizations[0]; 
        await this.changeOrganization();
    }

    async getOrganization(id){
        var organizationJson = await this.api.getOrganization(id);
        var organization = JSON.parse(organizationJson);
        this.organization = organization;
        this.clearForm();

    }


    async getProjects(){
        var projects = await this.api.getProjects(this.organization.id);
        this.projects = JSON.parse(projects);
        this.project = this.projects[0];
        await this.changeProject()
    }

    async getActivities(){
        var activities = await this.api.getActivities(this.organization.id, this.project.id)
        this.activities =  JSON.parse(activities);
        this.activity = this.activities[0];
        await this.changeActivity();
    }

    async getWorklogs(month){
        var doc = this;
        var today = new Date();
        var from = new Date(today.getFullYear(), today.getMonth() , 2).toISOString().slice(0,10);
        var to = new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().slice(0,10);
        var params = {"user":this.user.id, "from":from,"to":to,"organization": this.organization.id,"project":this.project.id,"activity":this.activity.id};
        var logs = await doc.api.getUserWorklogs(params);
        logs = JSON.parse(logs);
        logs = logs.filter(function(log) {
            return (log.userId == doc.user.id);
        });       
        logs = logs.filter(function(log, index, logs){
            var date = (new Date(log.day));
            var day = date.getDay();
            log.weekday = date.toLocaleDateString('nl-BE',{ weekday: 'short'});
            log.regularDays = (day == 6 || day == 0) ? 'outsideRegularDays' : 'regular';
            return true;
        });
        doc.logs = doc.sortLogs(logs);
    }

    async addLog() {
        var min = 0
        if (this.hours > 0 || this.minutes > 0){
            min = (this.hours * 60) + parseInt(this.minutes);
        }
        else {
            alert("Gelieve uren en/of minuten in te vullen.");
        }

        if (min > 0){
            if (this.Update){        
                var body = JSON.stringify({'id': this.log.id, 'userId': this.user.id, 'day': this.logDate.toString(), 'loggedMinutes': min, 'confirmed': false });
                var updated = await this.api.updateWorklog(this.organization.id, this.project.id, this.activity.id, this.log.id, body)
               }
            else{   
                var body = JSON.stringify({"day": this.logDate.toString(), "loggedMinutes": min, "confirmed": false});
                var created = await this.api.createWorklogForCurrentUser(this.organization.id, this.project.id, this.activity.id, body) 
            }
            await this.getWorklogs();
            this.clearForm();
        }
    }        

    sortLogs(logs){
        return logs.sort(function(a,b){
            var firstDate = new Date(a.day);
            var secondDate = new Date(b.day);
            return firstDate -secondDate
        } )
    }

    editLog(index){
        var current = this.logs[index]
        this.log = current
        this.minutes = parseInt(current.loggedMinutes) % 60;
        this.hours =  (parseInt(current.loggedMinutes)-this.minutes)/60;
        this.logDate = (new Date(current.day)).toISOString().slice(0,10);
        this.Update = true;
        document.getElementById("submitBtn").textContent ="Updaten";
        document.getElementById("datum").disabled= true;
    }
  
    async deleteLog(index){
        this.log = this.logs[index];
        var deleted = await this.api.deleteWorklog(this.organization.id, this.project.id, this.activity.id, this.log.id);
        await this.getWorklogs();
    }
   
    clearForm(){
        this.minutes = 0;
        this.hours = this.user.defaultHoursPerDay;
        this.logDate = (new Date).toISOString().slice(0,10);
        document.getElementById("submitBtn").textContent ="Opslaan";
        document.getElementById("datum").disabled= false;
        this.Update = false
    }

    dateString(log){
        var string = null;
        //var log = this.logs[index];
        if (log.day != undefined){
            string = (new Date(log.day)).toLocaleDateString('nl-BE', {year: 'numeric', month: 'short', day: 'numeric' });
        }
        return string;
    }
   
    minuteString(log){
        var string = null;
        //var log = this.logs[index];
        if (log.loggedMinutes != undefined){
            var time = parseInt(log.loggedMinutes);
            var mins= time%60;
            string = this.pad2((time-mins)/60) +  "," + this.pad2(mins);
        }
        return string;
    }
   
    pad2(num){
        var str = "00" + num
        return str.slice(-2);
    }
}