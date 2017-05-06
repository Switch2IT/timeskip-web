export class Report {
    constructor() {
        this.title = 'Reports';
        this.reportTypes;
    }

    activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Reports');
        this.reportTypes = ['Report 1', 'Report 2', 'Report 3']
    }
}