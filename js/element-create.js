function chat_list_item(log) {
    let cli = c('div')
    adclass(cli, 'chatlistitem')
    let clic = c('div')
    let clih = c('div')
    let clib = c('div')
    let clif = c('div')
    let tt
    let cw = log.chatwith
    let ci
    if (log.chatwith === 'u') {
        if (loginid === "" + log.aid) {
            ci = log.bid
        } else {
            ci = log.aid
        }
        let b = sch('userdb', ci)

        cli.setAttribute('chatwith', 'u')
        cli.setAttribute('chatid', ci)
        tt = b.nickname
    } else {
        let g = sch('gredb', log.gid)

        cli.setAttribute('chatwith', 'g')
        cli.setAttribute('chatid', log.gid)
        ci = log.gid
        tt = g.gname
    }
    adclass(clic, 'chatlistitemcontent')
    adclass(clih, 'chatlistitemhead')
    adclass(clib, 'chatlistitembody')
    adclass(clif, 'chatlistfunbtn')

    clib.innerHTML = '<span>' + log.msglog[log.msglog.length - 1].msg + '</span>'
    clih.innerHTML = '<span>' + tt + '</span>'
    clif.innerHTML = '<i class="fa fa-close"></i>'

    appendc(cli, clic)
    appendc(clic, clih)
    appendc(clic, clib)
    appendc(cli, clif)
    appendc($('#chatsubpanel')[0], cli)

    $(clif).click(function() {
        remove_chat_item(this)
    })
    $(clic).click(function() {
        nowchatwith = cw
        nowchatid = ci
        $('#chatbtn').removeClass('active')
        get_chat_log_up(tt, cw, ci, {
            leftlogo: 'angle-left',
            leftfunc: function() {
                hide_chat_log_box()
                $('#chatbtn').click()
            }
        })
    })
}

function present_chat_logs(msglog, cw) {
    chatlogbox.children().remove()
    for (let i = 0; i < msglog.length; i++) {
        let lib = c('div')
        let li = c('div')
        let lit = c('div')
        let lim = c('div')
        if (cw === 'g') {
            lit.innerHTML = '<span class="badge badge-secondary mr-1">' + dayjs(msglog[i].time).format('YYYY/MM/DD HH:mm') + '</span>' + sch('userdb', msglog[i].from).nickname
        } else {
            lit.innerHTML = '<span class="badge badge-secondary">' + dayjs(msglog[i].time).format('YYYY/MM/DD HH:mm') + '</span>'
        }
        lim.innerText = msglog[i].msg

        if (msglog[i].from + '' === loginid + '') {
            adclass(li, 'lime')
        } else {
            adclass(li, 'linotme')
        }

        adclass(lit, 'lit')
        adclass(lim, 'lim')
        adclass(li, 'li')
        adclass(lib, 'clearfix')

        appendc(li, lit)
        appendc(li, lim)
        appendc(lib, li)
        appendc(chatlogbox[0], lib)
    }
}

function present_you_just_send(cw, msg) {
    let lib = c('div')
    let li = c('div')
    let lit = c('div')
    let lim = c('div')
    if (cw === 'g') {
        lit.innerHTML = '<span class="badge badge-secondary mr-1">' + dayjs().format('YYYY/MM/DD HH:mm') + '</span>' + sch('userdb', loginid).nickname
    } else {
        lit.innerHTML = '<span class="badge badge-secondary">' + dayjs().format('YYYY/MM/DD HH:mm') + '</span>'
    }
    lim.innerText = msg

    adclass(li, 'lime')

    adclass(lit, 'lit')
    adclass(lim, 'lim')
    adclass(li, 'li')
    adclass(lib, 'clearfix')

    appendc(li, lit)
    appendc(li, lim)
    appendc(lib, li)
    appendc(chatlogbox[0], lib)
}

function present_context() {
    let fs = get_friend(loginid)
    let gb = $('#groupbox .contextboxbody')
    gb.children().remove()
    let fb = $('#friendbox .contextboxbody')
    fb.children().remove()
    for (let i = 0; i < fs.length; i++) {
        let fi = c('div')
        adclass(fi, 'contextitem')
        fi.setAttribute('uid', fs[i].id)
        fi.innerText = fs[i].nickname

        appendc(fb[0], fi)
        $(fi).click(function() {
            show_friend_info_box({
                leftlogo: 'angle-left',
                leftfunc: hide_friend_info_box
            })
            let u = sch('userdb', fs[i].id)
            $('#fnickname').text(u.nickname)
            $('#fusername').val(u.username)
            $('#femail').val(u.email)
            $('#fintro').text(u.intro)
            $('#chatfbtn').unbind('click')
            $('#chatfbtn').click(function() {
                hide_friend_info_box()
                get_chat_log_up(u.nickname, 'u', u.id)
                need_left_function('angle-left', function() {
                    chatlogbox.css('right', '-100%')
                    chatlogbox.css('opacity', '0')
                    nowsubpanel.css('opacity', '1')
                    hide_chat_box()
                    show_friend_info_box({
                        leftlogo: 'angle-left',
                        leftfunc: hide_friend_info_box
                    })
                    reset_head_title()
                })
            })
        })
    }
    let gs = get_someone_group_list(loginid)
    for (let i = 0; i < gs.length; i++) {
        let gi = c('div')
        adclass(gi, 'contextitem')
        gi.setAttribute('gid', gs[i].gid)
        gi.innerText = gs[i].gname

        appendc(gb[0], gi)

        $(gi).click(function() {
            show_group_info(gs[i].gid, {
                leftlogo: 'angle-left',
                leftfunc: hide_group_info_box
            }, {
                leftlogo: 'angle-left',
                leftfunc: function() {
                    hide_chat_log_box({
                        leftlogo: 'angle-left',
                        leftfunc: hide_group_info_box
                    })
                }
            })
        })
    }
}

