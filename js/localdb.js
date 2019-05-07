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
            fs: [1,2]
        },
        {
            uid: 1,
            fs: [0]
        },
        {
            uid: 2,
            fs: [0]
        }
    ]
}

var localdb_grelation = {
    idkey: 2,
    data: [
        {
            gid: 0,
            gname: 'walkingdead',
            gintro: '行尸走肉交流群',
            mb: [0,1,2]
        },
        {
            gid: 1,
            gname: 'twins',
            gintro: '双生子协会',
            mb: [0,2]
        },
    ]
}

var localdb_chatlogtb = {
    data: [
        {
            chatwith: 'u',
            aid: 0,
            bid: 1,
            msglog: [
                {
                    time: 1556779603137,
                    msg: '你好，我是a',
                    from: 0,
                },
                {
                    time: 1556780688914,
                    msg: '你好，我是b',
                    from: 1
                },
                {
                    time: 1556780691691,
                    msg: '你吃饭了嘛？',
                    from: 0
                },
                {
                    time: 1556780692230,
                    msg: '要不一起啊？',
                    from: 0
                }
            ]
        },
        {
            chatwith: 'g',
            gid: 0, 
            msglog: [
                {
                    time: 1556780710837,
                    msg: '有人吗？',
                    from: 1
                },
                {
                    time: 1556780711413,
                    msg: '哈喽？',
                    from: 1
                },
                {
                    time: 1556780711860,
                    msg: '有的有的',
                    from: 0
                },
                {
                    time: 1556780712859,
                    msg: '什么事？',
                    from: 2
                }
            ]
        },
        {
            chatwith: 'g',
            gid: 1, 
            msglog: [
                {
                    time: 1556780711760,
                    msg: '那个人真搞笑',
                    from: 0
                },
                {
                    time: 1556780718859,
                    msg: '对啊',
                    from: 2
                }
            ]
        },
        {
            chatwith: 'u',
            aid: 0,
            bid: 2,
            msglog: [
                {
                    time: 1556780731953,
                    msg: '你好啊',
                    from: 0
                },
                {
                    time: 1556780733791,
                    msg: '你好',
                    from: 2
                },
                {
                    time: 1556780734369,
                    msg: '你觉得我的计划怎么样',
                    from: 0
                },
                {
                    time: 1556780735279,
                    msg: '还有哪里需要改进的嘛？',
                    from: 0
                }
            ]
        }
    ]
}

var localdb_tododb = {
    data: [
        {
            uid: 0,
            todos: [
                {
                    title: '英语作业1',
                    starttime: 1557006044009,
                    finishtime: 1557056544009,
                    detail: '做完练习1章',
                    finish: true
                },
                {
                    title: '数学作业1',
                    starttime: 1556996044009,
                    finishtime: 1557006044009,
                    detail: '做完练习1章',
                    finish: false
                },
                {
                    title: '英语作业',
                    starttime: 1557106044009,
                    finishtime: 1557206544009,
                    detail: '做完练习1-3章',
                    finish: false
                },
                {
                    title: '数学作业',
                    starttime: 1557106047368,
                    finishtime: 1557306047368,
                    detail: '做完练习9-15章',
                    finish: false
                }
            ]
        },
        {
            uid: 1,
            todos: []
        },
        {
            uid: 2,
            todos: []
        },
    ]
}

var localdb_ideadb = {
    data: [
        {
            uid: 0,
            idea: {
                title: '化学实验项目小组',
                starttime: 1557006044009,
                detail: '完成ABC化学实验',
                linkedgroup: [0, 1]
            }
        },
        {
            uid: 0,
            idea: {
                title: '数学实考研小组',
                starttime: 1557006944009,
                detail: '刷题',
                linkedgroup: [1]
            }
        }
    ]
}

$(function () {
    if (localStorage['userdb'] === undefined) {
        localsave('userdb', lcoaldb_usertb)
    }
    if (localStorage['chatlogdb'] === undefined) {
        localsave('chatlogdb', localdb_chatlogtb)
    }
    if (localStorage['uredb'] === undefined) {
        localsave('uredb', localdb_urelation)
    }
    if (localStorage['gredb'] === undefined) {
        localsave('gredb', localdb_grelation)
    }
    if (localStorage['tododb'] === undefined) {
        localsave('tododb', localdb_tododb)
    }
    if (localStorage['ideadb'] === undefined) {
        localsave('ideadb', localdb_ideadb)
    }
})

function resetdb() {
    localremove('userdb')
    localremove('chatlogdb')
    localremove('uredb')
    localremove('gredb')
    localremove('tododb')
    localremove('ideadb')
    location.reload()
}