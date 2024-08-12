document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const searchInput = document.getElementById("search");
    const toggleThemeBtn = document.getElementById("toggleTheme");
    const octocat = document.querySelector(".octocat")

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const username = searchInput.value.trim();

        if (username) {
            await fetchGitHubUser(username);
        } else {
            octocat.classList.add('active')
        }
    });

    toggleThemeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        toggleThemeBtn.textContent = document.body.classList.contains("dark-theme") ? "Light" : "Dark";
    });

    async function fetchGitHubUser(username) {
        const apiUrl = `https://api.github.com/users/${username}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`User not found: ${response.status}`);
            }

            const user = await response.json();
            displayUserInfo(user);
        } catch (error) {
            octocat.classList.add('active')
        }
    }

    function displayUserInfo(user) {
        const userInfo = `
            <div class="card">
                <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
                <div class="user-info">
                    <h2>${user.login}</h2>
                    <p>BIO: ${user.bio}</p>
                    <p>ID: ${user.id}</p>
                    <p>URL: <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
                </div>
            </div>
        `;

        const main = document.querySelector("main");
        const existingInfo = document.querySelector(".card");

        if (existingInfo) {
            existingInfo.remove();
        }

        main.insertAdjacentHTML("beforeend", userInfo);
    }
});
