import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class ActivityDetail {
    constructor(router){
        this.api = new RestApi();
        this.organization;
        this.title;
        this.description;
        this.project;
        this.name;
        this.billable;
        this.router = router;
    }

    async activate(params){
        this.title = "Activiteit aanmaken"
        if (params.id){
            this.activity = JSON.parse(await this.api.getActivityById(params.id));
            this.project = this.activity.project;
            this.organization = this.project.organization;
        }
        if (this.activity !== undefined && this.activity != null){
            this.fillForm(this.activity);
        }
    }

    async fillForm(activity){
        this.title = activity.name;
        this.name = activity.name;
        this.description = activity.description;
        this.billable = activity.billable;
    }

    async updateActivity(){
        var body = {'name':this.name,
            'description':this.description,
            'billable':this.billable
        };
        if(this.activity){
            this.api.updateActvitiy(this.organization.id, body)
        }else{
            var result = JSON.parse(await this.api.createActivity(body));
            this.router.navigate('activiteiten/'.concat(result.id));
        }
    }
    
    backToList(){
        this.router.navigate('activiteiten');
    }
}