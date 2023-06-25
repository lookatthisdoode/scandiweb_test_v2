<?php


//this class takes my POST array and based on type creates me a SQL query
//I`ve decided to go with only one class to avoid repetition as per your last requirement
//thus i dont use conditional statements to differentiate products as per requierement
    
class ProductFactory
{
    private $additionalProps = [
        'DVD' => ['size'],
        'Book' => ['weight'],
        'Furniture' => ['width', 'length', 'height']
    ];

    public function createProduct(array $data)
    {
        $sku = $data['sku'];
        $name = $data['name'];
        $price = $data['price'];
        $type = $data['product_type'];

        $props = $this->additionalProps[$type];

        $columns = ['sku', 'name', 'price', 'product_type'];
        $values = ["'$sku'", "'$name'", "'$price'", "'$type'"];

        foreach ($props as $prop) {
            $value = $data[$prop];
            $columns[] = $prop;
            $values[] = "'$value'";
        }

        $columnsString = implode(', ', $columns);
        $valuesString = implode(', ', $values);

        $sql = "INSERT INTO scandiweb_products ($columnsString) VALUES ($valuesString)";
        return $sql;
    }
}



