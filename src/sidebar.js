import MenuItem from './menuItem';
import RestApi from './rest-api';

export class Sidebar {
    
    constructor() {
        this.items = [];
        this.api = new RestApi();
        this.role;
    }
    
    async created() {
        var currentUser = JSON.parse(await this.api.getCurrentUser());
        this.role = currentUser.memberships[0].role;
        
        this.items.push(new MenuItem('Timesheet','timesheet',["consultant","manager","HR"]));
        this.items.push(new MenuItem('Rapporten','rapporten',["consultant","manager","HR"]));
        this.items.push(new MenuItem('Consultants','consultants',["manager","HR"]));
        this.items.push(new MenuItem('Projecten','projecten',["manager","HR"]));
        this.items.push(new MenuItem('Activiteiten','activiteiten',["manager","HR"]));
        this.items.push(new MenuItem('Organisaties','organisaties',["manager","HR"]));
    }
    
    select(item){
        this.selectedId = item.id;
        return true;
    }
}