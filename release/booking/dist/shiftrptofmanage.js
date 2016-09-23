var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var baseObjectM = (function () {
    function baseObjectM() {
    }
    return baseObjectM;
}());
var LineSupervisor = (function (_super) {
    __extends(LineSupervisor, _super);
    function LineSupervisor() {
        _super.apply(this, arguments);
    }
    return LineSupervisor;
}(baseObjectM));
var Manage = (function (_super) {
    __extends(Manage, _super);
    function Manage() {
        _super.apply(this, arguments);
    }
    return Manage;
}(baseObjectM));
var Shiftrptofmanage = (function (_super) {
    __extends(Shiftrptofmanage, _super);
    function Shiftrptofmanage(element) {
        _super.call(this, element);
    }
    Shiftrptofmanage.prototype.appendManage = function (parentelement, data, subdata, mini, dbs) {
        var aManage = new Manage();
        var panelid = "manager";
        var className = "mini-panel mini-panel-primary";
        aManage = data[0];
        var title = "机票预定信息";
        _super.prototype.appendPanel.call(this, parentelement, panelid, mini, className, title, appConfig.shifrpttofmanager.mainHtml, function (iFrame) {
            iFrame.contentWindow.KingofAttendances.ShiftManage.setData(data, dbs, appConfig);
        }, true, "");
    };
    return Shiftrptofmanage;
}(miniPanel));
function main() {
    $.getJSON("./dist/app.config.json", function (data, textStatus, hr) {
        appConfig = data;
        appConfig.appfunction = appfunctions;
        submain();
    });
}
function submain() {
    baseUrl = appConfig.app.baseUrl;
    getMethod = appConfig.app.getMethod;
    saveMethod = appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user = getQueryString('user');
    var dbs = new dbHelper(baseUrl, user, ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofmanage(el);
    var resid = appConfig.booking.guojiResid;
    var cmswhere = "";
    if (appConfig.app.debug)
        shiftPanel.start();
    var url;
    mini.parse();
    dbs.dbGetdata(resid, "", cmswhere, dataGot, fnerror, fnhttperror);
    function dataGot(data, subdata) {
        shiftPanel.appendManage(datagrids, data, subdata, mini, dbs);
    }
    function fnerror(data) {
        alert(data);
    }
    function fnhttperror(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
    }
}
;
