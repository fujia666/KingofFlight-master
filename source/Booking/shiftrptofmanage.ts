declare var mini: any;

declare  var baseUrl;
declare var getMethod;

declare var saveMethod;

class baseObjectM{
    REC_ID:string;
}
class LineSupervisor extends baseObjectM{

}
class Manage extends baseObjectM{

}
class Shiftrptofmanage extends miniPanel {
  
    constructor(element: HTMLElement) {
        super(element);
    }

    appendManage(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       var aManage=new Manage();
       var panelid="manager";
       var className="mini-panel mini-panel-primary";
     
       aManage=data[0];
 
       var title="机票预定信息";

        super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofmanager.mainHtml,
           function(iFrame){
                iFrame.contentWindow.KingofAttendances.ShiftManage.setData(data,dbs,appConfig);
            },true,"");
    }
}

function main(){
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){
         appConfig=data;
         appConfig.appfunction=appfunctions;
         submain();});
}
function submain() {
   
   
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofmanage(el);
  
   
    var resid=appConfig.booking.guojiResid;
    //var subresid=appConfig.shifrpttofmanager.subresid;
    var cmswhere="";
    if (appConfig.app.debug)
    // {cmswhere="C3_525699724860=392";}
    shiftPanel.start();
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,"",cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
       // console.log(data);
        shiftPanel.appendManage(datagrids,data,subdata,mini,dbs);
               
    }
    function fnerror(data){   
       // alert(1);
        alert(data);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){
       //alert(2);
       console.log(jqXHR);
      //  alert(jqXHR.responseText);
    }

};