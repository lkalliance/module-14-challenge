const logoutBtn = document.querySelector('#logout');

logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    // make the call to the logout api
    try {
        const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
    
        // if everything's cool, send user to the home page
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log out.');
        }
    } catch (err) {
        console.log(err);
    }
});

