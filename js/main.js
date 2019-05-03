// panel control function
function get_panel_up(panel) {
    if (nowpanel !== panel) {
        if (nowpanel.outfunc !== undefined) {
            nowpanel.outfunc()
        }
        hide_panel(nowpanel)
        show_panel(panel)
        nowpanel = panel
    }
}

function get_subpanel_up(subpanel) {
    if (nowsubpanel !== subpanel) {
        if (nowsubpanel.outfunc !== undefined) {
            nowsubpanel.outfunc()
        }
        hide_panel(nowsubpanel)
        show_panel(subpanel)
        nowsubpanel = subpanel
    }
}

function get_infosubpanel_up(infosubpanel) {
    if (nowinfosubpanel !== infosubpanel) {
        hide_panel(nowinfosubpanel)
        show_panel(infosubpanel)
        nowinfosubpanel = infosubpanel
    }
}

function hide_panel(panel) {
    adclass(panel[0], 'hidepanel')
}

function show_panel(panel) {
    rmclass(panel[0], 'hidepanel')
}

function show_panel_2(panel) {
    panel.css('opacity', 1)
    rmclass(panel[0], 'hidepanel')
}

function hide_panel_2(panel) {
    panel.css('opacity', 0)
    setTimeout(() => {
        adclass(panel[0], 'hidepanel')
    }, 500);
}

function show_login_form() {
    $('#loginbox').css('overflow', 'visible')
    adclass($('#loginbox')[0], 'loginformshow')
    setTimeout(() => {
        $('#loginform').css('opacity', '1')
    }, 300);
}

function hide_login_form() {
    rmclass($('#loginbox')[0], 'loginformshow')
    $('#loginform').css('opacity', '0')
}

function just_login() {
    get_panel_up(mainpanel)
    get_subpanel_up(chatsubpanel)

    $('#chatbtn').click()

    reflesh_user_info()
    fetch_chat_list()
}

function reflesh_user_info() {
    let user = sch('userdb', loginid)
    $('#infousername').val(user.username)
    $('#infonickname').val(user.nickname)
    $('#infoemail').val(user.email)
    $('#infointro').val(user.intro)

    $('#newinfonickname').val(user.nickname)
    $('#newinfopassword').val(user.password)
    $('#newinfoemail').val(user.email)
    $('#newinfointro').val(user.intro)

    formVreset('#infoupdsubpanel')
}

// bottom bar function
function active_bottom_bar_btn(btn) {
    if (btn !== nowactivebtn) {
        inactive_bottom_bar_btn(nowactivebtn)
    }
    adclass(btn[0], 'active')
    nowactivebtn = btn
}

function inactive_bottom_bar_btn(btn) {
    rmclass(btn[0], 'active')
}

// head bar function
function show_leftbtn() {
    adclass(leftbtn[0], 'showleftbtn')
}

function hide_leftbtn() {
    rmclass(leftbtn[0], 'showleftbtn')
}

function need_left_function(logo, func) {
    hide_leftbtn()
    setTimeout(() => {
        let i = $(leftbtn).find('i')
        i.removeClass()
        i.unbind('click')
        i.addClass('functionbtn fa fa-2x ' + 'fa-' + logo)
        show_leftbtn()
        i.click(func)
    }, 200);
}

function show_rightbtn() {
    adclass(rightbtn[0], 'showrightbtn')
}

function hide_rightbtn() {
    rmclass(rightbtn[0], 'showrightbtn')
}

function need_right_function(logo, func) {
    hide_rightbtn()
    setTimeout(() => {
        let i = $(rightbtn).find('i')
        i.removeClass()
        i.unbind('click')
        i.addClass('functionbtn fa fa-2x ' + 'fa-' + logo)
        show_rightbtn()
        i.click(func)
    }, 200);
}

function change_head_title(newtitle) {
    headtitle.animateCss('fadeIn')
    headtitle.text(newtitle)
}

// chat panel function
function offset_item(item) {

}

function remove_chat_item(ts) {
    let p = $(ts).parent()
    let chatid = p.attr('chatid')
    let chatwith = p.attr('chatwith')
    let chatitem = $('[chatid = "' + chatid + '"][chatwith = "' + chatwith + '"]')
    chatitem.css('height', 0)
    chatitem.css('border-bottom-width', 0)
    setTimeout(() => {
        p.remove()
        cache_chat_list()
    }, 400);
}

function fetch_chat_list() {
    $('#chatsubpanel').children().remove()
    let logs = sch('chatlogdb')
    for (let i = 0; i < logs.data.length; i++) {
        let log = logs.data[i]
        if (log.chatwith === 'u') {
            let ci
            if (log.aid + "" === loginid + "") {
                ci = log.bid
            } else if (log.bid + "" === loginid + "") {
                ci = log.aid
            } else {
                continue
            }
            if (find_in_chat_list_cache('u', ci)) {
                chat_list_item(log)
            }
        } else {
            if (is_member(loginid, log.gid) && find_in_chat_list_cache('g', log.gid)) {
                chat_list_item(log)
            }
        }
    }
}

// me panel function
function logout() {
    console.log(123)
    popmsg('登出戝功', 500)
    setTimeout(() => {
        localStorage.removeItem('loginid')
        login = null
        get_panel_up(loginpanel)
        show_login_form()
    }, 1000);
}

// cache function 

function remove_all_cache() {
    localremove('c' + loginid)
}

function cache_chat_list() {
    let c = new Array()
    $('.chatlistitem').each(function(a, b) {
        c.push({
            chatwith: $(b).attr('chatwith'),
            chatid: $(b).attr('chatid')
        })
    })
    localsave('c' + loginid, c)
}

function find_in_chat_list_cache(cw, ci) {
    let c = JSON.parse(localget('c' + loginid))
    if (c === undefined || c === null) {
        return true
    }
    let f = c.find(function(v, i) {
        if (v.chatwith + "" === cw + "" && v.chatid + "" === ci + "") {
            return true
        }
    })
    return f !== undefined
}