import 'bootstrap';
import RestApi from './rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import Log from './log';

@inject(Router)
export class Home{
   
    constructor(router){
        this.title = 'Home';
        this.minutes = 0;
        this.logDate = (new Date).toISOString().slice(0,10);
        this.Logs = [];
        this.Update = false;
        this.api = new RestApi();
        this.router = router;
        this.organizations = [];
        this.organization;
        this.projects = [];
        this.project;
    }
    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Log tijden');
        
        //var report = await this.api.getCurrentUserTimeLogReport();


       
        var user = await this.api.getCurrentUser();
        this.user = JSON.parse(user);
        this.hours = parseInt(this.user.defaultHoursPerDay);
       
        var memberships = await this.api.getUserMemberships(this.user.id);
        this.memberships = JSON.parse(memberships);
        
        var organizationJson = await this.api.getOrganizations();
        var organizations = JSON.parse(organizationJson);
        for (var i = 0; i < organizations.length; ++i){
            var keep = false;
            var organization = organizations[i];
            this.memberships.forEach(function(item){
                if (item.organizationId == organization.id){
                    keep = true;
                }
            });
            if(keep){
                this.organizations.push(organization);
            }            
        }
        this.organization = this.organizations[0];
              
        var projects = await this.api.getProjects(this.organization.id);
        this.projects = JSON.parse(projects);
        this.project = this.projects[0];
        
        var activities = await this.api.getActivities(this.organization.id, this.project.id)
        this.activities =  JSON.parse(activities);
        this.activity = this.activities[0];

        //var logs = await this.api.getWorklogs(this.organization.id, this.project.id, this.activity.id);
        //this.Logs = JSON.parse(logs);
    }

    

    addLog() {
        var min = 0
        if (this.hours > 0 || this.minutes > 0){
            min = (this.hours * 60) + parseInt(this.minutes);
        }
        else {
            alert("Gelieve uren en/of minuten in te vullen.");
        }
        if (min > 0){
            var log = new Log(min, this.logDate.toString())
            if (this.Update){
                this.Logs.forEach(function(item,index,Logs){
                    if (item.logDate == log.logDate){
                        Logs.splice(index,1);                    
                        Logs.push(log);
                    }             
                });
                this.Update = false;
            }
            else{
                this.Logs.push(log);
            }
            this.Logs.sort(function(a,b){
                var firstDate = new Date(a.logDate);
                var secondDate = new Date(b.logDate);
                return firstDate.getDate()-secondDate.getDate()
            } )
            this.clearForm();
        }        
    }

    editLog(index){
        var current = this.Logs[index]
        this.minutes = parseInt(current.minutes) % 60;
        this.hours =  (parseInt(current.minutes)-this.minutes)/60;
        this.logDate = (new Date(current.logDate)).toISOString().slice(0,10);
        this.Update = true;
        document.getElementById("submitBtn").textContent ="Updaten";
        document.getElementById("datum").disabled= true;
    }
  
    deleteLog(index){
        this.Logs.splice(index,1);
    }
   
    clearForm(){
        this.minutes = 0;
        this.hours = 0;
        this.logDate = (new Date).toISOString().slice(0,10);
        document.getElementById("submitBtn").textContent ="Opslaan";
        document.getElementById("datum").disabled= false;
    }
   
    minuteString(index){
        var log = this.Logs[index];
        var time = parseInt(log.minutes);
        var mins= time%60;
        return  this.pad2((time-mins)/60) +  ":" + this.pad2(mins);
    }
   
    pad2(num){
        var str = "00" + num
        return str.slice(-2);
    }
}