// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form")
const input = document.querySelector("input")
const errorMsg = document.querySelector(".error")
const content = document.querySelector(".content")
const load = document.querySelector(".loader")


form.addEventListener("submit", handleForm)

function handleForm(e) {
    e.preventDefault();
    if(input.value == "")
        errorMsg.textContent = "Aucune recherche trouvée"
    else {
        load.style.display = "flex"
        content.textContent = "";
        searchWiki(input.value)
    }
}

async function searchWiki(search) {
    try {
        const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${search}`)
        const data = await response.json()
        if(!response.ok)
            return `${response.status}`;
        if(data.query.search.length == 0)
        {
            errorMsg.textContent = "Aucune recherche trouvée"
            load.style.display = "none"
        }
    
        else
            displaySearch(data.query.search)
    }
    catch (error) {
        errorMsg.textContent = `${error}`
        load.style.display = "none"
    }

}

function displaySearch(data) {
   data.forEach(el => {
    const url = `https://fr.wikipedia.org/?curid=${el.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `
      <h2 class="title">
        <a href=${url} target="_blank">${el.title}</a>
      </h2>
      <a href=${url} class="link" target="_blank">${url}</a>
      <span class="snippet">${el.snippet}</span>
      <br>
    `;
    content.appendChild(card);
   })
   load.style.display = "none"
}
