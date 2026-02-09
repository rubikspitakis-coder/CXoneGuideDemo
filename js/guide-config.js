/**
 * CXone Guide Configuration
 * This file initializes the CXone modules.
 */

(function(n, u) {
    window.CXoneDfo = n;
    window[n] = window[n] || function() {
        (window[n].q = window[n].q || []).push(arguments);
    };
    window[n].u = u;
    var e = document.createElement("script");
    e.type = "module";
    e.src = u + "?" + Math.round(Date.now() / 1e3 / 3600);
    document.head.appendChild(e);
})('cxone', 'https://web-modules-de-na1.niceincontact.com/loader/1/loader.js');

// Initialize the Tenant and the Guide module
cxone('init', '1092');
cxone('guide', 'init', 'bb179a83-f2c6-4fb8-a020-1af5eb9d759f');

console.log('MedPulse: CXone Guide Initialized with Tenant 1092');