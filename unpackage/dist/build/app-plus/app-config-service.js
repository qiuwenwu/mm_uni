
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/media/music","pages/media/picture","pages/media/video","pages/account/forgot","pages/account/login","pages/account/register","pages/article/list","pages/article/details","pages/forum/list","pages/forum/details","pages/goods/list","pages/goods/details","pages/cart/index","pages/message/index","pages/notice/list","pages/notice/details","pages/order/list","pages/order/details","pages/user/index","pages/user/password","pages/user/base"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"长盛","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8","background":"#efeff4"},"tabBar":{"color":"#8a8a8a","selectedColor":"#3388FF","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"static/img/home_a.png","selectedIconPath":"static/img/home_b.png"},{"pagePath":"pages/order/list","text":"订单","iconPath":"static/img/order_a.png","selectedIconPath":"static/img/order_b.png"},{"pagePath":"pages/user/index","text":"我的","iconPath":"static/img/my_a.png","selectedIconPath":"static/img/my_b.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"changsheng_uni","compilerVersion":"3.1.2","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页"}},{"path":"/pages/media/music","meta":{},"window":{"navigationBarTitleText":"音乐","backgroundColor":"#000000"}},{"path":"/pages/media/picture","meta":{},"window":{"navigationBarTitleText":"图片预览","backgroundColor":"#000000"}},{"path":"/pages/media/video","meta":{},"window":{"navigationBarTitleText":"视频","backgroundColor":"#000000"}},{"path":"/pages/account/forgot","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/account/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/account/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/article/list","meta":{},"window":{"navigationBarTitleText":"文章列表"}},{"path":"/pages/article/details","meta":{},"window":{"navigationBarTitleText":"文章详情"}},{"path":"/pages/forum/list","meta":{},"window":{"navigationBarTitleText":"论坛列表"}},{"path":"/pages/forum/details","meta":{},"window":{"navigationBarTitleText":"论坛详情"}},{"path":"/pages/goods/list","meta":{},"window":{"navigationBarTitleText":"产品展示"}},{"path":"/pages/goods/details","meta":{},"window":{"navigationBarTitleText":"产品详情"}},{"path":"/pages/cart/index","meta":{},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/message/index","meta":{},"window":{"navigationBarTitleText":"留言板"}},{"path":"/pages/notice/list","meta":{},"window":{"navigationBarTitleText":"公告列表"}},{"path":"/pages/notice/details","meta":{},"window":{"navigationBarTitleText":"公告"}},{"path":"/pages/order/list","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/order/details","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/user/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我"}},{"path":"/pages/user/password","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/user/base","meta":{},"window":{"navigationBarTitleText":"基本信息"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});