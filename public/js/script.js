const addComment = document.querySelector("#commentBtn");
const newComment = document.querySelector("#newComment");

addComment.addEventListener("click", async (e) => {
    e.preventDefault();
    fetchObj = {
        method: 'POST',
        body: {
            content: newComment.value
        }
    }
    const posted = await fetch('/api/comments', {
        method: 'POST',
        body: fetchObj
    })
})