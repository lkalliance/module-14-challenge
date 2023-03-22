const postActions = () => {
    // grab some DOM elements
    const addPost = document.querySelector("#addPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");
    const main = document.querySelector("main");

    // add the listener to the bubmit button
    addPost.addEventListener("click", async (e) => {
        e.preventDefault();
        // if there's a remaining warning about empty fields, remove it
        if (main.lastChild.id == "warning") {
            main.removeChild(main.lastChild);
        }
        
        try {
            // get the field values
            let text = newText.value;
            let title = newTitle.value;
            if (text == "" || title == "") {
                // if either field is empty, create and append a warning
                const div = document.createElement("DIV");
                div.id = "warning";
                div.textContent = "Posts must have both a title and content."
                main.appendChild(div);
                return;
            }
            // scrub the html tags
            text = text.replace(/<.*?>/, "").replace(/<.*?>/, "");
            title = title.replace(/<.*?>/, "").replace(/<.*?>/, "");

            // prepare and execute the api call
            const bodyObj = {
                title: title,
                content: text
            }
            fetchObj = {
                method: 'POST',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            await fetch("/api/posts/", fetchObj);
            // return the user to the dashboard
            document.location.replace('/dash');
        } catch (err) {
            console.log(err);
        }
    });

}

window.onload = postActions;
