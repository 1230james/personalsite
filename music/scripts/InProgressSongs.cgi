#!/usr/bin/node
"use strict";
console.log("Content-type: text/html\n");

// InProgressSongs.cgi by James Hyun
// Language: JavaScript via node.js

// Returns HTML string of all the "songContainer" div elements containing the
// song icon/image, name, description, and "View Info" button for all the
// in-progress songs.

// =============================================================================

const musicList = require("../musiclist.json");
const getSongContainer = require("./GetSongContainer.js");

// =============================================================================

var str = "";
for (let obj of musicList) {
    if (!obj.completed) {
        str += getSongContainer(obj);
    }
}
console.log(str);
