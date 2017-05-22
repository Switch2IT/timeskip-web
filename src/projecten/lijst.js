import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Lijst{
    constructor(router){
        this.router = router;
        this.title='Projecten';        
        this.api = new RestApi();
        this.organizations = [];
        this.organization;
        this.projects = [];
        this.project;
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Projecten')
        await this.getOrganizations();
        

        
    }

    async getOrganizations(){
        var orgs = await this.api.getOrganizations();
        this.organizations = JSON.parse(orgs);
    }

    async getProjects(id){
        var projects = await this.api.getProjects(id);
        this.projects = JSON.parse(projects);        
    }



    async changeOrganization(){
        await this.getProjects(this.organization.id);
    }

    editProject(id){        
        var route = this.router.routes.find(x => x.name === 'projectDetail');
        route.organizationId = this.organization.id;
        route.projectId = id;
        this.router.navigate(route.route, id);
    }
    
    makeProject(){
        var route = this.router.routes.find(x => x.name === 'maakProject');
        this.router.navigate(route.route);
    }


    allowed(project){
        var string = null;
        if (project.allowOvertime){
            string = "&check;";
        }else{
            string = "&chi;";
        }
        return string;
    }

    allowedColor(project){
        var string = "";
        if (project.allowOvertime){
            string += "confirmed";
        }else{
            string += "notConfirmed";
        }
        return string;
    }
    billable(project){
        var string = null;
        if (project.billOvertime){
            string = "&check;";
        }else{
            string = "&chi;";
        }
        return string;
    }

    billableColor(project){
        var string = "";
        if (project.billOvertime){
            string += "confirmed";
        }else{
            string += "notConfirmed";
        }
        return string;
    }
}