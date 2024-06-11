var modal = document.getElementById('id01'); 

window.onclick = function(event) { 
    if (event.target == modal) { 
        modal.style.display = "none"; 
    } 
};

console.log("JavaScript is running!");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault();

        var nome = document.getElementById("nome").value;
        var cpf = document.getElementById("cpf").value;
        var email = document.getElementById("email").value;
        var telefone = document.getElementById("telefone").value;
        var endereco = document.getElementById("endereco").value;
        var status = document.getElementById("status").value;

        // Cria o card antes de enviar a requisição
        var card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${nome}</h3>
            <p>CPF: ${cpf}</p>
            <p>Email: ${email}</p>
            <p>Telefone: ${telefone}</p>
            <p>Endereço: ${endereco}</p>
            <p>Status: ${status}</p>
        `;

        document.querySelector(".interiorbaixo").appendChild(card);

        document.getElementById("myForm").reset();
        modal.style.display = 'none';

        // Envia a requisição ao servidor
        fetch('http://localhost:3000/add-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                cpf: cpf,
                email: email,
                telefone: telefone,
                endereco: endereco,
                status: status
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Adiciona uma mensagem de erro ao card em caso de falha
            card.innerHTML += `
                <p style="color: red;">Falha ao adicionar o cliente ao server! rsrs</p>
            `;
        });
    });
});
