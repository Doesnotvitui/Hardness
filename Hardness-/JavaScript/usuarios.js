document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("btnListar");
    const tabela = document.getElementById("tabelaUsuarios");
    const corpoTabela = document.getElementById("listaUsuarios");

    botao.addEventListener("click", async () => {
        try {
            const res = await fetch("../PHP/usuarios.php");

            if (!res.ok) throw new Error("Erro ao buscar usuários.");

            const usuarios = await res.json();

            corpoTabela.innerHTML = ""; // limpa conteúdo anterior

            usuarios.forEach(user => {
                const tr = document.createElement("tr");

                const tdNome = document.createElement("td");
                tdNome.textContent = user.nome;

                const tdTelefone = document.createElement("td");
                tdTelefone.textContent = user.telefone;

                tr.appendChild(tdNome);
                tr.appendChild(tdTelefone);
                corpoTabela.appendChild(tr);
            });

            tabela.style.display = "table";

        } catch (erro) {
            console.error("Erro ao carregar usuários:", erro);
            alert("Erro ao carregar a lista de usuários.");
        }
    });
});
