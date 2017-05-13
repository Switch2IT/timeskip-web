import { HttpClient } from 'aurelia-http-client';
import KeycloakService from './keycloak-service';

export default class RestApi {
    constructor() {
        this.http = new HttpClient();
        this.http.configure(config => {
            config.withBaseUrl('http://10.3.50.35/timeskip-web/api');
            config.withHeader('Accept','application/json');
            config.withHeader('Authorization','Bearer '.concat(KeycloakService.getToken()));
        });
    }

    /**
     * Following methods are used to get, create, update and delete users.
     */
    
    async getUsers() {
        var data = await this.getData("/users");
        console.log(data);
        return data.response;
    }

    async getUser(userid) {
        var data = await this.getData("/users/".concat(userid));
        console.log(data);
        return data.response;
    }

    async createUser(body) {
        var data = await this.postData("/users");
        console.log(data);
        return data.response;
    }

    /**
     * Following methods are used to get, create, update and delete organizations and underlying objects.
     */

    //ORGANIZATIONS

    async getOrganizations(){
        var data = await this.getData("/organizations");
        console.log(data);
        return data.response;
    }

    async getOrganization(organizationId){
        var data = await this.getData("/organizations/".concat(organizationId));
        console.log(data);
        return data.response;
    }

     async createOrganization(body){
        var data = await this.postData("/organizations",body);
        console.log(data);
        return data.response;
    }

    async updateOrganization(id, body){
        var data = await this.postData("/organizations".concat(id),body);
        console.log(data);
        return data.response;
    }

    async removeOrganization(organizationId){
        var data = await this.deleteData("/organizations/".concat(organizationId));
        console.log(data);
        return data.response;
    }

    //PROJECTS

    async getProjects(organizationId){
        var data = await this.getData("/organizations/".concat(organizationId)
                                        .concat("/projects"));
        console.log(data);
        return data.response;
    }

     async getProject(organizationId,projectId){
        var data = await this.getData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId));
        console.log(data);
        return data.response;
    }

    async createProject(organizationId,body){
        var data = await this.postData("/organizations/".concat(organizationId)
                                        .concat("/projects"),body);
        console.log(data);
        return data.response;
    }

    async updateProject(organizationId,projectId,body){
        var data = await this.patchData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId),body);
        console.log(data);
        return data.response;
    }

    async deleteProject(organizationId,projectId){
        var data = await this.deleteData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId));
        console.log(data);
        return data.response;
    }

    //ACTIVITIES

    async getActivities(organizationId,projectId){
        var data = await this.getData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities"));
        console.log(data);
        return data.response;
    }

    async getActivity(organizationId,projectId, activityId){
        var data = await this.getData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId));
        console.log(data);
        return data.response;
    }

    async createActivity(organizationId,projectId,body){
        var data = await this.postData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities"),body);
        console.log(data);
        return data.response;
    }

    async updateActvitiy(organizationId,projectId,activityId,body){
        var data = await this.patchData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId),body);
        console.log(data);
        return data.response;
    }

    async deleteActivity(organizationId,projectId,activityId){
        var data = await this.deleteData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId));
        console.log(data);
        return data.response;
    }

    //WORKLOGS

    async getWorklogs(organizationId,projectId, activityId){
        var data = await this.getData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId)
                                        .concat("/worklogs"));
        console.log(data);
        return data.response;
    }

    async getWorklogs(organizationId,projectId, activityId,worklogId){
        var data = await this.getData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId)
                                        .concat("/worklogs/").concat(worklogId));
        console.log(data);
        return data.response;
    }

    async createWorklog(organizationId,projectId, activityId,body){
        var data = await this.postData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities").concat(activityId)
                                        .concat("/worklogs"),body);
        console.log(data);
        return data.response;
    }

    async createWorklogForCurrentUser(organizationId,projectId, activityId,body){
        var data = await this.postData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities").concat(activityId)
                                        .concat("/worklogs").concat("/currentuser"),body);
        console.log(data);
        return data.response;
    }

    async updateWorklog(organizationId,projectId, activityId,worklogId,body){
        var data = await this.patchData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId)
                                        .concat("/worklogs/").concat(worklogId),body);
        console.log(data);
        return data.response;
    }

    async deleteWorklog(organizationId,projectId, activityId,worklogId){
        var data = await this.deleteData("/organizations/".concat(organizationId)
                                        .concat("/projects/").concat(projectId)
                                        .concat("/activities/").concat(activityId)
                                        .concat("/worklogs/").concat(worklogId));
        console.log(data);
        return data.response;
    }

    /**
     * Following methods are used for management and HR only calls.
     */

    /**
     * Following methods are used to request reports.
     */

    /**
     * Following methods are supporting methods for different http request types.
     */

    postData(location, body){
        return this.http.createRequest(location)
                    .asPost()
                    .withHeader("content-type","application/json")
                    .withContent(body)
                    .send();
    }

    patchData(location,body){
        return this.http.createRequest(location)
                    .asPatch()
                    .withHeader("content-type","application/json")
                    .withContent(body)
                    .send();
    }

    deleteData(location){
        return this.http.createRequest(location)
                        .asDelete()
                        .send();
    }

    getData(location) {
        return this.http.createRequest(location)
                    .asGet()
                    .send();
    }
}