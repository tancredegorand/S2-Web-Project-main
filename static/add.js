const addForm = document.getElementById('addForm');

addForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const nom = document.getElementById('nom').value;
    const difficulte = document.getElementById('difficulte').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;
    const data = {
        nom: nom,
        description: description,
        difficulte: difficulte,
        image: image
    };
    fetch('/adminview/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>{
        if(response.status === 200){
            alert('Film ajouté avec succès');
            window.location.href = '/adminview';
        }else{
            alert('Erreur lors de l\'ajout du film');
            console.log(response);
        }
    });
  }
);