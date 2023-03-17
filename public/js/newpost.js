const postActions = () => {

    console.log("I'm here!");
    const addPost = document.querySelector("#addPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");

    console.log(newText);
    console.log(newTitle);

    addPost.addEventListener("click", async (e) => {
        e.preventDefault();
        
        try {
            const bodyObj = {
                title: newTitle.value,
                content: newText.value
            }
            fetchObj = {
                method: 'POST',
                body: JSON.stringify(bodyObj),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const postData = await fetch("/api/posts/", fetchObj);
        } catch (err) {
            console.log(err);
        }
    });

}

window.onload = postActions;
