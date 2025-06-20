<?php
header("Content-Type: application/json");
require_once "conexao.php";

$result = mysqli_query($conn, "SELECT id, nome, telefone FROM clientes");

$dados = [];
while ($row = mysqli_fetch_assoc($result)) {
    $dados[] = $row;
}

echo json_encode($dados);

