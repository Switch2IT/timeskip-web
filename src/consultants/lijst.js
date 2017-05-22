import RestApi from '../rest-api';
import Rol from '../rollen/rol'
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import $ from 'jquery';

@inject(Router)
export class Lijst{
    constructor(router){
        this.title='Consultants';
        this.api = new RestApi();
        this.router = router;
        this.roles = [];
        this.selectedRole;
        this.organizations= [];
        this.selectedOrganization;
        this.email;
        this.firstname;
        this.lastname;
        this.users = [];
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultants');
        await this.getRoles();
        await this.getOrganizations();
        
    }
    
    /*Event handlers voor input -> change*/

    async changeRole(){
        await this.getUsers();
        //this.title = this.selectedRole.name;
    }
    async changeOrganization(){
        await this.getUsers();
    }
    async changeEmail(){
        await this.getUsers();
    }
    async changeFirstName(){
        await this.getUsers();
    }
    async changeLastName(){
        await this.getUsers();
    }



    /*Methodes voor ophalen data*/
    async getOrganizations(){
        var orgs = await this.api.getOrganizations();
        this.organizations = JSON.parse(orgs);
    }
    async getRoles(){
        var roles = await this.api.getRoles();
        this.roles = JSON.parse(roles);
    }
    async getUsers(){
        var params={}; 
        if(this.selectedRole != undefined && this.selectedRole != "null"){
            params.role = this.selectedRole.id;
        }
        if (this.selectedOrganization != undefined && this.selectedOrganization != "null"){
            params.organization = this.selectedOrganization.id;
        }
        if (this.email !=undefined && this.email != ""){
            params.email = this.email;
        }
        if (this.firstname !=undefined && this.firstname != ""){
            params.firstname = this.firstname;
        }
        if (this.lastname !=undefined && this.lastname != ""){
            params.lastname = this.lastname;
        }
        if (!$.isEmptyObject(params)){
            var users = await this.api.getUsersWithParams(params);
            this.users = JSON.parse(users);
        }else{
            this.users = [];
        }
    }

    /*Methods voor users*/
    editUser(id){
        this.router.navigate('consultants/' + id);
    }
    makeUser(){
        this.router.navigate('consultants/aanmaken');
    }
    async deleteUser(user){
        if (confirm("Delete "+ this.selectedRole.name +": " + user.firstname + " " + user.lastname + "?"))
            var deleted = await this.api.deleteUser(user.id);
        await this.getUsersForRole(this.selectedRole);
    }

    /*Helper functions*/
    admin(user){
        var string = null;
        if (user.admin){
            string = "&check;";
        }else{
            string = "&chi;";
        }
        return string;
    }

    adminColor(user){
        var string = "";
        if (user.admin){
            string += "confirmed";
        }else{
            string += "notConfirmed";
        }
        return string;
    }
   
}