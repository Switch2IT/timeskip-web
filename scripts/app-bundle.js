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
define('log',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    let Log = class Log {

        constructor(minutes, logDate) {
            this.minutes = minutes;
            this.logDate = logDate;
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

        getWorklogs(organizationId, projectId, activityId) {
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

        getWorklogs(organizationId, projectId, activityId, worklogId) {
            var _this28 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this28.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId));
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
                var data = yield _this29.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities").concat(activityId).concat("/worklogs"), body);
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
                var data = yield _this30.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities").concat(activityId).concat("/worklogs").concat("/currentuser"), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
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

        /**
         * Following methods are used for management and HR only calls.
         */

        /**
         * Following methods are used for management of roles.
         */

        getRoles() {
            var _this33 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this33.getData("/roles");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getRole(roleId) {
            var _this34 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this34.getData("/roles/".concat(roleId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        createRole(body) {
            var _this35 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this35.postData("/roles", body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        updateRole(roleId, body) {
            var _this36 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this36.patchData("/roles".concat(roleId), body);
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        removeRole(roleId) {
            var _this37 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this37.deleteData("/roles/".concat(roleId));
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
            var _this38 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this38.getDataWithParams("/reports/billing");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getBillingReportAsPdf(params) {
            var _this39 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this39.getPdfDataWithParams("/reports/billing/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReport(params) {
            var _this40 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this40.getDataWithParams("/reports/loggedtime");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getTimeLogReportAsPdf(params) {
            var _this41 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this41.getPdfDataWithParams("/reports/loggedtime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUserTimeLogReport(params) {
            var _this42 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this42.getDataWithParams("/reports/loggedtime/users/current");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReportAsPdf(params) {
            var _this43 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this43.getPdfDataWithParams("/reports/loggedtime/users/current/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUserTimeLogReport(params, userId) {
            var _this44 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this44.getDataWithParams("/reports/loggedtime/users/".concat(userId));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getCurrentUserTimeLogReportAsPdf(params, userId) {
            var _this45 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this45.getPdfDataWithParams("/reports/loggedtime/users/".concat(userId).concat("/pdf"));
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReport(params) {
            var _this46 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this46.getDataWithParams("/reports/overtime");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getOvertimeReportAsPdf(params) {
            var _this47 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this47.getPdfDataWithParams("/reports/overtime/pdf");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReport(params) {
            var _this48 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this48.getDataWithParams("/reports/undertime");
                if (data.statusCode < 400) {
                    return data.response;
                } else {
                    alert(data.statusCode.concat(' - ').concat(data.statusText));
                }
            })();
        }

        getUndertimeReportAsPdf(params) {
            var _this49 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this49.getPdfDataWithParams("/reports/undertime/pdf");
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
define('timesheet',['exports', './rest-api', 'aurelia-framework', 'aurelia-router', './log', 'bootstrap'], function (exports, _restApi, _aureliaFramework, _aureliaRouter, _log) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    var _restApi2 = _interopRequireDefault(_restApi);

    var _log2 = _interopRequireDefault(_log);

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
            this.logDate = new Date().toISOString().slice(0, 10);
            this.Logs = [];
            this.Update = false;
            this.api = new _restApi2.default();
            this.router = router;
            this.organizations = [];
            this.organization;
            this.projects = [];
            this.project;
        }
        activate(params, routeConfig) {
            var _this = this;

            return _asyncToGenerator(function* () {
                _this.routeConfig = routeConfig;
                _this.routeConfig.navModel.setTitle('Log tijden');

                //var report = await this.api.getCurrentUserTimeLogReport();


                var user = yield _this.api.getCurrentUser();
                _this.user = JSON.parse(user);
                _this.hours = parseInt(_this.user.defaultHoursPerDay);

                var memberships = yield _this.api.getUserMemberships(_this.user.id);
                _this.memberships = JSON.parse(memberships);

                var organizationJson = yield _this.api.getOrganizations();
                var organizations = JSON.parse(organizationJson);
                for (var i = 0; i < organizations.length; ++i) {
                    var keep = false;
                    var organization = organizations[i];
                    _this.memberships.forEach(function (item) {
                        if (item.organizationId == organization.id) {
                            keep = true;
                        }
                    });
                    if (keep) {
                        _this.organizations.push(organization);
                    }
                }
                _this.organization = _this.organizations[0];

                var projects = yield _this.api.getProjects(_this.organization.id);
                _this.projects = JSON.parse(projects);
                _this.project = _this.projects[0];

                var activities = yield _this.api.getActivities(_this.organization.id, _this.project.id);
                _this.activities = JSON.parse(activities);
                _this.activity = _this.activities[0];

                //var logs = await this.api.getWorklogs(this.organization.id, this.project.id, this.activity.id);
                //this.Logs = JSON.parse(logs);
            })();
        }

        addLog() {
            var min = 0;
            if (this.hours > 0 || this.minutes > 0) {
                min = this.hours * 60 + parseInt(this.minutes);
            } else {
                alert("Gelieve uren en/of minuten in te vullen.");
            }
            if (min > 0) {
                var log = new _log2.default(min, this.logDate.toString());
                if (this.Update) {
                    this.Logs.forEach(function (item, index, Logs) {
                        if (item.logDate == log.logDate) {
                            Logs.splice(index, 1);
                            Logs.push(log);
                        }
                    });
                    this.Update = false;
                } else {
                    this.Logs.push(log);
                }
                this.Logs.sort(function (a, b) {
                    var firstDate = new Date(a.logDate);
                    var secondDate = new Date(b.logDate);
                    return firstDate.getDate() - secondDate.getDate();
                });
                this.clearForm();
            }
        }

        editLog(index) {
            var current = this.Logs[index];
            this.minutes = parseInt(current.minutes) % 60;
            this.hours = (parseInt(current.minutes) - this.minutes) / 60;
            this.logDate = new Date(current.logDate).toISOString().slice(0, 10);
            this.Update = true;
            document.getElementById("submitBtn").textContent = "Updaten";
            document.getElementById("datum").disabled = true;
        }

        deleteLog(index) {
            this.Logs.splice(index, 1);
        }

        clearForm() {
            this.minutes = 0;
            this.hours = 0;
            this.logDate = new Date().toISOString().slice(0, 10);
            document.getElementById("submitBtn").textContent = "Opslaan";
            document.getElementById("datum").disabled = false;
        }

        minuteString(index) {
            var log = this.Logs[index];
            var time = parseInt(log.minutes);
            var mins = time % 60;
            return this.pad2((time - mins) / 60) + ":" + this.pad2(mins);
        }

        pad2(num) {
            var str = "00" + num;
            return str.slice(-2);
        }
    }) || _class);
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
define('text!styles.css', ['module'], function(module) { module.exports = "body { \r\n    padding-top: 3.5%; \r\n    }\r\n\r\nsection {\r\n  margin: 0 20px;\r\n}\r\n\r\na:focus {\r\n  outline: none;\r\n}\r\n\r\n.navbar {\r\n    height: 4%;\r\n    position: fixed!important;\r\n}\r\n\r\n.navbar-brand{\r\n    padding:0;\r\n}\r\n\r\n.no-selection {\r\n  margin: 20px;\r\n}\r\n\r\n.contact-list {\r\n  overflow-y: auto;\r\n  border: 1px solid #ddd;\r\n  padding: 10px;\r\n}\r\n\r\n.panel {\r\n  margin: 20px;\r\n}\r\n\r\n.button-bar {\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  border-top: 1px solid #ddd;\r\n  background: white;\r\n}\r\n\r\n.button-bar > button {\r\n  float: right;\r\n  margin: 20px;\r\n}\r\n\r\nli.list-group-item {\r\n  list-style: none;\r\n}\r\n\r\nli.list-group-item > a {\r\n  text-decoration: none;\r\n}\r\n\r\nli.list-group-item.active > a {\r\n  color: white;\r\n}\r\n\r\n.main-view{\r\n    height:88%;\r\n    width: 80%;\r\n    margin-top: 1%;\r\n    padding: 10px;\r\n    position: fixed!important;\r\n    border: thin solid lightgrey;\r\n}\r\n\r\n.sidebar{\r\n    height: 100%;\r\n    z-index:1;\r\n    position: fixed!important;\r\n    padding-top: 3%;\r\n    overflow:auto;\r\n    border-right: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n}\r\n\r\n.sidebar ul{\r\n  padding: 0;\r\n}\r\n\r\n.sidebar li{\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar-item{\r\n    color: gray;\r\n    font-size: 1.5em;\r\n    font-style: bold;\r\n}\r\n\r\n.sidebar li ul li:first-child{\r\n    list-style: none;\r\n    border-top: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li{\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li:last-child{\r\n    list-style: none;\r\n    width: auto;\r\n}\r\n\r\n.sidebar-subItem{\r\n    padding-left: 10%;\r\n    color: gray;\r\n    font-size: 1em;\r\n    font-style: bold;\r\n}\r\n\r\n.col-md-2{\r\n    margin-right: 1%;\r\n}\r\n.base-shadow{\r\n    box-shadow: 0 3px 10px 2px lightgrey;\r\n}\r\n\r\n.center{\r\n    text-align: center;\r\n}\r\n\r\n.center-div{\r\n    margin: 0 auto;\r\n    float: none;\r\n}\r\n\r\n.header-logo{\r\n    height: 100%;\r\n    width: auto;\r\n    float: left;\r\n}\r\n\r\n.form-width{\r\n    width: 70%;\r\n    margin-left: 15%;\r\n    margin-right: 15%;\r\n}\r\n\r\n.form-height{\r\n    height: 80%;\r\n    margin-top: 10%;\r\n    margin-bottom: 10%;\r\n}"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./sidebar\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><img class=\"header-logo\" src=\"src/logo/Canguru-Logo.png\" alt=\"logo\"> <i class=\"fa fa-user\"></i></a></div><div class=\"navbar-header\"><button type=\"button\" click.delegate=\"logout()\">Logout</button></div></nav><div><div class=\"row\"><sidebar class=\"col-md-2\"></sidebar><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!notfound.html', ['module'], function(module) { module.exports = "<template><h1>404 suck it</h1></template>"; });
define('text!rapporten.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"rapporten\">Rapport</label><div class=\"col-sm-10\"><select id=\"rapporten\" class=\"form-control\"><option repeat.for=\"type of reportTypes\" value.bind=\"type\">${type}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"begin\">Begin Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"begin\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"eind\">Eind Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"eind\" class=\"form-control\"></div></div><input type=\"submit\" value=\"Download\"></form></div></template>"; });
define('text!sidebar.html', ['module'], function(module) { module.exports = "<template><div class=\"sidebar col-md-2 base-shadow\"><ul><li repeat.for=\"item of items\" class=\"${item.isActive ? 'active' : ''}\"><a class=\"sidebar-item\" route-href=\"route.bind: item.route\">${item.value}</a></li></ul></div></template>"; });
define('text!timesheet.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form form class=\"form-horizontal form-height center form-width\" submit.trigger=\"addLog()\"><div class=\"form-group\"><h3>${user.firstName + ' ' + user.lastName}</h3><br><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"organizations\">Organisatie</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"organizations\" value.bind=\"organization\"><option repeat.for=\"organization of organizations\" model.bind=\"organization.id\" innerhtml.bind=\"organization.name\"></option></select><br></div><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"projects\">Project</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"projects\" value.bind=\"project\"><option repeat.for=\"project of projects\" model.bind=\"project.id\" innerhtml.bind=\"project.name\"></option></select><br></div><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"activities\">Activiteit</label><div class=\"col-sm-6\"><select class=\"form-control\" name=\"activities\" value.bind=\"activity\"><option repeat.for=\"activity of activities\" model.bind=\"activity.id\" innerhtml.bind=\"activity.name\"></option></select><br></div><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"hours\">Uren</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"hours\" min=\"0\" max=\"12\" step=\"1\"></div><label class=\"col-sm-offset-0 col-sm-2 control-label\" for=\"minutes\">Minuten</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"minutes\" min=\"0\" max=\"59\" step=\"5\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"datum\">Datum</label><div class=\"col-sm-6\"><input type=\"date\" id=\"datum\" class=\"form-control\" value.two-way=\"logDate\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-4 col-sm-8\"><button type=\"submit\" class=\"col-sm-4\" id=\"submitBtn\">Opslaan</button></div></div><div class=\"form-group\"><table class=\"table table-striped\"><thead><tr><th>Datum</th><th>Tijd gelogd</th></tr></thead><tr repeat.for=\"Log of Logs\"><td innerhtml.bind=\"$parent.Logs[$index].logDate\"></td><td innerhtml.bind=\"minuteString($index)\"></td><td><button type=\"button\" class=\"button edit-log\" click.delegate=\"editLog($index)\">Aanpassen</button></td><td><button type=\"button\" class=\"button delete-log\" click.delegate=\"deleteLog($index)\">Verwijderen</button></td></tr></table></div></form></div></template>"; });
define('text!activiteiten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!consultants/aanmaak-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/beheer-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\" submit.trigger=\"updateConsultant()\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\" value.two-way=\"email\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\" value.two-way=\"firstName\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\" value.two-way=\"lastName\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form><button>Niewe Consultant</button></form><div><table class=\"table table-striped\"><thead><tr><th>voornaam</th><th>familienaam</th><th>e-mail</th></tr></thead><tbody><tr repeat.for=\"consultant of consultants\"><td>${consultant.firstName}</td><td>${consultant.lastName}</td><td>${consultant.email}</td><td><button type=\"button\" click.delegate=\"editConsultant(consultant.id)\">Wijzigen</button></td></tr></tbody></table></div></div></template>"; });
define('text!projecten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!organisaties/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
//# sourceMappingURL=app-bundle.js.map