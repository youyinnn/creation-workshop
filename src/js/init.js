// panel
var mainpanel = $('#mainpanel')
var loginpanel = $('#loginpanel')
var signinpanel = $('#signinpanel')
var nowpanel = loginpanel

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

$(function () {

    // animations
    botttombar.animateCss('fadeIn')
    headtitle.animateCss('fadeIn')
    
    // manually animations
    setTimeout(() => {
        show_rightbtn()
    }, 100);

    // active btns
    active_bottom_bar_btn (nowactivebtn)
    
})