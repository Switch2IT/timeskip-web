import Log from './log';

export class Home{
   
    constructor(){
        this.title = 'Home';
        this.minutes = 0;
        this.hours = 0; 
        this.logDate = (new Date).toISOString().slice(0,10);
    }
    activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Log tijden');
    }
    addLog() {
        if (this.hours > 0){
            var min = (this.hours * 60) + (this.minutes * 1);
        }
    }
    
}