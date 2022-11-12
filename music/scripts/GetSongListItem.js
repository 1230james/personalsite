// GetSongListItem by James Hyun
// Takes in a dictionary that originated from musicList and forms an li element
// to put inside one of the table of contents lists on the music home page.

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
    
Snippet of sample of intended HTML for each song container
    <div id="nameNoWhitespace" class="songContainer">
        <!-- See GetSongContainer.js for the full sample -->
    </div>
*/

// =============================================================================

// This is approaching useless encapsulation territory, but I\"ll try to justify
// to myself it with code readability.
module.exports = function(obj) {
    if (obj.hide) {
        return "";
    }
    return "<li><a href=\"#" + obj.name.split(" ").join("") + "\">" + obj.name +
        "</a></li>";
}
