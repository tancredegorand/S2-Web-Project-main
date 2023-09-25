
// Updated upstream:static/script.js
window.addEventListener("DOMContentLoaded", (event) => {
    
    
    const goBtn = document.getElementById("go");
    const corpus = document.getElementById("corpus");
    const game = document.getElementById("game");
    const endGame = document.getElementById("endGame"); 
   
    const displayUsername = document.getElementById("displayUsername");
    const displayLevel = document.getElementById("displaylevel");
    const displayEndLevel = document.getElementById("displayEndLevel");
    const displayTime = document.getElementById("time");
    const displayEndJoueur = document.getElementById("displayEndJoueur");
    const displayUserScore =  document.getElementById("score");
    const displayyEndUserScore =  document.getElementById("displayEndScore");
    const displayDescription = document.getElementById("displayDescription");
    
    const ulHistorique = document.getElementById("ulHistorique");

    const afficheImg = document.getElementById("afficheImg");

    const form = document.getElementById("form");
    const modifyForm = document.getElementById("modifyForm");
    let tryInput = document.getElementById("try");
    let reponse = ""; 
    let startGame; 
    
    let timer = 30; 
    let userName; 
    let level; 
    let userScore = 0; 
    let pointsAdd = 15;

    let filmId;
    let filmImage;
    let filmNom;
    let filmDifficulte;
    let filmDescription;








    //formater chaine
        function formaterChaine(word){
            word = word.toLowerCase(); //maj
            word =  word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");//accents
            return word; 
        }
        



        function sendGame(nom, score) {
            fetch('/api/score', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ nom: nom, score: score })
            })
            .then(response => {
              if (response.ok) {
                console.log('Game saved');
              } else {
                console.error('Erreur lors de la save');
              }
            })
            .catch(error => {
              console.error('Erreur lors de la requête:', error);
            });
          }
          


    function endTimer(){
          //enregistrer la game 
          sendGame(userName, userScore); 

          //afficher les resultats
          displayEndLevel.innerHTML = level;  
          displayEndJoueur.innerHTML = userName; 
          displayyEndUserScore.innerHTML = userScore;  
          displayDescription.innerHTML = filmDescription;
          endGame.style.display = "flex";
    }
    

    function chrono(){
        if(timer > 0){
            timer = timer - 1; 
            displayTime.innerHTML = timer.toFixed(0); 
        }
        else{
            endTimer(); 
            clearInterval(startGame);
        }
        
    }


    function callFilm(){
        //Formater les maj de level 
        level = formaterChaine(level);
        fetch(`/api/getfilm/${level}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                console.error(data.error);
                } 
                else {
                // Film retourné par l'API
                filmId = data.id_film;
                filmImage = data.Image;
                filmNom = data.Nom;
                filmDifficulte = data.Difficulte;
                filmDescription = data.Description;

                console.log(data);
                console.log(`Film ID: ${filmId}`);
                console.log(`Film Image: ${filmImage}`);
                console.log(`Film Nom: ${filmNom}`);
                console.log(`Film Difficulte: ${filmDifficulte}`);
                console.log(`Film Description: ${filmDescription}`);

                //Intégrer les infos 
                afficheImg.src = filmImage; 
                reponse = filmNom; 

        }
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération du film :", error);
            });
    }
  
     //Bonne réponse ? 
     form.addEventListener('submit', (event) => {
      event.preventDefault();
      let essai = formaterChaine(tryInput.value); 
      reponse = formaterChaine(reponse);
      console.log('vérif : ')
      console.log(reponse); 
      console.log(essai); 
  
      if (essai !== reponse) {
          const newLi = document.createElement("li");
          newLi.textContent = tryInput.value;
          ulHistorique.insertBefore(newLi, ulHistorique.firstChild);
          tryInput.value = ""; 
          return;
      }
  
      tryInput.value = "";
      userScore = userScore + pointsAdd; 
      if (level === "normale") timer += 3;
      else if (level === "difficile") timer += 5;
      if (timer > 30){
          timer = 30; 
      }
      displayUserScore.innerHTML = userScore; 
  
      callFilm();
   
    });
    





    //display game & user info
    goBtn.addEventListener("click", function(){
        userName = document.getElementById("nickname").value;
        userName = userName.replace(/\s/g, '');//supprimer tout les espaces dans le nom
        if (userName != ""){
            level = document.getElementById("level").value;
            corpus.style.display = "none";
            game.style.display = "flex"; 
    
            displayUsername.innerHTML = userName; 
            displayLevel.innerHTML = level; 

            callFilm();            
            startGame = setInterval(chrono, 1000);
        } else {
            alert("Entrer un nom valide"); 
        }
     
        
    });
});

