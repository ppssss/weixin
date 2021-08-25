let com = {
    add: function(obj, name, fun) {
        if (obj.attachEvent) {
            obj.attachEvent('on' + name, fun)
        } else if (obj.addEventListener) {
            obj.addEventListener(name, fun, false)
        } else {
            obj['on' + name] = fun;
        }
    },
    remove: function(obj, name, fun) {
        if (obj.attachEvent) {
            obj.detachEvent('on' + name, fun)
        } else if (obj.addEventListener) {
            obj.removeEventListener(name, fun, false)
        } else {
            obj['on' + name] = null;
        }
    },
    stopBubble: function(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    },
    stopDefault: function(e) {
        e = e || event;
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false
    },
    agent: function(parentId, type, clsName, fun) {
        let parent = document.getElementById(parentId);
        this.add(parent, type, function(e) {
            e = e || event;
            let target = e.target || e.srcElement;
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            let targetId = target.getAttribute('id');
            while (target.className != clsName && targetId != parentId) {
                target = target.parentNode;
                targetId = target.getAttribute('id')
            }
            if (target.className === clsName) {
                fun.call(target) //把fun这个函数绑定到target上，fun中this就是target              
            };
        })
    },
    agent1: function(parentId, type, childName, fun) {
        let parent = document.getElementById(parentId);
        this.add(parent, type, function(e) {
            e = e || event;
            let target = e.target || e.srcElement;
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            let targetId = target.getAttribute('id');
            while (target.nodeName.toLowerCase() != childName && targetId != parentId) {
                target = target.parentNode;
                targetId = target.getAttribute('id')
            }
            if (target.nodeName.toLowerCase() === childName) {
                fun.call(target) //把fun这个函数绑定到target上，fun中this就是target              
            };
        })
    },
    agent2: function(parent, type, childName, fun) {
        this.add(parent, type, function(e) {
            e = e || event;
            let target = e.target || e.srcElement;
            //如果没有找到目标并且当前目标不是祖先对象，继续找（循环）
            let targetId = target.getAttribute('id');
            while (target.nodeName.toLowerCase() != childName && target.nodeName != parent.nodeName) {
                target = target.parentNode;
            }
            if (target.nodeName.toLowerCase() === childName) {
                fun.call(target) //把fun这个函数绑定到target上，fun中this就是target              
            };
        })
    },
    remove: function(el) {
        var toRemove = document.querySelector(el);
        toRemove.parentNode.removeChild(toRemove);
    },
    clearCls: function(els, clsName) {
        for (let i = 0; i < els.length; i++) {
            if (els[i].classList.contains(clsName)) {
                els[i].classList.remove(clsName)
            }
        }
    },
    getScroll: function(obj) {
        let top = 0;
        let left = 0;
        if (obj == document) {
            top = obj.documentElement.scrollTop || obj.body.scrollTop;
            left = obj.documentElement.scrollLeft || obj.body.scrollLeft;
        } else {
            top = obj.scrollTop;
            left = obj.scrollLeft
        }
        return { left, top }
    },
    getWinInnerWH: function() {
        //不包含滚动条的窗口可视区高宽
        let width = document.documentElement.offsetWidth || document.body.offsetWidth;
        let height = document.documentElement.offsetHeight || document.body.offsetHeight;
        return { width, height }
    },
    getWinWH: function() {
        //可视区窗口高宽(包含滚动条)
        let width = window.innerWidth;
        let height = window.innerHeight;
        return { width, height }
    },
    getDocWH: function() {
        //获取文档高宽
        let width = document.documentElement.scrollWidth || document.body.scrollWidth;
        let height = document.documentElement.scrollHeight || document.body.scrollHeight;
        return { width, height }
    }
}