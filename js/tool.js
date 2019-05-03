var userAgent = navigator.userAgent;
var isOpera = userAgent.indexOf("Opera") > -1;

function ievertion() {
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1; //不是ie浏览器
    }
}

function isSafari() {
    return userAgent.indexOf("Safari") > -1
}

function isFF() {
    return userAgent.indexOf("Firefox") > -1
}

function isChrome() {
    return userAgent.indexOf("Chrome") > -1
}
/*
  此方法兼容IE
  获取元素的样式：
    参数1：元素
    参数2：样式名
*/
function getstyle(obj, styleName) {
    var cs = obj.currentStyle
    if (cs === undefined) {
        return getComputedStyle(obj, null)[styleName]
    } else {
        return cs[styleName]
    }
}

/*
  事件绑定兼容
  首先要注意：
    addEventListener() 方法中的this是我们绑定的事件
    attachedEvent() 方法中的this是window

  参数：
    1、obj 要绑定的对象
    2、eventStr 绑定事件 (不要on)
    3、callback 回调函数
*/
function bindev(obj, eventStr, callback) {
    if (obj.addEventListener) {
        // 兼容大部分浏览器
        obj.addEventListener(eventStr, callback, false)
    } else {
        /*
          this是谁由调用方式决定
          由于attachEvent()的默认this是window
          为了统一this
          我们可以用下面的方式来指定this
          callback.apply(obj);
        */
        // IE
        obj.attachEvent('on' + eventStr, function() {
            callback.apply(obj)
        })
    }
}
/*
  为元素增加类样式
    参数1：元素
    参数2：类名
*/
function adclass(obj, cn) {
    if (!hasclass(obj, cn)) {
        obj.className += ' ' + cn
    }
}
/*
    为元素移除类样式
      参数1：元素
      参数2：类名
  */
function rmclass(obj, cn) {
    var rgx = new RegExp(' *' + cn + ' *')
    obj.className = obj.className.replace(rgx, ' ')
}
/*
  为元素改变类样式 有就移除 没有就增加
    参数1：元素
    参数2：类名
*/
function cgclass(obj, cn) {
    if (hasclass(obj, cn)) {
        rmclass(obj, cn)
    } else {
        adclass(obj, cn)
    }
}
/*
    查询元素是否有类样式
      参数1：元素
      参数2：类名
  */
function hasclass(obj, cn) {
    var rgx = new RegExp('\\b' + cn + '\\b')
    return rgx.test(obj.className)
}

/*
    获取元素的最终样式 也就是显示在浏览器上的样式
*/
function getfinalstyle(obj, attr) {
    var finalStyle = obj.currentStyle ? obj.currentStyle :
        document.defaultView.getComputedStyle(obj, null)

    return finalStyle[attr]
}

function appendc(parent, child) {
    parent.appendChild(child)
}

function rmlastc(parent) {
    parent.removeChild(parent.lastChild)
}

// function strmaptoobj(strMap) {
//     let obj = Object.create(null)
//     for (let [k, v] of strMap) {
//         // We don’t escape the key '__proto__'
//         // which can cause problems on older engines
//         obj[k] = v
//     }
//     return obj
// }

// function objtostrmap(obj) {
//     let strMap = new Map()
//     for (let k of Object.keys(obj)) {
//         strMap.set(k, obj[k])
//     }
//     return strMap
// }

// function strmaptojson(strMap) {
//     return JSON.stringify(strmaptoobj(strMap))
// }

// function jsontostrmap(jsonStr) {
//     return objtostrmap(JSON.parse(jsonStr))
// }

function getclientw(zoom) {
    let w = document.documentElement.clientWidth
    if (zoom === null || zoom === undefined) {
        return w
    } else {
        return w * zoom
    }
}

function getclienth(zoom) {
    let h = document.documentElement.clientHeight
    if (zoom === null || zoom === undefined) {
        return h
    } else {
        return h * zoom
    }
}

function getwindowh(zoom) {
    let h = window.innerHeight
    if (zoom === null || zoom === undefined) {
        return h
    } else {
        return h * zoom
    }
}

function getwindoww(zoom) {
    let w = window.innerWidth
    if (zoom === null || zoom === undefined) {
        return w
    } else {
        return w * zoom
    }
}

