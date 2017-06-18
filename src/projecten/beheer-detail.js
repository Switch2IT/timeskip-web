import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Lijst{
    constructor(router){
        this.router = router;
        this.title='Project Beheren';        
        this.api = new RestApi();
        this.project;
        this.organization;
    }

    async activate(params, routeConfig) {
        
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Project Beheren')
        var organizationId = this.routeConfig.organizationId;
        var projectId = this.routeConfig.projectId;

        var response =  await this.api.getProject(organizationId,projectId);
        var project = JSON.parse(response);
        
        
        if (project !== undefined && project != null){
            await this.fillForm(project);
        }
    }

    fillForm(project) {
        this.projectId = project.id;
        this.name = project.name;
        this.description = project.description;
        this.allowOvertime = project.allowOvertime;
        this.billOvertime = project.billOvertime;
        this.organization = project.organization            
    }


    async updateProject(){
        var project = {};
        project.id = this.projectId;
        project.name = this.name;
        project.description = this.description;
        project.allowOvertime = this.allowOvertime;
        project.billOvertime = this.billOvertime;
        project.organization = this.organization;    

        var updated = await this.api.updateProject(this.organization.id, this.projectId,JSON.stringify(project));
        this.router.navigate('projecten/');
    }
}