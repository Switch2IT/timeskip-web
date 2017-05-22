import RestApi from '../rest-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Lijst{
    constructor(router){
        this.title='Organisaties'
        this.organizations;
        this.api = new RestApi();
        this.router = router;
    }

     async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Organisaties')
        this.organizations = JSON.parse(await this.api.getOrganizations());
     }

    editOrganization(id){
        this.router.navigate('organisaties/'.concat(id));
     }

     makeOrganization(){
         this.router.navigate('organisaties/aanmaken');
     }
}