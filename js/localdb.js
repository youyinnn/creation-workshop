// user table:
//  id
//  username
//  nickname
//  intro 
//  password
//  email

var lcoaldb_usertb = {
    idkey: 2,
    data: [{
            id: 0,
            username: 'xiaoma123',
            nickname: '小马',
            intro: 'xixi',
            password: '123456',
            email: 'xiaoma@gmail.com',
        },
        {
            id: 1,
            username: 'xiaohong456',
            nickname: '小红',
            intro: 'haha',
            password: '123456',
            email: 'xiaohong@gmail.com',
        },
        {
            id: 2,
            username: 'xiaobai444',
            nickname: '小白',
            intro: 'heihei',
            password: '123456',
            email: 'xiaobai@gmail.com',
        },
    ]
}

var localdb_urelation = {
    data: [{
            uid: 0,
            fs: [1, 2]
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
    data: [{
            gid: 0,
            gname: '行尸走肉交流群',
            gintro: '行尸走肉交流群',
            mb: [0, 1, 2]
        },
        {
            gid: 1,
            gname: '双生子协会',
            gintro: '双生子协会',
            mb: [0, 2]
        },
        {
            gid: 2,
            gname: 'AK48后院',
            gintro: 'AK48后院',
            mb: [0, 2]
        },
        {
            gid: 3,
            gname: '战争前线',
            gintro: '战争前线',
            mb: [0, 2]
        },
        {
            gid: 4,
            gname: 'LOL5黑',
            gintro: 'LOL5黑',
            mb: [0, 2]
        },
        {
            gid: 5,
            gname: '王者荣耀大集会',
            gintro: '王者荣耀大集会',
            mb: [0, 2]
        },
        {
            gid: 6,
            gname: 'Bad Boy',
            gintro: '坏小子',
            mb: [0, 2]
        },
        {
            gid: 7,
            gname: '炸鸡翅小分队',
            gintro: '炸鸡翅小分队',
            mb: [0, 2]
        },
    ]
}

var localdb_chatlogtb = {
    data: [{
            chatwith: 'u',
            aid: 0,
            bid: 1,
            msglog: [{
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
            msglog: [{
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
            msglog: [{
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
            msglog: [{
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
    data: [{
            uid: 0,
            todos: [{
                    title: '上传PRD文档',
                    starttime: 1557006044009,
                    finishtime: 1557056544009,
                    detail: '上传PRD文档待办细节',
                    finish: true
                },
                {
                    title: '项目“鱼骨图”初稿',
                    starttime: 1556996044009,
                    finishtime: 1557006044009,
                    detail: '项目“鱼骨图”初稿待办细节',
                    finish: false
                },
                {
                    title: '修改第三版设计图',
                    starttime: 1557106044009,
                    finishtime: 1557206544009,
                    detail: '修改第三版设计图待办细节',
                    finish: false
                },
                {
                    title: '添加“登录”和“注册”功能',
                    starttime: 1557106047368,
                    finishtime: 1557206047368,
                    detail: '添加“登录”和“注册”功能待办细节',
                    finish: false
                },
                {
                    title: '可交互原理',
                    starttime: 1557336047368,
                    finishtime: 1557906047368,
                    detail: '可交互原理待办细节',
                    finish: false
                },
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
                title: '解决软件开发中遇到的问题',
                starttime: 1557006044009,
                detail: '解决软件开发中遇到的问题点子细节',
                linkedgroup: [0, 1]
            }
        },
        {
            uid: 0,
            idea: {
                title: '基于iOS平台的即时记账软件',
                starttime: 1557006044009,
                detail: '基于iOS平台的即时记账软件点子细节',
                linkedgroup: [0, 1]
            }
        },
        {
            uid: 0,
            idea: {
                title: '老年人理疗平台',
                starttime: 1557006044009,
                detail: '老年人理疗平台点子细节',
                linkedgroup: [0, 1]
            }
        },
        {
            uid: 0,
            idea: {
                title: '针对女性购物的平台——优美购',
                starttime: 1557006044009,
                detail: '针对女性购物的平台——优美购点子细节',
                linkedgroup: [0, 1]
            }
        },
        {
            uid: 0,
            idea: {
                title: '基于Opentracing的跟踪监控系统',
                starttime: 1557006044009,
                detail: '基于Opentracing的跟踪监控系统点子细节',
                linkedgroup: [0, 1]
            }
        },
        {
            uid: 0,
            idea: {
                title: '“黑昼”——昼夜交替解谜游戏',
                starttime: 1557006044009,
                detail: '“黑昼”——昼夜交替解谜游戏点子细节',
                linkedgroup: [0, 1]
            }
        },
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
            uid: 2,
            idea: {
                title: '市场数据分析',
                starttime: 1557006044009,
                detail: 'Analysis the market data.',
                linkedgroup: [0, 1, 2, 3]
            }
        },
        {
            uid: 1,
            idea: {
                title: '绝佳的五道口卫生管理办法',
                starttime: 1557006044009,
                detail: '五道口环境5周解决',
                linkedgroup: [0, 1, 3]
            }
        },
        {
            uid: 1,
            idea: {
                title: '树莓派Kafka集群',
                starttime: 1557006044009,
                detail: '轻量级MM方案',
                linkedgroup: [0, 1, 3]
            }
        },
        {
            uid: 1,
            idea: {
                title: '如何实现真正的云养猫',
                starttime: 1557006044009,
                detail: '让你拥有真正的云猫',
                linkedgroup: [0, 1, 3, 5, 6, 7]
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

$(function() {
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