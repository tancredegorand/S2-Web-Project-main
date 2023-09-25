
const deleteForm = document.getElementById('deleteForm');

deleteForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const id = document.getElementById('id').value;
    const data = {
        id_film : id
    };
    fetch('/adminview/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response)=>{
        if(response.status === 200){
            alert('Film supprimé avec succès');
            window.location.href = '/adminview';
        }else{
            alert('Erreur lors de la suppression du film');
            console.log(response);
        }
    });
  }
);