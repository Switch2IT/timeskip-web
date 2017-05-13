import Organisatie from '../organisaties/organisaties';

export default class Project{
    
    constructor(id, name, description, allowOverTime, billOvertime, organization){
        this.id = id;
        this.name = name;
        this.description = description;
        this.allowOvertme = allowOvertime;
        this.billOvertime = billOvertime;
        this.organization = organization;
    }
}