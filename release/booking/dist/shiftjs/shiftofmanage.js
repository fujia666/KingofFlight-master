var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftManage = new function () {
    var shiftManage = this;
    var dbs;
    var appConfig;
    var wdata;
    shiftManage.setData = function (data, adbs, aappConfig) {
        var o = data;
        wdata = data;
        dbs = adbs;
        appConfig = aappConfig;
        var si = "<tr height=\"40px\" align=\"center\">\n                        <td width=\"15%\" class=\"title\">\u5458\u5DE5\u53F7</td>\n                        <td width=\"15%\">" + o[0].C3_526655169418 + "</td>\n                        <td width=\"15%\" class=\"title\">\u59D3\u540D</td>\n                        <td width=\"15%\">" + o[0].C3_526655177113 + "</td>\n                        <td width=\"15%\" class=\"title\">\u8EAB\u4EFD\u8BC1\u53F7</td><td width=\"25%\">" + o[0].C3_526655197108 + "</td>\n                      </tr>\n                      <tr height=\"40px\" align=\"center\">\n                        <td class=\"title\">\u62A4\u7167\u53F7</td>\n                        <td>" + o[0].C3_526655213359 + "</td>\n                        <td class=\"title\">\u62A4\u7167\u6709\u6548\u671F</td>\n                        <td>" + o[0].C3_527948550902 + "</td>\n                        <td colspan=\"2\"></td>\n                      </tr>";
        $("#si").html(si);
        for (var i = 0; i < o.length; i++) {
            var list = "<tr height=\"30px\">\n                          <td class=\"head\" width=\"15%\">\u51FA\u5DEE\u5355\u636E\u53F7</td>\n                          <td colspan=\"3\">" + o[i].C3_526655624603 + "</td>\n                          <td align=\"center\">\u662F\u5426\u5F80\u8FD4:" + o[i].C3_526655466969 + "</td>\n                          <td align=\"center\">\u662F\u5426\u63D0\u4EA4:" + o[i].C3_526655608924 + "</td>\n                          <td rowspan=\"3\" width=\"5%\" align=\"center\">\n                            <a class=\"mini-button\" iconCls=\"icon-edit\" onclick=\"KingofAttendances.ShiftManage.editClick(" + o[i].REC_ID + ")\">\u7F16\u8F91</a>\n                            <a class=\"mini-button\" iconCls=\"icon-remove\" onclick=\"KingofAttendances.ShiftManage.revokeClick(" + o[i].REC_ID + ")\">\u64A4\u9500</a>\n                          </td>\n                        </tr>\n                        <tr height=\"40px\" align=\"center\">\n                          <td width=\"10%\" class=\"title\">\u51FA\u53D1\u65E5\u671F</td>\n                          <td width=\"10%\">" + o[i].C3_527948208338 + "</td>\n                          <td width=\"10%\" class=\"title\">\u51FA\u53D1\u5730</td>\n                          <td width=\"10%\">" + o[i].C3_526655262089 + "</td>\n                          <td rowspan=\"2\" width=\"15%\"><img src=\"" + o[i].C3_527873192635 + "\" style=\"width:100px\"/><p>\u62A4\u7167\u626B\u63CF\u4EF6</p></td>\n                          <td rowspan=\"2\" width=\"15%\"><img src=\"" + o[i].C3_526655353950 + "\" style=\"width:100px\"/><p>\u7B7E\u8BC1\u626B\u63CF\u4EF6</p></td>\n                        </tr>\n                        <tr height=\"40px\" align=\"center\">\n                          <td class=\"title\">\u8FD4\u56DE\u65E5\u671F</td><td>" + o[i].C3_527948869929 + "</td>\n                          <td class=\"title\">\u8FD4\u56DE\u5730</td><td>" + o[i].C3_526655271756 + "</td>\n                        </tr>";
            $("#tbManage tbody").append(list);
        }
    };
    shiftManage.addClick = function () {
        var win = mini.open({
            url: '../dist/component/setdata.html',
            showModal: false,
            width: 600,
            height: 550,
            onload: function () {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.Setdbs(dbs, appConfig);
            },
            ondestroy: function (action) {
                parent.location.reload();
            }
        });
    };
    shiftManage.editClick = function (REC_ID) {
        var win = mini.open({
            url: '../dist/component/editdata.html',
            showModal: false,
            width: 600,
            height: 550,
            onload: function () {
                var iframe = this.getIFrameEl();
                iframe.contentWindow.Setdbs(dbs, appConfig, REC_ID);
            },
            ondestroy: function (action) {
                parent.location.reload();
            }
        });
    };
    shiftManage.revokeClick = function (REC_ID) {
        mini.parse();
        var form = new mini.Form("form1");
        var o = new mini.Form("form1").getData();
        form.validate();
        if (form.isValid() == false)
            return;
        o._id = 1;
        o._state = "modified";
        o.REC_ID = REC_ID;
        o.C3_527965048090 = "Y";
        var json = mini.encode([o]);
        console.log(json);
        dbs.dbSavedata(appConfig.booking.guojiResid, 0, json, dataSaved, fnerror, fnhttperror);
        function dataSaved(text) {
            alert("申请成功");
        }
        function fnerror(text) {
            alert("申请失败");
        }
        function fnhttperror(jqXHR, textStatus, errorThrown) {
            alert("error");
        }
        parent.location.reload();
    };
};
