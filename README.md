云南昭通文化宣传配置

一、mysql数据库导入  
导入文件在 dependencies/hometown.sql（在Mavicat Premium中创建连接，
连接名：root，密码：123456其他不变；在root用户名下创建一个hometown数据库
并在hometown中导入dependencies/hometown.sql数据表）  
安装依赖（后端）：  
npm init -y  
npm install express mysql  
运行后端程序[server.js](js%2Fserver.js)：
node server.js  

如果你希望在修改代码后自动重新启动服务器，你可以使用nodemon工具：  
npm install -g nodemon  
nodemon server.js  

如果一切顺利，你应该会在终端看到类似以下的输出：  
Server is running on http://localhost:3000  
Connected to MySQL


