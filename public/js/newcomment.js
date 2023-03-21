window.onload = () => {
    const addComment = document.querySelector("#commentBtn");
    const newComment = document.querySelector("#newComment");
    const loc = window.location.href.split('/');
    const postId = loc[loc.length-1];
    
    
    if(addComment) {
        addComment.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                let text = newComment.value;
                text = text.replace(/<.*?>/, "").replace(/<.*?>/, "");

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
                await fetch('/api/comments/', fetchObj)
                window.location.href=window.location.href;
            } catch(err) {
                console.log(err);
            }
        })
    }
}