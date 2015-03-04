/*!
 * mapScrollPrevent (jQuery Google Maps Scroll Prevent Plugin)
 * Version 0.5.x
 * URL: https://github.com/diazemiliano/mapScrollPrevent
 * Description: mapScrollPrevent is an easy solution to the problem of page scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano/
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */

jQuery.fn.extend({
  mapScrollPrevent: function(options) {
    var opts = $.extend(true,
        {
          // Custom class for map wrap
          wrapClass:"map-wrap",
          // Custom class for hover div
          overlayClass:"map-overlay",
          // Hover Message
          overlayMessage:"<p>Clic para Navegar.</p>",
          // Present on touchscreen devices
          inTouch:false,
          // Removes mapScroll
          stop:false,
          // Apply Eric Reset
          resetCSS:false
        }, options),

        mapCSS = "/* mapScrollPrevent.js CSS Classes */" +
                 '.'+opts.overlayClass+'{position: absolute; overflow:hidden; cursor: pointer;text-align: center;background-color: rgba(255, 255, 255, 0);-moz-transition: background-color .3s ease-in-out;-o-transition: background-color .3s ease-in-out;-webkit-transition: background-color .3s ease-in-out;transition: background-color .3s ease-in-out;}'+
                 '.'+opts.overlayClass+':hover{background-color : rgba(255, 255, 255, 0.8);}'+
                 '.'+opts.overlayClass+' p{font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 13px;padding-top: 2.5%;padding-bottom: 2.5%;margin-right: auto;margin-left: auto;width: 70%;position: relative;top: 50%;transform: translateY(-50%);border-color: rgba(0, 0, 0, 0.3);color: rgba(58, 132, 223, 0);background-color: rgba(0, 0, 0, 0);-moz-transition: color 0.3s ease-in-out;-o-transition: color 0.3s ease-in-out;-webkit-transition: color 0.3s ease-in-out;transition: color 0.3s ease-in-out;-moz-border-radius-topleft: 2px;-webkit-border-top-left-radius: 2px;border-top-left-radius: 2px;-moz-border-radius-topright: 2px;-webkit-border-top-right-radius: 2px;border-top-right-radius: 2px;}'+
                 '.'+opts.overlayClass+':hover p{background-color: rgb(255, 255, 255); color: rgb(58, 132, 223); -moz-box-shadow: rgba(0,0,0,0.3) 0px 1px 4px -1px; -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;}'+
                 '.'+opts.wrapClass+'{display: inline-block;}'+
                 '.'+opts.wrapClass+' iframe{position:  relative;top:  0;left:  0;}',
        resetCSS = "/* Eric Meyer's Reset CSS v2.0 - http://cssreset.com */" +
                   "html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{border:0;font-size:100%;font:inherit;vertical-align:baseline;margin:0;padding:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:none}table{border-collapse:collapse;border-spacing:0}",

        // iframe Map Object
        iframeObject = $(this),

        // Creates overlay object
        overlayObject = $("<div class=\"" + opts.overlayClass + "\">" +
                          opts.overlayMessage +
                          "</div>"),
        wrapObject = $("<div class=\"" + opts.wrapClass + "\">" + "</div>");

    // Early exit
    if (!iframeObject.length) {
      return;
    }
    // Wraps the iframe
    wrapIframe = function()
    {
      // Check first if the iframe is already wraped
      if (!iframeObject.closest("." + opts.wrapClass).is("div")) {
        iframeObject.wrap(wrapObject);
      }
      // Update variable objects with DOM objects
      wrapObject = iframeObject
                      .closest("." + opts.wrapClass)
                      .append(overlayObject);
      overlayObject = wrapObject
                        .children("." + opts.overlayClass);

      coverObject();
    };
    // Apply all the css
    applyCss = function(){
      $("head")
        .append("<style rel=\"stylesheet\" type=\"text/css\">"+mapCSS+"</style>");
        if(opts.resetCSS){
          $("head")
            .append("<style rel=\"stylesheet\" type=\"text/css\">"+resetCSS+"</style>");
        }
    };

    coverObject = function()
    {
      overlayObject
        .height(iframeObject.height())
        .width(iframeObject.width())
        .css({
          "top":iframeObject.position().top,
          "left":iframeObject.position().left
        });
    };

    // Overlay functions
    hideOverlay = function()
    {
      iframeObject.css({ "pointer-events":"initial" });
      $(this).fadeOut();
    };
    showOverlay = function()
    {
      iframeObject.css({ "pointer-events":"none" });
      overlayObject.show();
    };

    // Check touchscreen support
    isTouchScreen = function()
    {
      if (("ontouchstart" in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0))
      {
        return true;
      }
    };

    // Init wrap and bind events
    start = function()
    {
      applyCss();
      wrapIframe();

      $(window)
        .on("resize", coverObject);

      overlayObject
        .bind("click", hideOverlay);

      wrapObject
        .bind("mouseenter", showOverlay)
        .bind("mouseenter", coverObject);
    };

    stop = function()
    {
      iframeObject.removeAttr("style");
      if (iframeObject.parent().is("." + opts.wrapClass)) {
        iframeObject.unwrap();
      }
      $("." + opts.overlayClass).remove();
    };

    // Present always in no-touch devices
    if (!opts.stop) {
      if (!isTouchScreen()) {
        start();
      } else if (isTouchScreen() && opts.inTouch) {
        start();
      }
    } else {
      stop();
    }
  }
});
