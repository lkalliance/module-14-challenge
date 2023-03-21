const postActions = () => {

    const deleteList = document.querySelectorAll('.delete-post');

    Object.values(deleteList).forEach((link) => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            
            fetchObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetchUrl = `/api/posts/${e.target.dataset.id}`;
            const delData = await fetch(fetchUrl, fetchObj);

            window.location.href=window.location.href;
        })
    })



}

window.onload = postActions;