function randomnumboth(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

function c(elementlabel) {
    return document.createElement(elementlabel)
}

/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ?
        module.exports = factory(global) :
        typeof define === 'function' && define.amd ?
        define(factory) : factory(global)
}((
    typeof self !== 'undefined' ? self :
    typeof window !== 'undefined' ? window :
    typeof global !== 'undefined' ? global :
    this
), function(global) {
    'use strict';
    // existing version for noConflict()
    var _Base64 = global.b64;
    var version = "2.4.6";
    // if node.js, we use Buffer
    var buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = require('buffer').Buffer;
        } catch (err) {}
    }
    // constants
    var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c :
                cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6)) +
                    fromCharCode(0x80 | (cc & 0x3f))) :
                (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
                    fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
                    fromCharCode(0x80 | (cc & 0x3f)));
        } else {
            var cc = 0x10000 +
                (c.charCodeAt(0) - 0xD800) * 0x400 +
                (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) +
                fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) +
                fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
                fromCharCode(0x80 | (cc & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
            ord = ccc.charCodeAt(0) << 16 |
            ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8) |
            ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
            chars = [
                b64chars.charAt(ord >>> 18),
                b64chars.charAt((ord >>> 12) & 63),
                padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
                padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
            ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from ?
        function(u) {
            return (u.constructor === buffer.constructor ? u : buffer.from(u))
                .toString('b64')
        } :
        function(u) {
            return (u.constructor === buffer.constructor ? u : new buffer(u))
                .toString('b64')
        } :
        function(u) {
            return btoa(utob(u))
        };
    var encode = function(u, urisafe) {
        return !urisafe ?
            _encode(String(u)) :
            _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) {
        return encode(u, true)
    };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch (cccc.length) {
            case 4:
                var cp = ((0x07 & cccc.charCodeAt(0)) << 18) |
                    ((0x3f & cccc.charCodeAt(1)) << 12) |
                    ((0x3f & cccc.charCodeAt(2)) << 6) |
                    (0x3f & cccc.charCodeAt(3)),
                    offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800) +
                    fromCharCode((offset & 0x3FF) + 0xDC00));
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12) |
                    ((0x3f & cccc.charCodeAt(1)) << 6) |
                    (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6) |
                    (0x3f & cccc.charCodeAt(1))
                );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
            padlen = len % 4,
            n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0) |
            (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0) |
            (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0) |
            (len > 3 ? b64tab[cccc.charAt(3)] : 0),
            chars = [
                fromCharCode(n >>> 16),
                fromCharCode((n >>> 8) & 0xff),
                fromCharCode(n & 0xff)
            ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a) {
        return a.replace(/[\s\S]{1,4}/g, cb_decode);
    };
    var _decode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from ?
        function(a) {
            return (a.constructor === buffer.constructor ?
                a : buffer.from(a, 'b64')).toString();
        } :
        function(a) {
            return (a.constructor === buffer.constructor ?
                a : new buffer(a, 'b64')).toString();
        } :
        function(a) {
            return btou(atob(a))
        };
    var decode = function(a) {
        return _decode(
            String(a).replace(/[-_]/g, function(m0) {
                return m0 == '-' ? '+' : '/'
            })
            .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var b64 = global.b64;
        global.b64 = _Base64;
        return b64;
    };
    // export b64
    global.b64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict
    };
    // if ES5 is available, make b64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v) {
            return {
                value: v,
                enumerable: false,
                writable: true,
                configurable: true
            };
        };
        global.b64.extendString = function() {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function() {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function(urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function() {
                    return encode(this, true)
                }));
        };
    }
    //
    // export b64 to the namespace
    //
    if (global['Meteor']) { // Meteor.js
        b64 = global.b64;
    }
    // module.exports and AMD are mutually exclusive.
    // module.exports has precedence.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports.b64 = global.b64;
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], function() {
            return global.b64
        });
    }
    // that's it!
    return {
        b64: global.b64
    }
}));


function defgetset(url, timeout) {
    if (timeout === undefined) {
        timeout = window.defaulttimeout === undefined ? 10 * 1000 : window.defaulttimeout
    }
    let basegetset = {
        'timeout': timeout,
        'async': true,
        'crossDomain': true,
        'method': 'GET',
        'url': url
    }
    return basegetset
}

