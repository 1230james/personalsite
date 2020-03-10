// Music page loading
"use strict";

// ============================================================================

/*
Template for one entry in musicList
    {
        name: "Name of song",
        origin: "Name of origin of song",
        icon: "path/to/the/icon.png",
        desc: "Description of the song",
        path: "path/to/page",
        completed: boolean
    }

Sample of intended HTML for each song container
    <div class="songContainer">
        <div class="song">
            <img src="icon" alt="name"></img>
            <h3 class="textcenter">name</h3>
            <h4 class="textcenter">origin</h4>
            <p>desc</p>
        </div>
        <div class="mx-auto textcenter">
            <a class="btn btn-primary" href="/music">View</a>
        </div>
    </div>
*/

// ============================================================================

// On ready
$(document).ready(function() {
    console.log("Running musicmain");
    $.get("/music/musiclist.json",null,function(musicList) {
        
        for (let songObj of musicList) {
            let container = getSongContainer(songObj);
            if (songObj.completed) {
                $("#completed").append(container);
            } else {
                $("#inprogress").append(container);
            }
            addToTableOfContents(songObj);
        }
        
    }, "json");
    console.log("Finished musicmain");
});

// Construct the song container
function getSongContainer(obj) { // oh yeah we out here about to use jQuery like a retard
    // Create container
    let container = $("<div id=\"" + obj.name + "\" class=\"songContainer\"></div>");
    let song = $("<div class=\"song\"></div>");
    
    // Icon
    let iconImg = $("<img src=\"" + obj.icon + "\" alt=\""
        + obj.name + "\"/>");
    song.append(iconImg);
    
    // Text
    let header = $("<h3 class=\"textcenter\">" + obj.name + "</h3>");
    let subheader = $("<h4 class=\"textcenter\">" + obj.origin + "</h4>");
    let desc = $("<p class=\"textcenter\">" + obj.desc + "</p>");
    song.append(header,subheader,desc);
    container.append(song);
    
    // Button
    let buttonContainer = $("<div class=\"mx-auto textcenter\"></div>");
    let viewBtn = $("<a class=\"btn btn-primary\" href=\""+ obj.path + "\">View Info</a>")
    buttonContainer.append(viewBtn);
     //container.append(buttonContainer);
    song.append(buttonContainer);
    return container;
}

// Add song to the ToC
function addToTableOfContents(obj) {
    let anchor = "<a href=\"#" + obj.name + "\">" + obj.name + "</a>";
    let listObj = $("<li>" + anchor + "</li>");
    if (obj.completed) {
        $("#completedList").append(listObj);
    } else {
        $("#inProgressList").append(listObj);
    }
}