import KeycloakService from './keycloak-service';
import NotFound from './notfound'
import {RouterConfiguration, Router,NavigationInstruction, Next, Redirect} from 'aurelia-router';
import RestApi from './rest-api';

export class App {
  constructor(){
      this.api = new RestApi();
      this.userName;
  }

  async activate(){
    var currentUser = JSON.parse(await this.api.getCurrentUser());
    this.userName = currentUser.firstName.concat(" ").concat(currentUser.lastName);
  }

  logout(){
    KeycloakService.logout();
  }
  
  configureRouter(config, router){
    this.router = router;
    config.title = '';
    
    config.addAuthorizeStep(AuthorizeStep); 
    
    config.map([
      { route: '', moduleId: 'timesheet/timesheet',   title: 'Timesheet', name:'timesheet', nav:true, settings:{roles:["manager","HR","consultant"]}},
      { route: 'rapporten',  moduleId: 'reports/rapporten', name:'rapporten', nav:true, settings:{roles:["manager","HR","consultant"]} },      
      { route: 'rapporten/billing',  moduleId: 'reports/billing-detail', name:'billingDetail', nav:true, settings:{roles:["manager"]}},      
      { route: 'rapporten/overtime',  moduleId: 'reports/time-difference', name:'overtimeDetail', nav:true, settings:{roles:["manager","HR"]}},      
      { route: 'rapporten/undertime',  moduleId: 'reports/time-difference', name:'undertimeDetail', nav:true, settings:{roles:["manager","HR"]} },      
      { route: 'rapporten/loggedtime',  moduleId: 'reports/timelog-detail', name:'loggedtimeDetail', nav:true, settings:{roles:["manager","HR","consultant"]} },
      { route: 'consultants',  moduleId: 'consultants/lijst', name:'consultants', nav:true, settings:{roles:["manager","HR"]} },
      { route: 'consultants/aanmaken',  moduleId: 'consultants/aanmaak-detail', name:'maakConsultant', settings:{roles:["manager","HR"]}},
      { route: 'consultants/:id',  moduleId: 'consultants/beheer-detail', name:'consultantDetail', href:'#id', nav:true, settings:{roles:["manager","HR"]} },
      { route: 'projecten',  moduleId: 'projecten/lijst', name:'projecten', nav:true, settings:{roles:["manager","HR"]} },
      { route: 'projecten/aanmaken',  moduleId: 'projecten/detail', name:'maakProject', settings:{roles:["manager","HR"]}},
      { route: 'projecten/:id',  moduleId: 'projecten/detail', name:'projectDetail', settings:{roles:["manager","HR"]}},
      { route: 'activiteiten',  moduleId: 'activiteiten/lijst', name:'activiteiten', nav:true, settings:{roles:["manager","HR"]} },
      { route: 'activiteiten/aanmaken',  moduleId: 'activiteiten/detail', name:'maakActiviteit', settings:{roles:["manager","HR"]}},
      { route: 'activiteiten/:id',  moduleId: 'activiteiten/detail', name:'activiteitDetail', settings:{roles:["manager","HR"]}},
      { route: 'organisaties',  moduleId: 'organisaties/lijst', name:'organisaties', nav:true, settings:{roles:["manager","HR"]} },
      { route: 'organisaties/aanmaken',  moduleId: 'organisaties/detail', name:'maakOrganisatie', settings:{roles:["manager","HR"]}},
      { route: 'organisaties/:id',  moduleId: 'organisaties/detail', name:'organisatieDetail', settings:{roles:["manager","HR"]}}
    ]);


  }
}

export class AuthorizeStep
{
     constructor(){
       this.api = new RestApi();
     }

     async run(navigationInstruction,next)
     {  
         var currentUser = JSON.parse(await this.api.getCurrentUser());
         let role = currentUser.memberships[0].role;
         let requiredRoles = navigationInstruction.getAllInstructions().map(i => i.config.settings.roles)[0];
 
         let isUserPermited = requiredRoles? requiredRoles.some(r => r === role) : true;
 
         if(isUserPermited)  
            return next();
 
         return next.cancel();
     }
}
