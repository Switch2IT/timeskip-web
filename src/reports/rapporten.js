import RestApi from "../rest-api"
import ReportType from "./report-type"
import KeycloakService from '../keycloak-service';
import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework';

@inject(Router)
export class Report {

    constructor(router) {
        this.title = 'Reports';
        this.reportTypes;
        this.router = router;
        this.organizations;
        this.users;
        this.activities;
        this.projects;
    }

    async activate(params, routeConfig) {
        this.routeConfig = routeConfig;
        this.routeConfig.navModel.setTitle('Reports');
        this.reportTypes = [new ReportType('Facturatie', 'billing'),
        new ReportType('Overuren', 'overtime'), new ReportType('Onderuren', 'undertime'),
        new ReportType('Uurlog', 'loggedTime'),new ReportType('Persoonlijk Uurlog', 'personalLoggedTime'),
        new ReportType('Gebruikers Uurlog', 'userLoggedTime')]
        this.api = new RestApi();
        this.organizations = JSON.parse(await this.api.getOrganizations());
        this.users = JSON.parse(await this.api.getUsers())
    }

    async setProjects(organizationId){
        this.projects = JSON.parse(await this.api.getProjects(organizationId));
        this.users = JSON.parse(await this.api.getUsersWithParams({"organization":organizationId}));
        this.activities=null;
    }

    async setActivities(organizationId,projectId){
        this.activities = JSON.parse(await this.api.getActivities(organizationId,projectId));
    }

    async getPdfReport(type, params) {
        var param;
        for(param in params){
            if(params[param] === "" || params[param] === null){
                delete params[param];
            }
        }

        var defaultFileName = type.concat("_report.pdf");
        var report;

        var user = params["user"];
        if ("billing" === type) {
            report = await this.api.getBillingReportAsPdf(params);
        } else if ("overtime" === type) {
            report = await this.api.getOvertimeReportAsPdf(params);
        } else if ("undertime" === type) {
            report = await this.api.getUndertimeReportAsPdf(params);
        } else if ("loggedTime" === type){
            report = await this.api.getTimeLogReportAsPdf(params);
        } else if ("personalLoggedTime" === type){
            report = await this.api.getCurrentUserTimeLogReportAsPdf(params);
        } else if ("userLoggedTime" === type){
            report = await this.api.getUserTimeLogReportAsPdf(params, user);
        }
        if (report.size > 0) {
            var anchor = document.createElement('a');
            var fileURL = window.URL.createObjectURL(report);
            anchor.href = fileURL;
            anchor.download = defaultFileName;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
        }else{
            alert("No data available");
        }
    }

    getReport(type, params) {
        var param;
        for(param in params){
            if(params[param] === "" || params[param] === null){
                delete params[param];
            }
        }
        params["type"] = type;
        if ("billing" === type) {
            this.router.navigateToRoute('billingDetail', params, {replace: true});
        } else if ("overtime" === type) {
            this.router.navigateToRoute('overtimeDetail', params, {replace: true});
        } else if ("undertime" === type) {
            this.router.navigateToRoute('undertimeDetail', params, {replace: true});
        } else if ("loggedTime" === type){
            this.router.navigateToRoute('loggedtimeDetail', params, {replace: true});
        } else if ("personalLoggedTime" === type){
            this.router.navigateToRoute('loggedtimeDetail', params, {replace: true});
        } else if ("userLoggedTime" === type){
            this.router.navigateToRoute('loggedtimeDetail', params, {replace: true});
        }
    }
}