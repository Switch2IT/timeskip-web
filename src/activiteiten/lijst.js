export class Lijst{
    constructor(){
        this.title='Activiteiten'
    }

     activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Activiteiten')
     }
}