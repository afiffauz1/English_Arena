const navigation = () => {
    const navElement = document.querySelectorAll(".sidenav");
    M.Sidenav.init(navElement);
    renderNavigation();

    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    renderPage(page);

    function renderNavigation() {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav , .sidenav").forEach(element => {
                    element.innerHTML = xhttp.responseText;
                });

                document.querySelectorAll(".topnav a , .sidenav a").forEach(element => {
                    element.addEventListener("click", function () {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        renderPage(page);
                    })
                });
            }
        }

        xhttp.open("GET", "navigation.html", true);
        xhttp.send();
    }

    function renderPage(page) {
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const mainContent = document.getElementById("main-content");

                if (this.status === 200) {
                    mainContent.innerHTML = xhttp.responseText;
                } else if (this.status === 400) {
                    mainContent.innerHTML = `<h3 class="center">Halaman Tidak Ditemukan !!!</h3>`;
                } else {
                    mainContent.innerHTML = `<h3 class="center">Woops... Halaman tidak dapat diakses !!!</h3>`
                }
            }

            // card content home event click
            document.querySelectorAll(".card-content a").forEach(element => {
                element.addEventListener('click', function () {
                    page = event.target.getAttribute("href").substr(1);
                    renderPage(page);
                });
            });
        }

        xhttp.open("GET", `/pages/${page}.html`, true);
        xhttp.send();
    }

}

export default navigation;