<?php
require_once "conexao.php";

ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

$resposta = ["status" => "erro", "msg" => "Erro desconhecido."];

if (!isset($_POST["telefone"], $_POST["senha"])) {
    $resposta["msg"] = "Telefone e senha são obrigatórios.";
    echo json_encode($resposta);
    exit;
}

$telefone = trim($_POST["telefone"]);
$senha = trim($_POST["senha"]);


if (!$conn) {
    $resposta["msg"] = "Erro na conexão com o banco.";
    echo json_encode($resposta);
    exit;
}

$query = "SELECT admin FROM clientes WHERE telefone = ? AND senha = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "ss", $telefone, $senha);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    $resposta["status"] = "ok";
    $resposta["msg"] = "Login realizado com sucesso!";
    $resposta["admin"] = $row["admin"];
} else {
    $resposta["msg"] = "Telefone ou senha incorretos.";
}

echo json_encode($resposta);
mysqli_stmt_close($stmt);
mysqli_close($conn);
