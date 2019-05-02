// panel
var mainpanel = $('#mainpanel')
var loginpanel = $('#loginpanel')
var signinpanel = $('#signinpanel')
var nowpanel = loginpanel

// subpanel
var chatsubpanel = $('#chatsubpanel')
var groupsubpanel = $('#groupsubpanel')
var mesubpanel = $('#mesubpanel')
var nowsubpanel = chatsubpanel

// person info subpanel
var infosubpanel = $('#infosubpanel')
var infoupdsubpanel = $('#infoupdsubpanel')
var nowinfosubpanel = infosubpanel

// bottom bar btn
var chatbtn = $('#chatbtn')
var contextbtn = $('#contextbtn')
var mebtn = $('#mebtn')
var nowactivebtn = chatbtn
var botttombar = $('#botttombar')

// head bar btn
var leftbtn = $('#headleftbtn')
var rightbtn = $('#headrightbtn')
var headtitle = $('#headtitle')

// user login cache
var loginid = localStorage.getItem('loginid')

$(function() {
    // animations
    botttombar.animateCss('fadeIn')
    headtitle.animateCss('fadeIn')

    if (loginid === null) {
        setTimeout(() => {
            show_login_form()
        }, 700);
    } else {
        setTimeout(() => {
            just_login()
        }, 1500);
    }

})