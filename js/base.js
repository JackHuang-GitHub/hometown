window.addEventListener('load', function() {
    // localStorage.setItem('webstatus', JSON.stringify([]));
	// 共同js
    (function() {
        // 更新用户状态
        let userStatus = JSON.parse(localStorage.getItem('webstatus'))
        // console.log(userStatus)
        if(userStatus){
            if (userStatus.length !== 0){
                console.log('no')
                document.querySelector('.user-status').innerHTML = `当前用户：${userStatus[0].user}`
                document.querySelector('.logout').style.display = 'inline-block'
            }
        }

    }());
    // 用户退出登录
    document.querySelector('.logout').addEventListener('click', function() {
        localStorage.setItem('webstatus', JSON.stringify([]))
                // 更新用户状态
        let userStatus = JSON.parse(localStorage.getItem('webstatus'))
        // console.log(userStatus)
        if (userStatus.length === 0){
            document.querySelector('.user-status').innerHTML = `                欢迎访问! 请 
                <a style="font-size: 18px;color: red;" href="../login.html">登录</a>
                或 
                <a style="font-size: 18px;color: red;" href="../register.html">注册</a>`
            document.querySelector('.logout').style.display = 'none'
        }
        location.reload()
    });
    (function() {
        // 更新顶部北京时间
        let time = document.querySelector('.top-time')
        time.innerHTML = `北京时间： ${new Date().toLocaleString()}`
        let timer = setInterval(function() {
            time.innerHTML = `北京时间： ${new Date().toLocaleString()}`
        }, 1000)
    }());

    (function() {
        // 返回顶部模块
        let totop = document.querySelector('.totop')
        window.addEventListener('scroll', function() {
            if (document.documentElement.scrollTop >= 500) {
                totop.style.display = 'block'
            } else {
                totop.style.display = 'none'
            }
        })
        totop.addEventListener('click', function() {
            document.documentElement.scrollTop = 0
        })
        totop.addEventListener('mouseenter', function() {
            this.querySelector('img').src = 'imgs/totop_hover.png'
            this.querySelector('span').style.color = 'rgb(255,103,0)'
        })
        totop.addEventListener('mouseleave', function() {
            this.querySelector('img').src = 'imgs/totop.png'
            this.querySelector('span').style.color = ''
        })
    }());



})