function present_ing_todo() {
    todolist.children().remove()
    let rs = get_ing_todo()
    for (let i = 0; i < rs.length; i++) {
        let td = rs[i]
        let it = c('div')
        let itc = c('div')
        let itfunc = c('div')
        let ihead = c('div')
        let ibody = c('div')

        ihead.innerHTML = '<span>' + td.title + '</span>'
        ibody.innerHTML = '<span>' + '还剩: ' + getTimePeriod(td.finishtime - new Date().getTime()) + '</span>'

        itfunc.innerHTML = '<i class="fa fa-square-o"></i>'

        adclass(it, 'chatlistitem')
        adclass(itc, 'chatlistitemcontent')
        adclass(ihead, 'chatlistitemhead')
        adclass(ibody, 'chatlistitembody')
        adclass(itfunc, 'chatlistfunbtn')

        appendc(it, itc)
        appendc(itc, ihead)
        appendc(itc, ibody)
        appendc(it, itfunc)
        appendc(todolist[0], it)

        setInterval(() => {
            ibody.innerHTML = '<span>' + '还剩: ' + getTimePeriod(td.finishtime - new Date().getTime()) + '</span>'
        }, 1000);

        $(itfunc).click(function() {
            itfunc.innerHTML = '<i class="fa fa-check-square-o"></i>'
            remove_todo_item(this)
            finish_todo(td.index)
        })
        $(itc).click(function() {
            $('#todoinfoboxpanel button').removeClass('hidepanel')
            $('#tododetail').attr('rows', 2)
            let loop = {
                leftlogo: 'angle-left',
                leftfunc: hide_todo_box,
                rightlogo: 'plus-square-o',
                rightfunc: function() {
                    new_todo(undefined, loop)
                }
            }
            show_todo_info_box({
                leftlogo: 'angle-left',
                leftfunc: function() {
                    hide_todo_info_box(loop)
                }
            })
            change_head_title('正在进行')
            $('#todotitle, #newtodotitle').val(td.title)
            $('#todostarttime, #newtodostarttime').val(dayjs(td.starttime).format('YYYY/MM/DD HH:mm'))
            $('#todofinishtime, #newtodofinishtime').val(dayjs(td.finishtime).format('YYYY/MM/DD HH:mm'))
            $('#tododetail, #newtododetail').text(td.detail)
            $('#finishtodo').unbind('click')
            $('#finishtodo').click(function() {
                $(itfunc).click()
                hide_todo_info_box(loop)
            })
            nowtodoindex = td.index
        })
    }
}

function present_done_todo() {
    todolist.children().remove()
    let rs = get_done_todo()
    for (let i = 0; i < rs.length; i++) {
        let td = rs[i]
        let it = c('div')
        let itc = c('div')
        let itfunc = c('div')
        let ihead = c('div')
        let ibody = c('div')

        ihead.innerHTML = '<span>' + td.title + '</span>'
        ibody.innerHTML = '<span>' + td.starttime + '</span>'
        ibody.innerHTML = '<span>' + dayjs(td.starttime).format('YYYY/MM/DD HH:mm') + ' - ' + dayjs(td.finishtime).format('YYYY/MM/DD HH:mm') + '</span>'
        itfunc.innerHTML = '<i class="fa fa-check-square-o"></i>'

        adclass(it, 'chatlistitem')
        adclass(itc, 'chatlistitemcontent')
        adclass(ihead, 'chatlistitemhead')
        adclass(ibody, 'chatlistitembody')
        adclass(itfunc, 'chatlistfunbtn')

        appendc(it, itc)
        appendc(itc, ihead)
        appendc(itc, ibody)
        appendc(it, itfunc)
        appendc(todolist[0], it)

        $(itc).click(function() {
            let loop = {
                leftlogo: 'angle-left',
                leftfunc: hide_todo_box,
                rightlogo: 'plus-square-o',
                rightfunc: function() {
                    new_todo(undefined, loop)
                }
            }
            show_todo_info_box({
                leftlogo: 'angle-left',
                leftfunc: function() {
                    hide_todo_info_box(loop)
                }
            })
            change_head_title('已完成')
            $('#todotitle').val(td.title)
            $('#todostarttime').val(dayjs(td.starttime).format('YYYY/MM/DD HH:mm'))
            $('#todofinishtime').val(dayjs(td.finishtime).format('YYYY/MM/DD HH:mm'))
            $('#tododetail').text(td.detail)
            $('#todoinfoboxpanel button').addClass('hidepanel')
            $('#tododetail').attr('rows', 4)
        })
    }
}

