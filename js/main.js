window.onload = function() {
    /* localStorage.clear(); */
    /* 17、调用随机码生成函数创建随机码 */
    createVerifCode();
}
// Criando uma variável para "pegar" todos os inputs
const inputs = document.querySelectorAll('.input');

// Função para adicionar o label dinâmico nos inputs
function focusFunc() {
    let parent = this.parentNode.parentNode;
    parent.classList.add('focus');
}

// Função para recolher o label dinâmico quando houver um clique do mouse fora do form
function blurFunc() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove('focus');
    }
}

// Função para adicionar os eventos
inputs.forEach(input => {
    input.addEventListener('focus', focusFunc);
    input.addEventListener('blur', blurFunc);
});

// Pegando o modal
var modal = document.getElementById("modal-terms");

// Pegando o botão que dispara o modal
var btn = document.getElementById("action-modal");

// Pegando o elemento <span> que fecha o modal
var span = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, o modal será exibido
btn.onclick = function () {
    modal.style.display = "block";
}

// Quando o usuário clicar no <span> (x), o modal será fechado
span.onclick = function () {
    modal.style.display = "none";
}

// Quando o usuário clicar em qualquer lugar fora do modal, ele será fechado
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
var user = new Object();
user.user = "";
user.pass = "";
user.email = "";
function regist() {
    //console.log("regist 函数被调用了");
    var sName = document.getElementById("registUserName").value;
    var sPass = document.getElementById("registUserPass").value;
    var cPass = document.getElementById("conformPass").value;
    var Email = document.getElementById("Email").value;
    var checkbox = document.getElementById('myCheckbox');
    if (checkbox.checked){
        if (sPass == cPass) {
            user.user = sName;
            user.pass = sPass;
            user.email = Email;
            var num = localStorage.length;
            var n = num + 1;
            if (num == 0) {
                localStorage.setItem(n, JSON.stringify(user));
                window.location.href = 'sucess.html';
                alert("已经注册成功！");
            } else {
                for (var i = 0; i < num; i++) {
                    try {
                        var name = localStorage.key(i);
                        var storageuser = JSON.parse(localStorage.getItem(name));
                        if (storageuser.user == user.user || storageuser.email == user.email) {
                            var targetPage = 'error.html?errorinfo=' + encodeURIComponent("该用户名或电子邮件已经存在，请重新输入！");
                            window.location.href = targetPage;
                            break;
                        }
                    }catch (error){
                        continue;
                    }
                }
                if (i == num) {
                    localStorage.setItem(n, JSON.stringify(user));
                    window.location.href = 'sucess.html';
                }
            }
        } else {
            //window.location.href = 'error.html';
            var targetPage = 'error.html?errorinfo=' + encodeURIComponent("密码输入不一致！");
            window.location.href = targetPage;
        }
    }else{
        alert("未阅读条款");
    }
    document.getElementById("registUserName").value="";
    document.getElementById("Email").value="";
    document.getElementById("registUserPass").value="";
    document.getElementById("conformPass").value="";


}

function login(){
    /*25、获取用户名文本框中输入的值赋值给userName变量*/
    var userName=document.getElementById("loginUserName").value;

    /*26、获取密码文本框中输入的值赋值给userPass变量*/
    var userPass=document.getElementById("loginUserPass").value;

    var num = localStorage.length;
    //alert(num);

    /*28、获取验证码显示区域的内容赋值给code变量*/
    var code=document.getElementById("verifCode").innerHTML;

    /*29、获取验证码文本框中输入的值赋值给usercode变量*/
    var usercode=document.getElementById("verification").value;
    if (usercode){
        if(code==usercode){
            for (var i = 0; i < num; i++) {
                try {
                    var name = localStorage.key(i);
                   // alert(localStorage.getItem(name));

                    var storageuser= JSON.parse(localStorage.getItem(name));
                    /*27、在循环如果存在获取的文本框中的用户名和密码
                    与存储用户的用户名和密码都相等则结束循环*/
                    if(storageuser.user==userName&&storageuser.pass==userPass){
                        localStorage.setItem('webstatus', JSON.stringify(storageuser));
                        break;
                    }
                }catch (error){
                    // 在这里执行处理错误的代码，可以选择继续循环
                    continue;
                }
            }
            if(i==num){
                alert("用户名不存在或密码不正确！");

            }else{
                window.location.href = 'index.html';
                return false;
            }
        }else {
            alert("验证码输入错误！");
            document.getElementById("verification").value="";
            // createVerifCode();
            document.getElementById("verification").focus();
        }
    }else {
        alert("请输入验证码！");
        document.getElementById("verification").focus();
    }
    // document.getElementById("loginUserName").value="";
    // document.getElementById("loginUserPass").value="";
    document.getElementById("verification").value="";
    createVerifCode();
    return false;
}

function verifyEmail() {
    var email = document.getElementById("verifyemail").value;
    var num = localStorage.length;

    for (var i = 0; i < num; i++) {
        var name = localStorage.key(i);
        var storageUser = JSON.parse(localStorage.getItem(name));

        if (storageUser.email == email) {
            // 构建目标页面的 URL，将参数添加到 URL 中
            break;
        }
    }
    if (i == num){
        alert("该电子邮件并未注册");
    } else {
        var targetPage = 'changePassword.html?key=' + encodeURIComponent(name) + '&email=' + encodeURIComponent(email);
        window.location.href = targetPage;
        return false;
    }

    return false;
}

function changePass() {
    var onePass = document.getElementById("onepass").value;
    var twoPass = document.getElementById("twopass").value;
    // 获取 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);
    var email = urlParams.get('email');
    var key = urlParams.get('key');

    if (onePass == twoPass) {
        var originalData = localStorage.getItem(key);
        if (originalData) {
            //console.log("原始数据:", originalData);

            // 修改数据（这里假设数据是 JSON 字符串）
            var parsedData = JSON.parse(originalData);
            parsedData.pass = onePass;
            // 将修改后的数据保存回 localStorage
            localStorage.setItem(key, JSON.stringify(parsedData));
            alert("修改密码成功");
            // 在点击按钮后延迟 2000 毫秒执行这个函数
            // setTimeout(function() {
            //     console.log("这段代码将在按钮点击后的 2000 毫秒后执行");
            // }, 2000);
            window.location.href="login.html";
            return false;
        } else {
            alert("!!");
        }
    }else { //两次密码不一致
        alert("密码不一致，请重新输入");
    }
    return false;
}


function createVerifCode() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var randcode = "";
    for (var i = 0; i < 5; i++) {
        /*23、将产生的[0,chars.length)之间的整数赋值给randpos变量*/
        var randpos = Math.floor(Math.random() * chars.length);

        randcode += chars[randpos];
    }
    /*24、将产生的随机码赋值给验证码显示区域的内容*/
    // 在生成随机码后，将其设置为 input 元素的值
    document.getElementById("verifCode").textContent = randcode;

}





