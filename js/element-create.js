function chat_list_item(log) {
    let cli = c('div')
    adclass(cli, 'chatlistitem')
    let clic = c('div')
    let clih = c('div')
    let clib = c('div')
    let clif = c('div')
    if (log.chatwith === 'u') {
        let cid
        if (loginid === "" + log.aid) {
            cid = log.bid
        } else {
            cid = log.aid
        }
        let b = sch('userdb', cid)

        cli.setAttribute('chatwith', 'u')
        cli.setAttribute('chatid', cid)
        clih.innerHTML = '<span>' + b.nickname + '</span>'
    } else {
        let g = sch('gredb', log.gid)
        
        cli.setAttribute('chatwith', 'g')
        cli.setAttribute('chatid', log.gid)
        clih.innerHTML = '<span>' + g.gname + '</span>'
    }
    adclass(clic, 'chatlistitemcontent')
    adclass(clih, 'chatlistitemhead')
    adclass(clib, 'chatlistitembody')
    clib.innerHTML = '<span>' + log.msglog[log.msglog.length - 1].msg + '</span>'
    adclass(clif, 'chatlistfunbtn')
    clif.innerHTML = '<i class="fa fa-close"></i>'
    appendc(cli, clic)
    appendc(clic, clih)
    appendc(clic, clib)
    appendc(cli, clif)
    appendc($('#chatsubpanel')[0], cli)
    $(clif).click(function(){
        remove_chat_item(this)
    })
}