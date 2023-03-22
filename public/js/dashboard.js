const dashActions = () => {
    // add event listeners to the delete links
    const deleteList = document.querySelectorAll('.delete-post');
    Object.values(deleteList).forEach((link) => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            // prepare and execute the delete api call
            fetchObj = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            fetchUrl = `/api/posts/${e.target.dataset.id}`;
            await fetch(fetchUrl, fetchObj);

            // reload the page
            window.location.href=window.location.href;
        })
    })
}

window.onload = dashActions;
