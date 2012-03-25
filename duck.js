/* dynamically updated content kit js 

called from static page
<script type="text/javascript" src="duck.js"></script>

page expected to have:
- s_pagename/s.pagename set
<div id="duckjs_promo"></div>

duckjs_promo used to append dynamic content

*/

var promo_content_id = '#duckjs_promo';
var s_pageName = '';

if(typeof $ != 'undefined') {
  $(function() {
    get_requestor_page_vars();
  });
} else {
  console.log('jQuery is undefined so duck.js is going for a swim');
}

function get_requestor_page_vars() {
  var page_name_param="";
  s_pageName=set_if_undefined(s_pageName,"sample");
  page_name_param = "?pagename="+s_pageName;

  get_field_set_and_update_page(page_name_param);
}

function get_field_set_and_update_page(param) {
    var json_field_url = "data/fields.json"+param;
    
    $.getJSON(json_field_url, null, function(data) {
      //console.log("success");
      var json_content_data={};

      for(var i=0;i<data.nodes.length;i++) {
        var field_set=data.nodes[i].node.field_cond_id_value;
        var field_set_value="";
        if($(field_set).length !== 0) {
          switch($(field_set).get(0).tagName) {
            case "INPUT":
              if ($(field_set).attr('type') == "radio") {
                field_set_value=$(field_set+':checked').val();
              } else {
                field_set_value=$(field_set).val();   
              }
              break;
            case "SELECT":
              field_set_value=$(field_set+':selected').val();
              break;
          }
        }
        
        field_set_value=set_if_undefined(field_set_value,"null");
        //console.log(field_set+':'+field_set_value);
        json_content_data[field_set]=field_set_value;
      }
      
      var json_content_url="data/content.json";

      $.getJSON(json_content_url, json_content_data, function(data) {
        var html_content="";  
        for(var i=0;i<data.nodes.length;i++) {
          html_content+="<div id=\""+s_pageName+'-'+'promo-'+i+"\" class=\"promo\">"+data.nodes[i].node.Body+"</div>";
        }
        update_content(html_content);
      });
    });
}

function set_if_undefined(value,replacement) {
  if (typeof value == 'undefined') {
    value=replacement;
  }
  return value;
}

function update_content(html_content) {
  // hide/show unneccessary but may help with slow browsers
  if($(promo_content_id).length !== 0) {
    $(promo_content_id).hide().html(html_content).show();
  } else {
    console.log('tried to find \'' +promo_content_id+ '\' but was missing');
  }
}