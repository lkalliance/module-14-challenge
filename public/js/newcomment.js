const commentActions = () => {
    // grab some DOM elements
    const addComment = document.querySelector("#commentBtn");
    const newComment = document.querySelector("#newComment");
    const loc = window.location.href.split('/');
    const postId = loc[loc.length-1];
    
    // if there's a comment button, add the listener
    if(addComment) {
        addComment.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                // grab the comment text and scrub out the html tags
                let text = newComment.value;
                text = text.replace(/<.*?>/, "").replace(/<.*?>/, "");
                
                // prepare and execute the api call
                const bodyObj = {
                    content: text,
                    post_id: postId
                }
                fetchObj = {
                    method: 'POST',
                    body: JSON.stringify(bodyObj),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                // reload the page
                await fetch('/api/comments/', fetchObj)
                window.location.href=window.location.href;
            } catch(err) {
                console.log(err);
            }
        })
    }
}

window.onload = commentActions;
