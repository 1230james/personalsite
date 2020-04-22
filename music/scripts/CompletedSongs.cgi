#!/usr/bin/node
"use strict";
console.log("Content-type: text/html\n");

// InProgressSongs.cgi by James Hyun
// Language: JavaScript via node.js

// Identical to InProgressSongs.cgi except it filters out the in-progress songs.

// =============================================================================

const musicList = require("../musiclist.json");
const getSongContainer = require("./GetSongContainer.js");

// =============================================================================

var str = "";
for (let obj of musicList) {
    if (obj.completed) {
        str += getSongContainer(obj);
    }
}
console.log(str);
