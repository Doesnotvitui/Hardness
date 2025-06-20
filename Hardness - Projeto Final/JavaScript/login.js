    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("meuFormulario");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const telefone = form.telefone.value.trim();
            const senha = form.senha.value;

            if (!telefone || !senha) {
                alert("Preencha todos os campos.");
                return;
            }

            const hashSenha = CryptoJS.SHA256(senha).toString();

            const dados = new FormData();
            dados.append("telefone", telefone);
            dados.append("senha", hashSenha);

            try {
                const res = await fetch("../PHP/login.php", {
                    method: "POST",
                    body: dados
                });

                if (res.headers.get("content-type")?.includes("application/json")) {
                    const json = await res.json();
                    console.log("Resposta do servidor:", json);

                    if (json.status === "ok") {
                        const isAdmin = parseInt(json.admin) === 1;
                        alert(isAdmin ? "Bem-vindo, administrador!" : json.msg);
                        window.location.href = isAdmin ? "admin.html" : "index.html";
                    } else {
                        alert("Acesso negado: " + json.msg);
                    }
                } else {
                    const texto = await res.text();
                    console.error("Resposta inesperada:", texto);
                    alert("Erro inesperado. Veja o console.");
                }

            } catch (erro) {
                console.error("Erro de rede:", erro);
                alert("Erro de rede ou servidor.");
            }
        });
    });
