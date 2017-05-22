import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Lijst{
    constructor(router){
        this.title='Activiteiten'
        this.api = new RestApi();
        this.router = router;
        this.user;
        this.memberships =[];
        this.organizations = [];
        this.organization;
        this.projects = [];
        this.project;
        this.activities = [];
        this.activity;
        this.name;
        this.description;
        this.update = false;
        this.billable = false;
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Activiteiten')

        await this.getCurrentUser();

        await this.getMemberships();
        await this.getOrganisationsWithMembership();
    }

    async getCurrentUser(){
    var user = await this.api.getCurrentUser();
    this.user = JSON.parse(user);
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

    async changeOrganization(){
        await this.getProjects();
    }

    async changeProject(){
        await this.getActivities();
    }

    async getProjects() {
        var projects = await this.api.getProjects(this.organization.id);
        this.projects = JSON.parse(projects);
        this.project = this.projects[0];
        await this.changeProject();
    }

    async getActivities() {
        var activities = await this.api.getActivities(this.organization.id, this.project.id)
        this.activities =  JSON.parse(activities);
        this.activity = this.activities[0];
    }

    isBillable(activity){
        var string = null;
        if (activity.billable){
            string = "&check;";
        }else{
            string = "&chi;";
        }
        return string;
    }

    isBillableColor(activity){
        var string = "";
        if (activity.billable){
            string += "confirmed";
        }else{
            string += "notConfirmed";
        }
        return string;
    }

    editActivity(activity){
        var current = activity;
        this.activity = current;
        this.billable = current.billable;
        this.name = current.name;
        this.description =  current.description;
        console.log(current);
        this.billable = current.billable;
        this.update = true;
        console.log(document.getElementById("submitBtn").textContent);
        document.getElementById("submitBtn").textContent ="Updaten";
    }

    async createOrUpdateActivity(){
        var body = {'name':this.name,
            'description':this.description,
            'billable':this.billable
        };
        if (this.update){
            var updated = await this.api.updateActvitiy(this.organization.id, this.project.id, this.activity.id, body)
        }
        else{
            var created = await this.api.createActivity(this.organization.id, this.project.id, body)
        }
        await this.getActivities();
        this.clearForm();
    }

    clearForm(){
        this.name = "";
        this.description = "";
        this.billable = false;
        document.getElementById("submitBtn").textContent ="Opslaan";
        this.update = false;
    }
}