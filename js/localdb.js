// user table:
//  id
//  username
//  nickname
//  intro 
//  password
//  email

var lcoaldb_usertb = {
    idkey: 2,
    data: [
        {
            id: 0,
            username: 'xiaoma123',
            nickname: 'balancehorse',
            intro: 'xixi',
            password: '123456',
            email: 'xiaoma@gmail.com',
        },
        {
            id: 1,
            username: 'xiaohong456',
            nickname: 'honghonghuohuo',
            intro: 'haha',
            password: '123456',
            email: 'xiaohong@gmail.com',
        },
        {
            id: 2,
            username: 'xiaobai444',
            nickname: 'baibaibai',
            intro: 'heihei',
            password: '123456',
            email: 'xiaobai@gmail.com',
        },
    ]
}

var localdb_urelation = {
    data :[
        {
            uid: 0,
            friend: [1,2]
        },
        {
            uid: 1,
            friend: [0]
        },
        {
            uid: 2,
            friend: [0]
        }
    ]
}

var localdb_grelation = {
    idkey: 2,
    data: [
        {
            gid: 0,
            gname: 'walkingdead',
            member: [0,1,2]
        },
        {
            gid: 1,
            gname: 'twins',
            member: [0,2]
        },
    ]
}

var localdb_chatlogtb = {
    data: [
        {
            chatwith: 'u',
            aid: 0,
            bid: 1,
            log: [
                {
                    time: 1556779603137,
                    msg: 'asdasdsad1dasdasd',
                    from: 'a',
                },
                {
                    time: 1556780688914,
                    msg: '1321323',
                    from: 'b'
                },
                {
                    time: 1556780691691,
                    msg: 'asdasdsad1dasdasd',
                    from: 'a'
                },
                {
                    time: 1556780692230,
                    msg: 'asdasdsad1dasdasd',
                    from: 'a'
                }
            ]
        },
        {
            chatwith: 'g',
            gid: 0, 
            log: [
                {
                    time: 1556780710837,
                    msg: 'asdasdsad1dasdasd',
                    from: 1
                },
                {
                    time: 1556780711413,
                    msg: '1321323',
                    from: 1
                },
                {
                    time: 1556780711860,
                    msg: 'asdasdsad1dasdasd',
                    from: 0
                },
                {
                    time: 1556780712859,
                    msg: 'asdasdsad1dasdasd',
                    from: 2
                }
            ]
        },
        {
            chatwith: 'g',
            gid: 1, 
            log: [
                {
                    time: 1556780711760,
                    msg: 'asdasdsad1dasdasd',
                    from: 0
                },
                {
                    time: 1556780718859,
                    msg: 'asdasdsad1dasdasd',
                    from: 2
                }
            ]
        },
        {
            chatwith: 'u',
            aid: 0,
            bid: 2,
            log: [
                {
                    time: 1556780731953,
                    msg: 'asdasdsad1dasdasd',
                    from: 'a'
                },
                {
                    time: 1556780733791,
                    msg: '1321323',
                    from: 'b'
                },
                {
                    time: 1556780734369,
                    msg: 'asdasdsad1dasdasd',
                    from: 'a'
                },
                {
                    time: 1556780735279,
                    msg: 'asdasdsad1dasdasd',
                    from: 'a'
                }
            ]
        }
    ]
}

$(function () {
    if (localStorage['userdb'] === undefined) {
        localStorage.setItem('userdb', JSON.stringify(lcoaldb_usertb))
    }
    if (localStorage['chatlogdb'] === undefined) {
        localStorage.setItem('chatlogdb', JSON.stringify(localdb_chatlogtb))
    }
    if (localStorage['uredb'] === undefined) {
        localStorage.setItem('uredb', JSON.stringify(localdb_urelation))
    }
    if (localStorage['gredb'] === undefined) {
        localStorage.setItem('gredb', JSON.stringify(localdb_grelation))
    }
})