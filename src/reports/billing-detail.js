import RestApi from '../rest-api';

export default class ReportDetail{
    constructor(){
        this.report;
        this.api= new RestApi();
        this.from;
        this.to;
    }

    async activate(params){
        this.from = params["from"];
        this.to = params["to"];
        this.report = JSON.parse(await this.api.getBillingReport(params));
        console.log(this.report);
    }
}