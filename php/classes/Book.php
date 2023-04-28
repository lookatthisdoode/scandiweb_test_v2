<?php

include_once 'Product.php';
include_once 'Database.php';


class Book extends Product
{
    public $sku;
    public $name;
    public $price;
    public $weight;
    public $type = "Book";

    public function __construct(string $a, string $b,string $c,string $d)
    {
        $this->sku = $a;
        $this->name = $b;
        $this->price = $c;
        $this->weight = $d;
    }

    public function toHTML()
    {
        echo "SKU: " . mb_strtoupper($this->sku) . "<br>";
        echo "Type: Book<br>";
        echo "Name: " . $this->name . " <br>";
        echo "Price: " . $this->price . " $<br>";
        echo "Weight: " . $this->weight . " Kg<br>";
    }

    public function toDB()
    {
        $dbconn = new Database;
        $presql = "'$this->sku', '$this->name', '$this->price', '$this->weight', '$this->type'";
        $sql = "insert into scandiweb_products (sku, name, price, weight, product_type) values (" . $presql . ")";

        mysqli_query($dbconn->connect(), $sql);

        $dbconn->arrangeId();
    }
}
