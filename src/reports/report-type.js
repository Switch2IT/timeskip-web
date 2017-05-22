export default class ReportType{
    constructor(name,value,roles){
        this.name=name;
        this.value=value;
        this.roles=roles;
    }

    showForRole(role) {
        var a = this.roles;
        for (var i = 0; i < a.length; i++) {
            if (a[i] === role) {
                return true;
            }
        }
        return false;
    }
}