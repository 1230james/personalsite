// GetSongContainer by James Hyun
// Takes in a dictionary that originated from musicList and forms a div
// container with text and button elements created and configured based on the
// values from the dictionary.

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

// =============================================================================

// The idea: We're gonna start from the inside (i.e. deepest layer) and then
// work our way outwards to make the string concatenation look less disgusting.
module.exports = function(obj) {
    // the "song" container; contains image, name, etc.
    let iconImg = "<img src='" + obj.icon + "' alt='" + obj.name + "'/>";
    let header = "<h3 class='textcenter'>" + obj.name + "</h3>";
    let subheader = "<h4 class='textcenter'>" + obj.origin + "</h4>";
    let desc = "<p class='textcenter'>" + obj.desc + "</p>";
    let songDiv = "<div class='song'>" + iconImg + header + subheader + desc
                + "</div>";
    
    // the button container with the View Info button
    let buttonDiv = "<div class='mx-auto textcenter'>" // I'm about to do something mildly stupid
        + "<a class='btn btn-primary' href='"+ obj.path + "'>View Info</a>"
        + "</div>";
        
    // the entire songContainer itself
    let songContainer = "<div class='songContainer'>" + songDiv + buttonDiv + "</div>";
    
    return songContainer
}
