document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("meuFormulario");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const campos = ["nome", "telefone", "endereco", "senha", "confirmaSenha"];
        const valores = Object.fromEntries(campos.map(id => [id, document.getElementById(id).value.trim()]));

        // Validação da confirmação de senha
        if (valores.senha !== valores.confirmaSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        // Validação de campos obrigatórios
        if (!valores.nome || !valores.telefone || !valores.endereco || !valores.senha) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        const dados = new FormData();
        dados.append("nome", valores.nome);
        dados.append("telefone", valores.telefone);
        dados.append("endereco", valores.endereco);
        dados.append("senha", CryptoJS.SHA256(valores.senha).toString());

        try {
            const res = await fetch("../PHP/cadastro.php", { 
                method: "POST", 
                body: dados 
            });

            if (res.headers.get("content-type")?.includes("application/json")) {
                const json = await res.json();
                
                if (json.status === "ok") {
                    alert(json.msg);
                    
                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 1000);
                    
                } else {
                    alert("Erro: " + json.msg);
                }
            } else {
                const texto = await res.text();
                console.error("Resposta inesperada (não-JSON):", texto);
                alert("Erro inesperado no servidor. Verifique o console para mais detalhes.");
            }

        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Erro de rede ou do servidor. Verifique sua conexão e tente novamente.");
        }
    });

    const senhaInput = document.getElementById("senha");
    const confirmaSenhaInput = document.getElementById("confirmaSenha");

    if (confirmaSenhaInput) {
        confirmaSenhaInput.addEventListener("input", () => {
            const senha = senhaInput.value;
            const confirmaSenha = confirmaSenhaInput.value;
            
            if (confirmaSenha && senha !== confirmaSenha) {
                confirmaSenhaInput.setCustomValidity("As senhas não coincidem");
            } else {
                confirmaSenhaInput.setCustomValidity("");
            }
        });
    }
});