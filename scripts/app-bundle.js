define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  class App {
    configureRouter(config, router) {
      this.router = router;
      config.title = '';
      config.map([{ route: '', moduleId: 'timesheet', title: 'Timesheet', name: 'timesheet', nav: true }, { route: 'rapporten', moduleId: 'rapporten', name: 'rapporten', nav: true }, { route: 'consultants', moduleId: 'consultants/lijst', name: 'consultants', nav: true }, { route: 'consultants/aanmaken', moduleId: 'consultants/aanmaak-detail', name: 'maakConsultant' }, { route: 'consultants/:id', moduleId: 'consultants/beheer-detail', name: 'consultantDetail' }, { route: 'projecten', moduleId: 'projecten/lijst', name: 'projecten', nav: true }, { route: 'projecten/aanmaken', moduleId: 'projecten/detail', name: 'maakProject' }, { route: 'projecten/:id', moduleId: 'projecten/detail', name: 'projectDetail' }, { route: 'activiteiten', moduleId: 'activiteiten/lijst', name: 'activiteiten', nav: true }, { route: 'activiteiten/aanmaken', moduleId: 'activiteiten/detail', name: 'maakActiviteit' }, { route: 'activiteiten/:id', moduleId: 'activiteiten/detail', name: 'activiteitDetail' }, { route: 'organisaties', moduleId: 'organisaties/lijst', name: 'organisaties', nav: true }, { route: 'organisaties/aanmaken', moduleId: 'organisaties/detail', name: 'maakOrganisatie' }, { route: 'organisaties/:id', moduleId: 'organisaties/detail', name: 'organisatieDetail' }]);

      config.mapUnknownRoutes('notfound');
    }
  }
  exports.App = App;
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
define('log',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Log {

        constructor(minutes, logDate) {
            this.minutes = minutes;
            this.logDate = logDate;
        }
    }
    exports.default = Log;
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

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
    class MenuItem {

        constructor(value, route) {
            this.value = value;
            this.route = route;
        }
    }
    exports.default = MenuItem;
});
define('notfound',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class NotFound {
        constructor() {
            this.title = 'Error';
            this.reportTypes;
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Error');
        }
    }
    exports.NotFound = NotFound;
});
define('rapporten',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Report {
        constructor() {
            this.title = 'Reports';
            this.reportTypes;
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Reports');
            this.reportTypes = ['Report 1', 'Report 2', 'Report 3'];
        }
    }
    exports.Report = Report;
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

    class Sidebar {

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
    }
    exports.Sidebar = Sidebar;
});
define('timesheet',['exports', './log', 'bootstrap'], function (exports, _log) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Home = undefined;

    var _log2 = _interopRequireDefault(_log);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    class Home {

        constructor() {
            this.title = 'Home';
            this.minutes = 0;
            this.hours = 0;
            this.logDate = new Date().toISOString().slice(0, 10);
            this.Logs = [];
            this.Update = false;
        }
        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Log tijden');
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
    }
    exports.Home = Home;
});
define('activiteiten/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Lijst {
        constructor() {
            this.title = 'Activiteiten';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Activiteiten');
        }
    }
    exports.Lijst = Lijst;
});
define('consultants/aanmaak-detail',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class AanmaakDetail {
        constructor() {
            this.title = 'Consultant Aanmaken';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Consultant Aanmaken');
        }
    }
    exports.AanmaakDetail = AanmaakDetail;
});
define('consultants/beheer-detail',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class BeheerkDetail {
        constructor() {
            this.title = 'Consultant Beherem';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Consultant Beheren');
        }
    }
    exports.BeheerkDetail = BeheerkDetail;
});
define('consultants/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Lijst {
        constructor() {
            this.title = 'Consultants';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Consultants');
        }
    }
    exports.Lijst = Lijst;
});
define('organisaties/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Lijst {
        constructor() {
            this.title = 'Organisaties';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Organisaties');
        }
    }
    exports.Lijst = Lijst;
});
define('projecten/lijst',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    class Lijst {
        constructor() {
            this.title = 'Projecten';
        }

        activate(params, routeConfig) {
            this.routeConfig = routeConfig;
            this.routeConfig.navModel.setTitle('Projecten');
        }
    }
    exports.Lijst = Lijst;
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
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><require from=\"./sidebar\"></require><nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\"><div class=\"navbar-header\"><a class=\"navbar-brand\" href=\"#\"><img class=\"header-logo\" src=\"src/logo/Canguru-Logo.png\" alt=\"logo\"> <i class=\"fa fa-user\"></i></a></div></nav><div><div class=\"row\"><sidebar class=\"col-md-2\"></sidebar><router-view class=\"col-md-8\"></router-view></div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body { \r\n    padding-top: 3.5%; \r\n    }\r\n\r\nsection {\r\n  margin: 0 20px;\r\n}\r\n\r\na:focus {\r\n  outline: none;\r\n}\r\n\r\n.navbar {\r\n    height: 4%;\r\n    position: fixed!important;\r\n}\r\n\r\n.navbar-brand{\r\n    padding:0;\r\n}\r\n\r\n.no-selection {\r\n  margin: 20px;\r\n}\r\n\r\n.contact-list {\r\n  overflow-y: auto;\r\n  border: 1px solid #ddd;\r\n  padding: 10px;\r\n}\r\n\r\n.panel {\r\n  margin: 20px;\r\n}\r\n\r\n.button-bar {\r\n  right: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  border-top: 1px solid #ddd;\r\n  background: white;\r\n}\r\n\r\n.button-bar > button {\r\n  float: right;\r\n  margin: 20px;\r\n}\r\n\r\nli.list-group-item {\r\n  list-style: none;\r\n}\r\n\r\nli.list-group-item > a {\r\n  text-decoration: none;\r\n}\r\n\r\nli.list-group-item.active > a {\r\n  color: white;\r\n}\r\n\r\n.main-view{\r\n    height:88%;\r\n    width: 80%;\r\n    margin-top: 1%;\r\n    padding: 10px;\r\n    position: fixed!important;\r\n    border: thin solid lightgrey;\r\n}\r\n\r\n.sidebar{\r\n    height: 100%;\r\n    z-index:1;\r\n    position: fixed!important;\r\n    padding-top: 3%;\r\n    overflow:auto;\r\n    border-right: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n}\r\n\r\n.sidebar ul{\r\n  padding: 0;\r\n}\r\n\r\n.sidebar li{\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar-item{\r\n    color: gray;\r\n    font-size: 1.5em;\r\n    font-style: bold;\r\n}\r\n\r\n.sidebar li ul li:first-child{\r\n    list-style: none;\r\n    border-top: thin solid lightgrey;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li{\r\n    list-style: none;\r\n    border-bottom: thin solid lightgrey;\r\n    width: auto;\r\n}\r\n\r\n.sidebar li ul li:last-child{\r\n    list-style: none;\r\n    width: auto;\r\n}\r\n\r\n.sidebar-subItem{\r\n    padding-left: 10%;\r\n    color: gray;\r\n    font-size: 1em;\r\n    font-style: bold;\r\n}\r\n\r\n.col-md-2{\r\n    margin-right: 1%;\r\n}\r\n.base-shadow{\r\n    box-shadow: 0 3px 10px 2px lightgrey;\r\n}\r\n\r\n.center{\r\n    text-align: center;\r\n}\r\n\r\n.center-div{\r\n    margin: 0 auto;\r\n    float: none;\r\n}\r\n\r\n.header-logo{\r\n    height: 100%;\r\n    width: auto;\r\n    float: left;\r\n}\r\n\r\n.form-width{\r\n    width: 70%;\r\n    margin-left: 15%;\r\n    margin-right: 15%;\r\n}\r\n\r\n.form-height{\r\n    height: 80%;\r\n    margin-top: 10%;\r\n    margin-bottom: 10%;\r\n}"; });
define('text!notfound.html', ['module'], function(module) { module.exports = "<template><h1>404 suck it</h1></template>"; });
define('text!rapporten.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"rapporten\">Rapport</label><div class=\"col-sm-10\"><select id=\"rapporten\" class=\"form-control\"><option repeat.for=\"type of reportTypes\" value.bind=\"type\">${type}</option></select></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"begin\">Begin Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"begin\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-2 control-label\" for=\"eind\">Eind Datum</label><div class=\"col-sm-10\"><input type=\"date\" id=\"eind\" class=\"form-control\"></div></div><input type=\"submit\" value=\"Download\"></form></div></template>"; });
define('text!sidebar.html', ['module'], function(module) { module.exports = "<template><div class=\"sidebar col-md-2 base-shadow\"><ul><li repeat.for=\"item of items\" class=\"${item.isActive ? 'active' : ''}\"><a class=\"sidebar-item\" route-href=\"route.bind: item.route\">${item.value}</a></li></ul></div></template>"; });
define('text!timesheet.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form form class=\"form-horizontal form-height center form-width\" submit.trigger=\"addLog()\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"hours\">Uren</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"hours\" min=\"0\" max=\"12\" step=\"1\"></div><label class=\"col-sm-offset-0 col-sm-2 control-label\" for=\"minutes\">Minuten</label><div class=\"col-sm-2\"><input id=\"minutes\" type=\"number\" class=\"form-control\" value.bind=\"minutes\" min=\"0\" max=\"59\" step=\"5\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"datum\">Datum</label><div class=\"col-sm-6\"><input type=\"date\" id=\"datum\" class=\"form-control\" value.two-way=\"logDate\"></div></div><div class=\"form-group\"><div class=\"col-sm-offset-4 col-sm-8\"><button type=\"submit\" class=\"col-sm-4\" id=\"submitBtn\">Opslaan</button></div></div><div class=\"form-group\"><table class=\"table table-striped\"><thead><tr><th>Datum</th><th>Tijd gelogd</th></tr></thead><tr repeat.for=\"Log of Logs\"><td innerhtml.bind=\"$parent.Logs[$index].logDate\"></td><td innerhtml.bind=\"minuteString($index)\"></td><td><button type=\"button\" class=\"button edit-log\" click.delegate=\"editLog($index)\">Aanpassen</button></td><td><button type=\"button\" class=\"button delete-log\" click.delegate=\"deleteLog($index)\">Verwijderen</button></td></tr></table></div></form></div></template>"; });
define('text!activiteiten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!consultants/aanmaak-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/beheer-detail.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form class=\"form-horizontal form-height center form-width\"><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"email\">E-mail</label><div class=\"col-sm-6\"><input type=\"text\" id=\"email\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"voornaam\">Voornaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"voornaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"familienaam\">Familienaam</label><div class=\"col-sm-6\"><input type=\"text\" id=\"familienaam\" class=\"form-control\"></div></div><div class=\"form-group\"><label class=\"col-sm-offset-2 col-sm-2 control-label\" for=\"rol\">Rol</label><div class=\"col-sm-6\"><select id=\"rol\"><option>-Selecteer een rol-</option></select></div></div><div class=\"form-group\"><input type=\"submit\" value=\"Opslaan\"></div></form></div></template>"; });
define('text!consultants/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2><form><a route-href=\"route: maakConsultant\">consultant</a></form></div></template>"; });
define('text!projecten/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
define('text!organisaties/lijst.html', ['module'], function(module) { module.exports = "<template><div class=\"main-view base-shadow\"><h2 class=\"center\">${title}</h2></div></template>"; });
//# sourceMappingURL=app-bundle.js.map