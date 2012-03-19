/* dynamically updated content kit js 

called from static page
<script type="text/javascript" src="duck.js"></script>

page expected to have:
- s_pagename/s.pagename set
<div id="duckjs_promo"></div>

duckjs_promo used to append dynamic content

*/

var promo_content_id = '#duckjs_promo';
var page_name = '';
var html_content ='';

if(typeof $ != 'undefined') {
  $(function() {
    get_requestor_page_vars();
    html_content=get_dynamic_content();
    update_content(html_content);
  });
} else {
  console.log('jQuery is undefined so duck.js is going back to sleep');
}

function get_requestor_page_vars() {
  if (typeof s_pageName != 'undefined') {
    page_name = s_pageName;
  }
}

function get_dynamic_content() {
  get_required_fields();
  send_requested_fields_and_get_content();
  return parse_dynamic_content();
  
}

// this is the first request to the server to find out what it needs to make a decision
function get_required_fields() {

}

// once we have the minimum data we send it back to the server and wait for content
function send_requested_fields_and_get_content() {

}

function parse_dynamic_content() {
  return '';
}

function make_json_request(url, param) {
  
}

function update_content(html_content) {
  // hide/show unneccessary but may help with slow browsers
  if($(promo_content_id).length != 0) {
    $(promo_content_id).hide().html(html_content).show();
  } else {
    console.log('tried to find \'' +promo_content_id+ '\' but was missing');
  }
}