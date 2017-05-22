define('app',['exports', './keycloak-service', './notfound', 'aurelia-router', './rest-api'], function (exports, _keycloakService, _notfound, _aureliaRouter, _restApi) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _keycloakService2 = _interopRequireDefault(_keycloakService);

  var _notfound2 = _interopRequireDefault(_notfound);

  var _restApi2 = _interopRequireDefault(_restApi);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  let App = exports.App = class App {
    constructor() {
      this.api = new _restApi2.default();
      this.userName;
    }

    activate() {
      this.currentUser = _keycloakService2.default.getUser();
      this.userName = this.currentUser.name;
    }

    logout() {
      _keycloakService2.default.logout();
    }

    configureRouter(config, router) {
      this.router = router;
      config.title = '';

      config.map([{ route: '', moduleId: 'timesheet/timesheet', title: 'Timesheet', name: 'timesheet', nav: true }, { route: 'rapporten', moduleId: 'reports/rapporten', name: 'rapporten', nav: true }, { route: 'rapporten/billing', moduleId: 'reports/billing-detail', name: 'billingDetail', nav: true }, { route: 'rapporten/overtime', moduleId: 'reports/time-difference', name: 'overtimeDetail', nav: true }, { route: 'rapporten/undertime', moduleId: 'reports/time-difference', name: 'undertimeDetail', nav: true }, { route: 'rapporten/loggedtime', moduleId: 'reports/timelog-detail', name: 'loggedtimeDetail', nav: true }, { route: 'consultants', moduleId: 'consultants/lijst', name: 'consultants', nav: true }, { route: 'consultants/aanmaken', moduleId: 'consultants/aanmaak-detail', name: 'maakConsultant' }, { route: 'consultants/:id', moduleId: 'consultants/beheer-detail', name: 'consultantDetail', href: '#id', nav: true }, { route: 'projecten', moduleId: 'projecten/lijst', name: 'projecten', nav: true }, { route: 'projecten/aanmaken', moduleId: 'projecten/detail', name: 'maakProject' }, { route: 'projecten/:id', moduleId: 'projecten/detail', name: 'projectDetail' }, { route: 'activiteiten', moduleId: 'activiteiten/lijst', name: 'activiteiten', nav: true }, { route: 'activiteiten/aanmaken', moduleId: 'activiteiten/detail', name: 'maakActiviteit' }, { route: 'activiteiten/:id', moduleId: 'activiteiten/detail', name: 'activiteitDetail' }, { route: 'organisaties', moduleId: 'organisaties/lijst', name: 'organisaties', nav: true }, { route: 'organisaties/aanmaken', moduleId: 'organisaties/detail', name: 'maakOrganisatie' }, { route: 'organisaties/:id', moduleId: 'organisaties/detail', name: 'organisatieDetail' }]);
    }
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
/*import { customAttribute, bindable, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Element, Router)
@customAttribute('go-to-route')
export class GoToRoute {

  @bindable route;
  @bindable params;

  constructor(element,router) {
    this.element=element;
    this.router=router;
  }

  attached() {
    this.element.addEventListener("click", () => {
      this.router.navigateToRoute(this.route, this.params);
    });
  }
}*/
define('goToRoute',[], function () {
  "use strict";
});
define('keycloak-service',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  let KeycloakService = class KeycloakService {

    static auth() {}

    static init() {
      let keycloakAuth = new Keycloak({ "realm": "canguru", "url": "http://10.3.50.37/auth", "clientId": "timeskip" });

      return new Promise(function (resolve, reject) {
        keycloakAuth.init({ onLoad: 'login-required' }).success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          resolve(null);
        });
      });
    }

    static logout() {
      KeycloakService.auth.loggedIn = false;
      KeycloakService.auth.authz.logout();
      KeycloakService.auth.authz = null;
    }

    static getToken() {
      return KeycloakService.auth.authz.token;
    }

    static getUser() {
      return KeycloakService.auth.authz.tokenParsed;
    }
  };
  exports.default = KeycloakService;
});
define('main',['exports', './environment', './keycloak-service'], function (exports, _environment, _keycloakService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _keycloakService2 = _interopRequireDefault(_keycloakService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //Configure Bluebird Promises.
  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    _keycloakService2.default.init().then(() => aurelia.start().then(() => aurelia.setRoot()));

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(() => aurelia.setRoot());
  }
});
define('menuItem',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let MenuItem = class MenuItem {

        constructor(value, route) {
            this.value = value;
            this.route = route;
        }
    };
    exports.default = MenuItem;
});
define('notfound',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let NotFound = exports.NotFound = class NotFound {
        constructor() {
            this.title = 'Error';
            this.reportTypes;
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Error');
        }
    };
});
define('rest-api',['exports', 'aurelia-http-client', './keycloak-service'], function (exports, _aureliaHttpClient, _keycloakService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _keycloakService2 = _interopRequireDefault(_keycloakService);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    let RestApi = class RestApi {
        constructor() {
            this.http = new _aureliaHttpClient.HttpClient();
            this.http.configure(config => {
                config.withBaseUrl('http://10.3.50.35/timeskip-web/api');
                config.withHeader('Accept', 'application/json');
                config.withHeader('Authorization', 'Bearer '.concat(_keycloakService2.default.getToken()));
            });
        }

        /**
         * Following methods are used to get, create, update and delete users.
         */

        getUsers() {
            var _this = this;

            return _asyncToGenerator(function* () {
                var data = yield _this.getData("/users");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUsersWithParams(params) {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this2.getDataWithParams("/users", params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUser(userid) {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this3.getData("/users/".concat(userid));
                console.log(data);
                return data.response;
            })();
        }

        createUser(body) {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this4.postData("/users", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUser() {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this5.getData("/users/current");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateCurrentUser(body) {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this6.patchData("/users/current", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateCurrentUserWorklogs(body) {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this7.putData("/users/current/worklogs", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //async getUser(userId) {
        //    var data = await this.getData("/users/".concat(userId));
        //    if (data.statusCode < 400) {
        //        return data.response;
        //    } else {
        //        alert(data.statusCode.concat(' - ').concat(data.statusText));
        //    }
        //}

        updateUser(userId, body) {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this8.patchData("/users/".concat(userId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserMemberships(userId) {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this9.getData("/users/".concat(userId).concat("/memberships"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateUserMemberships(userId, organizationId, body) {
            var _this10 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this10.putData("/users/".concat(userId).concat("/memberships/organizations/").concat(organizationId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeUserMembership(userId, organizationId) {
            var _this11 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this11.deleteData("/users/".concat(userId).concat("/memberships/").concat(organizationId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        /**
         * Following methods are used to get, create, update and delete organizations and underlying objects.
         */

        //ORGANIZATIONS

        getOrganizations() {
            var _this12 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this12.getData("/organizations");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOrganization(organizationId) {
            var _this13 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this13.getData("/organizations/".concat(organizationId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createOrganization(body) {
            var _this14 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this14.postData("/organizations", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateOrganization(id, body) {
            var _this15 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this15.patchData("/organizations".concat(id), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeOrganization(organizationId) {
            var _this16 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this16.deleteData("/organizations/".concat(organizationId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //PROJECTS

        getProjects(organizationId) {
            var _this17 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this17.getData("/organizations/".concat(organizationId).concat("/projects"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getProject(organizationId, projectId) {
            var _this18 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this18.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createProject(organizationId, body) {
            var _this19 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this19.postData("/organizations/".concat(organizationId).concat("/projects"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateProject(organizationId, projectId, body) {
            var _this20 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this20.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        deleteProject(organizationId, projectId) {
            var _this21 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this21.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //ACTIVITIES

        getActivities(organizationId, projectId) {
            var _this22 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this22.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getActivity(organizationId, projectId, activityId) {
            var _this23 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this23.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createActivity(organizationId, projectId, body) {
            var _this24 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this24.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateActvitiy(organizationId, projectId, activityId, body) {
            var _this25 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this25.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        deleteActivity(organizationId, projectId, activityId) {
            var _this26 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this26.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //WORKLOGS

        getWorklogs(organizationId, projectId, activityId, params) {
            var _this27 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this27.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs"));

                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getWorklog(organizationId, projectId, activityId, worklogId) {
            var _this28 = this;

            return _asyncToGenerator(function* () {
                var str = "/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId);

                var data = yield _this28.getData(str);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createWorklog(organizationId, projectId, activityId, body) {
            var _this29 = this;

            return _asyncToGenerator(function* () {
                try {
                    var data = yield _this29.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs"), body);
                    if (data.statusCode < 400) {
                        return data.response;
                    } else {
                        alert(data.statusCode.concat(' - ').concat(data.statusText));
                    }
                } catch (e) {}
            })();
        }

        createWorklogForCurrentUser(organizationId, projectId, activityId, body) {
            var _this30 = this;

            return _asyncToGenerator(function* () {
                try {
                    var data = yield _this30.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs").concat("/currentuser"), body);
                    if (data.statusCode < 400) {
                        return data.response;
                    }
                } catch (e) {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                    return null;
                }
            })();
        }

        updateWorklog(organizationId, projectId, activityId, worklogId, body) {
            var _this31 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this31.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        deleteWorklog(organizationId, projectId, activityId, worklogId) {
            var _this32 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this32.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserWorklogs(params) {
            var _this33 = this;

            return _asyncToGenerator(function* () {
                var parameters = params;
                try {
                    var data = yield _this33.getDataWithParams("/users/worklogs/", parameters);
                    return data.response;
                } catch (e) {
                    return null;
                }
            })();
        }

        getCurrentUserWorklogs(params) {
            var _this34 = this;

            return _asyncToGenerator(function* () {
                var parameters = params;
                try {
                    var data = yield _this34.getDataWithParams("/users/current/worklogs/", parameters);
                    return data.response;
                } catch (e) {
                    return null;
                }
            })();
        }

        /**
         * Following methods are used for management and HR only calls. 
         */

        getMailTemplates() {
            var _this35 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this35.getData("/configuration/mail/templates");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getMailTemplateByTopic(topic) {
            var _this36 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this36.getData("/configuration/mail/templates/".concat(topic));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateMailTemplate(topic, body) {
            var _this37 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this37.patchData("/configuration/mail/templates/".concat(topic), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getPaygrades() {
            var _this38 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this38.getData("/configuration/mail/paygrades");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getPaygrade(paygradeId) {
            var _this39 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this39.getData("/configuration/paygrades/".concat(paygradeId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createPaygrade(body) {
            var _this40 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this40.postData("/configuration/paygrades", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getDayOfMontlyReminder() {
            var _this41 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this41.getData("/configuration/schedule/dayofmonthlyreminder");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateDayOfMontlyReminder(body) {
            var _this42 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this42.putData("/configuration/schedule/dayofmonthlyreminder", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        /**
         * Following methods are used for management of roles.
         */

        getRoles() {
            var _this43 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this43.getData("/roles");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getRole(roleId) {
            var _this44 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this44.getData("/roles/".concat(roleId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createRole(body) {
            var _this45 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this45.postData("/roles", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateRole(roleId, body) {
            var _this46 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this46.patchData("/roles".concat(roleId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeRole(roleId) {
            var _this47 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this47.deleteData("/roles/".concat(roleId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        /**
         * Following methods are used to request reports.
         */

        getBillingReport(params) {
            var _this48 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this48.getDataWithParams("/reports/billing", params);
                console.log(params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getBillingReportAsPdf(params) {
            var _this49 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this49.getPdfDataWithParams("/reports/billing/pdf", params);
                console.log(data);
                if (data.statusCode < 400) {
                    return data.content;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReport(params) {
            var _this50 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this50.getDataWithParams("/reports/loggedtime", params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReportAsPdf(params) {
            var _this51 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this51.getPdfDataWithParams("/reports/loggedtime/pdf", params);
                if (data.statusCode < 400) {
                    return data.content;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUserTimeLogReport(params) {
            var _this52 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this52.getDataWithParams("/reports/loggedtime/users/current", params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReportAsPdf(params, userId) {
            var _this53 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this53.getPdfDataWithParams("/reports/loggedtime/users/".concat(userId).concat("/pdf"), params);
                if (data.statusCode < 400) {
                    return data.content;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReport(params, userId) {
            var _this54 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this54.getDataWithParams("/reports/loggedtime/users/".concat(userId), params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUserTimeLogReportAsPdf(params) {
            var _this55 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this55.getPdfDataWithParams("/reports/loggedtime/users/current/pdf", params);
                if (data.statusCode < 400) {
                    return data.content;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReport(params) {
            var _this56 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this56.getDataWithParams("/reports/overtime", params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReportAsPdf(params) {
            var _this57 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this57.getPdfDataWithParams("/reports/overtime/pdf", params);
                if (data.statusCode < 400) {
                    return data.content;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReport(params) {
            var _this58 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this58.getDataWithParams("/reports/undertime", params);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReportAsPdf(params) {
            var _this59 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this59.getPdfDataWithParams("/reports/undertime/pdf", params);
                if (data.statusCode < 400) {
                    return data.content;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        /**
         * Following methods are supporting methods for different http request types.
         */

        postData(location, body) {
            return this.http.createRequest(location).asPost().withHeader("content-type", "application/json").withContent(body).send();
        }

        putData(location, body) {
            return this.http.createRequest(location).asPut().withHeader("content-type", "application/json").withContent(body).send();
        }

        patchData(location, body) {
            return this.http.createRequest(location).asPatch().withHeader("content-type", "application/json").withContent(body).send();
        }

        deleteData(location) {
            return this.http.createRequest(location).asDelete().send();
        }

        getData(location) {
            return this.http.createRequest(location).asGet().send();
        }

        getPdfData(location) {
            return this.http.createRequest(location).asGet().withHeader("Accept", "application/pdf").send();
        }

        getDataWithParams(location, params) {
            console.log(params);
            return this.http.createRequest(location).asGet().withParams(params).send();
        }

        getPdfDataWithParams(location, params) {
            return this.http.createRequest(location).asGet().withParams(params).withHeader("Accept", "application/pdf").withResponseType('blob').send();
        }
    };
    exports.default = RestApi;
});
define('sidebar',['exports', './menuItem'], function (exports, _menuItem) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Sidebar = undefined;

    var _menuItem2 = _interopRequireDefault(_menuItem);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    let Sidebar = exports.Sidebar = class Sidebar {

        constructor() {
            this.items = [];
        }

        created() {
            this.items.push(new _menuItem2.default('Timesheet', 'timesheet'));
            this.items.push(new _menuItem2.default('Rapporten', 'rapporten'));
            this.items.push(new _menuItem2.default('Consultants', 'consultants'));
            this.items.push(new _menuItem2.default('Projecten', 'projecten'));
            this.items.push(new _menuItem2.default('Activiteiten', 'activiteiten'));
            this.items.push(new _menuItem2.default('Organisaties', 'organisaties'));
        }

        select(item) {
            this.selectedId = item.id;
            return true;
        }
    };
});
define('activiteiten/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Lijst = exports.Lijst = class Lijst {
        constructor() {
            this.title = 'Activiteiten';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Activiteiten');
        }
    };
});
define('consultants/aanmaak-detail',['exports', '../rest-api', 'aurelia-framework', 'aurelia-router'], function (exports, _restApi, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.AanmaakDetail = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    var _dec, _class;

    let AanmaakDetail = exports.AanmaakDetail = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = class AanmaakDetail {

        constructor(router) {
            this.title = 'Consultant Aanmaken';
            this.api = new _restApi2.default();
            this.router = router;
            this.roles = [];
            this.organizations = [];
            this.paygrades = [];
            this.paygrade;
            this.user = {};
            this.email;
            this.firstname;
            this.lastname;
            this.hours = 0;
            this.admin = false;
            this.workdays = [{ id: "ma", name: "MONDAY" }, { id: "di", name: "TUESDAY" }, { id: "woe", name: "WEDNESDAY" }, { id: "do", name: "THURSDAY" }, { id: "vr", name: "FRIDAY" }, { id: "za", name: "SATURDAY" }, { id: "zo", name: "SUNDAY" }];
            this.selectedWorkDays = [];
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Consultant Aanmaken');
                yield _this.getRoles();
                yield _this.getOrganizations();
                yield _this.getPaygrades();
            })();
        }

        getRoles() {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                var roles = yield _this2.api.getRoles();
                _this2.roles = JSON.parse(roles);
                _this2.role = _this2.roles[0];
            })();
        }
        getOrganizations() {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                var orgs = yield _this3.api.getOrganizations();
                _this3.organizations = JSON.parse(orgs);
                _this3.organization = _this3.organizations[0];
                yield _this3.changeOrganization();
            })();
        }
        getProjects() {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                var projects = yield _this4.api.getProjects(_this4.organization.id);
                _this4.projects = JSON.parse(projects);
                _this4.project = _this4.projects[0];
                yield _this4.changeProject();
            })();
        }

        getActivities() {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                var activities = yield _this5.api.getActivities(_this5.organization.id, _this5.project.id);
                _this5.activities = JSON.parse(activities);
                _this5.activity = _this5.activities[0];
            })();
        }

        getPaygrades() {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                var grades = yield _this6.api.getPaygrades();
                _this6.paygrades = JSON.parse(grades);
            })();
        }

        changeOrganization() {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                yield _this7.getProjects();
            })();
        }
        changeProject() {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                ;
                yield _this8.getActivities();
            })();
        }

        saveUser() {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                _this9.user.email = _this9.email;
                _this9.user.firstName = _this9.firstname;
                _this9.user.lastName = _this9.lastname;
                _this9.user.admin = _this9.admin;
                _this9.user.memberships = [{ "organizationId": _this9.organization.id, "role": _this9.role.id }];
                _this9.user.defaultHoursPerDay = _this9.hours;
                _this9.user.workDays = _this9.selectedWorkDays;
                _this9.user.paygradeId = _this9.paygrade.id;
                _this9.user.defaultActivityId = _this9.activity.id;
                var saved = _this9.api.createUser(JSON.stringify(_this9.user));
                _this9.router.navigate('consultants/');
            })();
        }
    }) || _class);
});
define('consultants/beheer-detail',['exports', '../rest-api', 'aurelia-framework', 'aurelia-router'], function (exports, _restApi, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BeheerDetail = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    var _dec, _class;

    let BeheerDetail = exports.BeheerDetail = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = class BeheerDetail {
        constructor(router) {
            this.title = 'Consultant Beheren';
            this.api = new _restApi2.default();
            this.router = router;
            this.roles = [];
            this.paygrades = [];
            this.paygrade;
            this.user = {};
            this.email;
            this.firstname;
            this.lastname;
            this.hours = 0;
            this.admin;
            this.workdays = [{ id: "ma", name: "MONDAY" }, { id: "di", name: "TUESDAY" }, { id: "woe", name: "WEDNESDAY" }, { id: "do", name: "THURSDAY" }, { id: "vr", name: "FRIDAY" }, { id: "za", name: "SATURDAY" }, { id: "zo", name: "SUNDAY" }];
            this.selectedWorkDays = [];
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Consultant Beheren');

                var response = yield _this.api.getUser(params.id);
                var user = JSON.parse(response);

                yield _this.getRoles();
                yield _this.getPaygrades();

                if (user !== undefined && user != null) {
                    yield _this.fillForm(user);
                }
            })();
        }
        fillForm(user) {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                _this2.userId = user.id;
                _this2.email = user.email;
                _this2.firstname = user.firstName;
                _this2.lastname = user.lastName;
                _this2.admin = user.admin;
                _this2.hours = user.defaultHoursPerDay;
                if (user.workdays != undefined) _this2.selectedWorkDays = user.workdays;
                _this2.paygrade = _this2.paygrades.find(function (x) {
                    return x.id == user.paygrade.id;
                });
                _this2.role = _this2.roles.find(function (x) {
                    return x.id == user.memberships[0].roleId;
                });
                _this2.defaultActivity = user.defaultActivity;
                _this2.memberships = [];
                for (var i = 0; i < user.memberships.length; ++i) {
                    var mem = user.memberships[i];
                    _this2.memberships.push({ 'organizationId': mem.organizationId, 'role': mem.roleId });
                }
            })();
        }
        getRoles() {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                var roles = yield _this3.api.getRoles();
                _this3.roles = JSON.parse(roles);
            })();
        }

        getPaygrades() {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                var grades = yield _this4.api.getPaygrades();
                _this4.paygrades = JSON.parse(grades);
            })();
        }

        updateUser() {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                var user = {};
                user.email = _this5.email;
                user.firstName = _this5.firstname;
                user.lastName = _this5.lastname;
                user.admin = _this5.admin;
                user.defaultHoursPerDay = _this5.hours;
                user.workDays = _this5.selectedWorkDays;
                user.paygradeId = _this5.paygrade.id;
                user.defaultActivity = _this5.defaultActivity;
                var updated = _this5.api.updateUser(_this5.userId, JSON.stringify(user));
                _this5.router.navigate('consultants/');
            })();
        }
    }) || _class);
});
define('consultants/consultant',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Consultant = class Consultant {

        constructor(firstName, lastName, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }
    };
    exports.default = Consultant;
});
define('consultants/lijst',['exports', '../rest-api', '../rollen/rol', 'aurelia-framework', 'aurelia-router', 'jquery'], function (exports, _restApi, _rol, _aureliaFramework, _aureliaRouter, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Lijst = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    var _rol2 = _interopRequireDefault(_rol);

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    var _dec, _class;

    let Lijst = exports.Lijst = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = class Lijst {
        constructor(router) {
            this.title = 'Consultants';
            this.api = new _restApi2.default();
            this.router = router;
            this.roles = [];
            this.selectedRole;
            this.organizations = [];
            this.selectedOrganization;
            this.email;
            this.firstname;
            this.lastname;
            this.users = [];
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Consultants');
                yield _this.getRoles();
                yield _this.getOrganizations();
            })();
        }

        /*Event handlers voor input -> change*/

        changeRole() {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                yield _this2.getUsers();
                //this.title = this.selectedRole.name;
            })();
        }
        changeOrganization() {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                yield _this3.getUsers();
            })();
        }
        changeEmail() {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                yield _this4.getUsers();
            })();
        }
        changeFirstName() {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                yield _this5.getUsers();
            })();
        }
        changeLastName() {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                yield _this6.getUsers();
            })();
        }

        /*Methodes voor ophalen data*/
        getOrganizations() {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                var orgs = yield _this7.api.getOrganizations();
                _this7.organizations = JSON.parse(orgs);
            })();
        }
        getRoles() {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                var roles = yield _this8.api.getRoles();
                _this8.roles = JSON.parse(roles);
            })();
        }
        getUsers() {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                var params = {};
                if (_this9.selectedRole != undefined && _this9.selectedRole != "null") {
                    params.role = _this9.selectedRole.id;
                }
                if (_this9.selectedOrganization != undefined && _this9.selectedOrganization != "null") {
                    params.organization = _this9.selectedOrganization.id;
                }
                if (_this9.email != undefined && _this9.email != "") {
                    params.email = _this9.email;
                }
                if (_this9.firstname != undefined && _this9.firstname != "") {
                    params.firstname = _this9.firstname;
                }
                if (_this9.lastname != undefined && _this9.lastname != "") {
                    params.lastname = _this9.lastname;
                }
                if (!_jquery2.default.isEmptyObject(params)) {
                    var users = yield _this9.api.getUsersWithParams(params);
                    _this9.users = JSON.parse(users);
                } else {
                    _this9.users = [];
                }
            })();
        }

        /*Methods voor users*/
        editUser(id) {
            this.router.navigate('consultants/' + id);
        }
        makeUser() {
            this.router.navigate('consultants/aanmaken');
        }
        //async deleteUser(id){
        //    var user = this.users.find( x => x.id ==id);
        //    if (confirm("Delete "+ this.selectedRole.name +": " + user.firstName + " " + user.lastName + "?"))
        //        var deleted = await this.api.deleteUser(id);
        //    await this.getUsers();
        //}

        /*Helper functions*/
        admin(user) {
            var string = null;
            if (user.admin) {
                string = "&check;";
            } else {
                string = "&chi;";
            }
            return string;
        }

        adminColor(user) {
            var string = "";
            if (user.admin) {
                string += "confirmed";
            } else {
                string += "notConfirmed";
            }
            return string;
        }

    }) || _class);
});
define('organisaties/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Lijst = exports.Lijst = class Lijst {
        constructor() {
            this.title = 'Organisaties';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Organisaties');
        }
    };
});
define('organisaties/organisaties',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Organisatie = class Organisatie {

        constructor(id, name, description) {
            this.id = id;
            this.name = name;
            this.description = description;
        }

    };
    exports.default = Organisatie;
});
define('reports/billing-detail',["exports", "../rest-api"], function (exports, _restApi) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    let ReportDetail = class ReportDetail {
        constructor() {
            this.report;
            this.api = new _restApi2.default();
            this.from;
            this.to;
        }

        activate(params) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.from = params["from"];
                _this.to = params["to"];
                _this.report = JSON.parse((yield _this.api.getBillingReport(params)));
                console.log(_this.report);
            })();
        }
    };
    exports.default = ReportDetail;
});
define('reports/rapporten',["exports", "../rest-api", "./report-type", "../keycloak-service", "aurelia-router", "aurelia-framework"], function (exports, _restApi, _reportType, _keycloakService, _aureliaRouter, _aureliaFramework) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Report = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    var _reportType2 = _interopRequireDefault(_reportType);

    var _keycloakService2 = _interopRequireDefault(_keycloakService);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    var _dec, _class;

    let Report = exports.Report = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = class Report {

        constructor(router) {
            this.title = 'Reports';
            this.reportTypes;
            this.router = router;
            this.organizations;
            this.users;
            this.activities;
            this.projects;
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Reports');
                _this.reportTypes = [new _reportType2.default('Facturatie', 'billing'), new _reportType2.default('Overuren', 'overtime'), new _reportType2.default('Onderuren', 'undertime'), new _reportType2.default('Uurlog', 'loggedTime'), new _reportType2.default('Persoonlijk Uurlog', 'personalLoggedTime'), new _reportType2.default('Gebruikers Uurlog', 'userLoggedTime')];
                _this.api = new _restApi2.default();
                _this.organizations = JSON.parse((yield _this.api.getOrganizations()));
                _this.users = JSON.parse((yield _this.api.getUsers()));
            })();
        }

        setProjects(organizationId) {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                _this2.projects = JSON.parse((yield _this2.api.getProjects(organizationId)));
                _this2.users = JSON.parse((yield _this2.api.getUsersWithParams({ "organization": organizationId })));
                _this2.activities = null;
            })();
        }

        setActivities(organizationId, projectId) {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                _this3.activities = JSON.parse((yield _this3.api.getActivities(organizationId, projectId)));
            })();
        }

        getPdfReport(type, params) {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                var param;
                for (param in params) {
                    if (params[param] === "" || params[param] === null) {
                        delete params[param];
                    }
                }

                var defaultFileName = type.concat("_report.pdf");
                var report;

                var user = params["user"];
                if ("billing" === type) {
                    report = yield _this4.api.getBillingReportAsPdf(params);
                } else if ("overtime" === type) {
                    report = yield _this4.api.getOvertimeReportAsPdf(params);
                } else if ("undertime" === type) {
                    report = yield _this4.api.getUndertimeReportAsPdf(params);
                } else if ("loggedTime" === type) {
                    report = yield _this4.api.getTimeLogReportAsPdf(params);
                } else if ("personalLoggedTime" === type) {
                    report = yield _this4.api.getCurrentUserTimeLogReportAsPdf(params);
                } else if ("userLoggedTime" === type) {
                    report = yield _this4.api.getUserTimeLogReportAsPdf(params, user);
                }
                if (report.size > 0) {
                    var anchor = document.createElement('a');
                    var fileURL = window.URL.createObjectURL(report);
                    anchor.href = fileURL;
                    anchor.download = defaultFileName;
                    document.body.appendChild(anchor);
                    anchor.click();
                    document.body.removeChild(anchor);
                } else {
                    alert("No data available");
                }
            })();
        }

        getReport(type, params) {
            var param;
            for (param in params) {
                if (params[param] === "" || params[param] === null) {
                    delete params[param];
                }
            }
            params["type"] = type;
            if ("billing" === type) {
                this.router.navigateToRoute('billingDetail', params, { replace: true });
            } else if ("overtime" === type) {
                this.router.navigateToRoute('overtimeDetail', params, { replace: true });
            } else if ("undertime" === type) {
                this.router.navigateToRoute('undertimeDetail', params, { replace: true });
            } else if ("loggedTime" === type) {
                this.router.navigateToRoute('loggedtimeDetail', params, { replace: true });
            } else if ("personalLoggedTime" === type) {
                this.router.navigateToRoute('loggedtimeDetail', params, { replace: true });
            } else if ("userLoggedTime" === type) {
                this.router.navigateToRoute('loggedtimeDetail', params, { replace: true });
            }
        }
    }) || _class);
});
define('reports/report-type',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let ReportType = class ReportType {
        constructor(name, value, roles) {
            this.name = name;
            this.value = value;
            this.roles = roles;
        }
    };
    exports.default = ReportType;
});
define('reports/time-difference',["exports", "../rest-api"], function (exports, _restApi) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    let TimeDifference = class TimeDifference {
        constructor() {
            this.report;
            this.api = new _restApi2.default();
            this.type;
            this.title;
            this.from;
            this.to;
        }

        activate(params) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.type = params["type"];
                _this.from = params["from"];
                _this.to = params["to"];
                if (_this.type == "overtime") {
                    _this.title = "Overuren";
                    _this.report = JSON.parse((yield _this.api.getOvertimeReport(params)));
                } else if (_this.type == "undertime") {
                    _this.title = "Onderuren";
                    _this.report = JSON.parse((yield _this.api.getUndertimeReport(params)));
                }
                console.log(_this.report);
            })();
        }
    };
    exports.default = TimeDifference;
});
define('reports/timelog-detail',["exports", "../rest-api"], function (exports, _restApi) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    let TimelogDetail = class TimelogDetail {
        constructor() {
            this.report;
            this.api = new _restApi2.default();
            this.type;
            this.title;
            this.user;
            this.from;
            this.to;
        }

        activate(params) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.type = params["type"];
                _this.from = params["from"];
                _this.user = params["user"];
                _this.to = params["to"];
                _this.title = "Gelogde uren";
                if ("loggedTime" === _this.type) {
                    _this.report = JSON.parse((yield _this.api.getTimeLogReport(params)));
                } else if ("personalLoggedTime" === _this.type) {
                    _this.report = JSON.parse((yield _this.api.getCurrentUserTimeLogReport(params)));
                } else if ("userLoggedTime" === _this.type) {
                    _this.report = JSON.parse((yield _this.api.getUserTimeLogReport(params, _this.user)));
                }
                console.log(_this.report);
            })();
        }
    };
    exports.default = TimelogDetail;
});
define('projecten/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Lijst = exports.Lijst = class Lijst {
        constructor() {
            this.title = 'Projecten';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Projecten');
        }
    };
});
define('projecten/projecten',['exports', '../organisaties/organisaties'], function (exports, _organisaties) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = undefined;

    var _organisaties2 = _interopRequireDefault(_organisaties);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    let Project = class Project {

        constructor(id, name, description, allowOverTime, billOvertime, organization) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.allowOvertme = allowOvertime;
            this.billOvertime = billOvertime;
            this.organization = organization;
        }
    };
    exports.default = Project;
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    //config.globalResources([]);
  }
});
define('rollen/rol',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Rol = class Rol {

        constructor(id, name, description, autoGrant, permissions) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.autoGrant = autoGrant;
            this.permissions = permissions;
        }

    };
    exports.default = Rol;
});
define('timesheet/log',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Log = class Log {

        constructor(minutes, logDate) {
            this.loggedMinutes = minutes;
            this.day = logDate;
        }
    };
    exports.default = Log;
});
define('timesheet/timesheet',['exports', '../rest-api', 'aurelia-framework', 'aurelia-router', 'bootstrap'], function (exports, _restApi, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    var _dec, _class;

    let Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = class Home {

        constructor(router) {
            this.title = 'Timesheet';
            this.api = new _restApi2.default();
            this.router = router;
            this.minutes = 0;
            this.workDays = [];
            this.logDate = new Date().toISOString().slice(0, 10);
            this.Update = false;
            this.memberships = [];
            this.organizations = [];
            this.organization;
            this.projects = [];
            this.project;
            this.logs = [];
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                console.log(params);
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Log tijden');

                yield _this.getCurrentUser();
                _this.workDays = _this.user.workDays;

                yield _this.getMemberships();
                yield _this.getOrganisationsWithMembership();
            })();
        }

        changeOrganization() {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                yield _this2.getProjects();
            })();
        }

        changeProject() {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                yield _this3.getActivities();
            })();
        }

        changeActivity() {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                yield _this4.getWorklogs();
            })();
        }

        changeDate() {
            var _this5 = this;

            return _asyncToGenerator(function* () {

                yield _this5.getWorklogs();
            })();
        }

        getCurrentUser() {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                var user = yield _this6.api.getCurrentUser();
                _this6.user = JSON.parse(user);
                _this6.hours = parseInt(_this6.user.defaultHoursPerDay);
            })();
        }

        getMemberships() {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                var memberships = yield _this7.api.getUserMemberships(_this7.user.id);
                _this7.memberships = JSON.parse(memberships);
            })();
        }

        getOrganisationsWithMembership() {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                var doc = _this8;
                var orgJson = yield doc.api.getOrganizations();
                var orgs = JSON.parse(orgJson);
                _this8.organizations = orgs.filter(function (org) {
                    for (var i = 0; i < doc.memberships.length; ++i) {
                        if (org.id == doc.memberships[i].organizationId) {
                            return true;
                        }
                        return false;
                    }
                });

                _this8.organization = _this8.organizations[0];
                yield _this8.changeOrganization();
            })();
        }

        getOrganization(id) {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                var organizationJson = yield _this9.api.getOrganization(id);
                var organization = JSON.parse(organizationJson);
                _this9.organization = organization;
                _this9.clearForm();
            })();
        }

        getProjects() {
            var _this10 = this;

            return _asyncToGenerator(function* () {
                var projects = yield _this10.api.getProjects(_this10.organization.id);
                _this10.projects = JSON.parse(projects);
                _this10.project = _this10.projects[0];
                yield _this10.changeProject();
            })();
        }

        getActivities() {
            var _this11 = this;

            return _asyncToGenerator(function* () {
                var activities = yield _this11.api.getActivities(_this11.organization.id, _this11.project.id);
                _this11.activities = JSON.parse(activities);
                _this11.activity = _this11.activities[0];
                yield _this11.changeActivity();
            })();
        }

        getWorklogs() {
            var _this12 = this;

            return _asyncToGenerator(function* () {
                var doc = _this12;
                var today = new Date(_this12.logDate);
                var from = new Date(today.getFullYear(), today.getMonth(), 2).toISOString().slice(0, 10);
                var to = new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().slice(0, 10);
                var params = { "user": _this12.user.id, "from": from, "to": to, "organization": _this12.organization.id, "project": _this12.project.id, "activity": _this12.activity.id };
                var logs = yield doc.api.getUserWorklogs(params);
                logs = JSON.parse(logs);
                //logs = logs.filter(function(log) {
                //    return (log.userId == doc.user.id);
                //});  
                logs = logs.filter(function (log, index, logs) {
                    var date = new Date(log.day);
                    var day = date.getDay();
                    log.weekday = date.toLocaleDateString('nl-BE', { weekday: 'short' });
                    log.regularDays = day == 6 || day == 0 ? 'outsideRegularDays' : 'regular';
                    return true;
                });
                doc.logs = doc.sortLogsDateAsc(logs);
            })();
        }

        saveLog() {
            var _this13 = this;

            return _asyncToGenerator(function* () {
                var min = 0;
                if (_this13.hours > 0 || _this13.minutes > 0) {
                    min = _this13.hours * 60 + parseInt(_this13.minutes);
                } else {
                    alert("Gelieve uren en/of minuten in te vullen.");
                }

                if (min > 0) {
                    if (_this13.Update) {
                        var body = JSON.stringify({ "id": _this13.log.id, "userId": _this13.user.id, "day": _this13.logDate.toString(), "loggedMinutes": min, "confirmed": true });
                        var updated = yield _this13.api.updateWorklog(_this13.organization.id, _this13.project.id, _this13.activity.id, _this13.log.id, body);
                    } else {
                        var body = JSON.stringify({ "day": _this13.logDate.toString(), "loggedMinutes": min, "confirmed": false, "userId": _this13.user.id });
                        var created = yield _this13.api.createWorklog(_this13.organization.id, _this13.project.id, _this13.activity.id, body);
                        //await this.api.createWorklogForCurrentUser(this.organization.id, this.project.id, this.activity.id, body) 
                    }
                    yield _this13.getWorklogs();
                    _this13.clearForm();
                }
            })();
        }

        sortLogsDateAsc(logs) {
            return logs.sort(function (a, b) {
                var firstDate = new Date(a.day);
                var secondDate = new Date(b.day);
                return firstDate - secondDate;
            });
        }

        editLog(log) {
            var current = log;
            this.log = current;
            this.minutes = parseInt(current.loggedMinutes) % 60;
            this.hours = (parseInt(current.loggedMinutes) - this.minutes) / 60;
            this.logDate = new Date(current.day).toISOString().slice(0, 10);
            this.Update = true;
            document.getElementById("submitBtn").textContent = "Updaten";
            document.getElementById("datum").disabled = true;
        }

        deleteLog(log) {
            var _this14 = this;

            return _asyncToGenerator(function* () {
                if (confirm("Delete log: " + log.day + "?")) var deleted = yield _this14.api.deleteWorklog(_this14.organization.id, _this14.project.id, _this14.activity.id, log.id);
                yield _this14.getWorklogs();
            })();
        }

        clearForm() {
            this.minutes = 0;
            this.hours = this.user.defaultHoursPerDay;
            this.logDate = new Date().toISOString().slice(0, 10);
            document.getElementById("submitBtn").textContent = "Opslaan";
            document.getElementById("datum").disabled = false;
            this.Update = false;
        }

        dateString(log) {
            var string = null;
            if (log.day != undefined) {
                string = new Date(log.day).toLocaleDateString('nl-BE', { year: 'numeric', month: 'short', day: 'numeric' });
            }
            return string;
        }

        minuteString(log) {
            var string = null;
            if (log.loggedMinutes != undefined) {
                var time = parseInt(log.loggedMinutes);
                var mins = time % 60;
                string = this.pad2((time - mins) / 60) + "," + this.pad2(mins);
            }
            return string;
        }

        confirmed(log) {
            var string = null;
            if (log.confirmed) {
                string = "&check;";
            } else {
                string = "&chi;";
            }
            return string;
        }

        confirmedcolor(log) {
            var string = "";
            if (log.confirmed) {
                string += "confirmed";
            } else {
                string += "notConfirmed";
            }
            return string;
        }

        pad2(num) {
            var str = "00" + num;
            return str.slice(-2);
        }

        collapse() {
            var table = document.getElementById("collapse1");
            var button = document.getElementById("collapseBtn");
            table.classList.toggle("in");

            if (table.classList.contains("in")) {
                button.innerHTML = "&bigwedge;";
            } else {
                button.innerHTML = "&bigvee;";
            }
        }
    }) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./sidebar\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><img class=\"header-logo\" src=\"src/logo/Canguru-Logo.png\" alt=\"logo\"> <i class=\"fa fa-user\"></i></a></div><div class=\"navbar-header float-right\"><span>Welkom ${userName}</span> <button type=\"button\" click.delegate=\"logout()\">Logout</button></div></nav><div><div class=\"row\"><sidebar class=\"col-md-2\"></sidebar><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\n    padding-top: 3.5%;\n}\n\nsection {\n    margin: 0 20px;\n}\n\na:focus {\n    outline: none;\n}\n\n.navbar {\n    height: 4%;\n    position: fixed !important;\n}\n\n.navbar-brand {\n    padding: 0;\n}\n\n.no-selection {\n    margin: 20px;\n}\n\n.contact-list {\n    overflow-y: auto;\n    border: 1px solid #ddd;\n    padding: 10px;\n}\n\n.panel {\n    margin: 20px;\n}\n\n.button-bar {\n    right: 0;\n    left: 0;\n    bottom: 0;\n    border-top: 1px solid #ddd;\n    background: white;\n}\n\n    .button-bar > button {\n        float: right;\n        margin: 20px;\n    }\n\nli.list-group-item {\n    list-style: none;\n}\n\n    li.list-group-item > a {\n        text-decoration: none;\n    }\n\n    li.list-group-item.active > a {\n        color: white;\n    }\n\n.main-view {\n    height: 88%;\n    width: 80%;\n    margin-top: 1%;\n    padding: 0 10px;\n    position: fixed !important;\n    border: thin solid lightgrey;\n    overflow-y: auto;\n}\n\n.sidebar {\n    height: 100%;\n    z-index: 1;\n    position: fixed !important;\n    padding-top: 3%;\n    overflow: auto;\n    border-right: thin solid lightgrey;\n    border-bottom: thin solid lightgrey;\n}\n\n    .sidebar ul {\n        padding: 0;\n    }\n\n    .sidebar li {\n        list-style: none;\n        border-bottom: thin solid lightgrey;\n        width: auto;\n    }\n\n.sidebar-item {\n    color: gray;\n    font-size: 1.5em;\n    font-weight: bold;\n}\n\n.sidebar li ul li:first-child {\n    list-style: none;\n    border-top: thin solid lightgrey;\n    border-bottom: thin solid lightgrey;\n    width: auto;\n}\n\n.sidebar li ul li {\n    list-style: none;\n    border-bottom: thin solid lightgrey;\n    width: auto;\n}\n\n    .sidebar li ul li:last-child {\n        list-style: none;\n        width: auto;\n    }\n\n.sidebar-subItem {\n    padding-left: 10%;\n    color: gray;\n    font-size: 1em;\n    font-weight: bold;\n}\n\n.col-md-2 {\n    margin-right: 1%;\n}\n\n.base-shadow {\n    box-shadow: 0 3px 10px 2px lightgrey;\n}\n\n.table-border{\n    border: thin solid black;\n}\n\n.nested-border{\n    border-left: thin solid black;\n    margin-bottom: 0;\n}\n\n.no-padding{\n    padding:0!important;\n}\n.center {\n    text-align: center;\n}\n\n.center-div {\n    margin: 0 auto;\n    float: none;\n}\n\n.header-logo {\n    height: 100%;\n    width: auto;\n    float: left;\n}\n\n.float-right{\n    float: right!important;\n}\n\n.form-width{\n    width: 70%;\n    margin-left: 15%;\n    margin-right: 15%;\n}\n\n.form-height {\n    margin-top: 3%;\n    margin-bottom: 3%;\n}\n\n.row-seperated {\n    margin-bottom: 0.8em;\n}\n\n.table-striped > tbody > tr.outsideRegularDays {\n    background-color: #faffc4;\n}\n\n.vert-scroll {\n    overflow-x: hidden;\n    overflow-y: scroll;\n}\n\n.group:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n\n.timesheet-div {\n   width: 70%;\n   margin: 0 15%;\n}\n\n.table-div {\n   overflow-y: auto;   \n   max-height: 20vh;\n   margin: 3vh 0 3vh;\n}\n\n.confirmed {\n    font-weight: bold;\n    color: green;\n}\n.button.confirmed{\n    font-weight:normal;\n    color: lightgrey;\n}\n.notConfirmed {\n    font-weight: bold;\n    color: red;\n}\n.button.notConfirmed{\n    font-weight:normal;\n    color: initial;\n}"; });
