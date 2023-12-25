// 获取留言按钮元素
let btn = document.querySelector('.msg-innner button')
// 获取留言框的内容元素
let content = document.querySelector('textarea')
// 获取当前用户
let user = JSON.parse(localStorage.getItem('webstatus'))

// 如果用户已登录
if (user) {
    if (user.length !== 0) {
        btn.addEventListener('click', function () {
            if (content.value.trim() === '') {
                alert('内容不能为空！')
                content.value = ''
                return false
            }
            console.log(user.user)
            console.log(content.value)

            let arr = getData()
            arr.push({
                user: user.user,
                content: content.value,
                time: new Date().toLocaleString()
            })
            localStorage.setItem('webmsg', JSON.stringify(arr))
            content.value = ''
            Render()
        })
    } else {
        btn.addEventListener('click', function () {
            alert('请登录！')
        })
    }
} else {
    btn.addEventListener('click', function () {
        alert('请登录！')
    })
}


// 从本地存储获取留言数据
getData()

function getData() {
    let arr = localStorage.getItem('webmsg')
    if (arr) {
        return JSON.parse(arr)
    } else {
        localStorage.setItem('webmsg', JSON.stringify([
            {
                user: 'bot-1',
                content: '该留言存在争议，暂时隐藏',
                time: '2022/11/27 16:20:35'
            },
            {
                user: 'bot-2',
                content: '来宾真美丽！',
                time: '2022/11/27 16:20:35'
            },
            {
                user: 'bot-3',
                content: '好像克来宾逛下子',
                time: '2022/11/27 16:20:35'
            },
        ]))
    }
}

// 渲染留言列表
Render()

function Render() {
    let arr = getData()
    let ul = document.querySelector('.msg-content')
    ul.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li')
        li.innerHTML = `
					<h3 id="user">${arr[i].user}</h3>
					<p>${arr[i].content}</p>
					<span id="time">${arr[i].time}</span>
				`
        // ul.appendChild(li)
        ul.insertBefore(li, ul.children[0])
    }
}

// 按回车发送留言
content.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        btn.click()
        e.preventDefault()
    }
})
function saveDataToDatabase() {
    const message = document.querySelector('textarea').value;
    // 获取当前用户
    let user = JSON.parse(localStorage.getItem('webstatus'));

    // 使用 AJAX 发送 POST 请求到后端保存数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert('Data saved to database successfully');
            } else {
                alert('Error saving data to database');
            }
        }
    };
    xhr.open('POST', 'http://localhost:3000/saveDataToDatabase', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ message: message,name:user.user}));
}
function getDataFromDatabase() {
    // 使用 AJAX 发送 GET 请求到后端获取数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                displayMessages(JSON.parse(xhr.responseText));
            } else {
                alert('Error retrieving data from database');
            }
        }
    };
    xhr.open('GET', 'http://localhost:3000/getDataFromDatabase', true);
    xhr.send();
}
function displayMessages(messages) {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';

    messages.forEach(function (message) {
        const li = document.createElement('li');
        li.textContent = message.message_text;
        messageList.appendChild(li);
    });
}