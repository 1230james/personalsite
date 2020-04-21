#!/usr/bin/node
"use strict";
console.log("Content-type: text/html\n");

// InProgressList.cgi by James Hyun
// Language: JavaScript via node.js

// Returns HTML string of all the list items for all the songs in the
// incomplete songs list.

// =============================================================================

const musicList = require("../musiclist.json");
const getSongListItem = require("./GetSongListItem.js");

// =============================================================================

var str = "";
for (let obj of musicList) {
    if (!obj.completed) {
        str += getSongListItem(obj);
    }
}
console.log(str);
