import { HttpClient } from 'aurelia-http-client';
import KeycloakService from './keycloak-service';

/**
 * This class provides methods to perform REST calls to the timeskip backend.
 * Params are a map of key/value pairs.
 * Body is json string of the required object
 */
export default class RestApi {
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config.withBaseUrl('http://10.3.50.35/timeskip-web/api');
            config.withHeader('Accept', 'application/json');
            config.withHeader('Authorization', 'Bearer '.concat(KeycloakService.getToken()));
        });
    }

    /**
     * Following methods are used to get, create, update and delete users.
     */

    async getUsers() {
        var data = await this.getData("/users");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUsersWithParams(params) {
        var data = await this.getDataWithParams("/users", params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUser(userid) {
        var data = await this.getData("/users/".concat(userid));
        console.log(data);
        return data.response;
    }

    async createUser(body) {
        var data = await this.postData("/users");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getCurrentUser() {
        var data = await this.getData("/users/current");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateCurrentUser(body) {
        var data = await this.patchData("/users/current", body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateCurrentUserWorklogs(body) {
        var data = await this.putData("/users/current/worklogs", body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUser(userId) {
        var data = await this.getData("/users/".concat(userId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateUser(userId, body) {
        var data = await this.patchData("/users/".concat(userId), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUserMemberships(userId) {
        var data = await this.getData("/users/".concat(userId).concat("/memberships"));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateUserMemberships(userId, organizationId, body) {
        var data = await this.putData("/users/".concat(userId)
            .concat("/memberships/organizations/").concat(organizationId), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async removeUserMembership(userId, organizationId) {
        var data = await this.deleteData("/users/".concat(userId).concat("/memberships/").concat(organizationId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    /**
     * Following methods are used to get, create, update and delete organizations and underlying objects.
     */

    //ORGANIZATIONS

    async getOrganizations() {
        var data = await this.getData("/organizations");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getOrganization(organizationId) {
        var data = await this.getData("/organizations/".concat(organizationId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async createOrganization(body) {
        var data = await this.postData("/organizations", body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateOrganization(id, body) {
        var data = await this.patchData("/organizations".concat(id), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async removeOrganization(organizationId) {
        var data = await this.deleteData("/organizations/".concat(organizationId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    //PROJECTS

    async getProjects(organizationId) {
        var data = await this.getData("/organizations/".concat(organizationId)
            .concat("/projects"));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getProject(organizationId, projectId) {
        var data = await this.getData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async createProject(organizationId, body) {
        var data = await this.postData("/organizations/".concat(organizationId)
            .concat("/projects"), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateProject(organizationId, projectId, body) {
        var data = await this.patchData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async deleteProject(organizationId, projectId) {
        var data = await this.deleteData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId));
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    //ACTIVITIES

    async getActivities(organizationId, projectId) {
        var data = await this.getData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities"));
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async getActivity(organizationId, projectId, activityId) {
        var data = await this.getData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId));
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async createActivity(organizationId, projectId, body) {
        var data = await this.postData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities"), body);
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async updateActvitiy(organizationId, projectId, activityId, body) {
        var data = await this.patchData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId), body);
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async deleteActivity(organizationId, projectId, activityId) {
        var data = await this.deleteData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId));
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    //WORKLOGS

    async getWorklogs(organizationId, projectId, activityId) {
        var data = await this.getData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId)
            .concat("/worklogs"));
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async getWorklogs(organizationId, projectId, activityId, worklogId) {
        var data = await this.getData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId)
            .concat("/worklogs/").concat(worklogId));
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async createWorklog(organizationId, projectId, activityId, body) {
        var data = await this.postData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities").concat(activityId)
            .concat("/worklogs"), body);
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async createWorklogForCurrentUser(organizationId, projectId, activityId, body) {
        var data = await this.postData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities").concat(activityId)
            .concat("/worklogs").concat("/currentuser"), body);
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async updateWorklog(organizationId, projectId, activityId, worklogId, body) {
        var data = await this.patchData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId)
            .concat("/worklogs/").concat(worklogId), body);
        if (data.statusCode < 400) { return data.response; } else { alert(data.statusCode.concat(' - ').concat(data.statusText)); }
    }

    async deleteWorklog(organizationId, projectId, activityId, worklogId) {
        var data = await this.deleteData("/organizations/".concat(organizationId)
            .concat("/projects/").concat(projectId)
            .concat("/activities/").concat(activityId)
            .concat("/worklogs/").concat(worklogId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    /**
     * Following methods are used for management and HR only calls. 
     */

    async getMailTemplates() {
        var data = await this.getData("/configuration/mail/templates");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getMailTemplateByTopic(topic) {
        var data = await this.getData("/configuration/mail/templates/".concat(topic));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateMailTemplate(topic, body) {
        var data = await this.patchData("/configuration/mail/templates/".concat(topic), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getPaygrades() {
        var data = await this.getData("/configuration/paygrades");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getPaygrade(paygradeId) {
        var data = await this.getData("/configuration/paygrades/".concat(paygradeId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async createPaygrade(body) {
        var data = await this.postData("/configuration/paygrades", body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getDayOfMontlyReminder() {
        var data = await this.getData("/configuration/schedule/dayofmonthlyreminder");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateDayOfMontlyReminder(body) {
        var data = await this.putData("/configuration/schedule/dayofmonthlyreminder", body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    /**
     * Following methods are used for management of roles.
     */

    async getRoles() {
        var data = await this.getData("/roles");
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getRole(roleId) {
        var data = await this.getData("/roles/".concat(roleId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async createRole(body) {
        var data = await this.postData("/roles", body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async updateRole(roleId, body) {
        var data = await this.patchData("/roles".concat(roleId), body);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async removeRole(roleId) {
        var data = await this.deleteData("/roles/".concat(roleId));
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    /**
     * Following methods are used to request reports.
     */

    async getBillingReport(params) {
        var data = await this.getDataWithParams("/reports/billing", params);
        console.log(params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getBillingReportAsPdf(params) {
        var data = await this.getPdfDataWithParams("/reports/billing/pdf", params);
        console.log(data);
        if (data.statusCode < 400) {
            return data.content;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getTimeLogReport(params) {
        var data = await this.getDataWithParams("/reports/loggedtime", params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getTimeLogReportAsPdf(params) {
        var data = await this.getPdfDataWithParams("/reports/loggedtime/pdf", params);
        if (data.statusCode < 400) {
            return data.content;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getCurrentUserTimeLogReport(params) {
        var data = await this.getDataWithParams("/reports/loggedtime/users/current", params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUserTimeLogReportAsPdf(params, userId) {
        var data = await this.getPdfDataWithParams("/reports/loggedtime/users/".concat(userId).concat("/pdf"), params);
        if (data.statusCode < 400) {
            return data.content;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUserTimeLogReport(params, userId) {
        var data = await this.getDataWithParams("/reports/loggedtime/users/".concat(userId), params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getCurrentUserTimeLogReportAsPdf(params) {
        var data = await this.getPdfDataWithParams("/reports/loggedtime/users/current/pdf", params);
        if (data.statusCode < 400) {
            return data.content;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getOvertimeReport(params) {
        var data = await this.getDataWithParams("/reports/overtime", params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getOvertimeReportAsPdf(params) {
        var data = await this.getPdfDataWithParams("/reports/overtime/pdf", params);
        if (data.statusCode < 400) {
            return data.content;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUndertimeReport(params) {
        var data = await this.getDataWithParams("/reports/undertime", params);
        if (data.statusCode < 400) {
            return data.response;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    async getUndertimeReportAsPdf(params) {
        var data = await this.getPdfDataWithParams("/reports/undertime/pdf", params);
        if (data.statusCode < 400) {
            return data.content;
        } else {
            alert(data.statusCode.concat(' - ').concat(data.statusText));
        }
    }

    /**
     * Following methods are supporting methods for different http request types.
     */

    postData(location, body) {
        return this.http.createRequest(location)
            .asPost()
            .withHeader("content-type", "application/json")
            .withContent(body)
            .send();
    }

    putData(location, body) {
        return this.http.createRequest(location)
            .asPut()
            .withHeader("content-type", "application/json")
            .withContent(body)
            .send();
    }

    patchData(location, body) {
        return this.http.createRequest(location)
            .asPatch()
            .withHeader("content-type", "application/json")
            .withContent(body)
            .send();
    }

    deleteData(location) {
        return this.http.createRequest(location)
            .asDelete()
            .send();
    }

    getData(location) {
        return this.http.createRequest(location)
            .asGet()
            .send();
    }

    getPdfData(location) {
        return this.http.createRequest(location)
            .asGet()
            .withHeader("Accept", "application/pdf")
            .send();
    }

    getDataWithParams(location, params) {
        console.log(params);
        return this.http.createRequest(location)
            .asGet()
            .withParams(params)
            .send();
    }

    getPdfDataWithParams(location, params) {
        return this.http.createRequest(location)
            .asGet()
            .withParams(params)
            .withHeader("Accept", "application/pdf")
            .withResponseType('blob')
            .send();
    }
}