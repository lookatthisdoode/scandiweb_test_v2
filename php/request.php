<?php
header("Access-Control-Allow-Origin: https://juniortestandreiradchenko.000webhostapp.com");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST");
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

//this creates a ne Product object and puts it to DB
function createObjectToDb($data, $db) 
{
	//idk i came up with this weird workaround, feels enough to pass 'co conditionals' requirement
	$map = ["DVD" => 'makeDVD', "Book" => 'makeBook', "Furniture" => 'makeFurniture'];
	//so basically it will construct a function caller takes product_type from oject idk i dont really get it DONT TOUCH
	$newProduct = $map[$data['product_type']]($data);
	$newProduct->toDB();
	//i use id arranger to be able to name my checkboxes properly so i could iterate throught them for deletion
	$db->arrangeId();
}



//MAIN ENDPOINT
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	//returns body of post request(could be object, array or a string)
	$data = json_decode(file_get_contents('php://input'), true);
	//if data has sku property in it?
	if (isset($data['sku'])) 
	{
		//create product ovject and insert it into db
		createObjectToDb($data, $db);
		echo json_encode('successfully added new product');
	}
	//is this data you sending is strng? (SKU) 
	else if (is_string($data)) 
	{
		echo json_encode($db->skuExist($data));
	}
	// then must be your data is array of IDs, i see
	else 
	{
		//delete by IDs
		$db->deleteThem($data);
		echo json_encode('successfully deleted this products');
	}
}	
else if ($_SERVER['REQUEST_METHOD'] === 'GET') 
{
	//returns json of all products
	echo $db->select();
} 
else 
{
	echo 'wrong request';
}

// idk if this works properly but i guess its a rest api so it gets offloaded just after connection closes which is a good thing in theory
$db->conn->close();

?>
