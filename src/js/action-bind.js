$(function() {
    // bottom bar btn event
    $('.bottombarbtnlogo').click(function() {
        active_bottom_bar_btn($(this))
    })
    $('#chatbtn').click(function() {
        console.log('to chat')
    })
    $('#contextbtn').click(function() {
        console.log('to contect')
    })
    $('#mebtn').click(function() {
        console.log('to me')
    })


    // login panel event
    formValidHandle($('#loginform'))
    formSubmitEventBind('#loginform', function(arr) {
        let rs = login($('#username')[0].value, $('#password')[0].value)
        if (rs === 1) {
            popmsg('登陆成功')
            setTimeout(() => {
                get_panel_up(mainpanel)
            }, 1000);
        } else if (rs === 0) {
            popmsg('密码错误')
        } else if (rs === 2) {
            popmsg('用户不存在')
        }
        formVreset('#loginform')
    })
    $('#signinbtn').click(function() {
        get_panel_up(signinpanel)
        formVreset('#loginform')
    })


    // sigin panel event
    formValidHandle($('#signinform'))
    formSubmitEventBind('#signinform', function(arr) {
        let rs = sign_in(
            $('#newusername')[0].value,
            $('#email1')[0].value,
            $('#newpassword1')[0].value,
            $('#newpassword2')[0].value
        )
        if (rs === 1) {
            popmsg('注册成功')
            setTimeout(() => {
                get_panel_up(mainpanel)
            }, 1000);
        } else if (rs === 0) {
            popmsg('两次密码输入不一致')
        } else if (rs === 2) {
            popmsg('用户名已存在')
        }
        formVreset('#signinform')
    })
    $('#signinreturn').click(function() {
        get_panel_up(loginpanel)
        formVreset('#signinform')
    })

})