function sendget(url, ohyes, ohno, timeout) {
    $.ajax(defgetset(url, timeout)).done(function(resp, textStatus, jqXHR) {
        if (ohyes !== undefined) {
            ohyes(resp, textStatus, jqXHR)
        }
    }).fail(function(xhr, textstatus, errorthrown) {
        if (ohno !== undefined) {
            ohno(xhr, textstatus, errorthrown, url)
        }
    })
}

function sendget(set, ohyes, ohno) {
    $.ajax(set).done(function(response) {
        if (ohyes !== undefined) {
            ohyes(response)
        }
    }).fail(function(xhr, textstatus, errorthrown) {
        if (ohno !== undefined) {
            ohno(xhr, textstatus, errorthrown, set.url)
        }
    })
}

function defpostset(url, form, timeout) {
    if (timeout === undefined) {
        timeout = window.defaulttimeout === undefined ? 10 * 1000 : window.defaulttimeout
    }
    let basepostset = {
        'timeout': timeout,
        'async': true,
        'crossDomain': true,
        'method': 'POST',
        'url': url,
        'processData': false,
        'contentType': false,
        'mimeType': 'multipart/form-data',
        'data': form
    }
    return basepostset
}

function urlencodedpostset(url, data, timeout) {
    if (timeout === undefined) {
        timeout = window.defaulttimeout === undefined ? 10 * 1000 : window.defaulttimeout
    }
    let basepostset = {
        'timeout': timeout,
        'async': true,
        'crossDomain': true,
        'method': 'POST',
        'url': url,
        'data': data,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }
    return basepostset
}

// function sendpost(url, form, ohyes, ohno, timeout) {
//     $.ajax(defpostset(url, form, timeout)).done(function(response) {
//         if (ohyes !== undefined) {
//             ohyes(response)
//         }
//     }).fail(function(xhr, textstatus, errorthrown) {
//         if (ohno !== undefined) {
//             ohno(xhr, textstatus, errorthrown, url)
//         }
//     })
// }

function sendpost(set, ohyes, ohno) {
    $.ajax(set).done(function(response) {
        if (ohyes !== undefined) {
            ohyes(response)
        }
    }).fail(function(xhr, textstatus, errorthrown) {
        if (ohno !== undefined) {
            ohno(xhr, textstatus, errorthrown, set.url)
        }
    })
}

function sendurlencodedpost(url, data, ohyes, ohno, timeout) {
    $.ajax(urlencodedpostset(url, data, timeout)).done(function(response) {
        if (ohyes !== undefined) {
            ohyes(response)
        }
    }).fail(function(xhr, textstatus, errorthrown) {
        if (ohno !== undefined) {
            ohno(xhr, textstatus, errorthrown, url)
        }
    })
}

function defpatchset(url, data, timeout) {
    if (timeout === undefined) {
        timeout = defaulttimeout
    }
    let basepatchset = {
        'timeout': timeout,
        'async': true,
        'crossDomain': true,
        'method': 'PATCH',
        'url': url,
        'data': data
    }
    return basepatchset
}

function sendpatch(url, data, ohyes, ohno, timeout) {
    $.ajax(defpatchset(url, data, timeout)).done(function(response) {
        if (ohyes !== undefined) {
            ohyes(response)
        }
    }).fail(function(xhr, textstatus, errorthrown) {
        if (ohno !== undefined) {
            ohno(xhr, textstatus, errorthrown, url)
        }
    })
}

function arrtoform(arr) {
    if (arr.length > 0) {
        let form = new FormData()
        for (let i = 0; i < arr.length; i++) {
            let key = arr[i].name
            let value = arr[i].value
            if (key !== undefined && value !== undefined) {
                form.append(key, value)
            }
        }
        return form
    }
}

function setPopPanel() {
    let p = c('div')
    p.id = '_popmsg'
    p.style.cssText = 'z-index: 0;background-color: #383d41;line-height: 2.5rem;height: 2.5rem;bottom: 2rem;position: fixed;margin: auto;color: whitesmoke;text-align: center;font-size: 17px;padding: 0 1.5rem;left: 50%;transform: translateX(-50%) scale(0);transition: all .3s;opacity: 0;'
    appendc($('body')[0], p)
}

var popmsgclear

