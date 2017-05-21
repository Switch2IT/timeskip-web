export default class KeycloakService {
    
    static auth(){}

    static init() { 
    let keycloakAuth = new Keycloak({"realm":"canguru","url": "http://10.3.50.37/auth","clientId": "timeskip"});

    return new Promise(function(resolve, reject) {
      keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          resolve(null);
        })
    });
   }

  static logout(){
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz.logout();
    KeycloakService.auth.authz = null;
  }

  static getToken() {
    return KeycloakService.auth.authz.token;
 }

 static getUser(){
   return KeycloakService.auth.authz.tokenParsed;
 }
}