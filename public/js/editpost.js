const postActions = () => {

    const editPost = document.querySelector("#editPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");

    editPost.addEventListener("click", async (e) => {
        e.preventDefault();
        
        const pieces = window.location.href.split('/');
        const postId = pieces[pieces.length - 1];

        try {
            let text = newText.value;
            text = text.replace(/<.*?>/, "").replace(/<.*?>/, "")
            let title = newTitle.value;
            title = title.replace(/<.*?>/, "").replace(/<.*?>/, "")
            const bodyObj = {
                title: title,
                content: text
            }

            console.log(bodyObj);
            fetchObj = {
                method: 'PUT',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const fetchUrl = `/api/posts/${postId}`;
            const editData = await fetch(fetchUrl, fetchObj);

            document.location.replace(`/dash`);
        } catch (err) {
            console.log(err);
        }
    });

}

window.onload = postActions;
