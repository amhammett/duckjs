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
var html_content ='';

if(typeof $ != 'undefined') {
  $(function() {
    get_requestor_page_vars();
  });
} else {
  console.log('jQuery is undefined so duck.js is going for a swim');
}

function get_requestor_page_vars() {
  var page_name_param="";
  if (typeof s_pageName != 'undefined') {s_pageName="sample";}
  page_name_param = "?pagename="+s_pageName;

  get_field_set_and_update_page(page_name_param);

}

function get_field_set_and_update_page(param) {
    var json_field_url = "data/fields.json"+param;
    
    $.getJSON(json_field_url, null, function(data) {
      //console.log("success");
      //console.log('len: '+data.nodes.length);
      var field_param_set="?";
      
      for(var i=0;i<data.nodes.length;i++) {
        var field_set=data.nodes[i].node.field_cond_id_value;
        if($(field_set).length !== 0) {
          field_param_set+=field_set+'='+$(field_set).val()+'&';
        }
      }
      
      field_param_set=(field_param_set=="?"?"":field_param_set.slice(0, -1));
      
      //todo: add sample form to page. else this is empty
      //console.log(field_param_set);
      
      var json_content_url="data/content.json"+field_param_set;
      $.getJSON(json_content_url, null, function(data) {
        var html_content="";  
        for(var i=0;i<data.nodes.length;i++) {
          html_content+="<div id=\""+s_pageName+'-'+'promo-'+i+"\" class=\"promo\">"+data.nodes[i].node.Body+"</div>";
        }
        update_content(html_content);
      });
    });
}

function update_content(html_content) {
  // hide/show unneccessary but may help with slow browsers
  if($(promo_content_id).length !== 0) {
    $(promo_content_id).hide().html(html_content).show();
  } else {
    console.log('tried to find \'' +promo_content_id+ '\' but was missing');
  }
}