function popmsg(text, interval) {
    if (popmsgclear !== undefined) {
        clearTimeout(popmsgclear)
    }
    $('#_popmsg').text(text)
    $('#_popmsg').css('opacity', '1')
    $('#_popmsg').css('z-index', '9999')
    $('#_popmsg').css('transform', 'translateX(-50%) scale(1)')
    if (interval === undefined) interval = 2500
    popmsgclear = setTimeout(function() {
        $('#_popmsg').css('opacity', '0')
        $('#_popmsg').css('z-index', '0')
        $('#_popmsg').css('transform', 'translateX(-50%) scale(0)')
    }, interval);
}

function setBarPanel() {
    let p = c('div')
    p.id = '_barmsg'
    p.style.cssText = 'width: 100%;z-index: -1;background-color: #383d41;line-height: 2.5rem;bottom: 2rem;position: fixed;margin: auto;color: whitesmoke;text-align: center;font-size: 17px;padding: 0 1.5rem;left: 50%;transform: translateX(-50%);transition: all .3s;opacity: 0;'
    appendc($('body')[0], p)
}

function setBarPanel() {
    let p = c('div')
    p.id = '_barmsg'
    p.style.cssText = 'width: 100%;z-index: -1;background-color: #383d41;line-height: 2.5rem;bottom: 2rem;position: fixed;margin: auto;color: whitesmoke;text-align: center;font-size: 17px;padding: 0 1.5rem;left: 50%;transform: translateX(-50%);transition: all .3s;opacity: 0;'
    appendc($('body')[0], p)
}

function setPanelPanel() {
    let p = c('div')
    p.id = '_panelmsg'
    p.style.cssText = 'z-index: -1;background-color: rgb(255, 255, 255);line-height: 2.5rem;bottom: 0rem;position: fixed;margin: auto;color: rgb(33, 37, 41);font-size: 17px;left: 0;right: 0;transition: all 0.3s ease 0s;opacity: 0;top: 0rem;overflow: auto;padding: 2rem;'
    appendc($('body')[0], p)
}

var barmsgclear

function barmsg(text, interval) {
    if (barmsgclear !== undefined) {
        clearTimeout(barmsgclear)
    }
    $('#_barmsg').html(text)
    $('#_barmsg').css('opacity', '1')
    $('#_barmsg').css('z-index', '9999')
    if (interval === undefined) interval = 2500
    barmsgclear = setTimeout(function() {
        $('#_barmsg').css('opacity', '0')
        $('#_barmsg').css('z-index', '-1')
    }, interval);
}

var panelmsgclear

function panelmsg(html, closefunc) {
    if (panelmsgclear !== undefined) {
        clearTimeout(panelmsgclear)
    }
    $('#_panelmsg').html(html)
    $('#_panelmsg').css('opacity', '1')
    $('#_panelmsg').css('z-index', '9999')
    let pc = c('div')
    pc.id = '_panelmsg_close'
    pc.innerText = 'X'
    pc.style.cssText = 'user-select: none;position: absolute;top: 0;right: 1rem;width: 2rem;text-align: center;background-color: #495057;color: white;cursor: pointer;'
    bindev(pc, 'click', function() {
        $('#_panelmsg').css('opacity', '0')
        $('#_panelmsg').css('z-index', '-1')
        if (closefunc !== undefined) {
            closefunc()
        }
    })
    appendc($('#_panelmsg')[0], pc)
}

$(document).ready(function() {
    setPopPanel()
    setBarPanel()
    setPanelPanel()
})

function ajaxGetFile(url, ohyes, ohno, nonet, pgfunc) {
    var xhr = new XMLHttpRequest()
    if ('withCredentials' in xhr) {
        xhr.open('GET', url, true)
    } else if (typeof XDomainRequest !== 'undefined') {
        xhr = new XDomainRequest()
        xhr.open('GET', url)
    } else {
        xhr = null
    }
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 0) {
            nonet(xhr)
            return
        }
        if (xhr.readyState === 4 && xhr.status === 500) {
            ohno(xhr, url)
            return
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
            ohyes(xhr)
        }
    }
    xhr.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            if (pgfunc !== undefined) {
                pgfunc(percentComplete)
            }
        }
    }, false);
    return xhr
}

function alertAjaxMsg(xhr, textstatus, errorthrown, url, func, head, foot) {
    panelmsg(head + '<br>' +
        '- readyState：' + xhr.readyState + '<br>' +
        '- status：' + xhr.status + '<br>' +
        '- textstatus：' + textstatus + '<br>' +
        '- errorthrown：' + errorthrown + '<br>' +
        '- responseText：' + xhr.responseText + '<br>' +
        '- url：' + url + '<br>' + foot,
        function() {
            func()
        })
}

