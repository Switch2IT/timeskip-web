import RestApi from '../rest-api';

export default class TimeDifference{
    constructor(){
        this.report;
        this.api= new RestApi();
        this.type;
        this.title;
        this.from;
        this.to;
    }

    async activate(params){
        this.type = params["type"];
        this.from = params["from"];
        this.to = params["to"];
        if(this.type == "overtime"){
            this.title = "Overuren"
            this.report = JSON.parse(await this.api.getOvertimeReport(params));
        }else if (this.type == "undertime"){
            this.title = "Onderuren"
            this.report = JSON.parse(await this.api.getUndertimeReport(params));
        }
        console.log(this.report);
    }
}