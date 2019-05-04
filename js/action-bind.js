$(function() {
    // head bar event
    $('#headtitle,#logo').click(function() {
        resetdb()
        remove_all_cache()
    })

    // bottom bar btn event
    $('#chatbtn').click(function() {
        if (!$('#chatbtn').hasClass('active')) {
            hide_leftbtn()
            need_right_function('plus-square-o', function() {
                if (addfuncpanel.hasClass('hidepanel')) {
                    show_panel_2(addfuncpanel)
                } else {
                    hide_panel_2(addfuncpanel)
                }
            })
            get_subpanel_up(chatsubpanel)
        }
    })
    $('#contextbtn').click(function() {
        if (!$('#contextbtn').hasClass('active')) {
            hide_leftbtn()
            hide_rightbtn()
            get_subpanel_up(groupsubpanel)
        }
    })
    $('#mebtn').click(function() {
        if (!$('#mebtn').hasClass('active')) {
            hide_leftbtn()
            hide_rightbtn()
            get_subpanel_up(mesubpanel)
        }
    })
    $('.bottombarbtnlogo').click(function() {
        // should bind it after
        active_bottom_bar_btn($(this))
        return
    })


    // login panel event
    formValidHandle($('#loginform'))
    formSubmitEventBind('#loginform', function(arr) {
        let rs = log_in($('#username')[0].value, $('#password')[0].value)
        if (rs >= 0) {
            localStorage.setItem('loginid', rs)
            loginid = rs
            popmsg('登陆成功', 500)
            disable_login_form()
            disable_signin_form()
            setTimeout(() => {
                just_login()
            }, 1000);
        } else if (rs === -1) {
            popmsg('密码错误')
        } else if (rs === -2) {
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
            popmsg('注册成功', 500)
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

    // infoupd form event
    formValidHandle($('#infoupdsubpanel'))
    formSubmitEventBind('#infoupdsubpanel', function(arr) {
        update(loginid, arr[0].value, arr[1].value, arr[2].value, arr[3].value)
        reflesh_user_info()
        setTimeout(() => {
            get_infosubpanel_up(infosubpanel)
        }, 1000);
    })

    // chat list event
    $('.chatlistfunbtn').click(function() {
        remove_chat_item(this)
    })

    // * click
    $('*').click(function() {
        if (this.id === 'headrightbtn' ||
            this.id === 'adduserbtn' ||
            this.id === 'addgroup' ||
            this.id === 'addtodo' ||
            this.id === 'addidea') {
            return false
        }
        if (!$('#addfuncpanel').hasClass('hidepanel')) {
            hide_panel_2(addfuncpanel)
        }
    })

    // send box
    $('#chatsend').click(function() {
        let msg = $('#chattext').val()
        $('#chattext').val('')
        send_chat(nowchatwith, nowchatid, msg)
        present_you_just_send(nowchatwith, msg)
        $('[chatwith = "' + nowchatwith + '"][chatid = "' + nowchatid + '"]')
            .find('.chatlistitembody')
            .find('span').text(msg)
    })

    // chat list item drag event
    // $('.chatlistitem').mousedown(function(e) {
    //     if (event.button == 0) {
    //         let obj = $(this)
    //         if (obj.attr('cx') === undefined) {
    //             obj.attr('cx', e.clientX)
    //         }
    //     }
    //     return false;
    // })
    // $('.chatlistitem').mouseup(function(e) {
    //     if (event.button == 0) {
    //         let obj = $(this)
    //         if (obj.attr('cx') !== undefined) {
    //             if (e.clientX - obj.attr('cx') < 0) {
    //                 $(this).find('.chatlistitemcontent').addClass('chatlistitemcontextmove')
    //             }
    //             obj.removeAttr('cx')
    //         }
    //     }
    //     return false;
    // })
})