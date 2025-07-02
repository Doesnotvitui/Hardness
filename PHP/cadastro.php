<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$resposta = ["status" => "erro", "msg" => "Erro desconhecido."];

if (!isset($_POST["nome"], $_POST["telefone"], $_POST["endereco"], $_POST["senha"])) {
    $resposta["msg"] = "Todos os campos são obrigatórios.";
    echo json_encode($resposta);
    exit;
}

$nome = $_POST["nome"];
$telefone = $_POST["telefone"];
$endereco = $_POST["endereco"];
$senha = $_POST["senha"];

include "conexao.php";

if (empty($nome) || empty($telefone) || empty($endereco) || empty($senha)) {
    $resposta["msg"] = "Todos os campos devem ser preenchidos.";
    echo json_encode($resposta);
    exit;
}

$query = "INSERT INTO usuarios (nome, telefone, endereco, senha) VALUES (?, ?, ?, ?)";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query)) {
    $resposta["msg"] = "Erro na preparação da query: " . mysqli_error($conn);
    echo json_encode($resposta);
    exit;
}

mysqli_stmt_bind_param($stmt, "ssss", $nome, $telefone, $endereco, $senha);

if (mysqli_stmt_execute($stmt)) {
    $resposta["status"] = "ok";
    $resposta["msg"] = "Cadastro realizado com sucesso!";
} else {
    $resposta["msg"] = "Erro ao cadastrar: " . mysqli_stmt_error($stmt);
}

mysqli_stmt_close($stmt);

echo json_encode($resposta);
