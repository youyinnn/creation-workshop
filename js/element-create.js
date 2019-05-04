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

    $(clif).click(function(){
        remove_chat_item(this)
    })
    $(clic).click(function(){
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
            lit.innerHTML = '<span class="badge badge-secondary mr-1">' + dayjs(msglog[i].time).format('HH:mm') + '</span>' + sch('userdb', msglog[i].from).nickname
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