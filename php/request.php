<?php


// controller (API)
// interacts with model (Database class)

header("Access-Control-Allow-Origin: https://juniortestandreiradchenko.000webhostapp.com");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json; charset=utf-8');

include_once 'classes/Database.php';
include_once 'classes/ProductFactory.php';

$db = new Database();
//creates new product to add to DB
$productFactory = new ProductFactory();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['sku'])) {
    		$db->insert($productFactory->createProduct($data));
        echo json_encode('successfully added new product');
    } else if (is_string($data)) {
        echo json_encode($db->skuExist($data));
    } else {
        $db->deleteThem($data);
        echo json_encode('successfully deleted these products');
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo $db->select();
} else {
    echo 'wrong request';
}

$db->conn->close();
