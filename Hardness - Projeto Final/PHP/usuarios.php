<?php
header('Content-Type: application/json');

try {
    require_once "conexao.php";

    $query = "SELECT nome, telefone FROM clientes ORDER BY nome";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        throw new Exception("Erro na consulta: " . mysqli_error($conn));
    }

    $usuarios = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $usuarios[] = [
            'nome' => $row['nome'] ?? '',
            'telefone' => $row['telefone'] ?? ''
        ];
    }

    echo json_encode([
        "status" => "ok",
        "total" => count($usuarios),
        "usuarios" => $usuarios
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "erro",
        "erro" => $e->getMessage(),
        "usuarios" => []
    ]);
}
?>