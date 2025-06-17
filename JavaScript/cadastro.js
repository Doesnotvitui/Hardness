async function cadastrar() {
    var nome = document.getElementById('nome').value.trim();
    var telefone = document.getElementById('telefone').value.trim();
    var endereco = document.getElementById('endereco').value.trim();
    var senha = document.getElementById('senha').value;
    var confirmaSenha = document.getElementById('confirmaSenha').value;

    if (senha !== confirmaSenha) {
        window.alert("Senha não confirmada!");
        return;
    }

    var hashSenha = CryptoJS.SHA256(senha).toString();

    var dados = new FormData();
    dados.append("nome", nome);
    dados.append("telefone", telefone);
    dados.append("endereco", endereco);
    dados.append("senha", hashSenha);

    try {
        const respostaHttp = await fetch('../PHP/cadastro.php', {
            method: "POST",
            body: dados
        });

        const contentType = respostaHttp.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const resposta = await respostaHttp.json();

            if (resposta.status !== "ok") {
                window.alert("Não foi possível cadastrar: " + resposta.msg);
            } else {
                window.alert(resposta.msg);
            }
        } else {
            const texto = await respostaHttp.text(); // Só executa se não for JSON
            console.error("Resposta inesperada (não-JSON):", texto);
            window.alert("Erro inesperado. Veja o console.");
        }

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        window.alert("Erro de rede ou do servidor. Veja o console.");
    }
}
