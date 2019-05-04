// basic operation
function ins(dbname, data) {
    let db = JSON.parse(localStorage.getItem(dbname))
    db.idkey++
    data.id = db.idkey
    db.data.push(data)
    console.log(db)
    localStorage.setItem(dbname, JSON.stringify(db))
}

function upd(dbname, id, newdata) {
    let db = JSON.parse(localStorage.getItem(dbname))
    for(var name in newdata){
        db.data[id][name] = newdata[name]
    }
    localStorage.setItem(dbname, JSON.stringify(db))
}

function sch(dbname, id) {
    let db = JSON.parse(localStorage.getItem(dbname))
    if (id !== null && id !== undefined) {
        return db.data[id]
    } else {
        return db
    }
}

function del(dbname, id) {
    let db = JSON.parse(localStorage.getItem(dbname))
    db.data.splice(id, 1)
    localStorage.setItem(dbname, JSON.stringify(db))
}

// handle user db
function log_in(username, password) {
    let db = sch('userdb')
    for (let i = 0; i < db.data.length; i++) {
        let user = db.data[i]
        if (user.username === username) {
            if (user.password === password) {
                // login success
                return user.id
            } else {
                // wrong password
                return -1
            }
        }
    }
    // no such user
    return -2
}

function sign_in(un,  em, pw1, pw2) {
    if (pw1 === pw2) {
        let db = sch('userdb')
        for (let i = 0; i < db.data.length; i++) {
            let user = db.data[i]
            if (user.username === username) {
                // duplicate username
                return 2
            }
        }
        ins('userdb', {
            username: un,
            email: em,
            password: pw1
        })
        // sign in success
        return 1
    } else {
        // password check failed
        return 0
    }
}

function update(id, nn, pw, e, i) {
    upd('userdb', id, {
        nickname: nn,
        password: pw,
        email: e,
        intro: i
    })
}

// handle relation db
function get_friend(id) {
    let fl = new Array()
    let db = sch('uredb')
    for (let i = 0; i < db.data.length; i++) {
        let re = db.data[i]
        if (re.uid === id) {
            for (let j = 0; j < re.fs.length; j++ ) {
                fl.push(sch('userdb', re.fs[j]))
            }
            return fl;
        }
    }
    return fl
}

function get_someone_group_list(id) {
    let gl = new Array()
    let db = sch('gredb')
    for (let i = 0; i < db.data.length; i++) {
        let g = db.data[i]
        for (let j = 0; j < g.mb.length; j++ ) {
            if (g.mb[j] === id) {
                gl.push(g)
                break
            }
        }
    }
    return gl
}

function is_member(id, gid) {
    let db = sch('gredb')
    for (let i = 0; i < db.data.length; i++) {
        let g = db.data[i]
        if (g.gid + "" === gid + "") {
            for (let j = 0; j < g.mb.length; j++ ) {
                if (g.mb[j] + "" === id + "") {
                    return true
                }
            }
        }
    }
    return false
}

// hanlde chat log db
function send_chat(cw, ci, mg) {
    let ilog = get_chat_log_from_db(cw, ci)
    let index = ilog.index
    let log = ilog.log
    log.msglog.push({
        time: new Date().getTime(),
        msg: mg,
        from: loginid
    })
    upd('chatlogdb', index, log)
}