#!/usr/bin/node
"use strict";
console.log("Content-type: text/html\n");

// CompletedList.cgi by James Hyun
// Language: JavaScript via node.js

// Identical to InPrgressList.cgi except it filters out the in-progress songs.

// =============================================================================

const musicList = require("../musiclist.json");
const getSongListItem = require("./GetSongListItem.js");

// =============================================================================

var str = "";
for (let obj of musicList) {
    if (obj.completed) {
        str += getSongListItem(obj);
    }
}
console.log(str);
