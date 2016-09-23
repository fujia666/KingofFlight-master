var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftManage=new function() {
    var shiftManage = this;
    var dbs;
    var appConfig;
    var wdata;
    shiftManage.setData=function(data,adbs,aappConfig){
      //debugger;
       var o = data;
       wdata=data;
       //console.log(data);
           dbs=adbs;
           appConfig=aappConfig;

              var si=`<tr height="40px" align="center">
                        <td width="15%" class="title">员工号</td>
                        <td width="15%">`+o[0].C3_526655169418+`</td>
                        <td width="15%" class="title">姓名</td>
                        <td width="15%">`+o[0].C3_526655177113+`</td>
                        <td width="15%" class="title">身份证号</td><td width="25%">`+o[0].C3_526655197108+`</td>
                      </tr>
                      <tr height="40px" align="center">
                        <td class="title">护照号</td>
                        <td>`+o[0].C3_526655213359+`</td>
                        <td class="title">护照有效期</td>
                        <td>`+o[0].C3_527948550902+`</td>
                        <td colspan="2"></td>
                      </tr>`
              $("#si").html(si);

            for(var i=0;i<o.length;i++){
              var list=`<tr height="30px">
                          <td class="head" width="15%">出差单据号</td>
                          <td colspan="3">`+o[i].C3_526655624603+`</td>
                          <td align="center">是否往返:`+o[i].C3_526655466969+`</td>
                          <td align="center">是否提交:`+o[i].C3_526655608924+`</td>
                          <td rowspan="3" width="5%" align="center">
                            <a class="mini-button" iconCls="icon-edit" onclick="KingofAttendances.ShiftManage.editClick(`+o[i].REC_ID+`)">编辑</a>
                            <a class="mini-button" iconCls="icon-remove" onclick="KingofAttendances.ShiftManage.revokeClick(`+o[i].REC_ID+`)">撤销</a>
                          </td>
                        </tr>
                        <tr height="40px" align="center">
                          <td width="10%" class="title">出发日期</td>
                          <td width="10%">`+o[i].C3_527948208338+`</td>
                          <td width="10%" class="title">出发地</td>
                          <td width="10%">`+o[i].C3_526655262089+`</td>
                          <td rowspan="2" width="15%"><img src="`+o[i].C3_527873192635+`" style="width:100px"/><p>护照扫描件</p></td>
                          <td rowspan="2" width="15%"><img src="`+o[i].C3_526655353950+`" style="width:100px"/><p>签证扫描件</p></td>
                        </tr>
                        <tr height="40px" align="center">
                          <td class="title">返回日期</td><td>`+o[i].C3_527948869929+`</td>
                          <td class="title">返回地</td><td>`+o[i].C3_526655271756+`</td>
                        </tr>`

              $("#tbManage tbody").append(list);
            }
    };

  shiftManage.addClick=function(){
      var win = mini.open({
            url: '../dist/component/setdata.html',
            showModal: false,
            width: 600,
            height: 550,
            onload: function () {       //弹出页面加载完成
                var iframe = this.getIFrameEl(); 
                iframe.contentWindow.Setdbs(dbs,appConfig);
            },
            ondestroy: function (action) {
               parent.location.reload();
            }
        });
  };
  shiftManage.editClick=function(REC_ID){
      var win = mini.open({
            
            url: '../dist/component/editdata.html',
            showModal: false,
            width: 600,
            height: 550,
            onload: function () {       //弹出页面加载完成
                var iframe = this.getIFrameEl(); 
                iframe.contentWindow.Setdbs(dbs,appConfig,REC_ID);
            },
            ondestroy: function (action) {
                 parent.location.reload();     
            }
        });
  };
         
          shiftManage.revokeClick=function(REC_ID){
                mini.parse();
                var form = new mini.Form("form1");
                var o =  new mini.Form("form1").getData();
                form.validate(); 
                if (form.isValid() == false) return;
                o._id=1;
                o._state="modified";
                o.REC_ID=REC_ID;
                o.C3_527965048090="Y";
                //o.REC_RESID=appConfig1.booking.guojiResid;
                var json = mini.encode([o]);
                console.log(json);
                
                dbs.dbSavedata(appConfig.booking.guojiResid,0,json,dataSaved,fnerror,fnhttperror);
                
                function dataSaved(text){
                    alert("申请成功");
                    //console.log(text);
                }
                function fnerror(text){
                    alert("申请失败");
                    //console.log(text);
                }
                function fnhttperror(jqXHR, textStatus, errorThrown){
                    alert("error");
                }
                parent.location.reload();
          }
}