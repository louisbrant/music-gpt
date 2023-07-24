// blvd-loader.js
(function (a) {
    var b = {
        businessId: '0f28b99b-8b42-4d6f-8458-cb90caf7da98'
    };

    var c = a.createElement('script');
    var d = a.querySelector('script');

    c.src = 'https://static.joinboulevard.com/injector.min.js';
    c.async = true;
    c.onload = function () {
        blvd.init(b);
    };

    d.parentNode.insertBefore(c, d);
})(document);