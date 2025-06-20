document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("listaUsuarios");
    const tabela = document.getElementById("tabelaUsuarios");
    const botaoListar = document.getElementById("btnListar");

    async function carregarUsuarios() {
        tbody.innerHTML = '<tr><td colspan="5" class="loading">Carregando usuários...</td></tr>';
        tabela.style.display = "block";
        tabela.classList.add('show');
        
        
        try {
            const res = await fetch("../PHP/admin_listar.php");
            const dados = await res.json();

            tbody.innerHTML = "";

            if (!dados || dados.length === 0) {
                tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Nenhum usuário encontrado</td></tr>';
                return;
            }
            
            // Aqui é onde a tabela é preenchida com os dados dos usuários
            dados.forEach(user => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${user.id || ''}</td>
                    <td><input type="text" value="${user.nome || ''}" data-id="${user.id}" class="nome" placeholder="Digite o nome"></td>
                    <td><input type="text" value="${user.telefone || ''}" data-id="${user.id}" class="telefone" placeholder="Digite o telefone"></td>
                    <td><input type="text" value="${user.endereco || ''}" data-id="${user.id}" class="endereco" placeholder="Digite o endereço"></td>
                    <td>
                        <button class="btn-salvar" onclick="atualizar(${user.id})">SALVAR</button>
                        <button class="btn-excluir" onclick="apagar(${user.id})">EXCLUIR</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

        } catch (error) {
            tbody.innerHTML = `<tr><td colspan="5" class="empty-state" style="color: red;">Erro ao carregar usuários</td></tr>`;
        }
    }

    
    if (botaoListar) {
        botaoListar.addEventListener("click", carregarUsuarios);
    }

    // Função para atualizar usuário
    window.atualizar = async (id) => {
        const nome = document.querySelector(`.nome[data-id="${id}"]`).value.trim();
        const telefone = document.querySelector(`.telefone[data-id="${id}"]`).value.trim();
        const endereco = document.querySelector(`.endereco[data-id="${id}"]`).value.trim();

        if (!nome || !telefone) {
            alert("Nome e telefone são obrigatórios!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("nome", nome);
            formData.append("telefone", telefone);
            formData.append("endereco", endereco);

            const res = await fetch("../PHP/admin_atualizar.php", {
                method: "POST",
                body: formData
            });

            const json = await res.json();
            alert(json.msg || "Usuário atualizado com sucesso!");
            
            if (json.status === "ok") {
                carregarUsuarios();
            }
        } catch (error) {
            alert("Erro ao atualizar usuário!");
        }
    };

    // Função para excluir usuário
    window.apagar = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

        try {
            const formData = new FormData();
            formData.append("id", id);

            const res = await fetch("../PHP/admin_excluir.php", {
                method: "POST",
                body: formData
            });

            const json = await res.json();
            alert(json.msg || "Usuário excluído com sucesso!");
            
            if (json.status === "ok") {
                carregarUsuarios();
            }
        } catch (error) {
            alert("Erro ao excluir usuário!");
        }
    };
});