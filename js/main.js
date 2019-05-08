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

function show_chat_log_box(panel) {
    chatlogbox.css('right', '0')
    chatlogbox.css('opacity', '1')
    chatlogbox.css('z-index', '2')
    nowsubpanel.css('opacity', '0')
    show_chat_box()
    show_head_btn_if_need(panel)
}

function hide_chat_log_box(panel) {
    chatlogbox.css('right', '-100%')
    chatlogbox.css('opacity', '0')
    chatlogbox.css('z-index', '0')
    nowsubpanel.css('opacity', '1')
    hide_chat_box()
    reset_head_title()
    show_head_btn_if_need(panel)
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
function show_friend_info_box(panel) {
    friendinfobox.css('right', '0')
    friendinfobox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_friend_info_box(panel) {
    friendinfobox.css('right', '-100%')
    friendinfobox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
}

function show_group_info_box(panel) {
    groupinfobox.css('right', '0')
    groupinfobox.css('opacity', '1')
    groupinfobox.css('z-index', '1')
    nowsubpanel.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_group_info_box(panel) {
    groupinfobox.css('right', '-100%')
    groupinfobox.css('opacity', '0')
    groupinfobox.css('z-index', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
}

// todo & idea

function new_todo(spanel, hpanel) {
    show_todo_info_box(spanel)

    $('#todoinfoboxpanel').addClass('hidepanel')
    $('#newtodoinfoboxpanel').removeClass('hidepanel')

    $('#newtodotitle').val('')
    $('#newtodostarttime').val('')
    $('#newtodofinishtime').val('')
    $('#newtododetail').val('')

    $('#newtodoreturn').unbind('click')
    $('#newtodoreturn').click(function() {
        hide_todo_info_box(hpanel)
        $('#todoinfoboxpanel').removeClass('hidepanel')
        $('#newtodoinfoboxpanel').addClass('hidepanel')

        $('#newtodoreturn').unbind('click')
        $('#newtodoreturn').click(function() {
            $('#todoinfoboxpanel').removeClass('hidepanel')
            $('#newtodoinfoboxpanel').addClass('hidepanel')
        })
    })

    $('#newtodosubmit').unbind('click')
    $('#newtodosubmit').click(function() {
        add_todo(
            $('#newtodotitle').val(),
            $('#newtodostarttime').datetimepicker('getValue').getTime(),
            $('#newtodofinishtime').datetimepicker('getValue').getTime(),
            $('#newtododetail').val()
        )
        setTimeout(() => {
            $('#donebtn').click()
            $('#ingbtn').click()
        }, 200);
        setTimeout(() => {
            $('#newtodoreturn').click()
        }, 600);

        $('#newtodosubmit').unbind('click')
        $('#newtodosubmit').click(function() {
            update_todo(
                $('#newtodotitle').val(),
                $('#newtodostarttime').datetimepicker('getValue').getTime(),
                $('#newtodofinishtime').datetimepicker('getValue').getTime(),
                $('#newtododetail').val()
            )
            $('#todotitle').val($('#newtodotitle').val())
            $('#todostarttime').val(dayjs($('#newtodostarttime').datetimepicker('getValue').getTime()).format('YYYY/MM/DD HH:mm'))
            $('#todofinishtime').val(dayjs($('#newtodofinishtime').datetimepicker('getValue').getTime()).format('YYYY/MM/DD HH:mm'))
            $('#tododetail').val($('#newtododetail').val())
            setTimeout(() => {
                $('#donebtn').click()
                $('#ingbtn').click()
            }, 200);
            setTimeout(() => {
                $('#newtodoreturn').click()
            }, 600);
        })
    })
}

function new_idea(spanel, hpanel) {
    show_idea_info_box(spanel)
    present_idea_all()

    $('#ideainfoboxpanel').addClass('hidepanel')
    $('#newideainfoboxpanel').removeClass('hidepanel')

    $('#newideatitle').val('')
    $('#newideastarttime').val('')
    $('#newilbox').children().remove()
    $('#newideadetail').val('')

    $('#newideareturn').unbind('click')
    $('#newideareturn').click(function() {
        hide_idea_info_box(hpanel)
        $('#ideainfoboxpanel').removeClass('hidepanel')
        $('#newideainfoboxpanel').addClass('hidepanel')

        $('#newideareturn').unbind('click')
        $('#newideareturn').click(function() {
            $('#ideainfoboxpanel').removeClass('hidepanel')
            $('#newideainfoboxpanel').addClass('hidepanel')
        })
    })

    $('#newideasubmit').unbind('click')
    $('#newideasubmit').click(function() {
        add_idea(
            $('#newideatitle').val(),
            $('#newideastarttime').datetimepicker('getValue').getTime(),
            $('#newideadetail').val(),
            get_addil_group_list()
        )
        present_idea()
        setTimeout(() => {
            $('#newideareturn').click()
        }, 400);

        $('#newideasubmit').unbind('click')
        $('#newideasubmit').click(function() {
            update_idea(
                nowideaindex,
                $('#newideatitle').val(),
                $('#newideastarttime').datetimepicker('getValue').getTime(),
                $('#newideadetail').val(),
                get_addil_group_list()
            )
            $('#ideatitle').val($('#newideatitle').val())
            $('#ideastarttime').val(dayjs($('#newideastarttime').datetimepicker('getValue').getTime()).format('YYYY/MM/DD HH:mm'))
            $('#ideadetail').val($('#newideadetail').val())
            $('#ilbox')[0].innerHTML = $('#newilbox')[0].innerHTML
            present_idea()
            present_idea_all()
            setTimeout(() => {
                $('#newideareturn').click()
            }, 400);
        })
    })
}

function show_todo_box(panel) {
    todobox.css('right', '0')
    todobox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_todo_box(panel) {
    todobox.css('right', '-100%')
    todobox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
}

function show_todo_info_box(panel) {
    todoinfobox.css('right', '0')
    todoinfobox.css('opacity', '1')
    todobox.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_todo_info_box(panel) {
    todoinfobox.css('right', '-100%')
    todoinfobox.css('opacity', '0')
    todobox.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
}

function show_idea_box(panel) {
    ideabox.css('right', '0')
    ideabox.css('opacity', '1')
    nowsubpanel.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_idea_box(panel) {
    ideabox.css('right', '-100%')
    ideabox.css('opacity', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
}

function show_idea_info_box(panel) {
    ideainfobox.css('right', '0')
    ideainfobox.css('opacity', '1')
    ideabox.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_idea_info_box(panel) {
    ideainfobox.css('right', '-100%')
    ideainfobox.css('opacity', '0')
    ideabox.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
}

function show_head_btn_if_need(panel) {
    hide_leftbtn()
    hide_rightbtn()
    if (panel !== undefined) {
        if (panel.leftlogo !== undefined) {
            need_left_function(panel.leftlogo, panel.leftfunc)
        }
        if (panel.rightlogo !== undefined) {
            need_right_function(panel.rightlogo, panel.rightfunc)
        }
    }
}

function show_file_box(panel) {
    filebox.css('right', '0')
    filebox.css('opacity', '1')
    filebox.css('z-index', '3')
    nowsubpanel.css('opacity', '0')
    show_head_btn_if_need(panel)
}

function hide_hide_box(panel) {
    filebox.css('right', '-100%')
    filebox.css('opacity', '0')
    filebox.css('z-index', '0')
    nowsubpanel.css('opacity', '1')
    reset_head_title()
    show_head_btn_if_need(panel)
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

var f = false

function just_login() {
    get_panel_up(mainpanel)
    get_subpanel_up(ideasquaresubpanel)

    $('#chatbtn').click()

    reflesh_user_info()
    present_idea_all()
    present_context()
    present_ing_todo()
    present_idea()

    if (!f) {
        $('#newtodostarttime').datetimepicker()
        $('#newtodofinishtime').datetimepicker()
        $('#newideastarttime').datetimepicker()
        f = true
    }
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
    if (headtitlesearch.attr('placeholder') !== newtitle) {
        headtitlesearch.attr('placeholder', newtitle)
    }
}

function reset_head_title() {
    change_head_title('创意工坊')
}

// chat panel function
function get_chat_log_up(title, cw, ci, panel) {
    change_head_title(title)
    let g = get_chat_log_from_db(cw, ci)
    show_chat_log_box(panel)
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
    return {
        index: ii,
        log: f
    }
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

function remove_todo_item(ts) {
    $(ts).unbind('click')
    let p = $(ts).parent()
    setTimeout(() => {
        p.css('height', 0)
        p.css('border-bottom-width', 0)
    }, 400);
    setTimeout(() => {
        p.remove()
    }, 800);
}

function remove_idea_item(ts) {
    $(ts).unbind('click')
    let p = $(ts).parent()
    setTimeout(() => {
        p.css('height', 0)
        p.css('border-bottom-width', 0)
    }, 400);
    setTimeout(() => {
        p.remove()
    }, 800);
}

function fetch_chat_list() {
    $('#ideasquaresubpanel').children().remove()
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

// todo form
function disable_todo_info_form() {
    $('#todoinfoboxpanel').children().attr('disabled', true)
    $('#todoinfoboxpanel').children().children().attr('disabled', true)
}

function enable_todo_info_form() {
    $('#todoinfoboxpanel').children().removeAttr('disabled')
    $('#todoinfoboxpanel').children().children().removeAttr('disabled')
}

// group
function show_group_info(gid, spanel, cpanel) {
    show_group_info_box(spanel)
    let g = sch('gredb', gid)
    $('#gname').text(g.gname)
    $('#gintro').text(g.gintro)

    let gmbbox = $('#gmbbox')
    gmbbox.children().remove()
    let gmb = get_group_member(g.gid)
    $('#gmblb').text('群成员(' + gmb.length + ')')
    for (let i = 0; i < gmb.length; i++) {
        let mb = c('span')
        mb.innerText = gmb[i].nickname
        adclass(mb, 'badge badge-primary m-1')
        appendc(gmbbox[0], mb)
    }
    $('#chatgbtn').unbind('click')
    $('#chatgbtn').click(function() {
        get_chat_log_up(g.gname, 'g', g.gid, cpanel)
    })
}

// idea update
function get_addil_group_list() {
    let have = $('#newilbox')[0].innerText
    let all = $('#addil').find('option')
    let rs = new Array()
    for (let i = 0; i < all.length; i++) {
        let it = all[i]
        if (have.search(it.getAttribute('gname')) !== -1) {
            rs.push(parseInt(it.getAttribute('gid')))
        }
    }
    return rs
}

function show_hide_add_funcbtn() {
    if (addfuncpanel.hasClass('hidepanel')) {
        show_panel_2(addfuncpanel)
    } else {
        hide_panel_2(addfuncpanel)
    }
}

function show_file() {

}