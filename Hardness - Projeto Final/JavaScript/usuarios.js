document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnListar").addEventListener("click", async () => {
        const tabela = document.getElementById("tabelaUsuarios");
        const corpo = document.getElementById("listaUsuarios");

        try {
            const res = await fetch("../PHP/usuarios.php");
            const dados = await res.json();

            corpo.innerHTML = "";

            if (res.ok && dados.usuarios?.length) {
                dados.usuarios.forEach(user => {
                    corpo.innerHTML += `
                        <tr>
                            <td>${user.nome || "N/A"}</td>
                            <td>${user.telefone || "N/A"}</td>
                        </tr>
                    `;
                });
            } else {
                corpo.innerHTML = `
                    <tr>
                        <td colspan="2" style="text-align:center;">Nenhum usuário encontrado.</td>
                    </tr>
                `;
            }

            tabela.style.display = "table";

        } catch (e) {
            corpo.innerHTML = `
                <tr>
                    <td colspan="2" style="text-align:center; color:red;">Erro: ${e.message}</td>
                </tr>
            `;
            tabela.style.display = "table";
            alert("Erro ao carregar usuários: " + e.message);
        }
    });
});
