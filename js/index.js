window.addEventListener('load', function() {
	// 
	(function() {
	// 轮播图模块

		// 鼠标划过小圆点更改图片
		// 小圆点元素
		let ls = document.querySelectorAll('.ls li')
		// 图片元素
		let imgs = document.querySelectorAll('.imgs-bar li')
		for (let i = 0; i < ls.length; i++){
			ls[i].addEventListener('mousemove', function() {
				document.querySelector('.ls .active').classList.remove('active')
				this.classList.add('active')

				document.querySelector('.imgs-bar .active').classList.remove('active')
				imgs[i].classList.add('active')
			})
		}
		// 添加计数器
		let index = 0
		function changeImgs() {
			index ++
			index = index % ls.length
			// console.log(index)
			document.querySelector('.ls .active').classList.remove('active')
			ls[index].classList.add('active')

			document.querySelector('.imgs-bar .active').classList.remove('active')
			imgs[index].classList.add('active')
		}
		// 添加定时器
		let timer = setInterval(changeImgs, 3000)
		// 鼠标划入则停止轮播
		document.querySelector('.imgs-wrapper').addEventListener('mouseenter', function() {
			clearInterval(timer)
		})
		// 鼠标滑出则开始轮播
		document.querySelector('.imgs-wrapper').addEventListener('mouseleave', function() {
			timer = setInterval(changeImgs, 3000)
		})
		// text text
		let text = document.querySelector('.logo')
		text.addEventListener('click', function() {
			// changeImgs()
		})
	}());
})
