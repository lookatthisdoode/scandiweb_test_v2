<?php

include_once '../classes/Database.php';

$data = file_get_contents( "php://input" );   //string
$ids = json_decode( $data );                  //array

$products = new Database;
$products->deleteThem($ids);
