<?php
require_once "conexao.php";

ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

$resposta = ["status" => "erro", "msg" => "Erro desconhecido."];


if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $resposta["msg"] = "Método não permitido.";
    echo json_encode($resposta);
    exit;
}


if (!isset($_POST["telefone"]) || !isset($_POST["senha"])) {
    $resposta["msg"] = "Telefone e senha são obrigatórios.";
    echo json_encode($resposta);
    exit;
}

$telefone = trim($_POST["telefone"]);
$senha = trim($_POST["senha"]);


if (empty($telefone) || empty($senha)) {
    $resposta["msg"] = "Telefone e senha devem ser preenchidos.";
    echo json_encode($resposta);
    exit;
}


if (!preg_match('/^[\d\s\(\)\-\+]+$/', $telefone)) {
    $resposta["msg"] = "Formato de telefone inválido.";
    echo json_encode($resposta);
    exit;
}


$query = "SELECT id, nome, admin FROM clientes WHERE telefone = ? AND senha = ?";
$stmt = mysqli_prepare($conn, $query);

if (!$stmt) {
    $resposta["msg"] = "Erro ao preparar a query: " . mysqli_error($conn);
    echo json_encode($resposta);
    exit;
}

mysqli_stmt_bind_param($stmt, "ss", $telefone, $senha);

if (!mysqli_stmt_execute($stmt)) {
    $resposta["msg"] = "Erro ao executar a query: " . mysqli_stmt_error($stmt);
    mysqli_stmt_close($stmt);
    echo json_encode($resposta);
    exit;
}

$result = mysqli_stmt_get_result($stmt);


if ($row = mysqli_fetch_assoc($result)) {
    $resposta["status"] = "ok";
    $resposta["msg"] = "Login realizado com sucesso!";
    $resposta["admin"] = (int)$row["admin"];
    $resposta["user_id"] = $row["id"];
    $resposta["nome"] = $row["nome"];
    
    error_log("Login bem-sucedido para telefone: " . $telefone);
} else {
    $resposta["msg"] = "Telefone ou senha incorretos.";
    
    error_log("Tentativa de login falhada para telefone: " . $telefone);
}

mysqli_stmt_close($stmt);

echo json_encode($resposta);
exit;
?>