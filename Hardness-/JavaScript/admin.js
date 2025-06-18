document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("listaUsuarios");
    const tabela = document.getElementById("tabelaUsuarios");
    const botaoListar = document.getElementById("btnListar");

    async function carregarUsuarios() {
        const res = await fetch("../PHP/admin_listar.php");
        const usuarios = await res.json();

        tbody.innerHTML = "";

        usuarios.forEach(user => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${user.id}</td>
                <td><input value="${user.nome}" data-id="${user.id}" class="nome"></td>
                <td><input value="${user.telefone}" data-id="${user.id}" class="telefone"></td>
                <td>
                    <button onclick="atualizar(${user.id})">Salvar</button>
                    <button onclick="apagar(${user.id})">Excluir</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        tabela.style.display = "table"; // mostra a tabela após preencher
    }

    botaoListar.addEventListener("click", carregarUsuarios);

    window.atualizar = async (id) => {
        const nome = document.querySelector(`.nome[data-id="${id}"]`).value.trim();
        const telefone = document.querySelector(`.telefone[data-id="${id}"]`).value.trim();

        const dados = new FormData();
        dados.append("id", id);
        dados.append("nome", nome);
        dados.append("telefone", telefone);

        const res = await fetch("../PHP/admin_atualizar.php", {
            method: "POST",
            body: dados
        });

        const json = await res.json();
        alert(json.msg);
        carregarUsuarios(); // recarrega a lista após salvar
    };

    window.apagar = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        const dados = new FormData();
        dados.append("id", id);

        const res = await fetch("../PHP/admin_excluir.php", {
            method: "POST",
            body: dados
        });

        const json = await res.json();
        alert(json.msg);
        carregarUsuarios(); // recarrega a lista após exclusão
    };
});
