export class NotFound {
    constructor() {
        this.title = 'Error';
        this.reportTypes;
    }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Error');
    }
}