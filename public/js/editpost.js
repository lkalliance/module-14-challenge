const editActions = () => {

    // grab some DOM elements
    const editPost = document.querySelector("#editPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");
    const main = document.querySelector("main");

    // add the event listener to the button
    editPost.addEventListener("click", async (e) => {
        e.preventDefault();
        // if the "no empty allowed" warning is there, remove it
        if (main.lastChild.id == "warning") {
            main.removeChild(main.lastChild);
        }
        
        // Parse the URL to get the post ID
        const pieces = window.location.href.split('/');
        const postId = pieces[pieces.length - 1];

        try {
            // get the new values from the fields
            let text = newText.value;
            let title = newTitle.value;

            // if either of them are empty, create and append the warning
            if (text == "" || title == "") {
                const div = document.createElement("DIV");
                div.id = "warning";
                div.textContent = "Posts must have both a title and content."
                main.appendChild(div);
                return;
            }
            
            // scrub the text to remove HTML tags
            text = text.replace(/<.*?>/, "").replace(/<.*?>/, "")
            title = title.replace(/<.*?>/, "").replace(/<.*?>/, "")

            // prepare and execute the API call to edit
            const bodyObj = {
                title: title,
                content: text
            }
            fetchObj = {
                method: 'PUT',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const fetchUrl = `/api/posts/${postId}`;
            await fetch(fetchUrl, fetchObj);

            // send trhe user back to the dashboard
            document.location.replace(`/dash`);
        } catch (err) {
            console.log(err);
        }
    });

}

window.onload = editActions;
