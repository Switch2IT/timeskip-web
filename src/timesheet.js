import Log from './log';
import 'bootstrap';

export class Home{
   
    constructor(){
        this.title = 'Home';
        this.minutes = 0;
        this.hours = 0; 
        this.logDate = (new Date).toISOString().slice(0,10);
        this.Logs = []
        this.Update = false;
    }
    activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Log tijden');
    }
    addLog() {
        var min = 0
        if (this.hours > 0 || this.minutes > 0){
            min = (this.hours * 60) + parseInt(this.minutes);
        }
        else {
            alert("Gelieve uren en/of minuten in te vullen.");
        }
        if (min > 0){
            var log = new Log(min, this.logDate.toString())
            if (this.Update){
                this.Logs.forEach(function(item,index,Logs){
                    if (item.logDate == log.logDate){
                        Logs.splice(index,1);                    
                        Logs.push(log);
                    }             
                });
                this.Update = false;
            }
            else{
                this.Logs.push(log);
            }
            this.Logs.sort(function(a,b){
                var firstDate = new Date(a.logDate);
                var secondDate = new Date(b.logDate);
                return firstDate.getDate()-secondDate.getDate()
            } )
            this.clearForm();
        }        
    }

    editLog(index){
        var current = this.Logs[index]
        this.minutes = parseInt(current.minutes) % 60;
        this.hours =  (parseInt(current.minutes)-this.minutes)/60;
        this.logDate = (new Date(current.logDate)).toISOString().slice(0,10);
        this.Update = true;
        document.getElementById("submitBtn").textContent ="Updaten";
        document.getElementById("datum").disabled= true;
    }
    deleteLog(index){
        this.Logs.splice(index,1);
    }
    clearForm(){
        this.minutes = 0;
        this.hours = 0;
        this.logDate = (new Date).toISOString().slice(0,10);
        document.getElementById("submitBtn").textContent ="Opslaan";
        document.getElementById("datum").disabled= false;
    }
    minuteString(index){
        var log = this.Logs[index];
        var time = parseInt(log.minutes);
        var mins= time%60;
        return  this.pad2((time-mins)/60) +  ":" + this.pad2(mins);
    }
    pad2(num){
        var str = "00" + num
        return str.slice(-2);
    }
}