export class AanmaakDetail{
    constructor(){
        this.title='Consultant Aanmaken'
    }

     activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultant Aanmaken')
     }
}