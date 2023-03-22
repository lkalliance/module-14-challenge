const postActions = () => {

    const editPost = document.querySelector("#editPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");
    const main = document.querySelector("main");


    editPost.addEventListener("click", async (e) => {
        e.preventDefault();

        if (main.lastChild.id == "warning") {
            main.removeChild(main.lastChild);
        }
        
        const pieces = window.location.href.split('/');
        const postId = pieces[pieces.length - 1];

        try {
            let text = newText.value;
            let title = newTitle.value;

            if (text == "" || title == "") {
                const div = document.createElement("DIV");
                div.id = "warning";
                div.textContent = "Posts must have both a title and content."
                main.appendChild(div);
                return;
            }
            
            text = text.replace(/<.*?>/, "").replace(/<.*?>/, "")
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