$.fn.extend({
    animateCss: function(animationName, callback) {
        var animationEnd = (function(el) {
            var animations = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'mozAnimationEnd',
                WebkitAnimation: 'webkitAnimationEnd',
            }
            for (var t in animations) {
                if (el.style[t] !== undefined) {
                    return animations[t]
                }
            }
        })(document.createElement('div'))
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName)
            if (typeof callback === 'function') callback()
        })
        return this
    },
})

function formValidHandle(formselector) {
    $(formselector).each(function() {
        for (let i = 0; i < this.length; i++) {
            let fmItem = $(this[i])
            // 表单控件必须要有name 不然就break
            if (fmItem.attr('name') === undefined) continue
            let it = new Object()
            it.pattern = fmItem.attr('pt')
            it.notnull = (fmItem.attr('notnull') !== undefined)
            it.unvmsg = fmItem.attr('unvmsg')
            it.name = fmItem.attr('name')
            it.id = fmItem.attr('id')
            if (it.pattern === undefined && !it.notnull) continue
            fmItem.bind('input blur', function() {
                let mute = fmItem[0].getAttribute('mute')
                if (mute !== "true") {
                    it.text = fmItem.val()
                    let pass = true
                    if (it.pattern !== undefined) {
                        if (it.text.match(it.pattern) === null) {
                            pass = false
                        }
                    }
                    if (it.notnull && it.text === '') {
                        pass = false
                    }
                    if (pass) {
                        inputRight(it.id)
                        fmItem.attr('pass', true)
                    } else {
                        inputWrong(it.id)
                        fmItem.attr('pass', false)
                        if (it.unvmsg === undefined) {
                            barmsg('请输入非空字符')
                        } else {
                            barmsg(it.unvmsg)
                        }
                    }
                } else {
                    fmItem.attr('pass', true)
                }
            })
        }
    })
}

function inputRight(inputva) {
    $('.fa-check[input-va=' + inputva + ']').css('opacity', 1)
    $('.fa-times[input-va=' + inputva + ']').css('opacity', 0)
}

function inputWrong(inputva) {
    $('.fa-check[input-va=' + inputva + ']').css('opacity', 0)
    $('.fa-times[input-va=' + inputva + ']').css('opacity', 1)
}

function formVreset(selector) {
    $(selector + ' i.fa').css('opacity', 0)
}

function formSubmitEventBind(selector, validfunc) {
    $(selector).bind('submit', function(e) {
        e.preventDefault()
        $(selector + ' textarea').blur()
        $(selector + ' input').blur()
        if ($(selector + ' [pass=false]').length === 0) {
            validfunc($(selector).serializeArray())
        } else {
            barmsg('请按照格式完整的填写表单')
        }
    })
}

function getTimePeriod(ms, limit) {
    if (ms === undefined) {
        return 
    }
    let s = 1000
    let m = 60 * s
    let h = 60 * m
    let d = 24 * h
    if (ms < s) {
        if (ms === 0 || (limit !== undefined && limit.search('ms') === -1)) return ''
        return ms + '毫秒'
    } else if (ms > s && ms < m) {
        if ((limit !== undefined && limit.search('sec') === -1)) return ''
        return parseInt(ms / s) + '秒'
    } else if (ms > m && ms < h) {
        if ((limit !== undefined && limit.search('min') === -1)) return ''
        let min = parseInt(ms / m)
        let sec = getTimePeriod(ms - (min * m), limit)
        return (min) + '分' + sec
    } else if (ms > h && ms < d){
        if ((limit !== undefined && limit.search('hour') === -1)) return ''
        let hour = parseInt(ms / h)
        let min = getTimePeriod(ms - (hour * h), limit)
        return hour + '小时' + min
    } else {
        if ((limit !== undefined && limit.search('day') === -1)) return ''
        let day = parseInt(ms / d)
        let hour = getTimePeriod(ms - (day * d), limit)
        return day + '天' + hour
    }
}

function getjwtcliam(jwt, name) {
    let payload = jwt.split('.')[1]
    return JSON.parse(b64.decode(payload))[name]
}

function localget(key) {
    return localStorage.getItem(key)
}

function localsave(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj))
}

function localremove(key) {
    localStorage.removeItem(key)
}