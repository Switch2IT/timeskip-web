define('app',['exports', './keycloak-service', 'aurelia-router'], function (exports, _keycloakService, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _keycloakService2 = _interopRequireDefault(_keycloakService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  let App = exports.App = class App {
    activate() {}

    logout() {
      _keycloakService2.default.logout();
    }

    configureRouter(config, router) {
      this.router = router;
      config.title = '';

      config.map([{ route: '', moduleId: 'timesheet/timesheet', title: 'Timesheet', name: 'timesheet', nav: true }, { route: 'rapporten', moduleId: 'rapporten/rapporten', name: 'rapporten', nav: true }, { route: 'consultants', moduleId: 'consultants/lijst', name: 'consultants', nav: true }, { route: 'consultants/aanmaken', moduleId: 'consultants/aanmaak-detail', name: 'maakConsultant' }, { route: 'consultants/:id', moduleId: 'consultants/beheer-detail', name: 'consultantDetail', href: '#id', nav: true }, { route: 'projecten', moduleId: 'projecten/lijst', name: 'projecten', nav: true }, { route: 'projecten/aanmaken', moduleId: 'projecten/detail', name: 'maakProject' }, { route: 'projecten/:id', moduleId: 'projecten/detail', name: 'projectDetail' }, { route: 'activiteiten', moduleId: 'activiteiten/lijst', name: 'activiteiten', nav: true }, { route: 'activiteiten/aanmaken', moduleId: 'activiteiten/detail', name: 'maakActiviteit' }, { route: 'activiteiten/:id', moduleId: 'activiteiten/detail', name: 'activiteitDetail' }, { route: 'organisaties', moduleId: 'organisaties/lijst', name: 'organisaties', nav: true }, { route: 'organisaties/aanmaken', moduleId: 'organisaties/detail', name: 'maakOrganisatie' }, { route: 'organisaties/:id', moduleId: 'organisaties/detail', name: 'organisatieDetail' }]);
      config.mapUnknownRoutes('notfound');
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
  };
  exports.default = KeycloakService;
});
define('log',["exports"], function (exports) {
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

        createUser(body) {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this3.postData("/users");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUser() {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this4.getData("/users/current");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateCurrentUser(body) {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this5.patchData("/users/current", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateCurrentUserWorklogs(body) {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this6.putData("/users/current/worklogs", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUser(userId) {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this7.getData("/users/".concat(userId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

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
                var data = yield _this29.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
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
                var data = yield _this38.getData("/configuration/paygrades");
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
                var data = yield _this48.getDataWithParams("/reports/billing");
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
                var data = yield _this49.getPdfDataWithParams("/reports/billing/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReport(params) {
            var _this50 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this50.getDataWithParams("/reports/loggedtime");
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
                var data = yield _this51.getPdfDataWithParams("/reports/loggedtime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
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

        getUserTimeLogReportAsPdf(params) {
            var _this53 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this53.getPdfDataWithParams("/reports/loggedtime/users/current/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReport(params, userId) {
            var _this54 = this;

            return _asyncToGenerator(function* () {
                var query = "/reports/loggedtime/users/".concat(userId);
                try {
                    var data = yield _this54.getDataWithParams(query, params);
                    return data.response;
                } catch (e) {
                    var ex = e;
                }
            })();
        }

        getCurrentUserTimeLogReportAsPdf(params, userId) {
            var _this55 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this55.getPdfDataWithParams("/reports/loggedtime/users/".concat(userId).concat("/pdf"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReport(params) {
            var _this56 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this56.getDataWithParams("/reports/overtime");
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
                var data = yield _this57.getPdfDataWithParams("/reports/overtime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReport(params) {
            var _this58 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this58.getDataWithParams("/reports/undertime");
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
                var data = yield _this59.getPdfDataWithParams("/reports/undertime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
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
            return this.http.createRequest(location).asGet().withParams(params).send();
        }

        getPdfDataWithParams(location, params) {
            return this.http.createRequest(location).asGet().withParams(params).withHeader("Accept", "application/pdf").send();
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
define('consultants/aanmaak-detail',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let AanmaakDetail = exports.AanmaakDetail = class AanmaakDetail {
        constructor() {
            this.title = 'Consultant Aanmaken';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Consultant Aanmaken');
        }
    };
});
define('consultants/beheer-detail',['exports', '../rest-api', './consultant'], function (exports, _restApi, _consultant) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BeheerDetail = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    var _consultant2 = _interopRequireDefault(_consultant);

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

    let BeheerDetail = exports.BeheerDetail = class BeheerDetail {
        constructor() {
            this.title = 'Consultant Beheren';
            this.consultant;
            this.api = new _restApi2.default();
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Consultant Beheren');
                var response = yield _this.api.getUser(params.id);
                _this.consultant = JSON.parse(response);
                if (_this.consultant !== undefined && _this.consultant != null) {
                    _this.fillForm(_this.consultant);
                }
            })();
        }
        fillForm(consultant) {
            this.email = consultant.email;
            this.firstName = consultant.firstName;
            this.lastName = consultant.lastName;
        }
        updateConsultant() {
            var body = { 'email': this.email,
                'firstName': this.firstName,
                'lastName': this.lastName,
                'defaultHoursPerDay': this.consultant.defaultHoursPerDay,
                'workdays': this.consultant.workdays,
                'paygradeId': this.consultant.paygrade.id,
                'defaultActivity': this.consultant.defaultActivity
            };
            var edited = this.api.updateUser(this.consultant.id, body);
        }
    };
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
define('consultants/lijst',['exports', '../rest-api', 'aurelia-framework', 'aurelia-router'], function (exports, _restApi, _aureliaFramework, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Lijst = undefined;

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

    let Lijst = exports.Lijst = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class = class Lijst {
        constructor(router) {
            this.title = 'Consultants';
            this.consultants;
            this.api = new _restApi2.default();
            this.router = router;
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Consultants');
                var response = yield _this.api.getUsers(); //this.api.getUsersWithParams({"role":"consultant"});
                _this.consultants = JSON.parse(response);
            })();
        }
        editConsultant(id) {
            this.router.navigate('consultants/' + id);
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
define('raporten/rapporten',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Report = exports.Report = class Report {
        constructor() {
            this.title = 'Reports';
            this.reportTypes;
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Reports');
            this.reportTypes = ['Report 1', 'Report 2', 'Report 3'];
        }
    };
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
            this.title = 'Home';
            this.minutes = 0;
            this.workDays = [];
            this.logDate = new Date().toISOString().slice(0, 10);
            this.Update = false;
            this.api = new _restApi2.default();
            this.router = router;
            this.memberships = [];
            this.organizations = [];
            this.organization;
            this.projects = [];
            this.project;
            this.allLogs = [];
            this.logs = [];
        }

        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Log tijden');

                yield _this.getCurrentUser();
                _this.workDays = _this.user.workDays;

                yield _this.getMemberships();
                yield _this.getOrganisationsWithMembership();
                //await this.getProjects();
                //await this.getActivities();
                //await this.getWorklogs()       
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

        getCurrentUser() {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                var user = yield _this5.api.getCurrentUser();
                _this5.user = JSON.parse(user);
                _this5.hours = parseInt(_this5.user.defaultHoursPerDay);
            })();
        }

        getMemberships() {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                var memberships = yield _this6.api.getUserMemberships(_this6.user.id);
                _this6.memberships = JSON.parse(memberships);
            })();
        }

        getOrganisationsWithMembership() {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                var doc = _this7;
                var orgJson = yield doc.api.getOrganizations();
                var orgs = JSON.parse(orgJson);
                _this7.organizations = orgs.filter(function (org) {
                    for (var i = 0; i < doc.memberships.length; ++i) {
                        if (org.id == doc.memberships[i].organizationId) {
                            return true;
                        }
                        return false;
                    }
                });

                _this7.organization = _this7.organizations[0];
                yield _this7.changeOrganization();
            })();
        }

        getOrganization(id) {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                var organizationJson = yield _this8.api.getOrganization(id);
                var organization = JSON.parse(organizationJson);
                _this8.organization = organization;
                _this8.clearForm();
            })();
        }

        getProjects() {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                var projects = yield _this9.api.getProjects(_this9.organization.id);
                _this9.projects = JSON.parse(projects);
                _this9.project = _this9.projects[0];
                yield _this9.changeProject();
            })();
        }

        getActivities() {
            var _this10 = this;

            return _asyncToGenerator(function* () {
                var activities = yield _this10.api.getActivities(_this10.organization.id, _this10.project.id);
                _this10.activities = JSON.parse(activities);
                _this10.activity = _this10.activities[0];
                yield _this10.changeActivity();
            })();
        }

        getWorklogs(month) {
            var _this11 = this;

            return _asyncToGenerator(function* () {
                var doc = _this11;
                var today = new Date();
                var from = new Date(today.getFullYear(), today.getMonth(), 2).toISOString().slice(0, 10);
                var to = new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().slice(0, 10);
                var params = { "user": _this11.user.id, "from": from, "to": to, "organization": _this11.organization.id, "project": _this11.project.id, "activity": _this11.activity.id };
                var logs = yield doc.api.getUserWorklogs(params);
                logs = JSON.parse(logs);
                logs = logs.filter(function (log) {
                    return log.userId == doc.user.id;
                });
                logs = logs.filter(function (log, index, logs) {
                    var date = new Date(log.day);
                    var day = date.getDay();
                    log.weekday = date.toLocaleDateString('nl-BE', { weekday: 'short' });
                    log.regularDays = day == 6 || day == 0 ? 'outsideRegularDays' : 'regular';
                    return true;
                });
                doc.logs = doc.sortLogs(logs);
            })();
        }

        addLog() {
            var _this12 = this;

            return _asyncToGenerator(function* () {
                var min = 0;
                if (_this12.hours > 0 || _this12.minutes > 0) {
                    min = _this12.hours * 60 + parseInt(_this12.minutes);
                } else {
                    alert("Gelieve uren en/of minuten in te vullen.");
                }

                if (min > 0) {
                    if (_this12.Update) {
                        var body = JSON.stringify({ 'id': _this12.log.id, 'userId': _this12.user.id, 'day': _this12.logDate.toString(), 'loggedMinutes': min, 'confirmed': false });
                        var updated = yield _this12.api.updateWorklog(_this12.organization.id, _this12.project.id, _this12.activity.id, _this12.log.id, body);
                    } else {
                        var body = JSON.stringify({ "day": _this12.logDate.toString(), "loggedMinutes": min, "confirmed": false });
                        var created = yield _this12.api.createWorklogForCurrentUser(_this12.organization.id, _this12.project.id, _this12.activity.id, body);
                    }
                    yield _this12.getWorklogs();
                    _this12.clearForm();
                }
            })();
        }

        sortLogs(logs) {
            return logs.sort(function (a, b) {
                var firstDate = new Date(a.day);
                var secondDate = new Date(b.day);
                return firstDate - secondDate;
            });
        }

        editLog(index) {
            var current = this.logs[index];
            this.log = current;
            this.minutes = parseInt(current.loggedMinutes) % 60;
            this.hours = (parseInt(current.loggedMinutes) - this.minutes) / 60;
            this.logDate = new Date(current.day).toISOString().slice(0, 10);
            this.Update = true;
            document.getElementById("submitBtn").textContent = "Updaten";
            document.getElementById("datum").disabled = true;
        }

        deleteLog(index) {
            var _this13 = this;

            return _asyncToGenerator(function* () {
                _this13.log = _this13.logs[index];
                var deleted = yield _this13.api.deleteWorklog(_this13.organization.id, _this13.project.id, _this13.activity.id, _this13.log.id);
                yield _this13.getWorklogs();
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
            //var log = this.logs[index];
            if (log.day != undefined) {
                string = new Date(log.day).toLocaleDateString('nl-BE', { year: 'numeric', month: 'short', day: 'numeric' });
            }
            return string;
        }

        minuteString(log) {
            var string = null;
            //var log = this.logs[index];
            if (log.loggedMinutes != undefined) {
                var time = parseInt(log.loggedMinutes);
                var mins = time % 60;
                string = this.pad2((time - mins) / 60) + "," + this.pad2(mins);
            }
            return string;
        }

        pad2(num) {
            var str = "00" + num;
            return str.slice(-2);
        }
    }) || _class);
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./sidebar\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><img class=\"header-logo\" src=\"src/logo/Canguru-Logo.png\" alt=\"logo\"> <i class=\"fa fa-user\"></i></a></div><div class=\"navbar-header\"><button type=\"button\" click.delegate=\"logout()\">Logout</button></div></nav><div><div class=\"row\"><sidebar class=\"col-md-2\"></sidebar><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\r\n    padding-top: 3.5%;\r\n}\r\n\r\nsection {\r\n    margin: 0 20px;\r\n}\r\n\r\na:focus {\r\n    outline: none;\r\n}\r\n\r\n.navbar {\r\n    height: 4%;\r\n    position: fixed !important;\r\n}\r\n\r\n.navbar-brand {\r\n    padding: 0;\r\n}\r\n\r\n.no-selection {\r\n    margin: 20px;\r\n}\r\n\r\n.contact-list {\r\n    overflow-y: auto;\r\n    border: 1px solid #ddd;\r\n    padding: 10px;\r\n}\r\n\r\n.panel {\r\n    margin: 20px;\r\n}\r\n\r\n.button-bar {\r\n    right: 0;\r\n    left: 0;\r\n    bottom: 0;\r\n    border-top: 1px solid #ddd;\r\n    background: white;\r\n}\r\n\r\n    .button-bar > button {\r\n        float: right;\r\n        margin: 20px;\r\n    }\r\n\r\nli.list-group-item {\r\n    list-style: none;\r\n}\r\n\r\n    li.list-group-item > a {\r\n        text-decoration: none;\r\n    }\r\n\r\n    li.list-group-item.active > a {\r\n        color: white;\r\n    }\r\n\r\n.main-view {\r\n    height: 88%;\r\n    width: 80%;\r\n    margin-top: 1%;\r\n    padding: 10px;\r\n    position: fixed !important;\r\n    border: thin solid lightgrey;\r\n}\r\n\r\n.sidebar {\r\n    height: 100%;\r\n    z-index: 1;\r\n    position: fixed !important;\r\n    padding-top: 3%;\r\n    overflow: auto;\r\n    border-right: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n}\r\n\r\n    .sidebar ul {\r\n        padding: 0;\r\n    }\r\n\r\n    .sidebar li {\r\n        list-style: none;\r\n        border-bottom: thin solid lightgrey;\r\n        width: auto;\r\n    }\r\n\r\n.sidebar-item {\r\n    color: gray;\r\n    font-size: 1.5em;\r\n    font-weight: bold;\r\n}\r\n\r\n.sidebar li ul li:first-child {\r\n    list-style: none;\r\n    border-top: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li {\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n    .sidebar li ul li:last-child {\r\n        list-style: none;\r\n        width: auto;\r\n    }\r\n\r\n.sidebar-subItem {\r\n    padding-left: 10%;\r\n    color: gray;\r\n    font-size: 1em;\r\n    font-weight: bold;\r\n}\r\n\r\n.col-md-2 {\r\n    margin-right: 1%;\r\n}\r\n\r\n.base-shadow {\r\n    box-shadow: 0 3px 10px 2px lightgrey;\r\n}\r\n\r\n.center {\r\n    text-align: center;\r\n}\r\n\r\n.center-div {\r\n    margin: 0 auto;\r\n    float: none;\r\n}\r\n\r\n.header-logo {\r\n    height: 100%;\r\n    width: auto;\r\n    float: left;\r\n}\r\n\r\n.form-width {\r\n    width: 70%;\r\n    margin-left: 15%;\r\n    margin-right: 15%;\r\n}\r\n\r\n.form-height {\r\n    margin-top: 3vh;\r\n    margin-bottom: 3vh;\r\n}\r\n\r\n.row-seperated {\r\n    margin-bottom: 0.8em;\r\n}\r\n\r\n.table-striped > tbody > tr.outsideRegularDays {\r\n    background-color: #faffc4;\r\n}\r\n\r\n.vert-scroll {    \r\n    overflow-x: hidden;\r\n    overflow-y: scroll;\r\n}\r\n\r\n.group:after {\r\n  content: \"\";\r\n  display: table;\r\n  clear: both;\r\n}\r\n.table-responsive {\r\n    overflow-y: auto;\r\n}\r\n.timesheet-div {\r\n   width: 70%;   \r\n   margin: 0 15%;\r\n}\r\n.table-div {\r\n   overflow-y: scroll;\r\n   max-height: 20vh;\r\n   margin: 3vh 0 3vh;\r\n}"; });
define('text!notfound.html', ['module'], function(module) { module.exports = "<template><h1>404 suck it</h1></template>"; });
define('text!sidebar.html', ['module'], function(module) { module.exports = "<template><div class=\"sidebar col-md-2 base-shadow\"><ul><li repeat.for=\"item of items\" class=\"${item.isActive ? 'active' : ''}\"><a class=\"sidebar-item\" route-href=\"route.bind: item.route\">${item.value}</a></li></ul></div></template>"; });
define('text!activiteiten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!consultants/aanmaak-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/beheer-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\" submit.trigger=\"updateConsultant()\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\" value.two-way=\"email\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\" value.two-way=\"firstName\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\" value.two-way=\"lastName\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form><button>Niewe Consultant</button></form><div><table class=\"table table-striped\"><thead><tr><th>voornaam</th><th>familienaam</th><th>e-mail</th></tr></thead><tbody><tr repeat.for=\"consultant of consultants\"><td>${consultant.firstName}</td><td>${consultant.lastName}</td><td>${consultant.email}</td><td><button type=\"button\" click.delegate=\"editConsultant(consultant.id)\">Wijzigen</button></td></tr></tbody></table></div></div></template>"; });
define('text!organisaties/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!projecten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!raporten/rapporten.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"rapporten\">Rapport</label><div class=\"col-sm-10\"><select id=\"rapporten\" class=\"form-control\"><option repeat.for=\"type of reportTypes\" value.bind=\"type\">${type}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"begin\">Begin Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"begin\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"eind\">Eind Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"eind\" class=\"form-control\"></div></div><input type=\"submit\" value=\"Download\"></form></div></template>"; });
define('text!timesheet/timesheet.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow group\"><h2 class=\"center\">${title}</h2><form form class=\"form-horizontal form-height center form-width\" submit.trigger=\"addLog()\"><div class=\"form-group\"><h3>${user.firstName + ' ' + user.lastName}</h3><br><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"organizations\">Organisatie</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"organizations\" value.bind=\"organization\" change.delegate=\"changeOrganization()\"><option repeat.for=\"organization of organizations\" model.bind=\"organization\" innerhtml.bind=\"organization.name\"></option></select></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"projects\">Project</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"projects\" value.bind=\"project\" change.delegate=\"changeProject()\"><option repeat.for=\"project of projects\" model.bind=\"project\" innerhtml.bind=\"project.name\"></option></select></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"activities\">Activiteit</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"activities\" value.bind=\"activity\" change.delegate=\"changeActivity()\"><option repeat.for=\"activity of activities\" model.bind=\"activity\" innerhtml.bind=\"activity.name\"></option></select></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"hours\">Uren</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"hours\" min=\"0\" max=\"12\" step=\"1\"></div><label class=\"col-sm-offset-0 col-sm-2 control-label\" for=\"minutes\">Minuten</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"minutes\" min=\"0\" max=\"59\" step=\"5\"></div></div><div class=\"row row-seperated\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"datum\">Datum</label><div class=\"col-sm-6\"><input type=\"date\" id=\"datum\" class=\"form-control\" value.two-way=\"logDate\"></div></div><div class=\"row row-seperated\"><div class=\"col-sm-offset-4 col-sm-8\"><button type=\"submit\" class=\"col-sm-4\" id=\"submitBtn\">Opslaan</button></div></div></div></form><div class=\"timesheet-div\"><h3 class=\"center\"><span innerhtml.bind=\"organization.name + ' / ' + project.name + ' / ' + activity.name\"></span> <button type=\"button\" data-toggle=\"collapse\" href=\"#collapse1\" class=\"close\">&times;</button></h3><div id=\"collapse1\" class=\"panel-table collapse in table-div\"><table class=\"table table-striped\"><thead><tr><th>Dag</th><th>Datum</th><th>Tijd gelogd</th></tr></thead><tbody><tr repeat.for=\"log of logs\" class=\"${log.regularDays}\"><td innerhtml.bind=\"$parent.logs[$index].weekday\"></td><td innerhtml.bind=\"dateString($parent.logs[$index])\"></td><td innerhtml.bind=\"minuteString($parent.logs[$index])\"></td><td><button type=\"button\" class=\"button\" click.delegate=\"editLog($index)\">Aanpassen</button></td><td><button type=\"button\" class=\"button\" click.delegate=\"deleteLog($index)\">Verwijderen</button></td></tr></tbody></table></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map