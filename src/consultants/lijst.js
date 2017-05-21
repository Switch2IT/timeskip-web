import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Lijst{
    constructor(router){
        this.title='Consultants'
        this.consultants;
        this.api = new RestApi();
        this.router = router;
    }

     async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultants');
        var response = await this.api.getUsers() //this.api.getUsersWithParams({"role":"consultant"});
        this.consultants = JSON.parse(response);
     }
     editConsultant(id){
         this.router.navigate('consultants/' + id);
     }
     makeConsultant(){
         this.router.navigate('consultants/aanmaken');
     }
}