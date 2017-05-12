import Log from './log';
import 'bootstrap'

export class Home{
   
    constructor(){
        this.title = 'Home';
        this.minutes = 0;
        this.hours = 0; 
        this.logDate = (new Date).toISOString().slice(0,10);
        this.Logs = []
    }
    activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Log tijden');
    }
    addLog() {
        if (this.hours > 0){
            var min = (this.hours * 60) + (this.minutes * 1);
            this.Logs.push(new Log(this.logDate,min))
            this.minutes = 0;
            this.hours = 0;
            this.logDate = (new Date).toISOString().slice(0,10);
        }
    }
}