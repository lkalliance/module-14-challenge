const postActions = () => {

    const addPost = document.querySelector("#addPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");

    addPost.addEventListener("click", async (e) => {
        e.preventDefault();
        
        try {
            let text = newText.value;
            text = text.replace(/<.*?>/, "").replace(/<.*?>/, "");
            let title = newTitle.value;
            title = title.replace(/<.*?>/, "").replace(/<.*?>/, "");
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
            const postData = await fetch("/api/posts/", fetchObj);

            document.location.replace('/dash');
        } catch (err) {
            console.log(err);
        }
    });

}

window.onload = postActions;
