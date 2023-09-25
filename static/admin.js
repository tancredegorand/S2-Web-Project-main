const form = document.getElementById('form');
let listeFilms;
let nbResultats = 0;

window.addEventListener("DOMContentLoaded", (event) => {
    
//fetch pour recuperer les films
fetch('/api/get_all_film')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            //afficher les films
            listeFilms = data;
            displayFilms(data);
            nbResultats = data.length;
        }
    }
    );

function updateResultats(){
    console.log(nbResultats);
    if (nbResultats == 1) document.getElementById('nbResultats').innerHTML = nbResultats + ' résultat';
    else document.getElementById('nbResultats').innerHTML = nbResultats + ' résultats';
}


//fonction pour afficher les films
function displayFilms(data) {
    nbResultats = 0;
    let films = document.getElementById('films');
    films.innerHTML = '';
    let html = '';
    data.forEach(film => {
        html += `<tr>
                    <td><a href="adminview/edit/${film.id_film}">${film.id_film}</a></td>
                    <td>${film.Nom}</td>
                    <td>${film.Image}</td>
                    <td>${film.Description}</td>
                    <td>${film.Difficulte}</td>
                </tr>`;
        nbResultats++;
    });
    films.innerHTML = html;
    updateResultats();
}

function searchByTitre(){
    nbResultats = 0;
    //on recherche le film par titre dans la liste
    let titre = document.getElementById('titre').value.toLowerCase();
    let films = document.getElementById('films');
    films.innerHTML = '';
    let html = '';
    listeFilms.forEach(film => {
        if (film.Nom.toLowerCase().includes(titre)){
        html += `<tr>
                    <td><a href="adminview/edit/${film.id_film}">${film.id_film}</a></td>
                    <td>${film.Nom}</td>
                    <td>${film.Image}</td>
                    <td>${film.Description}</td>
                    <td>${film.Difficulte}</td>
                </tr>`;
        nbResultats++;
        }  
    });
    if (html == '') html = '<tr><td colspan="5">Aucun film trouvé</td></tr>'
    films.innerHTML = html;
    updateResultats();
}

form.addEventListener('submit', (event) => {
    nbResultats = 0;
    let difficulte = document.getElementById('level').value.toLowerCase();
    event.preventDefault();
    if (document.getElementById('titre').value != ''){
        searchByTitre();
        document.getElementById('titre').value = '';
    } 
    else{
    if (difficulte == "all"){
        displayFilms(listeFilms);
        return;
    }
    let films = document.getElementById('films');
    films.innerHTML = '';
    let html = '';
    listeFilms.forEach(film => {
        if (film.Difficulte == difficulte){
        html += `<tr>
                    <td><a href="adminview/edit/${film.id_film}">${film.id_film}</a></td>
                    <td>${film.Nom}</td>
                    <td>${film.Image}</td>
                    <td>${film.Description}</td>
                    <td>${film.Difficulte}</td>
                </tr>`;
        nbResultats++;
        }  
    }
    );
    films.innerHTML = html;
    updateResultats();
    }
});

});


