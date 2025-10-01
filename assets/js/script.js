// Récupérer les éléments du DOM
const form = document.getElementById("jokeForm");
const tableBody = document.getElementById("table");
const deleteAllBtn = document.getElementById("DeleteAll");


    // Génération des blagues selon le formulaire
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let nb = parseInt(document.getElementById("nbJokes").value, 10);
        if (isNaN(nb) || nb < 1) nb = 1;
        if (nb > 10) nb = 10;

        // Récupérer des blagues depuis l’API JokeAPI
        const endpoint = `https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=${nb}`;

      fetch(endpoint)
        .then(res => {
            return res.json();
            })
            .then(data => {
              const jokes = data.jokes || [data];

              for (let i = 0; i < jokes.length; i++) {
                  tableBody.appendChild(addRow(jokes[i]));
            }
            })
        .catch(err => console.error(err));
    });

    // Ajouter une ligne
    function addRow(joke) {
      const row = document.createElement("tr");

      // Catégorie
      const tdCategory = document.createElement("td");
      tdCategory.textContent = joke.category;

      // Texte de la blague
      const tdJoke = document.createElement("td");
      if (joke.type === "single") {
        tdJoke.textContent = joke.joke;
      } else {
        tdJoke.innerText = `${joke.setup} \n ${joke.delivery}`;
      }

      // Bouton supprimer
      const tdAction = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.className = "btn btn-sm btn-outline-danger";
      delBtn.innerHTML = "🗑 Supprimer";
      delBtn.addEventListener("click", () => row.remove());
      tdAction.appendChild(delBtn);

      row.appendChild(tdCategory);
      row.appendChild(tdJoke);
      row.appendChild(tdAction);

      return row;
    }

    // Supprimer tout
    deleteAllBtn.addEventListener("click", () => {
      tableBody.innerHTML = "";
    });