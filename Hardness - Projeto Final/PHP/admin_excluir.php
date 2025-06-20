<?php
header("Content-Type: application/json");
require_once "conexao.php";

$resposta = ["status" => "erro", "msg" => "ID inválido."];

if (!isset($_POST["id"])) {
    echo json_encode($resposta);
    exit;
}

$id = intval($_POST["id"]);

$query = "DELETE FROM clientes WHERE id = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "i", $id);
mysqli_stmt_execute($stmt);

if (mysqli_stmt_affected_rows($stmt) > 0) {
    $resposta = ["status" => "ok", "msg" => "Usuário excluído com sucesso."];
} else {
    $resposta["msg"] = "Usuário não encontrado.";
}

echo json_encode($resposta);
mysqli_stmt_close($stmt);

