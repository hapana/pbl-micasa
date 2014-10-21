/**
 * Welcome to MiCasa
 *
 * Control your massive house from your little watch
 */

var UI = require('ui');

var apisrc="http://<vera_ip>:3480/";

function toggleStuff(devid, serviceid){
  var ajax = require('ajax');
  var statusurl = apisrc + "data_request?id=variableget&DeviceNum=" + devid + "&serviceId=" + serviceid + "&Variable=Status";
  ajax(
    {
    url: statusurl
    },
    function(data) {
      console.log('status response is ' + data);
      var action = data;
      if (action == "0"){
        action = "1";
      }else{
        action = "0";
      }
  
      console.log("Action is " + action);
      var toggleurl = apisrc + "data_request?id=action&output_format=xml&DeviceNum=" + devid + "&serviceId=" + serviceid + "&action=SetTarget&newTargetValue=" + action;
      ajax({url: toggleurl});
    },
    function(error) {
      console.log('The ajax request failed: ' + error);
    }
  );
  

}

var menu = new UI.Menu({
  sections: [{
    items: 
    [
      {
        title: 'Living Room Light'
      },
      {
        title: 'Dining Room Light'
      },
      {
        title: 'Bedroom TV'
      }
    ]
  }]
});
menu.on('select', function(e) {
  var devid="";
  var serviceid="";
  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
  
  switch(e.itemIndex) {
    case 0:
        devid="8";
        serviceid="urn:upnp-org:serviceId:SwitchPower1";
        toggleStuff(devid, serviceid);
        break;
    case 1:
        devid="5";
        serviceid="urn:upnp-org:serviceId:SwitchPower1";
        toggleStuff(devid, serviceid);
        break;
    case 2:
        devid="9";
        serviceid="urn:upnp-org:serviceId:SwitchPower1";
        toggleStuff(devid, serviceid);
        break;
  } 
});

menu.show();
