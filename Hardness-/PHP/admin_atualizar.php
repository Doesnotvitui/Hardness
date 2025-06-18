<?php
header("Content-Type: application/json");
require_once "conexao.php";

$resposta = ["status" => "erro", "msg" => "Erro desconhecido."];

if (!isset($_POST["id"], $_POST["nome"], $_POST["telefone"])) {
    $resposta["msg"] = "Dados incompletos.";
    echo json_encode($resposta);
    exit;
}

$id = intval($_POST["id"]);
$nome = trim($_POST["nome"]);
$telefone = trim($_POST["telefone"]);

$query = "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ssi", $nome, $telefone, $id);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) >= 0) {
    $resposta = ["status" => "ok", "msg" => "Usuário atualizado com sucesso."];
}

echo json_encode($resposta);
mysqli_stmt_close($stmt);
mysqli_close($conn);
