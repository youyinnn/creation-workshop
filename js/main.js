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

// chat action
function hide_buttom_bar() {
    bottombar.css('bottom', '-11%')
}

function show_buttom_bar() {
    bottombar.css('bottom', '0')
}

function hide_chat_box() {
    chatbox.css('bottom', '-9%')
    show_buttom_bar()
}

function show_chat_box() {
    chatbox.css('bottom', '0')
    hide_buttom_bar()
}

function show_chat_log_box() {
    chatlogbox.css('right', '0')
    chatlogbox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    show_chat_box()
    need_left_function('angle-left', hide_chat_log_box)
    hide_rightbtn()
    $('#chatbtn').removeClass('active')
}

function hide_chat_log_box() {
    chatlogbox.css('right', '-100%')
    chatlogbox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    hide_chat_box()
    $('#chatbtn').click()
    reset_head_title()
}

function reset_head_btn_status() {
    if (lefthbtnshow) {
        need_left_function(leftbtnlogo, lefthbtnfunc)
    }
    if (righthbtnshow) {
        need_right_function(rightbtnlogo, righthbtnfunc)
    }
}

// context info
function show_friend_info_box() {
    friendinfobox.css('right', '0')
    friendinfobox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    need_left_function('angle-left', hide_friend_info_box)
    hide_rightbtn()
}

function hide_friend_info_box() {
    friendinfobox.css('right', '-100%')
    friendinfobox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    hide_leftbtn()
}

function show_group_info_box() {
    groupinfobox.css('right', '0')
    groupinfobox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    need_left_function('angle-left', hide_group_info_box)
    hide_rightbtn()
}

function hide_group_info_box() {
    groupinfobox.css('right', '-100%')
    groupinfobox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    hide_leftbtn()
}

// todo & idea
function show_todo_box() {
    todobox.css('right', '0')
    todobox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    need_left_function('angle-left', hide_todo_box)
    need_right_function('plus-square-o', hide_todo_box)
}

function hide_todo_box() {
    todobox.css('right', '-100%')
    todobox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    hide_leftbtn()
    hide_rightbtn()
}

function show_idea_box() {
    ideabox.css('right', '0')
    ideabox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    need_left_function('angle-left', hide_idea_box)
    need_right_function('plus-square-o', hide_idea_box)
}

function hide_idea_box() {
    ideabox.css('right', '-100%')
    ideabox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    hide_leftbtn()
    hide_rightbtn()
}

// login
function show_login_form() {
    $('#loginbox').css('overflow', 'visible')
    adclass($('#loginbox')[0], 'loginformshow')
    setTimeout(() => {
        $('#loginform').css('opacity', '1')
    }, 300)
    enable_login_form()
    enable_signin_form()
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
    present_context()
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
        leftbtnlogo = logo
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
        rightbtnlogo = logo
        show_rightbtn()
        i.click(func)
    }, 200);
}

function change_head_title(newtitle) {
    if (headtitle.text() !== newtitle) {
        headtitle.animateCss('fadeIn')
        headtitle.text(newtitle)
    }
}

function reset_head_title() {
    change_head_title('创意工坊')
}

// chat panel function
function get_chat_log_up(title, cw, ci) {
    change_head_title(title)
    let g = get_chat_log_from_db(cw, ci)
    show_chat_log_box()
    present_chat_logs(g.log.msglog, cw)
}

function get_chat_log_from_db(cw, ci) {
    if (ci === loginid) {
        return undefined
    }
    let c = JSON.parse(localget('chatlogdb')).data
    if (c === undefined || c === null) {
        return null
    }
    let ii = -1
    let f = c.find(function(v, i) {
        if (cw + '' === 'u' && v.chatwith + '' === 'u') {
            if ((v.aid + '' === loginid + '' && v.bid + '' === ci + '') ||
                (v.bid + '' === loginid + '' && v.aid + '' === ci + '')) {
                ii = i
                return true
            }
        } else if (cw + '' === 'g' && v.chatwith + '' === 'g') {
            if (v.gid + '' === ci + '') {
                ii = i
                return true
            }
        }
    })
    return {index: ii, log: f}
}

function remove_chat_item(ts) {
    let p = $(ts).parent()
    let chatid = p.attr('chatid')
    let chatwith = p.attr('chatwith')
    let chatitem = $('[chatid = "' + chatid + '"][chatwith = "' + chatwith + '"]')[0]
    chatitem = $(chatitem)
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
    popmsg('登出成功', 500)
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

// login form
function disable_login_form() {
    $('#loginform').children().attr('disabled', true)
    $('#loginform').children().children().attr('disabled', true)
}

function enable_login_form() {
    $('#loginform').children().removeAttr('disabled')
    $('#loginform').children().children().removeAttr('disabled')
}

// sigin form
function disable_signin_form() {
    $('#signinform').children().attr('disabled', true)
    $('#signinform').children().children().attr('disabled', true)
}

function enable_signin_form() {
    $('#signinform').children().removeAttr('disabled')
    $('#signinform').children().children().removeAttr('disabled')
}
