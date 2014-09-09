//swipe.min.js
window.Swipe = function(e, t) {
    if (!e) return null;
    var n = this;
    this.options = t || {};
    this.index = this.options.startSlide || 0;
    this.speed = this.options.speed || 300;
    this.callback = this.options.callback ||
    function() {};
    this.delay = this.options.auto || 0;
    this.container = e;
    this.element = this.container.children[0];
    this.container.style.overflow = "hidden";
    this.element.style.listStyle = "none";
    this.element.style.margin = 0;
    this.setup();
    this.begin();
    if (this.element.addEventListener) {
        this.element.addEventListener("touchstart", this, false);
        this.element.addEventListener("touchmove", this, false);
        this.element.addEventListener("touchend", this, false);
        this.element.addEventListener("webkitTransitionEnd", this, false);
        this.element.addEventListener("msTransitionEnd", this, false);
        this.element.addEventListener("oTransitionEnd", this, false);
        this.element.addEventListener("transitionend", this, false);
        this.element.addEventListener("MSPointerDown", this, false);
        this.element.addEventListener("MSPointerMove", this, false);
        this.element.addEventListener("MSPointerUp", this, false);
        window.addEventListener("resize", this, false)
    }
};
Swipe.prototype = {
    setup: function() {
        this.slides = this.element.children;
        this.length = this.slides.length;
        if (this.length < 2) return null;
        this.width = Math.ceil("getBoundingClientRect" in this.container ? this.container.getBoundingClientRect().width: this.container.offsetWidth);
        if (!this.width) return null;
        this.container.style.visibility = "hidden";
        this.element.style.width = Math.ceil(this.slides.length * this.width) + "px";
        var e = this.slides.length;
        while (e--) {
            var t = this.slides[e];
            t.style.width = this.width + "px";
            t.style.display = "table-cell";
            t.style.verticalAlign = "top"
        }
        this.slide(this.index, 0);
        this.container.style.visibility = "visible"
    },
    slide: function(e, t) {
        var n = this.element.style;
        if (t == undefined) {
            t = this.speed
        }
        n.webkitTransitionDuration = n.MozTransitionDuration = n.msTransitionDuration = n.OTransitionDuration = n.transitionDuration = t + "ms";
        n.MozTransform = n.webkitTransform = "translate3d(" + -(e * this.width) + "px,0,0)";
        n.msTransform = n.OTransform = "translateX(" + -(e * this.width) + "px)";
        this.index = e
    },
    getPos: function() {
        return this.index
    },
    prev: function(e) {
        this.delay = e || 0;
        clearTimeout(this.interval);
        if (this.index) this.slide(this.index - 1, this.speed)
    },
    next: function(e) {
        this.delay = e || 0;
        clearTimeout(this.interval);
        if (this.index < this.length - 1) this.slide(this.index + 1, this.speed);
        else this.slide(0, this.speed)
    },
    begin: function() {
        var e = this;
        this.interval = this.delay ? setTimeout(function() {
            e.next(e.delay)
        },
        this.delay) : 0
    },
    stop: function() {
        this.delay = 0;
        clearTimeout(this.interval)
    },
    resume: function() {
        this.delay = this.options.auto || 0;
        this.begin()
    },
    handleEvent: function(e) {
        switch (e.type) {
        case "touchstart":
            this.onTouchStart(e);
            break;
        case "touchmove":
            this.onTouchMove(e);
            break;
        case "touchend":
            this.onTouchEnd(e);
            break;
        case "MSPointerDown":
        	this.onMSPointerDown(e);
        	break;
        case "MSPointerMove":
        	this.onMSPointerMove(e);
            break;
        case "MSPointerUp":
        	this.onMSPointerUp(e);
        	break;
        case "webkitTransitionEnd":
        case "msTransitionEnd":
        case "oTransitionEnd":
        case "transitionend":
            this.transitionEnd(e);
            break;
        case "resize":
            this.setup();
            break
        }
    },
    transitionEnd: function(e) {
        if (this.delay) this.begin();
        this.callback(e, this.index, this.slides[this.index])
    },
    onTouchStart: function(e) {
        this.start = {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY,
            time: Number(new Date)
        };
        this.isScrolling = undefined;
        this.deltaX = 0;
        this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;
        e.stopPropagation()
    },
    onTouchMove: function(e) {
        if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
        this.deltaX = e.touches[0].pageX - this.start.pageX;
        if (typeof this.isScrolling == "undefined") {
            this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY))
        }
        if (!this.isScrolling) {
            e.preventDefault();
            clearTimeout(this.interval);
            this.deltaX = this.deltaX / (!this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0 ? Math.abs(this.deltaX) / this.width + 1 : 1);
            this.element.style.MozTransform = this.element.style.webkitTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)";
            e.stopPropagation()
        }
    },
    onTouchEnd: function(e) {
        var t = Number(new Date) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
        n = !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0;
        if (!this.isScrolling) {
            this.slide(this.index + (t && !n ? this.deltaX < 0 ? 1 : -1 : 0), this.speed)
        }
        e.stopPropagation()
    },
    onMSPointerDown:function(e){
    	if (e.pointerType != e.MSPOINTER_TYPE_TOUCH) return;
    	var t=this.creatTouchObject(e);
    	this.msStart = {
            pageX: t.pageX,
            pageY: t.pageY,
            time: Number(new Date)
        };
        this.isScrolling = undefined;
        this.deltaX = 0;
        this.element.style.msTransitionDuration = 0;
        e.stopPropagation()
    },
    onMSPointerMove:function(e){
    	if (e.pointerType != e.MSPOINTER_TYPE_TOUCH) return;
    	//if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
    	var t=this.creatTouchObject(e);
        this.deltaX = t.pageX - this.msStart.pageX;
        if (typeof this.isScrolling == "undefined") {
            this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(t.pageY - this.msStart.pageY))
        }
        if (!this.isScrolling) {
            e.preventDefault();
            clearTimeout(this.interval);
            this.deltaX = this.deltaX / (!this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0 ? Math.abs(this.deltaX) / this.width + 1 : 1);
            this.element.style.msTransform = "translate3d(" + (this.deltaX - this.index * this.width) + "px,0,0)";
            e.stopPropagation()
        }
    },
    onMSPointerUp:function(e){
    	if (e.pointerType != e.MSPOINTER_TYPE_TOUCH) return;
    	var t = Number(new Date) - this.msStart.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
        n = !this.index && this.deltaX > 0 || this.index == this.length - 1 && this.deltaX < 0;
        if (!this.isScrolling) {
            this.slide(this.index + (t && !n ? this.deltaX < 0 ? 1 : -1 : 0), this.speed)
        }
        e.stopPropagation()
    },
    creatTouchObject:function(e){
    	return {pageX:e.clientX,pageY:e.clientY};
    }
}




