// 在页面加载完成后调用 error_ini 函数
window.onload = function() {
    error_ini();
};

// 你的 error_ini 函数
function error_ini() {
    //console.log('error_ini 函数被执行了！');
    // 在这里添加你的代码
    var urlParams = new URLSearchParams(window.location.search);
    var errorinfo = urlParams.get('errorinfo');
    document.getElementById("errorinformation").textContent = errorinfo;
}