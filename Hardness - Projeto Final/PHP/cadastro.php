<?php
require_once "conexao.php";

// Resposta padrão
$resposta = ["status" => "erro", "msg" => "Erro desconhecido."];


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


$nome = trim($_POST["nome"]);
$telefone = trim($_POST["telefone"]);
$endereco = trim($_POST["endereco"]);
$senha = trim($_POST["senha"]);


if (empty($nome) || empty($telefone) || empty($endereco) || empty($senha)) {
    $resposta["msg"] = "Todos os campos devem ser preenchidos.";
    echo json_encode($resposta);
    exit;
}


if (strlen($nome) < 2 || strlen($nome) > 100) {
    $resposta["msg"] = "Nome deve ter entre 2 e 100 caracteres.";
    echo json_encode($resposta);
    exit;
}


// Validação de telefone 
if (!preg_match('/^[\d\s\(\)\-\+]+$/', $telefone)) {
    $resposta["msg"] = "Formato de telefone inválido.";
    echo json_encode($resposta);
    exit;
}

// Verifica se o telefone já existe
$check_query = "SELECT id FROM clientes WHERE telefone = ?";
$check_stmt = mysqli_prepare($conn, $check_query);

if (!$check_stmt) {
    $resposta["msg"] = "Erro ao verificar telefone: " . mysqli_error($conn);
    echo json_encode($resposta);
    exit;
}

mysqli_stmt_bind_param($check_stmt, "s", $telefone);
mysqli_stmt_execute($check_stmt);
$result = mysqli_stmt_get_result($check_stmt);

if (mysqli_num_rows($result) > 0) {
    $resposta["msg"] = "Este telefone já está cadastrado.";
    mysqli_stmt_close($check_stmt);
    echo json_encode($resposta);
    exit;
}

mysqli_stmt_close($check_stmt);



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
    $resposta["id"] = mysqli_insert_id($conn);
} else {
    $resposta["msg"] = "Erro ao executar a query: " . mysqli_stmt_error($stmt);
}

mysqli_stmt_close($stmt);

echo json_encode($resposta);
exit;
?>