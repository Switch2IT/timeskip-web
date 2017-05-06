import MenuItem from './menuItem';

export class Sidebar {
    
    constructor() {
        this.items = [];
    }
    
    created() {
        this.items.push(new MenuItem('Timesheet','timesheet'));
        this.items.push(new MenuItem('Rapporten','rapporten'));
        this.items.push(new MenuItem('Consultants','consultants'));
        this.items.push(new MenuItem('Projecten','projecten'));
        this.items.push(new MenuItem('Activiteiten','activiteiten'));
        this.items.push(new MenuItem('Organisaties','organisaties'));
    }
    
    select(item){
        this.selectedId = item.id;
        return true;
    }
}