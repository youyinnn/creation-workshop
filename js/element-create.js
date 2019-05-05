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
        get_chat_log_up(tt, cw, ci)
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
            lit.innerHTML = '<span class="badge badge-secondary mr-1">' + dayjs(msglog[i].time).format('YYYY MM-DD HH:mm') + '</span>' + sch('userdb', msglog[i].from).nickname
        } else {
            lit.innerHTML = '<span class="badge badge-secondary">' + dayjs(msglog[i].time).format('YYYY MM-DD HH:mm') + '</span>'
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
        lit.innerHTML = '<span class="badge badge-secondary mr-1">' + dayjs().format('YYYY MM-DD HH:mm') + '</span>' + sch('userdb', loginid).nickname
    } else {
        lit.innerHTML = '<span class="badge badge-secondary">' + dayjs().format('YYYY MM-DD HH:mm') + '</span>'
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
    let fb = $('#friendbox .contextboxbody')
    for (let i = 0; i < fs.length; i++) {
        let fi = c('div')
        adclass(fi, 'contextitem')
        fi.setAttribute('uid', fs[i].id)
        fi.innerText = fs[i].nickname

        appendc(fb[0], fi)
        $(fi).click(function() {
            show_friend_info_box()
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
                    show_friend_info_box()
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
            show_group_info_box()
            let g = sch('gredb', gs[i].gid)
            $('#gname').text(g.gname)
            $('#gintro').text(g.gintro)
            
            let gmbbox = $('#gmbbox')
            gmbbox.children().remove()
            let gmb = get_group_member(g.gid)
            $('#gmblb').text('群成员(' + gmb.length + ')')
            for(let i = 0; i < gmb.length; i++) {
                let mb = c('span')
                mb.innerText = gmb[i].nickname
                adclass(mb, 'badge badge-success m-1')
                appendc(gmbbox[0], mb)
            }
            $('#chatgbtn').unbind('click')
            $('#chatgbtn').click(function() {
                hide_group_info_box()
                get_chat_log_up(g.gname, 'g', g.gid)
                need_left_function('angle-left', function() {
                    chatlogbox.css('right', '-100%')
                    chatlogbox.css('opacity', '0')
                    nowsubpanel.css('opacity', '1')
                    hide_chat_box()
                    show_group_info_box()
                    reset_head_title()
                })
            })
        })
    }
}