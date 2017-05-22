import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class BeheerDetail{
    constructor(router){
        this.title='Consultant Beheren';
        this.api = new RestApi();
        this.router = router;
        this.roles = [];
        this.paygrades = [];
        this.paygrade;
        this.user = {};
        this.email;
        this.firstname;
        this.lastname;
        this.hours = 0;
        this.admin;
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
        this.routeConfig.navModel.setTitle('Consultant Beheren')

        var response =  await this.api.getUser(params.id);
        var user = JSON.parse(response);

        await this.getRoles();
        await this.getPaygrades();

        if (user !== undefined && user != null){
            await this.fillForm(user);
        }
    }
    async fillForm(user){
        this.userId = user.id;
        this.email = user.email;
        this.firstname = user.firstName;
        this.lastname = user.lastName;
        this.admin = user.admin;
        this.hours = user.defaultHoursPerDay;
        if (user.workdays != undefined)
            this.selectedWorkDays = user.workdays;
        this.paygrade = this.paygrades.find(x=>x.id == user.paygrade.id);
        this.role = this.roles.find(x => x.id == user.memberships[0].roleId);
        this.defaultActivity = user.defaultActivity;
        this.memberships = [];
        for (var i = 0; i < user.memberships.length; ++i){
            var mem = user.memberships[i];
            this.memberships.push({'organizationId':mem.organizationId, 'role': mem.roleId });
        }
    }
    async getRoles(){
        var roles = await this.api.getRoles();
        this.roles = JSON.parse(roles);  
    }
    
    async getPaygrades(){
        var grades = await this.api.getPaygrades();
        this.paygrades = JSON.parse(grades);          
    }

    
    async updateUser(){
        var user = {};
        user.email = this.email;
        user.firstName = this.firstname;
        user.lastName = this.lastname;
        user.admin = this.admin;
        user.defaultHoursPerDay = this.hours;
        user.workDays = this.selectedWorkDays;
        user.paygradeId = this.paygrade.id;
        user.defaultActivity = this.defaultActivity;
        var updated = this.api.updateUser(this.userId,JSON.stringify(user));
        this.router.navigate('consultants/');
    }
}