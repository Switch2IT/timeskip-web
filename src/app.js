import KeycloakService from './keycloak-service';
import NotFound from './notfound'
import {RouterConfiguration, Router} from 'aurelia-router';
import RestApi from './rest-api';

export class App {
  constructor(){
      this.api = new RestApi();
      this.userName;
  }

  activate(){
    this.currentUser = KeycloakService.getUser();
    this.userName = this.currentUser.name;
  }

  logout(){
    KeycloakService.logout();
  }
  
  configureRouter(config, router){
    this.router = router;
    config.title = '';
    
    
    config.map([
      { route: '', moduleId: 'timesheet/timesheet',   title: 'Timesheet', name:'timesheet', nav:true},
      { route: 'rapporten',  moduleId: 'reports/rapporten', name:'rapporten', nav:true },      
      { route: 'rapporten/billing',  moduleId: 'reports/billing-detail', name:'billingDetail', nav:true },      
      { route: 'rapporten/overtime',  moduleId: 'reports/time-difference', name:'overtimeDetail', nav:true },      
      { route: 'rapporten/undertime',  moduleId: 'reports/time-difference', name:'undertimeDetail', nav:true },      
      { route: 'rapporten/loggedtime',  moduleId: 'reports/timelog-detail', name:'loggedtimeDetail', nav:true },
      { route: 'consultants',  moduleId: 'consultants/lijst', name:'consultants', nav:true },
      { route: 'consultants/aanmaken',  moduleId: 'consultants/aanmaak-detail', name:'maakConsultant'},
      { route: 'consultants/:id',  moduleId: 'consultants/beheer-detail', name:'consultantDetail', href:'#id', nav:true },
      { route: 'projecten',  moduleId: 'projecten/lijst', name:'projecten', nav:true },
      { route: 'projecten/aanmaken',  moduleId: 'projecten/detail', name:'maakProject'},
      { route: 'projecten/:id',  moduleId: 'projecten/beheer-detail', name:'projectDetail'},
      { route: 'activiteiten',  moduleId: 'activiteiten/lijst', name:'activiteiten', nav:true },
      { route: 'activiteiten/aanmaken',  moduleId: 'activiteiten/detail', name:'maakActiviteit'},
      { route: 'activiteiten/:id',  moduleId: 'activiteiten/detail', name:'activiteitDetail'},
      { route: 'organisaties',  moduleId: 'organisaties/lijst', name:'organisaties', nav:true },
      { route: 'organisaties/aanmaken',  moduleId: 'organisaties/detail', name:'maakOrganisatie'},
      { route: 'organisaties/:id',  moduleId: 'organisaties/detail', name:'organisatieDetail'}
    ]);


  }
}
