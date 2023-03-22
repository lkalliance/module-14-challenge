const login = document.querySelector("#loginBtn");
const create = document.querySelector("#createBtn");
const loginUname = document.querySelector("#username-login");
const loginPassword = document.querySelector("#password-login");
const createUname = document.querySelector("#username-signup");
const createEmail = document.querySelector("#email-signup");
const createPassword = document.querySelector("#password-signup");

const loginFields = [ loginUname, loginPassword ];
const createFields = [ createUname, createEmail, createPassword ];

login.addEventListener("click", async (e) => {
    e.preventDefault();

    // remove an error message if there is one
    if ( login.parentNode.lastChild.id == "warning" ) {
        login.parentNode.removeChild(login.parentNode.lastChild);
    }

    // grab the values from the form
    const username = loginUname.value.trim();
    const password = loginPassword.value.trim();

    if (username && password) {
        // make the call to the api if both values are there
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            // if everything is cool, send the user to the home page
            if (response.ok) {
                document.location.replace('/');
            } else {
                // clear the login form
                for (field of loginFields) {
                    field.value = "";
                }
                // create and append an error message
                const warning = document.createElement("div");
                warning.id = "warning";
                warning.textContent = "Failed to log in";
                login.parentNode.appendChild(warning);
            }
        } catch (err) {
            console.log(err);
        }
    }
});

create.addEventListener("click", async (e) => {
    e.preventDefault();

    // grab the values from the form
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        // make the call to the api if all values are provided
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            // if everything is cool, send the user to the home page
            if (response.ok) {
                document.location.replace('/');
            } else {
                console.log(JSON.parse(response));
            }
        } catch (err) {
            console.log(err);
        }
    }
});