# googlemaps-scrollprevent.js
**Avoid unwanted map interactions with the Google Maps Iframe.**
**Disable mouse scroll wheel zoom on embedded Google Maps**
googlemaps-scrollprevent is an easy solution to the problem of page scrolling with new "[Google Maps Iframe Embed](https://developers.google.com/maps/documentation/embed/guide)".
This [jQuery](http://www.jquery.com) **Mobile First** plugin prevents Google Maps iframe from capturing the mouse's scrolling **wheel / touch** scrolling behavior wrapping the ``` <iframe>  ``` with a transparent ``` <div> ``` on **mouse / touch hover**, so you must **click / tap** the unlock button to toggle the normal navigation. See the [Live Demo.](http://diazemiliano.github.io/googlemaps-scrollprevent)
This jQuery plugin is written with [CoffeeScript](http://coffeescript.org/) that compiles in JavaScript, so the source files are a little different from standard JavaScript.

**Please** if you are using this plugin open an [Issue](https://github.com/diazemiliano/googlemaps-scrollprevent/labels/showcase) with the tag ```showcase```. If this plugin was helpful for you saving some time and effort. Can consider *donate* as a thank you. Thanks!

#### P.S.
You can find simpler approaches in [stackoverflow](http://stackoverflow.com/) like:

1. [How to disable mouse scroll-wheel scaling with Google Maps API](http://stackoverflow.com/questions/2330197/how-to-disable-mouse-scroll-wheel-scaling-with-google-maps-api)
1. [Disable mouse scroll wheel zoom on embedded Google Maps](http://stackoverflow.com/questions/21992498/disable-mouse-scroll-wheel-zoom-on-embedded-google-maps)
1. [Prevent a Google Maps iframe from capturing the mouse's scrolling wheel behavior](http://stackoverflow.com/questions/24768772/prevent-a-google-maps-iframe-from-capturing-the-mouses-scrolling-wheel-behavior )

#### Details
![Weight](https://img.shields.io/badge/gzip-3.0%20KB-lightgrey.svg)<br/>
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/diazemiliano/googlemaps-scrollprevent/blob/master/LICENSE)
<br/>[![Website Link](https://img.shields.io/badge/website-http%3A%2F%2Fdiazemiliano.github.io%2Fgooglemaps--scrollprevent-blue.svg)](http://diazemiliano.github.io/googlemaps-scrollprevent/)
<br/>[![Donate](https://img.shields.io/badge/Donate-PayPal-brightgreen.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZKPEV6DZ2RQ78)

#### Minimun Requeriments
[![jQuery Core 1.12.4](https://img.shields.io/badge/jQuery-v1.12.4-green.svg)](https://github.com/diazemiliano/googlemaps-scrollprevent/releases)


## Table of contents
- [Examples](#examples)
- [Usage as JQuery Plugin](#usage-as-jquery-plugin)
- [Usage in Wordpress](#usage-in-wordpress)
- [Default Options](#default-options)
- [Build From Source](#build-from-source)
- [License](#license)

## Examples
For usage examples check the [live demo](http://diazemiliano.github.io/googlemaps-scrollprevent).

## Usage as jQuery plugin
1. Include jQuery and googlemaps-scrollprevent Libs in your html.

    ```html
    <!-- html -->

    <head>
      // jQuery Google CDN
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?ver=2.1.4"></script>
      // googlemaps-scrollprevent rawgit CDN
      <script type="text/javascript" src="https://cdn.rawgit.com/diazemiliano/googlemaps-scrollprevent/master/dist/googlemaps-scrollprevent.min.js"></script>
    </head>
    ```

1. Start mapScrollPrevent including the following code.

    ```html
    <!-- html -->

    <script type="text/javascript">
    $(function() {
      // Only Google Maps Selector
      var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
      $(googleMapSelector).scrollprevent().start();
    });
    </script>
    ```
    Or Stop with:
    ```js
    // JavaScript

    // Stop
    $(googleMapSelector).scrollprevent().stop();
    ```

1. Edit defaults.

    ```html
    <!-- html -->

    <script type="text/javascript">
    $(function() {
      // Only Google Maps Selector
      var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
      var options = { pressDuration: 1000 };
      $(googleMapSelector).scrollprevent(options).start();
    });
    </script>
    ```

1. With Callbacks

    ```js
    // JavaScript

    $(function(){
     $("#btn-start").click(function(){
       $("iframe[src*='google.com/maps']").scrollprevent({
           onMapLock: function() {
             // Your code here.
             alert("Map Locked")
           },
           onMapUnlock: function() {
             // Your code here.
             alert("Map Unlocked")
           }
       }).start();
     });
    });
    ```

## Usage in Wordpress
  1. Enqueue a script with jQuery as a dependency in yout ```functions.php```

    ```php
    //  PHP

    // First Enqueue the plugin
    function mapScrollPrevent_plugin() {
        wp_enqueue_script( 'mapScrollPrevent', 'https://cdn.rawgit.com/diazemiliano/mapScrollPrevent/master/dist/mapScrollPrevent.min.js', array( 'jquery' ) , '0.6.4', true );
    }

    // Second Enqueue the script
    function mapScrollPrevent_script()
        {
          echo '
            <script type="text/javascript">
              $(function() {
                var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
                var options = { pressDuration: 1000 };
                $(googleMapSelector).scrollprevent(options).start();
              });
            </script>
          ';
        }

    // Do the hook
    add_action( 'wp_enqueue_scripts', 'mapScrollPrevent_plugin' );
    add_action( 'wp_head', 'mapScrollPrevent_script' );
    ```

## Default Options
```js
// JavaScript

var options = {
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
```

## Build From Source
To build from source you can use the ```packaje.json``` file to install all "dev dependencies". We use [Gulp](gulpjs.com/) and some ```node-modules```.

1. Download or Clone this repo with a ```git``` client.
2. Install ```node.js```.
3. Install gulp globally ```npm install gulp -g```.
4. Do a ```npm update --save-dev``` in your terminal.
5. Edit your ```googlemaps-scrollprevent.coffee``` source file.
6. Do a ```gulp coffee``` or ```gulp watch``` task in your terminal.
7. Use the newly compiled ```googlemaps-scrollprevent.min.js``` file in the ```./dist/``` folder.
8. If you make *cool* improvements please fork and contribute.

## License
**The MIT License (MIT)**

**Copyright (c) 2016 Emiliano Díaz**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
