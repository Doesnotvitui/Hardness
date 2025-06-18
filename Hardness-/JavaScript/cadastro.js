document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("meuFormulario");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const campos = ["nome", "telefone", "endereco", "senha", "confirmaSenha"];
        const valores = Object.fromEntries(campos.map(id => [id, document.getElementById(id).value.trim()]));

        if (valores.senha !== valores.confirmaSenha) {
            alert("Senha não confirmada!");
            return;
        }

        const dados = new FormData();
        dados.append("nome", valores.nome);
        dados.append("telefone", valores.telefone);
        dados.append("endereco", valores.endereco);
        dados.append("senha", CryptoJS.SHA256(valores.senha).toString());

        try {
            const res = await fetch("../PHP/cadastro.php", { method: "POST", body: dados });

            if (res.headers.get("content-type")?.includes("application/json")) {
                const json = await res.json();
                alert(json.status === "ok" ? json.msg : "Erro: " + json.msg);
                if (json.status === "ok") form.reset();
            } else {
                const texto = await res.text();
                console.error("Resposta inesperada (não-JSON):", texto);
                alert("Erro inesperado. Veja o console.");
            }

        } catch (err) {
            console.error("Erro na requisição:", err);
            alert("Erro de rede ou do servidor.");
        }
    });
});
