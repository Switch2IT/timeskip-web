export class BeheerkDetail{
    constructor(){
        this.title='Consultant Beherem'
    }

     activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultant Beheren')
     }
}