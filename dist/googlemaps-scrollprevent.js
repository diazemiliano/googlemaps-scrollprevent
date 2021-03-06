/*!
 * googlemaps-scrollprevent (jQuery Google Maps Scroll Prevent Plugin)
 * Version 0.6.5
 * URL: https://github.com/diazemiliano/googlemaps-scrollprevent
 * Description: googlemaps-scrollprevent is an easy solution to the problem of
 *              page scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano/
 * Copyright: The MIT License (MIT) Copyright (c) 2016 Emiliano Díaz.
 */

(function() {
    var hasProp = {}.hasOwnProperty;

    (function($) {
        return $.fn.extend({
            scrollprevent: function(options) {
                var Log, applyCss, bindEvents, buttonObject, context, coverObject, defaults, isWrapped, item, itemClass, itemHTML, longPressDown, longPressUp, mapCSS, opts, overlayObject, progress, ref, runTimeout, value, wrapIframe, wrapObject;
                defaults = {
                    "class": {

                        /* class for map wrap */
                        wrap: "mapscroll-wrap",

                        /* class for hover div */
                        overlay: "mapscroll-overlay",

                        /* class for progress bar */
                        progress: "mapscroll-progress",

                        /* class for the unlock button */
                        button: "mapscroll-button",

                        /* class for svg icons */
                        icon: "mapscroll-icon"
                    },

                    /* Press Duration */
                    pressDuration: 650,

                    /* Unlock Trigger (overlay|button) */
                    triggerElm: "button",

                    /* Buton Icons */
                    overlay: {
                        iconLocked: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\" > <path transform=\"translate(1)\" d=\"M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z\" /> </svg>",
                        iconUnloking: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\"> <path transform=\"translate(1)\" d=\"M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z\" /> </svg>",
                        iconUnlocked: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\"> <path transform=\"translate(1)\" d=\"M1728 576v256q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45v-256q0-106-75-181t-181-75-181 75-75 181v192h96q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h672v-192q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5z\" /> </svg>"
                    },

                    /* Callbaks */
                    onMapLock: function() {},
                    onMapUnlock: function() {},

                    /* Print Log Messges */
                    printLog: false
                };
                opts = $.extend(false, defaults, options);

                /* iframe Map Object */
                context = $(this);

                /* Logging Style */
                Log = function(message) {
                    var dateTime, nowTime;
                    if (opts.printLog) {
                        if (window.console && window.console.log) {
                            dateTime = new Date();
                            nowTime = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
                            return console.log("mapScrollPrevent [" + nowTime + "] : " + message);
                        }
                    }
                };

                /* Early exit */
                if (!context.length) {
                    return Log("No Iframes detected. Try changing your \"selector.\"");
                } else {
                    Log(context.length + " iFrames detected.");
                    mapCSS = "/* --- mapScrollPrevent.js CSS Classes --- */ ." + opts["class"].overlay + " { position: absolute; overflow:hidden; cursor: pointer; text-align: center; background-color: rgba(0, 0, 0, 0); } ." + opts["class"].button + " { text-rendering: optimizeLegibility; font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; padding-top: 15px; padding-bottom: 15px; width: 55px; position: absolute; right: 43px; bottom: 24px; border-color: rgba(0, 0, 0, 0.3); color: rgba(58, 132, 223, 0); background-color: rgba(255, 255, 255, 1); color: rgb(58, 132, 223); border-top-right-radius: 2px; border-top-left-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; cursor: pointer; z-index: 1; } ." + opts["class"].icon + " { display: none; position: relative; z-index: 1; fill: rgba(58, 132, 223, 1); } ." + opts["class"].icon + "-locked { display: inline; } ." + opts["class"].progress + " { position: absolute; top: 0; bottom: 0; left: 0; width: 0%; display: block; background-color: rgba(58, 132, 223, 0.4); } ." + opts["class"].wrap + " { position: relative; text-align: center; display: inline-block; } ." + opts["class"].wrap + " iframe { position: relative; top: 0; left: 0; } ." + opts["class"].overlay + ", ." + opts["class"].button + ", ." + opts["class"].icon + " { transition: all .3s ease-in-out; } ." + opts["class"].progress + " { width: 0%; }";

                    /*
                      Remove and Set the Icon classes
                      IE weird version beacouse doesn't support SVG.outerHTML()
                     */
                    ref = opts.overlay;
                    for (item in ref) {
                        if (!hasProp.call(ref, item)) continue;
                        value = ref[item];
                        Log("Icons founded... Replacing classes.");
                        value = value.replace('#\s(id|class)="[^"]+"#', '');
                        itemClass = item.split("icon");
                        itemHTML = value.split("svg").join("svg class=\"" + opts["class"].icon + "-" + (itemClass[1].toLowerCase()) + " " + opts["class"].icon + "\"");
                        opts.overlay[item] = itemHTML;
                    }

                    /* Creates overlay object */
                    overlayObject = $("<div class=" + opts["class"].overlay + "></div>");
                    buttonObject = $("<div class=" + opts["class"].button + "> <div class=" + opts["class"].progress + "> </div> " + opts.overlay.iconLocked + " " + opts.overlay.iconUnlocked + " " + opts.overlay.iconUnloking + " </div>");
                    wrapObject = $("<div class=" + opts["class"].wrap + "></div>");
                    isWrapped = null;

                    /* Apply all the css */
                    applyCss = function() {
                        $("head").append("<style rel=\"stylesheet\" type=\"text/css\"> " + mapCSS + "</style>");
                        return Log("Plugin css applied.");
                    };

                    /* Wraps the iframe */
                    wrapIframe = function() {

                        /* Check first if the iframe is already wraped */
                        if (context.closest("." + opts["class"].wrap).length) {
                            isWrapped = true;
                            Log("Iframe already wrapped");
                        } else {
                            context.wrap(wrapObject);
                            isWrapped = false;
                            Log("Iframe isn't wrapped.");
                        }

                        /* Update with DOM objects */
                        wrapObject = context.closest("." + opts["class"].wrap).append(buttonObject).append(overlayObject);
                        overlayObject = wrapObject.children("." + opts["class"].overlay);
                        buttonObject = wrapObject.children("." + opts["class"].button);
                        coverObject();
                        return Log("Iframe now wraped.");
                    };

                    /* Dynamic Adjust */
                    coverObject = function() {
                        $.each([overlayObject, wrapObject], function() {
                            this.height(context.height());
                            return this.width(context.width()).css({
                                "top": context.position().top,
                                "left": context.position().left
                            });
                        });
                        return Log("Overlay positioned.");
                    };
                    progress = function(status, elm) {
                        var iFrameObject, iconObject, progressObject;
                        elm = elm.closest("." + opts["class"].wrap);
                        progressObject = elm.find("." + opts["class"].progress);
                        iconObject = elm.find("." + opts["class"].icon);
                        overlayObject = elm.find("." + opts["class"].overlay);
                        iFrameObject = elm.find("iframe");
                        iconObject.hide();
                        switch (status) {
                            case "enable":
                                elm.find("." + opts["class"].icon + "-unloking").show();
                                progressObject.animate({
                                    width: "100%"
                                }, {
                                    duration: opts.pressDuration,
                                    queue: false
                                });
                                return Log("Enabling Map.");
                            case "disable":
                                iFrameObject.css({
                                    "pointer-events": "none"
                                });
                                elm.find("." + opts["class"].icon + "-locked").show();
                                progressObject.animate({
                                    width: "0%"
                                }, {
                                    duration: opts.pressDuration,
                                    queue: false
                                });
                                overlayObject.show();
                                opts.onMapLock();
                                return Log("Disabling Map.");
                            case "unlocked":
                                iFrameObject.css({
                                    "pointer-events": "auto"
                                });
                                elm.find("." + opts["class"].icon + "-unlocked").show();
                                progressObject.css({
                                    "width": "100%"
                                });
                                overlayObject.hide();
                                opts.onMapUnlock();
                                return Log("Map Enabled.");
                        }
                    };
                    runTimeout = function(elm) {
                        progress("unlocked", elm);
                        return clearTimeout(this.timeOut);
                    };
                    this.mouseDownTime = 0;
                    this.mouseUpTime = 0;

                    /* Long Press Down Event */
                    longPressDown = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(e);
                        this.mouseDownTime = $.now();
                        this.timeOut = setTimeout(runTimeout, opts.pressDuration, $(this));
                        progress("enable", $(this));
                        return Log("LongPress Started.");
                    };

                    /* Long Press Up Event */
                    longPressUp = function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log(e);
                        this.mouseUpTime = $.now() - this.mouseDownTime;
                        clearTimeout(this.timeOut);
                        if (this.mouseUpTime < opts.pressDuration) {
                            progress("disable", $(this));
                        } else {
                            progress("unlocked", $(this));
                        }
                        return Log((this.mouseUpTime / 1000) + "s Pressed. ");
                    };

                    /* Bind Events */
                    bindEvents = function() {
                        var ref1;
                        $(window).bind("resize", coverObject);
                        context.bind("resize", coverObject);

                        /* Check valid options for triggerElm */
                        if (!((ref1 = opts.triggerElm) === "area" || ref1 === "button")) {
                            opts.triggerElm = defaults.triggerElm;
                        }
                        switch (opts.triggerElm) {
                            case "button":
                                buttonObject.bind("mousedown touchstart", longPressDown).bind("mouseup touchend touchleave touchcancel", longPressUp).unbind("click");
                                break;
                            case "area":
                                wrapObject.bind("mousedown touchstart", longPressDown).bind("mouseup touchend touchleave touchcancel", longPressUp).unbind("click");
                        }
                        return Log("Events bounded.");
                    };
                    return {

                        /* Init wrap and bind events */
                        start: function() {
                            Log("Starting plugin...");
                            if (!context.find("" + opts["class"].wrap)) {
                                console.log(context.find("" + opts["class"].wrap));
                                return Log("Already Started.");
                            } else {
                                applyCss();
                                wrapIframe();
                                bindEvents();
                                return Log("Plugin Started.");
                            }
                        },

                        /* Removes everything */
                        stop: function() {
                            Log("Stopping plugin...");
                            $("." + opts["class"].overlay + ", ." + opts["class"].button).remove();
                            context.removeAttr("style");
                            console.log(context.parent().is("." + opts["class"].wrap));
                            console.log(isWrapped);
                            if (!isWrapped) {
                                if (context.parent().is("." + opts["class"].wrap)) {
                                    context.unwrap();
                                }
                            }
                            return Log("Plugin Stopped.");
                        }
                    };
                }
            }
        });
    })(jQuery);

}).call(this);
