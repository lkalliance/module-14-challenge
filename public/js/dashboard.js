const postActions = () => {

    const editList = document.querySelectorAll('.edit');
    const deleteList = document.querySelectorAll('.delete');

    console.log(editList);

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


    // postList.addEventListener("click", async (e) => {
    //     if(e.target.nodeType !== "A") return;

    //     console.log(e.target);
        
    //     if (e.target.className == 'edit') {
    //         try {
    //             alert(`Edit post number ${e.target.dataset.id}`)
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     } else if (e.target.className == 'delete') {
    //         try {
    //             alert('Delete!')
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // })

}

window.onload = postActions;
