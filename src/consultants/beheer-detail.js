import RestApi from '../rest-api';
import Consultant from './consultant';

export class BeheerkDetail{
    constructor(){
        this.title='Consultant Beheren';
        this.consultant;
        this.api= new RestApi();
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultant Beheren')
        this.consultant = params.id;
        var response = await this.api.getUser(params.id);
        this.consultant = JSON.parse(response);
        if (this.consultant !== undefined && this.consultant != null){
            this.fillForm(this.consultant);
        }
    }
    fillForm(consultant){
        this.email = consultant.email;
        this.firstName = consultant.firstName;
        this.lastName = consultant.lastName;
    }
}