export class Lijst{
    constructor(){
        this.title='Organisaties'
    }

     activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Organisaties')
     }
}