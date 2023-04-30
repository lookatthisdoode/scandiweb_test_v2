<?php
header("Access-Control-Allow-Origin: https://juniortestandreiradchenko.000webhostapp.com");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-type: application/json; charset=utf-8');
include_once 'classes/Database.php';
include_once 'classes/DVD.php';
include_once 'classes/Furniture.php';
include_once 'classes/Book.php';

//VARIABLES
$db = new Database;


//METHODS
function makeDVD(array $x)
{
  $newprod = new DVD($x['sku'], $x['name'], $x['price'], $x['size']);
  return $newprod;
}

function makeBook(array $x)
{
  $newprod = new Book($x['sku'], $x['name'], $x['price'], $x['weight']);
  return $newprod;
}

function makeFurniture(array $x)
{
  $newprod = new Furniture($x['sku'], $x['name'], $x['price'], $x['width'], $x['length'], $x['height']);
  return $newprod;
}

function createObjectToDb($data, $db) 
{
	$map = ["DVD" => 'makeDVD', "Book" => 'makeBook', "Furniture" => 'makeFurniture'];
	$newProduct = $map[$data['product_type']]($data);
	$newProduct->toDB();
	$db->arrangeId();
}



//MAIN ENDPOINT
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$data = json_decode(file_get_contents('php://input'), true);  //returns body of post request
	if (isset($data['sku'])) {
		//insert into db
		createObjectToDb($data, $db); //insert to database calls automatically upon render
		echo json_encode('successfully added');
	} else if (is_string($data)) {
		echo json_encode($db->skuExist($data));
	}else {
		//delete by ids
		$db->deleteThem($data);
		echo json_encode('successfully deleted');
	}
}	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		echo $db->select();
} else {
	echo 'wrong request';
}


//conn close here or inside DATABASE after it runs

?>
