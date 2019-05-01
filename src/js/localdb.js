// user table:
//  id
//  username
//  nickname
//  intro 
//  password
//  email

var lcoaldb_usertb = {
    idkey: 1,
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
    ]
}

$(function () {
    if (localStorage['userdb'] === null) {
        localStorage.setItem('userdb', JSON.stringify(lcoaldb_usertb))
    }
})