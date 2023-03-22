const postActions = () => {

    const addPost = document.querySelector("#addPostBtn");
    const newTitle = document.querySelector("#title");
    const newText = document.querySelector("#content");
    const main = document.querySelector("main");

    addPost.addEventListener("click", async (e) => {
        e.preventDefault();

        if (main.lastChild.id == "warning") {
            main.removeChild(main.lastChild);
        }
        
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
            text = text.replace(/<.*?>/, "").replace(/<.*?>/, "");
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
