<?php
header('Content-Type: application/json');
require_once "conexao.php";

if (!$conn) {
    http_response_code(500);
    echo json_encode(["erro" => "Erro na conexão com o banco de dados."]);
    exit;
}

$query = "SELECT nome, telefone FROM clientes";
$result = mysqli_query($conn, $query);

$usuarios = [];

while ($row = mysqli_fetch_assoc($result)) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);

mysqli_close($conn);
