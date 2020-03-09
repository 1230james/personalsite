// Seamless page loading
"use strict";

// Variables
var currentPath;

// Run on ready
$(document).ready(function() {
    // Bind 
    $("a").each(bindAnchors);
    
    $(window).bind('popstate', function() {
        loadPage();
    });
    
    console.log("navigation.js loaded");
});

// Load page (incl. animations)
function loadPage() {
    // Same page check (return if the page is the same)
    if (location.pathname == currentPath) return;
    
    loadContent();
}

// Load content
function loadContent() {
    // Load new content
    currentPath = location.pathname;
    $("#content").load(currentPath + " #content >", null, function() {
        $("#content a").each(bindAnchors); // Bind anchors
        // If on music page, run musicmain.js
        if ($("#musicmain").length) {
            $.getScript("/music/musicmain.js");
        }
    });
    // Load new title
    $("title").load(currentPath + " title", null, function() {
        // This algorithm gives me brain damage but at this point I literally can't figure out a different way
        $("title").html(($("title").html()).substring(7, ($("title").html()).indexOf("</title>")));
        document.title = $("title").html();
    });
}

// Bind anchors
function bindAnchors(i,e) {
    e.onclick = function() {
        if (isLocalAnchor(e)) {
            history.pushState({}, '', e.href);
            loadPage();
            return false;
        } else return true;
    };
}

// Check whether hostname is local or external
function isLocalAnchor(element) {
    if (element.rel.includes("external")) return false;
    let hostname = element.hostname;
    return (location.hostname == hostname || hostname.length < 1);
}