function present_undone_todo() {
    todolist.children().remove()
    let rs = get_undone_todo()
    for (let i = 0; i < rs.length; i++) {
        let td = rs[i]
        let it = c('div')
        let itc = c('div')
        let itfunc = c('div')
        let ihead = c('div')
        let ibody = c('div')

        ihead.innerHTML = '<span>' + td.title + '</span>'
        ibody.innerHTML = '<span>' + td.starttime + '</span>'
        ibody.innerHTML = '<span>' + dayjs(td.starttime).format('YYYY/MM/DD HH:mm') + ' - ' + dayjs(td.finishtime).format('YYYY/MM/DD HH:mm') + '</span>'
        itfunc.innerHTML = '<i class="fa fa-minus-square-o"></i>'

        adclass(it, 'chatlistitem')
        adclass(itc, 'chatlistitemcontent')
        adclass(ihead, 'chatlistitemhead')
        adclass(ibody, 'chatlistitembody')
        adclass(itfunc, 'chatlistfunbtn')

        appendc(it, itc)
        appendc(itc, ihead)
        appendc(itc, ibody)
        appendc(it, itfunc)
        appendc(todolist[0], it)

        $(itc).click(function() {
            let loop = {
                leftlogo: 'angle-left',
                leftfunc: hide_todo_box,
                rightlogo: 'plus-square-o',
                rightfunc: function() {
                    new_todo(undefined, loop)
                }
            }
            show_todo_info_box({
                leftlogo: 'angle-left',
                leftfunc: function() {
                    hide_todo_info_box(loop)
                }
            })
            change_head_title('未完成')
            $('#todotitle').val(td.title)
            $('#todostarttime').val(dayjs(td.starttime).format('YYYY/MM/DD HH:mm'))
            $('#todofinishtime').val(dayjs(td.finishtime).format('YYYY/MM/DD HH:mm'))
            $('#tododetail').text(td.detail)
            $('#todoinfoboxpanel button').addClass('hidepanel')
            $('#tododetail').attr('rows', 4)
        })
    }
}

function present_idea() {
    ideabox.children().remove()
    let rs = get_related_idea()
    for (let i = 0; i < rs.length; i++) {
        let td = rs[i].idea
        let it = c('div')
        let itc = c('div')
        let itfunc = c('div')
        let ihead = c('div')
        let ibody = c('div')

        ihead.innerHTML = '<span>' + td.title + '</span>'
        ibody.innerHTML = '<span>' + td.detail + '</span>'
        itfunc.innerHTML = '<i class="fa fa-close"></i>'

        adclass(it, 'chatlistitem')
        adclass(itc, 'chatlistitemcontent')
        adclass(ihead, 'chatlistitemhead')
        adclass(ibody, 'chatlistitembody')
        adclass(itfunc, 'chatlistfunbtn')

        appendc(it, itc)
        appendc(itc, ihead)
        appendc(itc, ibody)
        appendc(it, itfunc)
        appendc(ideabox[0], it)

        $(itfunc).click(function() {
            remove_idea_item(this)
            del_idea(rs[i].index)
        })
        $(itc).click(function() {
            let loop2 = {
                leftlogo: 'angle-left',
                leftfunc: hide_idea_box,
                rightlogo: 'plus-square-o',
                rightfunc: function() {
                    new_idea(undefined, loop2)
                }
            }
            show_idea_info_box({
                leftlogo: 'angle-left',
                leftfunc: function() {
                    hide_idea_info_box(loop2)
                }
            })
            change_head_title('我的点子')
            $('#ideatitle, #newideatitle').val(td.title)
            $('#ideastarttime, #newideastarttime').val(dayjs(td.starttime).format('YYYY/MM/DD HH:mm'))
            let ilbox = $('#ilbox')
            ilbox.children().remove()
            let g = td.linkedgroup
            for (let j = 0; j < g.length; j++) {
                let gn = c('span')
                gn.innerText = sch('gredb', g[j]).gname
                adclass(gn, 'badge badge-success m-1')
                appendc(ilbox[0], gn)
                $(gn).click(function() {
                    show_group_info(g[j], {
                        leftlogo: 'angle-left',
                        leftfunc: function() {
                            hide_group_info_box({
                                leftlogo: 'angle-left',
                                leftfunc: function() {
                                    hide_idea_info_box(loop2)
                                }
                            })
                        }
                    }, {
                        leftlogo: 'angle-left',
                        leftfunc: function() {
                            hide_chat_log_box({
                                leftlogo: 'angle-left',
                                leftfunc: function() {
                                    hide_group_info_box({
                                        leftlogo: 'angle-left',
                                        leftfunc: function() {
                                            hide_idea_info_box(loop2)
                                        }
                                    })
                                }
                            })
                        }
                    })
                })
            }
            // $('#ilbox, #newilbox').val(td.title)
            $('#ideadetail, #newideadetail').val(td.detail)
        })
    }
}