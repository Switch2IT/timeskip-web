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
      /*return new Promise(function(resolve, reject) {
        if (KeycloakService.auth.authz.token) {
           KeycloakService.auth.authz.updateToken(5)
             .success(function() {
               resolve(KeycloakService.auth.authz.token);
             })
            .error(function() {
               reject('Failed to refresh token');
            });
        }
      });*/
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
                console.log(data);
                return data.response;
            })();
        }

        getUser(userid) {
            var _this2 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this2.getData("/users/".concat(userid));
                console.log(data);
                return data.response;
            })();
        }

        createUser(body) {
            var _this3 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this3.postData("/users");
                console.log(data);
                return data.response;
            })();
        }

        /**
         * Following methods are used to get, create, update and delete organizations and underlying objects.
         */

        //ORGANIZATIONS

        getOrganizations() {
            var _this4 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this4.getData("/organizations");
                console.log(data);
                return data.response;
            })();
        }

        getOrganization(organizationId) {
            var _this5 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this5.getData("/organizations/".concat(organizationId));
                console.log(data);
                return data.response;
            })();
        }

        createOrganization(body) {
            var _this6 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this6.postData("/organizations", body);
                console.log(data);
                return data.response;
            })();
        }

        updateOrganization(id, body) {
            var _this7 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this7.postData("/organizations".concat(id), body);
                console.log(data);
                return data.response;
            })();
        }

        removeOrganization(organizationId) {
            var _this8 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this8.deleteData("/organizations/".concat(organizationId));
                console.log(data);
                return data.response;
            })();
        }

        //PROJECTS

        getProjects(organizationId) {
            var _this9 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this9.getData("/organizations/".concat(organizationId).concat("/projects"));
                console.log(data);
                return data.response;
            })();
        }

        getProject(organizationId, projectId) {
            var _this10 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this10.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId));
                console.log(data);
                return data.response;
            })();
        }

        createProject(organizationId, body) {
            var _this11 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this11.postData("/organizations/".concat(organizationId).concat("/projects"), body);
                console.log(data);
                return data.response;
            })();
        }

        updateProject(organizationId, projectId, body) {
            var _this12 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this12.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId), body);
                console.log(data);
                return data.response;
            })();
        }

        deleteProject(organizationId, projectId) {
            var _this13 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this13.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId));
                console.log(data);
                return data.response;
            })();
        }

        //ACTIVITIES

        getActivities(organizationId, projectId) {
            var _this14 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this14.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities"));
                console.log(data);
                return data.response;
            })();
        }

        getActivity(organizationId, projectId, activityId) {
            var _this15 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this15.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId));
                console.log(data);
                return data.response;
            })();
        }

        createActivity(organizationId, projectId, body) {
            var _this16 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this16.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities"), body);
                console.log(data);
                return data.response;
            })();
        }

        updateActvitiy(organizationId, projectId, activityId, body) {
            var _this17 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this17.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId), body);
                console.log(data);
                return data.response;
            })();
        }

        deleteActivity(organizationId, projectId, activityId) {
            var _this18 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this18.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId));
                console.log(data);
                return data.response;
            })();
        }

        //WORKLOGS

        getWorklogs(organizationId, projectId, activityId) {
            var _this19 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this19.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs"));
                console.log(data);
                return data.response;
            })();
        }

        getWorklogs(organizationId, projectId, activityId, worklogId) {
            var _this20 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this20.getData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId));
                console.log(data);
                return data.response;
            })();
        }

        createWorklog(organizationId, projectId, activityId, body) {
            var _this21 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this21.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities").concat(activityId).concat("/worklogs"), body);
                console.log(data);
                return data.response;
            })();
        }

        createWorklogForCurrentUser(organizationId, projectId, activityId, body) {
            var _this22 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this22.postData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities").concat(activityId).concat("/worklogs").concat("/currentuser"), body);
                console.log(data);
                return data.response;
            })();
        }

        updateWorklog(organizationId, projectId, activityId, worklogId, body) {
            var _this23 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this23.patchData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId), body);
                console.log(data);
                return data.response;
            })();
        }

        deleteWorklog(organizationId, projectId, activityId, worklogId) {
            var _this24 = this;

            return _asyncToGenerator(function* () {
                var data = yield _this24.deleteData("/organizations/".concat(organizationId).concat("/projects/").concat(projectId).concat("/activities/").concat(activityId).concat("/worklogs/").concat(worklogId));
                console.log(data);
                return data.response;
            })();
        }

        /**
         * Following methods are used for management and HR only calls.
         */

        /**
         * Following methods are used to request reports.
         */

        /**
         * Following methods are supporting methods for different http request types.
         */

        postData(location, body) {
            return this.http.createRequest(location).asPost().withHeader("content-type", "application/json").withContent(body).send();
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
                var response = yield _this.api.getUsers();
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
define('text!styles.css', ['module'], function(module) { module.exports = "body { \r\n    padding-top: 3.5%; \r\n    }\r\n\r\nsection {\r\n  margin: 0 20px;\r\n}\r\n\r\na:focus {\r\n  outline: none;\r\n}\r\n\r\n.navbar {\r\n    height: 4%;\r\n    position: fixed!important;\r\n}\r\n\r\n.navbar-brand{\r\n    padding:0;\r\n}\r\n\r\n.no-selection {\r\n  margin: 20px;\r\n}\r\n\r\n.contact-list {\r\n  overflow-y: auto;\r\n  border: 1px solid #ddd;\r\n  padding: 10px;\r\n}\r\n\r\n.panel {\r\n  margin: 20px;\r\n}\r\n\r\n.button-bar {\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  border-top: 1px solid #ddd;\r\n  background: white;\r\n}\r\n\r\n.button-bar > button {\r\n  float: right;\r\n  margin: 20px;\r\n}\r\n\r\nli.list-group-item {\r\n  list-style: none;\r\n}\r\n\r\nli.list-group-item > a {\r\n  text-decoration: none;\r\n}\r\n\r\nli.list-group-item.active > a {\r\n  color: white;\r\n}\r\n\r\n.main-view{\r\n    height:88%;\r\n    width: 80%;\r\n    margin-top: 1%;\r\n    padding: 10px;\r\n    position: fixed!important;\r\n    border: thin solid lightgrey;\r\n}\r\n\r\n.sidebar{\r\n    height: 100%;\r\n    z-index:1;\r\n    position: fixed!important;\r\n    padding-top: 3%;\r\n    overflow:auto;\r\n    border-right: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n}\r\n\r\n.sidebar ul{\r\n  padding: 0;\r\n}\r\n\r\n.sidebar li{\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar-item{\r\n    color: gray;\r\n    font-size: 1.5em;\r\n    font-style: bold;\r\n}\r\n\r\n.sidebar li ul li:first-child{\r\n    list-style: none;\r\n    border-top: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li{\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li:last-child{\r\n    list-style: none;\r\n    width: auto;\r\n}\r\n\r\n.sidebar-subItem{\r\n    padding-left: 10%;\r\n    color: gray;\r\n    font-size: 1em;\r\n    font-style: bold;\r\n}\r\n\r\n.col-md-2{\r\n    margin-right: 1%;\r\n}\r\n.base-shadow{\r\n    box-shadow: 0 3px 10px 2px lightgrey;\r\n}\r\n\r\n.center{\r\n    text-align: center;\r\n}\r\n\r\n.center-div{\r\n    margin: 0 auto;\r\n    float: none;\r\n}\r\n\r\n.header-logo{\r\n    height: 100%;\r\n    width: auto;\r\n    float: left;\r\n}\r\n\r\n.form-width{\r\n    width: 70%;\r\n    margin-left: 15%;\r\n    margin-right: 15%;\r\n}\r\n\r\n.form-height{\r\n    height: 80%;\r\n    margin-top: 10%;\r\n    margin-bottom: 10%;\r\n}"; });
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