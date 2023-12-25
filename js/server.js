const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
//指定服务器运行的端口号
const port = 3000;
// 使用 cors 中间件
app.use(cors());
// 配置 MySQL 连接

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'hometown'
});

// 连接到 MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// 使用 bodyParser 中间件解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 处理保存信息的请求
//var data = {
//             name: user,
//             message: message,
//             time: time
//         };
app.post('/saveDataToDatabase', (req, res) => {
    const message = req.body.message;
    const user_name = req.body.name;
    const time = req.body.time;
    //console.log(req.body);
    // 将信息保存到数据库
    const sql = 'INSERT INTO messages (user_name, message_text,message_time) VALUES (?, ?, ?);';
    db.query(sql, [user_name, message,time], (err, result) => {
        if (err) {
            console.error('Error saving data to database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('Data saved to database successfully');
        }
    });
});

// 处理查询信息的请求
//result为查询数据库后返回的数据格式为：
//[
//     { "id": 1, "user_name": "John", "message_text": "test1",message_time:"2023-12-23 20:31:18" },
//     { "id": 2, "user_name": "eee", "message_text": "test2",message_time:"2023-12-23 19:31:18" },
//     // ...
// ]
app.get('/getDataFromDatabase', (req, res) => {
    // 查询数据库中的所有信息
    //res.send("Hello world!");
    const sql = 'SELECT * FROM messages';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error retrieving data from database:', err);
            res.status(500).send('Internal Server Error');
        } else {
            //res.json(result) 是 Express 框架中用于向客户端发送 JSON 数据的方法
            //并将提供的 JavaScript 对象 result 转换为 JSON 格式的字符串，然后将这个 JSON 字符串作为响应的主体发送到客户端
            res.json(result);
        }
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
