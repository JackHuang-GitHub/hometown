function saveDataToDatabase(user,message,time) {
    //var message = document.querySelector('textarea').value;
    // 获取当前用户
    //var user = JSON.parse(localStorage.getItem('webstatus'));

    // 使用 AJAX 发送 POST 请求到后端保存数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //alert('Data saved to database successfully');
                getDataFromDatabase();
            } else {
                alert('Error saving data to database '+xhr.readyState+' '+xhr.status);
            }
        }
    };
    // 构造要发送的数据对象
    var data = {
        name: user,
        message: message,
        time: time
    };
    //用于将 JavaScript 对象转换为 JSON 格式的字符串
    var jsonData = JSON.stringify(data);

    xhr.open('POST', 'http://localhost:3000/saveDataToDatabase', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonData);
}

function getDataFromDatabase() {
    // 使用 AJAX 发送 GET 请求到后端获取数据
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //alert('successful retrieving data from database');
                //JSON.parse用于将 JSON 字符串解析为对应的 JavaScript 对象
                displayMessages(JSON.parse(xhr.responseText));
            } else {
                alert('Error retrieving data from database');
            }
        }
    };
    xhr.open('GET', 'http://localhost:3000/getDataFromDatabase', true);
    xhr.send();
}