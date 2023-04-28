<?php

include_once '../classes/Database.php';


$sku = $_GET['sku'];

$data = new Database;
$isexist = $data->skuExist($sku);

echo $isexist;


//yes this is little extra bc my formhandler is on js and i cba to rewrite it:)
