async function load() {

    const header = document.getElementById("header");
    const footer = document.getElementById("footer");
    header.innerHTML = await (await fetch("header.html")).text();
    footer.innerHTML = await (await fetch("footer.html")).text();

    links.textContent = "Today's Date | " + new Date().toLocaleDateString()
}


load();