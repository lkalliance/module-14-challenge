const postActions = () => {

    const editPost = document.querySelector("#editPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");

    editPost.addEventListener("click", async (e) => {
        e.preventDefault();
        
        const pieces = window.location.href.split('/');
        const postId = pieces[pieces.length - 1];

        try {
            const bodyObj = {
                title: newTitle.value,
                content: newText.value
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

            document.location.replace(`/posts/view/${postId}`);
        } catch (err) {
            console.log(err);
        }
    });

}

window.onload = postActions;
