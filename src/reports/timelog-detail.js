import RestApi from '../rest-api';

export default class TimelogDetail{
    constructor(){
        this.report;
        this.api= new RestApi();
        this.type;
        this.title;
        this.user;
        this.from;
        this.to;
    }

    async activate(params){
        this.type = params["type"];
        this.from = params["from"];
        this.user = params["user"];
        this.to = params["to"];
        this.title = "Gelogde uren"
        if ("loggedTime" === this.type){
            this.report = JSON.parse(await this.api.getTimeLogReport(params));
        } else if ("personalLoggedTime" === this.type){
            this.report = JSON.parse(await this.api.getCurrentUserTimeLogReport(params));
        } else if ("userLoggedTime" === this.type){
            this.report = JSON.parse(await this.api.getUserTimeLogReport(params, this.user));
        }
        console.log(this.report);
    }
}