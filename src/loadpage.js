/**
 * 页面加载器
 * author: lovefc
 * blog：https://lovefc.cn
 * github: https://github.com/lovefc/loadpage
 * gitee: https://gitee.com/lovefc/loadpage
 * time: 2021/09/28 17:41
 */
class loadpage {
	// 构造函数,开始了
	constructor(options) {
		let that = this;
		this.loadCss = './css/style.css'; // 要加载的css
		
		this.animateCss = './css/animate.css'; // 要加载动画css
		
		this.animateName = 'fadeOut'; // 要执行的动画名称

		this.delayTime = 1000; // 延迟时间 
		
		this.loadMode = 'all'; // 加载方式,part(局部,也就是dom渲染完),all(等待图片等资源)

		this.divHtml = `
            <div class="loader"><div class="inner one"></div><div class="inner two"></div><div class="inner three"></div></div>		
		`;
		// 这里用了个暴力的方式来覆盖初始配置
		for (let key in options) {
			if (key in that) {
				that[key] = options[key];
			}
		}
		if (this.isSystem()==='node') {
			require(`${this.loadCss}`);
			require(`${this.animateCss}`);
		}		
	}
	// 判断执行模式
	isSystem() {
		if (typeof window === 'object') {
			return 'win';
		} else if (Object.prototype.toString.call(process) === '[object process]') {
			return 'node';
		}
	}
	loading() {
		this.openLoading();
		this.addHeadJs();
	}
	addHeadCss() {
		let head = document.getElementsByTagName('head')[0];
		let style = document.createElement('style');
		let css = `
            .fc_loadpage{
                width:100% !important;
                height:calc(100%) !important;
				background-image: radial-gradient(circle farthest-corner at center, #FFF 0%, #F8F8F8 100%) !important;
				opacity:1 !important;
				filter:alpha(opacity=100) !important;
				overflow:visible !important;
				position:fixed !important;
				top:0 !important;
				left:0 !important;
				bottom:0 !important;
				right:0 !important;
				z-index:9998;
			}	
		`;
		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}
	// 开启loading
	openLoading() {
		this.addHeadCss();
		if (this.isSystem()==='win') {
			this.loadStyle(this.loadCss, 'head');
			this.loadStyle(this.animateCss,'head');
		}
		this.addLoadIngDiv();
	}
	// 关闭loading
	closeLoading() {
		this.closePageLoading(this.animateName,this.delayTime);
	}
	closePageLoading(animateName,delayTime) {
		let box = document.getElementById("fc_loader");
		let a_time = Math.round(delayTime/1000);
	    let animation = `${animateName} ${a_time}s`;
	    box.style.animation=animation;
		setTimeout(function(){
			if (box) {
				box.remove();
			}
		},(delayTime));
	}
	addHeadJs() {
		let head = document.getElementsByTagName('head')[0];
		let script = document.createElement('script');
		script.type = 'text/javascript';
		this.closeLoading2 = `function ${this.closePageLoading}`;
		let dom_load = `
			document.addEventListener('DOMContentLoaded',function(){
	            setTimeout(${this.closeLoading2}("${this.animateName}",${this.delayTime}),${this.delayTime});
            });		
	    `;
		let all_load = `
            document.onreadystatechange = runLoading; 
			function runLoading(){
				if(document.readyState == "complete"){
					setTimeout(${this.closeLoading2}("${this.animateName}",${this.delayTime}),${this.delayTime});
				}
			}
		`;
		let load = all_load;
		if(this.loadMode === 'part'){
			load = dom_load;
		}
		script.text = load;
		head.appendChild(script);
	}
	completeLoading() {
		if (document.readyState == "complete") {
			let box = document.getElementById("fc_loader");
			box.remove();
		}
	}
	loadStyle(url, tagname) {
		let link = document.createElement('link');
		link.type = 'text/css';
		link.rel = 'stylesheet';
		link.href = url;
		let head = document.getElementsByTagName(tagname)[0];
		let em = (tagname == 'body') ? document.body : head;
		em.appendChild(link);
	}
	removeStyle(filename) {
		let targetelement = "link";
		let targetattr = "href";
		let allsuspects = document.getElementsByTagName(targetelement);
		for (let i = allsuspects.length; i >= 0; i--) {
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
		}
	}
	loadScript(url, tagname) {
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		let head = document.getElementsByTagName(tagname)[0];
		let em = (tagname == 'body') ? document.body : head;
		em.appendChild(script);
	}
	removeScript(filename) {
		let targetelement = "script";
		let targetattr = "src";
		let allsuspects = document.getElementsByTagName(targetelement);
		for (let i = allsuspects.length; i >= 0; i--) {
			if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
				allsuspects[i].parentNode.removeChild(allsuspects[i]);
		}
	}
	addLoadIngDiv() {
		let parent = document.body;
		let div = document.createElement("div");
		let divhtml = this.divHtml;
		let html = `
		    <div class="fc_loadpage" id="fc_loader">${divhtml}</div>
		`;
		div.innerHTML = html;
		parent.appendChild(div);
	}

	// 设置样式
	setStyle() {
		let body = document.body;
		let html = document.documentElement;
		html.style.overflow = "visible";
		html.style.height = "auto";
		body.style.overflow = "visible";
		body.style.height = "auto";
	}

}

; (function (factory) {
	if (typeof exports === "object") {
		module.exports = factory();
	} else if (typeof define === "function" && define.amd) {
		define(factory);
	} else {
		let glob;
		try {
			glob = window;
		} catch (e) {
			glob = self;
		}
		glob.loadpage = factory();
	}
})(function () {
	'use strice';
	return loadpage;
});


//let load = new loadpage({ delayTime: 5000 });
//load.loading();
