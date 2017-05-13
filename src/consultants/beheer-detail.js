import RestApi from '../rest-api';
import Consultant from './consultant';

export class BeheerDetail{
    constructor(){
        this.title='Consultant Beheren';
        this.consultant;
        this.api = new RestApi();
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultant Beheren')
        var response =  await this.api.getUser(params.id);
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
    updateConsultant(){
        var body = {'email':this.email,
            'firstName':this.firstName,
            'lastName':this.lastName,
            'defaultHoursPerDay':this.consultant.defaultHoursPerDay,
            'workdays':this.consultant.workdays,
            'paygradeId':this.consultant.paygrade.id,
            'defaultActivity': this.consultant.defaultActivity
        };
        var edited = this.api.updateUser(this.consultant.id, body) 
    }
}