define('text!notfound.html', ['module'], function(module) { module.exports = "<template><h1>404 suck it</h1></template>"; });
define('text!sidebar.html', ['module'], function(module) { module.exports = "<template><div class=\"sidebar col-md-2 base-shadow\"><ul><li repeat.for=\"item of items\" class=\"${item.isActive ? 'active' : ''}\"><a class=\"sidebar-item\" route-href=\"route.bind: item.route\">${item.value}</a></li></ul></div></template>"; });
define('text!activiteiten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!consultants/aanmaak-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height form-width\" submit.trigger=\"saveUser()\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-8\"><input type=\"text\" id=\"email\" class=\"form-control\" value.bind=\"email\" required></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-8\"><input type=\"text\" id=\"voornaam\" class=\"form-control\" value.bind=\"firstname\" required></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-8\"><input type=\"text\" id=\"familienaam\" class=\"form-control\" value.bind=\"lastname\" required></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"roles\">Rol</label><div class=\"col-sm-8\"><select id=\"roles\" class=\"form-control\" name=\"roles\" value.bind=\"role\"><option repeat.for=\"role of roles\" model.bind=\"role\" innerhtml.bind=\"role.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"organizations\">Organisatie</label><div class=\"col-sm-8\"><select id=\"organizations\" class=\"form-control\" name=\"organizations\" value.bind=\"organization\" change.delegate=\"changeOrganization()\"><option repeat.for=\"organization of organizations\" model.bind=\"organization\" innerhtml.bind=\"organization.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"projects\">Project</label><div class=\"col-sm-8\"><select class=\"form-control\" name=\"projects\" value.bind=\"project\" change.delegate=\"changeProject()\"><option repeat.for=\"project of projects\" model.bind=\"project\" innerhtml.bind=\"project.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"activities\">Default activiteit</label><div class=\"col-sm-8\"><select class=\"form-control\" name=\"activities\" value.bind=\"activity\"><option repeat.for=\"activity of activities\" model.bind=\"activity\" innerhtml.bind=\"activity.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"paygrades\">Paygrade</label><div class=\"col-sm-8\"><select id=\"paygrades\" class=\"form-control\" name=\"paygrades\" value.bind=\"paygrade\"><option value=\"null\">--Selecteer een paygrade--</option><option repeat.for=\"paygrade of paygrades\" model.bind=\"paygrade\" innerhtml.bind=\"paygrade.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"hours\">Default uren</label><div class=\"col-sm-8\"><input id=\"hours\" type=\"number\" class=\"form-control\" value.bind=\"hours\" min=\"0\" max=\"23\" step=\"0.5\"></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"admin\">Admin</label><div class=\"checkbox\"><div class=\"col-sm-8\"><label><input type=\"checkbox\" id=\"admin\" checked.bind=\"admin\">Admin</label></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"workdays\">Werkdagen</label><div class=\"col-sm-8\"><label class=\"checkbox-inline\" repeat.for=\"workday of workdays\"><input type=\"checkbox\" id=\"workday\" model.bind=\"workday.name\" checked.bind=\"selectedWorkDays\"> ${workday.id}</label></div></div><div class=\"form-group\"><div class=\"col-sm-8 col-sm-offset-4\"><input type=\"submit\" class=\"btn btn-default\" value=\"Opslaan\"></div></div></form></div></template>"; });
define('text!consultants/beheer-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height form-width\" submit.trigger=\"updateUser()\"><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-8\"><input type=\"text\" id=\"email\" class=\"form-control\" value.bind=\"email\" required></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-8\"><input type=\"text\" id=\"voornaam\" class=\"form-control\" value.bind=\"firstname\" required></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-8\"><input type=\"text\" id=\"familienaam\" class=\"form-control\" value.bind=\"lastname\" required></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"roles\">Rol</label><div class=\"col-sm-8\"><select id=\"roles\" class=\"form-control\" name=\"roles\" value.bind=\"role\"><option repeat.for=\"role of roles\" model.bind=\"role\" innerhtml.bind=\"role.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"paygrades\">Paygrade</label><div class=\"col-sm-8\"><select id=\"paygrades\" class=\"form-control\" name=\"paygrades\" value.bind=\"paygrade\"><option value=\"null\">--Selecteer een paygrade--</option><option repeat.for=\"paygrade of paygrades\" model.bind=\"paygrade\" innerhtml.bind=\"paygrade.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-4 control-label\" for=\"hours\">Default uren</label><div class=\"col-sm-8\"><input id=\"hours\" type=\"number\" class=\"form-control\" value.bind=\"hours\" min=\"0\" max=\"23\" step=\"0.5\"></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"admin\">Admin</label><div class=\"checkbox\"><div class=\"col-sm-8\"><label><input type=\"checkbox\" id=\"admin\" checked.bind=\"admin\">Admin</label></div></div></div><div class=\"form-group\"><label class=\"control-label col-sm-4\" for=\"workdays\">Werkdagen</label><div class=\"col-sm-8\"><label class=\"checkbox-inline\" repeat.for=\"workday of workdays\"><input type=\"checkbox\" id=\"workday\" model.bind=\"workday.name\" checked.two-way=\"selectedWorkDays\"> ${workday.id}</label></div></div><div class=\"form-group\"><div class=\"col-sm-8 col-sm-offset-4\"><input type=\"submit\" class=\"btn btn-default\" value=\"Opslaan\"></div></div></form></div></template>"; });
define('text!consultants/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"roles\">Rol</label><div class=\"col-sm-6\"><select id=\"roles\" class=\"form-control\" name=\"roles\" value.bind=\"selectedRole\" change.delegate=\"changeRole()\"><option value=\"null\">--Selecteer een rol--</option><option repeat.for=\"role of roles\" model.bind=\"role\" innerhtml.bind=\"role.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"organizations\">Organisatie</label><div class=\"col-sm-6\"><select id=\"organizations\" class=\"form-control\" name=\"organizations\" value.bind=\"selectedOrganization\" change.delegate=\"changeOrganization()\"><option value=\"null\">--Selecteer een organisatie--</option><option repeat.for=\"organization of organizations\" model.bind=\"organization\" innerhtml.bind=\"organization.name\"></option></select></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\" value.two-way=\"email\" change.delegate=\"changeEmail()\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\" value.two-way=\"firstname\" change.delegate=\"changeFirstName()\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\" value.two-way=\"lastname\" change.delegate=\"changeLastName()\"></div></div><hr><div class=\"form-group\"><div class=\"col-sm-offset-2 col-sm-8\"><button type=\"button\" click.delegate=\"makeUser()\">Niewe Consultant</button></div></div></form><div class=\"table-div\"><table class=\"table table-striped\"><thead><tr><th>Voornaam</th><th>Familienaam</th><th>Email</th><th>Timeskip Admin</th></tr></thead><tbody><tr repeat.for=\"user of users\"><td innerhtml.bind=\"$parent.users[$index].firstName\"></td><td innerhtml.bind=\"$parent.users[$index].lastName\">></td><td innerhtml.bind=\"$parent.users[$index].email\">></td><td><span innerhtml.bind=\"admin($parent.users[$index])\" class.bind=\"admin(users)\"></span></td><td><button type=\"button\" click.delegate=\"editUser($parent.users[$index].id)\">Wijzigen</button></td></tr></tbody></table></div></div></template>"; });
define('text!organisaties/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!projecten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!reports/billing-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">Facturatie ${from} - ${to}</h2><table class=\"table table-striped table-border\"><tr><th colspan=\"3\">Organisatie</th></tr><tr repeat.for=\"organization of report.organizations\"><td>${organization.organization.name}</td><td colspan=\"2\" class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th colspan=\"3\">Dag</th></tr><tr repeat.for=\"day of organization.days\"><td>${day.day}</td><td colspan=\"2\" class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th colspan=\"3\">Project</th></tr><tr repeat.for=\"project of day.projects\"><td>${project.project.name}</td><td colspan=\"2\" class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th colspan=\"3\">Activiteit</th></tr><tr repeat.for=\"activity of project.activities\"><td>${activity.activity.name}</td><td colspan=\"2\" class=\"no-padding\"><table table class=\"table table-striped nested-border\"><tr><th>Werknemer</th><th>Uren</th><th>Te betalen</th></tr><tr repeat.for=\"user of activity.users\"><td>${user.user.lastName} ${user.user.firstName}</td><td>${user.totalBillableHours} uur</td><td>€ ${user.totalAmountDue}</td></tr><tr><th>Totaal</th><td>${activity.totalBillableHours} uur</td><td>€ ${activity.totalAmountDue}</td></tr></table></td></tr><tr><th>Totaal</th><td>${project.totalBillableHours} uur</td><td>€ ${project.totalAmountDue}</td></tr></table></td></tr><tr><th>Totaal</th><td>${day.totalBillableHours} uur</td><td>€ ${day.totalAmountDue}</td></tr></table></td></tr><tr><th>Totaal</th><td>${organization.totalBillableHours} uur</td><td>€ ${organization.totalAmountDue}</td></tr></table></td></tr><tr><th>Totaal</th><td>${report.totalBillableHours} uren</td><td>€ ${report.totalAmountDue}</td></tr></table></div></template>"; });
define('text!reports/rapporten.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"rapporten\">Rapport</label><div class=\"col-sm-10\"><select id=\"rapporten\" class=\"form-control\" value.bind=\"selectedType\"><option>--Selecteer een rapport--</option><option repeat.for=\"type of reportTypes\" model.bind=\"type.value\">${type.name}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"organisaties\">Organisatie</label><div class=\"col-sm-10\"><select id=\"organisaties\" class=\"form-control\" value.bind=\"params.organization\" change.delegate=\"setProjects(params.organization)\"><option if.bind=\"selectedType == 'overtime' || selectedType == 'undertime'\" value=\"\">--Selecteer een Organisatie--</option><option if.bind=\"!(selectedType == 'overtime' || selectedType == 'undertime')\" value=\"\">--Alle Organisaties--</option><option repeat.for=\"organization of organizations\" model.bind=\"organization.id\">${organization.name}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"users\">Werknemer</label><div class=\"col-sm-10\"><select id=\"users\" class=\"form-control\" value.bind=\"params.user\"><option value=\"\">--Alle Werknemers--</option><option repeat.for=\"user of users\" model.bind=\"user.id\">${user.lastName} ${user.firstName}</option></select></div></div><div class=\"form-group\" if.bind=\"params.organization\"><label class=\"col-sm-2 control-label\" for=\"projecten\">Project</label><div class=\"col-sm-10\"><select id=\"projecten\" class=\"form-control\" value.bind=\"params.project\" change.delegate=\"setActivities(params.organization,params.project)\"><option value=\"\">--Alle Projecten--</option><option repeat.for=\"project of projects\" model.bind=\"project.id\">${project.name}</option></select></div></div><div class=\"form-group\" if.bind=\"params.project\"><label class=\"col-sm-2 control-label\" for=\"activiteiten\">Activiteit</label><div class=\"col-sm-10\"><select id=\"activiteiten\" class=\"form-control\" value.bind=\"params.activity\"><option value=\"\">--Alle Activiteiten--</option><option repeat.for=\"activity of activities\" model.bind=\"activity.id\">${activity.name}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"begin\">Begin Datum</label><div class=\"col-sm-4\"><input type=\"date\" id=\"begin\" class=\"form-control\" required=\"required\" value.bind=\"params.from\"></div><label class=\"col-sm-2 control-label\" for=\"eind\">Eind Datum</label><div class=\"col-sm-4\"><input type=\"date\" id=\"eind\" class=\"form-control\" required=\"required\" value.bind=\"params.to\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"pdf\">als pdf</label><input type=\"checkbox\" checked.bind=\"pdf\" id=\"pdf\"></div><div if.bind=\"pdf\"><button type=\"button\" click.delegate=\"getPdfReport(selectedType,params)\">Download</button></div><div if.bind=\"!pdf\"><button type=\"button\" click.delegate=\"getReport(selectedType,params)\">Weergeven</button></div></form></div></template>"; });
define('text!reports/time-difference.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title} ${from} - ${to}</h2><table class=\"table table-striped table-border\"><tr><th colspan=\"2\">Werknemer</th></tr><tr repeat.for=\"workday of report.userWorkdays\"><td>${workday.user.lastName} ${workday.user.firstName}</td><td class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th>Dag</th><th>Uren</th></tr><tr repeat.for=\"day of workday.workdays\"><td>${day.day}</td><td>${day.loggedMinutes/60}</td></tr></table></td></tr></table></div></template>"; });
define('text!reports/timelog-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title} ${report.user.lastName} ${report.user.firstName} ${from} - ${to}</h2><table class=\"table table-striped table-border\"><tr><th colspan=\"2\">Organisatie</th></tr><tr repeat.for=\"organization of report.organizations\"><td>${organization.organization.name}</td><td class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th>Project</th></tr><tr repeat.for=\"project of organization.projects\"><td>${project.project.name}</td><td class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th>Activiteit</th><th>Uren</th></tr><tr repeat.for=\"activity of project.activities\"><td>${activity.activity.name}</td><td>${activity.totalLoggedMinutes/60}</td></tr><tr><th>Totaal</th><td>${project.totalLoggedMinutes/60} uur</td></tr></table></td></tr><tr><th>Totaal</th><td>${organization.totalLoggedMinutes/60} uur</td></tr></table></td></tr><tr repeat.for=\"organization of report.report.organizations\"><td>${organization.organization.name}</td><td class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th>Project</th></tr><tr repeat.for=\"project of organization.projects\"><td>${project.project.name}</td><td class=\"no-padding\"><table class=\"table table-striped nested-border\"><tr><th>Activiteit</th><th>Uren</th></tr><tr repeat.for=\"activity of project.activities\"><td>${activity.activity.name}</td><td>${activity.totalLoggedMinutes/60}</td></tr><tr><th>Totaal</th><td>${project.totalLoggedMinutes/60} uur</td></tr></table></td></tr><tr><th>Totaal</th><td>${organization.totalLoggedMinutes/60} uur</td></tr></table></td></tr></table></div></template>"; });
define('text!timesheet/timesheet.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow group\"><h2 class=\"center\">${title}</h2><form form class=\"form-horizontal form-height center form-width\" submit.trigger=\"saveLog()\"><div class=\"form-group\"><h3>${user.firstName + ' ' + user.lastName}</h3><br><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"organizations\">Organisatie</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"organizations\" value.bind=\"organization\" change.delegate=\"changeOrganization()\"><option repeat.for=\"organization of organizations\" model.bind=\"organization\" innerhtml.bind=\"organization.name\"></option></select></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"projects\">Project</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"projects\" value.bind=\"project\" change.delegate=\"changeProject()\"><option repeat.for=\"project of projects\" model.bind=\"project\" innerhtml.bind=\"project.name\"></option></select></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"activities\">Activiteit</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"activities\" value.bind=\"activity\" change.delegate=\"changeActivity()\"><option repeat.for=\"activity of activities\" model.bind=\"activity\" innerhtml.bind=\"activity.name\"></option></select></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"hours\">Uren</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"hours\" min=\"0\" max=\"23\" step=\"1\"></div><label class=\"col-sm-offset-0 col-sm-2 control-label\" for=\"minutes\">Minuten</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"minutes\" min=\"0\" max=\"59\" step=\"5\"></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"datum\">Datum</label><div class=\"col-sm-6\"><input type=\"date\" id=\"datum\" class=\"form-control\" value.two-way=\"logDate\" change.delegate=\"changeDate()\"></div></div><div class=\"row row-seperated\"><div class=\"col-sm-offset-4 col-sm-8\"><button type=\"submit\" class=\"col-sm-4\" id=\"submitBtn\">Opslaan</button></div></div></div></form><div class=\"timesheet-div\"><h3 class=\"center\"><span innerhtml.bind=\"organization.name + ' / ' + project.name + ' / ' + activity.name\"></span> <button type=\"button\" id=\"collapseBtn\" click.delegate=\"collapse()\" class=\"close\">&bigwedge;</button></h3><div id=\"collapse1\" class=\"collapse in table-div\"><table class=\"table table-striped\"><thead><tr><th>Dag</th><th>Datum</th><th>Tijd gelogd</th><th>Bevestigd</th></tr></thead><tbody><tr repeat.for=\"log of logs\" class=\"${log.regularDays}\"><td innerhtml.bind=\"$parent.logs[$index].weekday\"></td><td innerhtml.bind=\"dateString($parent.logs[$index])\"></td><td innerhtml.bind=\"minuteString($parent.logs[$index])\"></td><td><span innerhtml.bind=\"confirmed($parent.logs[$index])\" class.bind=\"confirmedcolor(log)\"></span></td><td><button type=\"button\" class=\"button\" class.bind=\"confirmedcolor(log)\" click.delegate=\"editLog($parent.logs[$index])\" disabled.bind=\"log.confirmed\">Aanpassen</button></td><td><button type=\"button\" class=\"button\" class.bind=\"confirmedcolor(log)\" click.delegate=\"deleteLog($parent.logs[$index])\" disabled.bind=\"log.confirmed\">Verwijderen</button></td></tr></tbody></table></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map