
const modifyForm = document.getElementById('modifyForm');

modifyForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const id = document.getElementById('id').value;
    const nom = document.getElementById('nom').value;
    const difficulte = document.getElementById('difficulte').value;
    const image = document.getElementById('image').value;
    const description = document.getElementById('description').value;

    const data = {
        id_film : id,
        nom: nom,
        description: description,
        difficulte: difficulte,
        image: image
    };
    fetch('/adminview/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>{
        if(response.status === 200){
            alert('Film modifié avec succès');
            window.location.href = '/adminview';
        }else{
            alert('Erreur lors de la modification du film');
            console.log(response);
        }
    });
  }
);
