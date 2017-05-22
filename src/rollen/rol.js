export default class Rol{
    
    constructor(id, name, description,autoGrant,permissions){
        this.id = id;
        this.name = name;
        this.description = description;
        this.autoGrant = autoGrant;
        this.permissions = permissions;
    }
   
}