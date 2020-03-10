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
    
    // Set currentPath (for debounce)
    currentPath = location.pathname;
    
    console.log("navigation.js loaded");
    
    // ====================================
    
    // Navbar multi-level dropdown menus
    // https://github.com/bootstrapthemesco/bootstrap-4-multi-dropdown-navbar
    $( '.dropdown-menu a.dropdown-toggle' ).on( 'click', function ( e ) {
        var $el = $( this );
        var $parent = $( this ).offsetParent( ".dropdown-menu" );
        if ( !$( this ).next().hasClass( 'show' ) ) {
            $( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
        }
        var $subMenu = $( this ).next( ".dropdown-menu" );
        $subMenu.toggleClass( 'show' );
        
        $( this ).parent( "li" ).toggleClass( 'show' );

        $( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
            $( '.dropdown-menu .show' ).removeClass( "show" );
        } );
        
         if ( !$parent.parent().hasClass( 'navbar-nav' ) ) {
            $el.next().css( { "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 } );
        }

        return false;
    });
});

// Load page (incl. animations)
function loadPage() {
    // Same page check (return if the page is the same)
    console.log(location.pathname);
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
        if (isLocalAnchor(e) && !(e.class.includes("nosmoothnav"))) {
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