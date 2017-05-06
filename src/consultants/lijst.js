export class Lijst{
    constructor(){
        this.title='Consultants'
    }

     activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Consultants')
     }
}