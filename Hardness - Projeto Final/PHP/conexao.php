<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$db = "hardness";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Falha na conexão: " . mysqli_connect_error());
}

// Verifica se a conexão foi bem-sucedida
if (!$conn) {
    $resposta["msg"] = "Erro na conexão com o banco de dados.";
    echo json_encode($resposta);
    exit;
}

?>

