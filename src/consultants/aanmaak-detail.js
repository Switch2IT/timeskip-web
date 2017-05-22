import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AanmaakDetail{
    
    constructor(router){
        this.title='Consultant Aanmaken'        
        this.api = new RestApi();
        this.router = router;
        this.roles = [];
        this.organizations = [];
        this.paygrades = [];
        this.paygrade;
        this.user = {};
        this.email;
        this.firstname;
        this.lastname;
        this.hours = 0;
        this.admin = false;
        this.workdays= [
            {id:"ma",name:"MONDAY"},
            {id:"di",name:"TUESDAY"},
            {id:"woe",name:"WEDNESDAY"},
            {id:"do",name:"THURSDAY"},
            {id:"vr",name:"FRIDAY"},
            {id:"za",name:"SATURDAY"},
            {id:"zo",name:"SUNDAY"}];
        this.selectedWorkDays = [];
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultant Aanmaken');
        await this.getRoles();
        await this.getOrganizations();
        await this.getPaygrades();
    }


    async getRoles(){
        var roles = await this.api.getRoles();
        this.roles = JSON.parse(roles);     
        this.role = this.roles[0];        
    }
    async getOrganizations(){
        var orgs = await this.api.getOrganizations();
        this.organizations = JSON.parse(orgs);    
        this.organization = this.organizations[0];
        await this.changeOrganization();
    }
    async getProjects(){
        var projects = await this.api.getProjects(this.organization.id);
        this.projects = JSON.parse(projects);
        this.project = this.projects[0];
        await this.changeProject();
    }
        
    async getActivities(){
        var activities = await this.api.getActivities(this.organization.id, this.project.id)
        this.activities =  JSON.parse(activities);
        this.activity = this.activities[0];
    }
    
    async getPaygrades(){
        var grades = await this.api.getPaygrades();
        this.paygrades = JSON.parse(grades);
    }
        
    async changeOrganization(){
       await this.getProjects();
    }
    async changeProject(){;
        await this.getActivities();
    }
    
    async saveUser(){
        this.user.email = this.email;
        this.user.firstName = this.firstname;
        this.user.lastName = this.lastname;
        this.user.admin = this.admin;
        this.user.memberships = [{"organizationId":this.organization.id,"role":this.role.id}];
        this.user.defaultHoursPerDay = this.hours;
        this.user.workDays = this.selectedWorkDays;
        this.user.paygradeId = this.paygrade.id;
        this.user.defaultActivityId = this.activity.id;
        var saved = this.api.createUser(JSON.stringify(this.user));
        this.router.navigate('consultants/');
    }
}