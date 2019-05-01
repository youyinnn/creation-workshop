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
function login(username, password) {
    let db = sch('userdb')
    for (let i = 0; i < db.data.length; i++) {
        let user = db.data[i]
        if (user.username === username) {
            if (user.password === password) {
                // login success
                return 1
            } else {
                // wrong password
                return 0
            }
        }
    }
    // no such user
    return 2
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