export class Lijst{
    constructor(){
        this.title='Projecten'
    }

     activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Projecten')
     }
}