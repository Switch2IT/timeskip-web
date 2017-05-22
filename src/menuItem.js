export default class MenuItem {

    constructor(value, route, roles) {
        this.value = value;
        this.route = route;
        this.roles = roles;
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