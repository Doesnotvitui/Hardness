document.getElementById('meuFormulario').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(this); 

    // Envia os dados para main.php usando fetch
    fetch('main.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json(); 
    })
    .then(data => {
        alert('Dados enviados com sucesso!');
        console.log(data); 
    })
    .catch(error => {
        alert('Erro ao enviar os dados: ' + error.message);
    });
});
