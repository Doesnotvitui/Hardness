<?php
// Inclui a conexão com o banco
require_once "conexao.php";

// Resposta padrão
$resposta = ["status" => "erro", "msg" => "Erro desconhecido."];

// Verifica se a conexão foi bem-sucedida
if (!$conn) {
    $resposta["msg"] = "Erro na conexão com o banco de dados.";
    echo json_encode($resposta);
    exit;
}

// Verifica se todos os campos esperados estão presentes
if (
    !isset($_POST["nome"]) || 
    !isset($_POST["telefone"]) || 
    !isset($_POST["endereco"]) || 
    !isset($_POST["senha"])
) {
    $resposta["msg"] = "Todos os campos são obrigatórios.";
    echo json_encode($resposta);
    exit;
}

// Filtra e valida os dados recebidos
$nome = trim($_POST["nome"]);
$telefone = trim($_POST["telefone"]);
$endereco = trim($_POST["endereco"]);
$senha = trim($_POST["senha"]);

if (empty($nome) || empty($telefone) || empty($endereco) || empty($senha)) {
    $resposta["msg"] = "Todos os campos devem ser preenchidos.";
    echo json_encode($resposta);
    exit;
}


// Prepara e executa a query
$query = "INSERT INTO clientes (nome, telefone, endereco, senha) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $query);

if (!$stmt) {
    $resposta["msg"] = "Erro ao preparar a query: " . mysqli_error($conn);
    echo json_encode($resposta);
    exit;
}

mysqli_stmt_bind_param($stmt, "ssss", $nome, $telefone, $endereco, $senha);

if (mysqli_stmt_execute($stmt)) {
    $resposta["status"] = "ok";
    $resposta["msg"] = "Cadastro realizado com sucesso!";
} else {
    $resposta["msg"] = "Erro ao executar a query: " . mysqli_stmt_error($stmt);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

echo json_encode($resposta);
exit;