//MultiPhotoSwipe
window.MultiSwipe = function(e, t) {
    if (!e) return null;
    var n = this;
    this.options = t || {},
    this.index = this.options.startSlide || 0,
    this.speed = this.options.speed || 300,
    this.callback = this.options.callback ||
    function() {},
    this.delay = this.options.auto || 0,
    this.container = e,
    this.touches = {}, 
    this.changedTouches = {},
    this.element = this.container.children[0],
    this.container.style.overflow = "hidden",
    this.element.style.listStyle = "none",
    this.element.style.margin = 0,
    this.setup(),
    this.begin(),
    this.element.addEventListener && (this.element.addEventListener("touchstart", this, !1), 
	this.element.addEventListener("touchmove", this, !1), 
	this.element.addEventListener("touchend", this, !1), 
	this.element.addEventListener("webkitTransitionEnd", this, !1), 
	this.element.addEventListener("msTransitionEnd", this, !1), 
	this.element.addEventListener("oTransitionEnd", this, !1), 
	this.element.addEventListener("transitionend", this, !1), 
	this.element.addEventListener('MSPointerDown',this, !1),
	this.element.addEventListener('MSPointerMove',this, !1),
	this.element.addEventListener('MSPointerUp',this, !1),
	window.addEventListener("resize", this, !1))
},
MultiSwipe.prototype = {
    setup: function() {
        this.slides = this.element.children,
        this.itemWidth = this.slides[0].offsetWidth,
        this.length = this.slides.length,
        this.width = Math.ceil("getBoundingClientRect" in this.container ? this.container.getBoundingClientRect().width: this.container.offsetWidth);
        if (this.length * this.itemWidth < this.width) return null;
        if (!this.width) return null;
        this.moveCount = Math.ceil(this.length * this.itemWidth / this.width),
        this.moveStar = Math.ceil(this.width / this.itemWidth) - 1,
        this.container.style.visibility = "hidden",
        this.element.style.width = Math.ceil(this.slides.length * this.itemWidth > this.width ? this.slides.length * this.itemWidth: this.width) + "px";
        var starPadding = (this.width / this.itemWidth - Math.floor(this.width / this.itemWidth)) * this.itemWidth - 10,
            endStar = ((this.moveCount-1) * this.moveStar - (this.moveStar - (this.length - (this.moveCount-1) * this.moveStar))) * this.itemWidth - starPadding,
            estEndStar=(this.width-10-starPadding)*(this.moveCount-1);
        this.moveCount=estEndStar<endStar?this.moveCount+1:this.moveCount;
        var e = this.slides.length;
        while (e--) {
            var t = this.slides[e];
            t.style.width = this.itemWidth + "px",
            t.style.display = "table-cell",
            t.style.verticalAlign = "top"
        };
        this.slide(this.index, 0),
        this.container.style.visibility = "visible"
    },
    slide: function(e, t) {
        if (this.length * this.itemWidth < this.width || !this.width) return;
        if (e == (this.moveCount - 1)) {
            var n = this.element.style;
            t == undefined && (t = this.speed),
            starPadding = (this.width / this.itemWidth - Math.floor(this.width / this.itemWidth)) * this.itemWidth - 10;
            endStar = (e * this.moveStar - (this.moveStar - (this.length - e * this.moveStar))) * this.itemWidth - starPadding,
            n.webkitTransitionDuration = n.MozTransitionDuration = n.msTransitionDuration = n.OTransitionDuration = n.transitionDuration = t + "ms",
            n.MozTransform = n.webkitTransform = "translate3d(" + -endStar + "px,0,0)",
            n.msTransform = n.OTransform = "translateX(" + -endStar + "px)"
        } else {
            var n = this.element.style;
            t == undefined && (t = this.speed),
            n.webkitTransitionDuration = n.MozTransitionDuration = n.msTransitionDuration = n.OTransitionDuration = n.transitionDuration = t + "ms",
            n.MozTransform = n.webkitTransform = "translate3d(" + -(e * this.moveStar * this.itemWidth) + "px,0,0)",
            n.msTransform = n.OTransform = "translateX(" + -(e * this.moveStar * this.itemWidth) + "px)"
        };
        this.index = e
    },
    getPos: function() {
        return this.index
    },
    prev: function(e) {
        this.delay = e || 0,
        clearTimeout(this.interval),
        this.index && this.slide(this.index - 1, this.speed)
    },
    next: function(e) {
        this.delay = e || 0,
        clearTimeout(this.interval);
        if(this.index < this.moveCount - 1){
            this.slide(this.index + 1, this.speed)
        }
        else{
            return;
        }
        console.log(this.index+","+(this.moveCount - 1));
    },
    begin: function() {
        var e = this;
        this.interval = this.delay ? setTimeout(function() {
            e.next(e.delay)
        },
        this.delay) : 0
    },
    stop: function() {
        this.delay = 0,
        clearTimeout(this.interval)
    },
    resume: function() {
        this.delay = this.options.auto || 0,
        this.begin()
    },
    handleEvent: function(e) {
        switch (e.type) {
        case "touchstart":
            this.onTouchStart(e);
            break;
        case "touchmove":
            this.onTouchMove(e);
            break;
        case "touchend":
            this.onTouchEnd(e);
            break;
        case "MSPointerDown":
        	this.onMSPointerDown(e);
        	break;
        case "MSPointerMove":
        	this.onMSPointerMove(e);
            break;
        case "MSPointerUp":
        	this.onMSPointerUp(e);
        	break;
        case "webkitTransitionEnd":
        case "msTransitionEnd":
        case "oTransitionEnd":
        case "transitionend":
            this.transitionEnd(e);
            break;
        case "resize":
            this.setup()
            this.slide(0,this.speed);
        }
    },
    transitionEnd: function(e) {
        this.delay && this.begin(),
        this.callback(e, this.index, this.slides[this.index])
    },
    onTouchStart: function(e) {
        this.start = {
            pageX: e.touches[0].pageX,
            pageY: e.touches[0].pageY,
            time: Number(new Date)
        },
        this.isScrolling = undefined,
        this.deltaX = 0,
        this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0,
        e.stopPropagation()
    },
    onTouchMove: function(e) {
		if (this.length * this.itemWidth < this.width || !this.width) return;
        if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
        this.deltaX = e.touches[0].pageX - this.start.pageX;
        var starPadding = (this.width / this.itemWidth - Math.floor(this.width / this.itemWidth)) * this.itemWidth - 10;
        var endStar = (this.index * this.moveStar - (this.moveStar - (this.length - this.index * this.moveStar))) * this.itemWidth - starPadding;
        if (this.index == this.moveCount - 1 && this.deltaX < 0 || this.index == 0 && this.deltaX > 0) return;
        this.deltaX = this.deltaX / (!this.index && this.deltaX > 0 || this.index == this.moveCount - 1 && this.deltaX < 0 ? Math.abs(this.deltaX) / this.width + 1 : 1);
        var moveRange = this.index == this.moveCount - 1 ? this.deltaX - endStar: this.deltaX - this.index * this.width + this.index*(starPadding + 10);
        typeof this.isScrolling == "undefined" && (this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY))),
        this.isScrolling || (e.preventDefault(), clearTimeout(this.interval), this.element.style.MozTransform = this.element.style.webkitTransform = "translate3d(" + moveRange + "px,0,0)", e.stopPropagation())
    },
    onTouchEnd: function(e) {
        var t = Number(new Date) - this.start.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
        n = !this.index && this.deltaX > 0 || this.index == this.moveCount - 1 && this.deltaX < 0;
        this.isScrolling || this.slide(this.index + (t && !n ? this.deltaX < 0 ? 1 : -1 : 0), this.speed),
        e.stopPropagation()
    },
    onMSPointerDown:function(e){
    	if (e.pointerType != e.MSPOINTER_TYPE_TOUCH) return;
    	var t=this.creatTouchObject(e);
    	this.msStart={
    		pageX:t.pageX,
    		pageY:t.pageY,
    		time:Number(new Date)
    	},
    	this.isScrolling=undefined,
    	this.deltaX=0,
    	this.element.style.msTransitionDuration=0,
    	e.stopPropagation();
    },
    onMSPointerMove:function(e){
    	if (e.pointerType != e.MSPOINTER_TYPE_TOUCH) return;
    	if (this.length * this.itemWidth < this.width || !this.width) return;
        //if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
    	var t=this.creatTouchObject(e);
    	this.deltaX=t.pageX-this.msStart.pageX;
    	var starPadding=(this.width / this.itemWidth - Math.floor(this.width / this.itemWidth)) * this.itemWidth - 10;
    	var endStar = (this.index * this.moveStar - (this.moveStar - (this.length - this.index * this.moveStar))) * this.itemWidth - starPadding;
    	if(this.index == this.moveCount - 1 && this.deltaX < 0 || this.index == 0 && this.deltaX > 0) return;
    	this.deltaX=this.deltaX / (!this.index && this.deltaX > 0 || this.index == this.moveCount - 1 && this.deltaX < 0 ? Math.abs(this.deltaX) / this.width + 1 : 1);
    	var moveRange = this.index == this.moveCount - 1 ? this.deltaX - endStar: this.deltaX - this.index * this.width;
    	typeof this.isScrolling == "undefined" && (this.isScrolling = !!(this.isScrolling || Math.abs(this.deltaX) < Math.abs(t.pageY-this.msStart.pageY))),
        this.isScrolling || (e.preventDefault(), clearTimeout(this.interval), this.element.style.msTransform = "translate3d(" + moveRange + "px,0,0)", e.stopPropagation())
    },
    onMSPointerUp:function(e){
    	if (e.pointerType != e.MSPOINTER_TYPE_TOUCH) return;
    	var t = Number(new Date) - this.msStart.time < 250 && Math.abs(this.deltaX) > 20 || Math.abs(this.deltaX) > this.width / 2,
        n = !this.index && this.deltaX > 0 || this.index == this.moveCount - 1 && this.deltaX < 0;
        this.isScrolling || this.slide(this.index + (t && !n ? this.deltaX < 0 ? 1 : -1 : 0), this.speed),
        e.stopPropagation();
    },
    creatTouchObject:function(e){
    	return {pageX:e.clientX,pageY:e.clientY};
    }
}