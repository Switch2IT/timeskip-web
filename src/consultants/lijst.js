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
        var response=await this.api.getUsersWithParams({"role":"consultant"});
        this.consultants = JSON.parse(response);
     }
}