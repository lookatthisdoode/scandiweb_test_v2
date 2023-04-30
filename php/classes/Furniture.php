<?php

include_once 'Product.php';
include_once 'Database.php';


class Furniture extends Product
{
    public $sku;
    public $name;
    public $price;
    public $width;
    public $length;
    public $height;
    public $type = "Furniture";

    public function __construct(string $a, string $b,string $c ,string $d ,string $e ,string $f)
    {
        $this->sku = $a;
        $this->name = $b;
        $this->price = $c;
        $this->width = $d;
        $this->length = $e;
        $this->height = $f;
    }

    public function toHTML()
    {
        echo "SKU: " . mb_strtoupper($this->sku) . "<br>";
        echo "Type: Furniture <br>";
        echo "Name: " . $this->name . "<br>";
        echo "Price: " . $this->price . " $<br>";
        echo "Width: " . $this->width . " Cm<br>";
        echo "Length: " . $this->length . " Cm<br>";
        echo "Height: " . $this->height . " Cm<br>";
    }

    public function toDB()
    {
        $dbconn = new Database;
        $presql = "'$this->sku', '$this->name', '$this->price', '$this->width', '$this->length', '$this->height', '$this->type'";
        $sql = "insert into scandiweb_products (sku, name, price, width, length, height, product_type) values (" . $presql . ")";

        mysqli_query($dbconn->conn, $sql);
        $dbconn->arrangeId();
    }
}
