define('app',['exports', './keycloak-service', './notfound', 'aurelia-router'], function (exports, _keycloakService, _notfound, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _keycloakService2 = _interopRequireDefault(_keycloakService);

  var _notfound2 = _interopRequireDefault(_notfound);

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

      config.map([{ route: '', moduleId: 'timesheet', title: 'Timesheet', name: 'timesheet', nav: true }, { route: 'rapporten', moduleId: 'rapporten', name: 'rapporten', nav: true }, { route: 'consultants', moduleId: 'consultants/lijst', name: 'consultants', nav: true }, { route: 'consultants/aanmaken', moduleId: 'consultants/aanmaak-detail', name: 'maakConsultant' }, { route: 'consultants/:id', moduleId: 'consultants/beheer-detail', name: 'consultantDetail', href: '#id', nav: true }, { route: 'projecten', moduleId: 'projecten/lijst', name: 'projecten', nav: true }, { route: 'projecten/aanmaken', moduleId: 'projecten/detail', name: 'maakProject' }, { route: 'projecten/:id', moduleId: 'projecten/detail', name: 'projectDetail' }, { route: 'activiteiten', moduleId: 'activiteiten/lijst', name: 'activiteiten', nav: true }, { route: 'activiteiten/aanmaken', moduleId: 'activiteiten/detail', name: 'maakActiviteit' }, { route: 'activiteiten/:id', moduleId: 'activiteiten/detail', name: 'activiteitDetail' }, { route: 'organisaties', moduleId: 'organisaties/lijst', name: 'organisaties', nav: true }, { route: 'organisaties/aanmaken', moduleId: 'organisaties/detail', name: 'maakOrganisatie' }, { route: 'organisaties/:id', moduleId: 'organisaties/detail', name: 'organisatieDetail' }]);
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
define('rapporten',['exports'], function (exports) {
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
                var data = yield _this4.postData("/users");
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

        getUser(userId) {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this8.getData("/users/".concat(userId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateUser(userId, body) {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this9.patchData("/users/".concat(userId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserMemberships(userId) {
            var _this10 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this10.getData("/users/".concat(userId).concat("/memberships"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateUserMemberships(userId, organizationId, body) {
            var _this11 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this11.putData("/users/".concat(userId).concat("/memberships/organizations/").concat(organizationId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeUserMembership(userId, organizationId) {
            var _this12 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this12.deleteData("/users/".concat(userId).concat("/memberships/").concat(organizationId));
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
            var _this13 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this13.getData("/organizations");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOrganization(organizationId) {
            var _this14 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this14.getData("/organizations/".concat(organizationId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createOrganization(body) {
            var _this15 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this15.postData("/organizations", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateOrganization(id, body) {
            var _this16 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this16.patchData("/organizations".concat(id), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeOrganization(organizationId) {
            var _this17 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this17.deleteData("/organizations/".concat(organizationId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //PROJECTS

        getProjects(organizationId) {
            var _this18 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this18.getData("/organizations/".concat(organizationId).concat("/projects"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getProject(organizationId, projectId) {
            var _this19 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this19.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createProject(organizationId, body) {
            var _this20 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this20.postData("/organizations/".concat(organizationId).concat("/projects"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateProject(organizationId, projectId, body) {
            var _this21 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this21.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        deleteProject(organizationId, projectId) {
            var _this22 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this22.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //ACTIVITIES

        getActivities(organizationId, projectId) {
            var _this23 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this23.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getActivity(organizationId, projectId, activityId) {
            var _this24 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this24.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createActivity(organizationId, projectId, body) {
            var _this25 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this25.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateActvitiy(organizationId, projectId, activityId, body) {
            var _this26 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this26.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        deleteActivity(organizationId, projectId, activityId) {
            var _this27 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this27.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        //WORKLOGS

        getWorklogs(organizationId, projectId, activityId) {
            var _this28 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this28.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getWorklogs(organizationId, projectId, activityId, worklogId) {
            var _this29 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this29.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createWorklog(organizationId, projectId, activityId, body) {
            var _this30 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this30.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities").concat(activityId).concat("/worklogs"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createWorklogForCurrentUser(organizationId, projectId, activityId, body) {
            var _this31 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this31.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities").concat(activityId).concat("/worklogs").concat("/currentuser"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateWorklog(organizationId, projectId, activityId, worklogId, body) {
            var _this32 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this32.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        deleteWorklog(organizationId, projectId, activityId, worklogId) {
            var _this33 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this33.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        /**
         * Following methods are used for management and HR only calls. 
         */

        getMailTemplates() {
            var _this34 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this34.getData("/configuration/mail/templates");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getMailTemplateByTopic(topic) {
            var _this35 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this35.getData("/configuration/mail/templates/".concat(topic));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateMailTemplate(topic, body) {
            var _this36 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this36.patchData("/configuration/mail/templates/".concat(topic), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getPaygrades() {
            var _this37 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this37.getData("/configuration/paygrades");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getPaygrade(paygradeId) {
            var _this38 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this38.getData("/configuration/paygrades/".concat(paygradeId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createPaygrade(body) {
            var _this39 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this39.postData("/configuration/paygrades", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getDayOfMontlyReminder() {
            var _this40 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this40.getData("/configuration/schedule/dayofmonthlyreminder");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateDayOfMontlyReminder(body) {
            var _this41 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this41.putData("/configuration/schedule/dayofmonthlyreminder", body);
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
            var _this42 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this42.getData("/roles");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getRole(roleId) {
            var _this43 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this43.getData("/roles/".concat(roleId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createRole(body) {
            var _this44 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this44.postData("/roles", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateRole(roleId, body) {
            var _this45 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this45.patchData("/roles".concat(roleId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeRole(roleId) {
            var _this46 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this46.deleteData("/roles/".concat(roleId));
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
            var _this47 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this47.getDataWithParams("/reports/billing");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getBillingReportAsPdf(params) {
            var _this48 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this48.getPdfDataWithParams("/reports/billing/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReport(params) {
            var _this49 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this49.getDataWithParams("/reports/loggedtime");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReportAsPdf(params) {
            var _this50 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this50.getPdfDataWithParams("/reports/loggedtime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUserTimeLogReport(params) {
            var _this51 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this51.getDataWithParams("/reports/loggedtime/users/current");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReportAsPdf(params) {
            var _this52 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this52.getPdfDataWithParams("/reports/loggedtime/users/current/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReport(params, userId) {
            var _this53 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this53.getDataWithParams("/reports/loggedtime/users/".concat(userId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUserTimeLogReportAsPdf(params, userId) {
            var _this54 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this54.getPdfDataWithParams("/reports/loggedtime/users/".concat(userId).concat("/pdf"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReport(params) {
            var _this55 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this55.getDataWithParams("/reports/overtime");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReportAsPdf(params) {
            var _this56 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this56.getPdfDataWithParams("/reports/overtime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReport(params) {
            var _this57 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this57.getDataWithParams("/reports/undertime");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReportAsPdf(params) {
            var _this58 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this58.getPdfDataWithParams("/reports/undertime/pdf");
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
define('timesheet',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Home = exports.Home = class Home {
        constructor() {
            this.title = 'Home';
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
    exports.BeheerkDetail = undefined;

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

    let BeheerkDetail = exports.BeheerkDetail = class BeheerkDetail {
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
                _this.consultant = params.id;
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
    };
});
define('consultants/consultant',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Consultant = class Consultant {

        constructor(name, role, email, id) {
            this.name = name;
            this.role = role;
            this.email = email;
            this.id = id;
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
                var response = yield _this.api.getUsersWithParams({ "role": "consultant" });
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./sidebar\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><img class=\"header-logo\" src=\"src/logo/Canguru-Logo.png\" alt=\"logo\"> <i class=\"fa fa-user\"></i></a></div><div class=\"navbar-header\"><button type=\"button\" click.delegate=\"logout()\">Logout</button></div></nav><div><div class=\"row\"><sidebar class=\"col-md-2\"></sidebar><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { \n    padding-top: 3.5%; \n    }\n\nsection {\n  margin: 0 20px;\n}\n\na:focus {\n  outline: none;\n}\n\n.navbar {\n    height: 4%;\n    position: fixed!important;\n}\n\n.navbar-brand{\n    padding:0;\n}\n\n.no-selection {\n  margin: 20px;\n}\n\n.contact-list {\n  overflow-y: auto;\n  border: 1px solid #ddd;\n  padding: 10px;\n}\n\n.panel {\n  margin: 20px;\n}\n\n.button-bar {\n  right: 0;\n  left: 0;\n  bottom: 0;\n  border-top: 1px solid #ddd;\n  background: white;\n}\n\n.button-bar > button {\n  float: right;\n  margin: 20px;\n}\n\nli.list-group-item {\n  list-style: none;\n}\n\nli.list-group-item > a {\n  text-decoration: none;\n}\n\nli.list-group-item.active > a {\n  color: white;\n}\n\n.main-view{\n    height:88%;\n    width: 80%;\n    margin-top: 1%;\n    padding: 10px;\n    position: fixed!important;\n    border: thin solid lightgrey;\n}\n\n.sidebar{\n    height: 100%;\n    z-index:1;\n    position: fixed!important;\n    padding-top: 3%;\n    overflow:auto;\n    border-right: thin solid lightgrey;\n    border-bottom: thin solid lightgrey;\n}\n\n.sidebar ul{\n  padding: 0;\n}\n\n.sidebar li{\n    list-style: none;\n    border-bottom: thin solid lightgrey;\n    width: auto;\n}\n\n.sidebar-item{\n    color: gray;\n    font-size: 1.5em;\n    font-style: bold;\n}\n\n.sidebar li ul li:first-child{\n    list-style: none;\n    border-top: thin solid lightgrey;\n    border-bottom: thin solid lightgrey;\n    width: auto;\n}\n\n.sidebar li ul li{\n    list-style: none;\n    border-bottom: thin solid lightgrey;\n    width: auto;\n}\n\n.sidebar li ul li:last-child{\n    list-style: none;\n    width: auto;\n}\n\n.sidebar-subItem{\n    padding-left: 10%;\n    color: gray;\n    font-size: 1em;\n    font-style: bold;\n}\n\n.col-md-2{\n    margin-right: 1%;\n}\n.base-shadow{\n    box-shadow: 0 3px 10px 2px lightgrey;\n}\n\n.center{\n    text-align: center;\n}\n\n.center-div{\n    margin: 0 auto;\n    float: none;\n}\n\n.header-logo{\n    height: 100%;\n    width: auto;\n    float: left;\n}\n\n.form-width{\n    width: 70%;\n    margin-left: 15%;\n    margin-right: 15%;\n}\n\n.form-height{\n    height: 80%;\n    margin-top: 10%;\n    margin-bottom: 10%;\n}"; });
define('text!notfound.html', ['module'], function(module) { module.exports = "<template><h1>404 suck it</h1></template>"; });
define('text!rapporten.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"rapporten\">Rapport</label><div class=\"col-sm-10\"><select id=\"rapporten\" class=\"form-control\"><option repeat.for=\"type of reportTypes\" value.bind=\"type\">${type}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"begin\">Begin Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"eind\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"eind\">Eind Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"eind\" class=\"form-control\"></div></div><input type=\"submit\" value=\"Download\"></form></div></template>"; });
define('text!sidebar.html', ['module'], function(module) { module.exports = "<template><div class=\"sidebar col-md-2 base-shadow\"><ul><li repeat.for=\"item of items\" class=\"${item.isActive ? 'active' : ''}\"><a class=\"sidebar-item\" route-href=\"route.bind: item.route\">${item.value}</a></li></ul></div></template>"; });
define('text!timesheet.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!activiteiten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!consultants/aanmaak-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/beheer-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\" submit.trigger=\"updateConsultant()\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\" value.two-way=\"email\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\" value.two-way=\"firstName\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\" value.two-way=\"lastName\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form><button>Niewe Consultant</button></form><div><table class=\"table table-striped\"><thead><tr><th>voornaam</th><th>familienaam</th><th>e-mail</th></tr></thead><tbody><tr repeat.for=\"consultant of consultants\"><td>${consultant.firstName}</td><td>${consultant.lastName}</td><td>${consultant.email}</td><td><button type=\"button\" click.delegate=\"editConsultant(consultant.id)\">Wijzigen</button></td></tr></tbody></table></div></div></template>"; });
define('text!organisaties/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!projecten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
//# sourceMappingURL=app-bundle.js.map