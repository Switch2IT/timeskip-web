import RestApi from '../rest-api';

export class Lijst{
    constructor(){
        this.title='Consultants'
        this.consultants;
        this.api= new RestApi();
    }

     async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultants');
        var response=await this.api.getUsers();
        this.consultants = JSON.parse(response);
     }
}