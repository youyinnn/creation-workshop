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

mesubpanel.outfunc = function () {
    get_infosubpanel_up(infosubpanel)
    formVreset('#infoupdsubpanel')
}

// float panel
var addfuncpanel = $('#addfuncpanel')

// person info subpanel
var infosubpanel = $('#infosubpanel')
var infoupdsubpanel = $('#infoupdsubpanel')
var nowinfosubpanel = infosubpanel

// bottom bar btn
var chatbtn = $('#chatbtn')
var contextbtn = $('#contextbtn')
var mebtn = $('#mebtn')
var nowactivebtn = chatbtn
var bottombar = $('#bottombar')

// chat box
var chatbox = $('#chatbox')
var chatlogbox = $('#chatlogbox')


// head bar btn
var leftbtn = $('#headleftbtn')
var rightbtn = $('#headrightbtn')
var headtitle = $('#headtitle')
var headbar = $('#headbar')

// user login cache
var loginid = localStorage.getItem('loginid')

// chat flag
var nowchatwith
var nowchatid

$(function() {
    // animations
    bottombar.animateCss('fadeIn')
    headtitle.animateCss('fadeIn')

    if (loginid === null) {
        setTimeout(() => {
            show_login_form()
        }, 700);
    } else {
        disable_login_form()
        disable_signin_form()
        setTimeout(() => {
            just_login()
        }, 1500);
    }

})