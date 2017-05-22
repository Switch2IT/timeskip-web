import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class OrganizationDetail{
    constructor(router){
        this.api = new RestApi();
        this.organization;
        this.title;
        this.description;
        this.projects;
        this.name;
        this.router = router;
    }

    async activate(params){
        this.title = "Organisatie aanmaken"
        if(params.id){
            this.organization = JSON.parse(await this.api.getOrganization(params.id));
        }
        if (this.organization !== undefined && this.organization != null){
            this.fillForm(this.organization);
        }
    }

    async fillForm(organization){
        this.title = organization.name;
        this.name = organization.name;
        this.description = organization.description;
        this.projects = JSON.parse(await this.api.getProjects(organization.id));
    }

    confirmedColor(value){
        if(value){
            return "confirmed";
        }else{
            return "notConfirmed";
        }
    }

    confirmed(value){
        if (value){
            return "&check;";
        }else{
            return "&chi;";
        }
    }

    async updateOrganization(){
        var body = {'name':this.name,
            'description':this.description
        };
        if(this.organization){
            this.api.updateOrganization(this.organization.id, body) 
        }else{
            var result = JSON.parse(await this.api.createOrganization(body));
            this.router.navigate('organisaties/'.concat(result.id));
        }
    }
    
    backToList(){
        this.router.navigate('organisaties');
    }
}