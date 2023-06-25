<?php


//model
//interacts with Database directly, performs CRUD operations

class Database
{
    // private $host = 'localhost';
    // private $user = 'id19573064_scandiweb';
    // private $pwd = '\MGHcOh0NSUL)#|(';
    // private $dbase = 'id19573064_test_database';
    // private $table = 'scandiweb_products';

    private $host = 'localhost';
    private $user = 'andrei';
    private $pwd = 'andrei';
    private $dbase = 'scandiweb';
    private $table = 'scandiweb_products';


    public function __construct()
    {
        $this->conn = mysqli_connect($this->host , $this->user , $this->pwd , $this->dbase);
    }

    //getter, gets all products data, already returning a json
    public function select()    
    {
        $result = mysqli_query($this->conn, "select * from scandiweb_products");
        $rows = array();
         while ($row = mysqli_fetch_assoc($result)) {
             $rows[] = $row;
        }
        return json_encode($rows);
    }

    //basic insert
    public function insert($sql)
    {   
        mysqli_query($this->conn, $sql);
        $this->arrangeId();
    }

    // arranges is to corretly display checkboxes
    public function arrangeId()
    {
        $counter = 1;
        $data = json_decode($this->select(), true);
        foreach ($data as $row) {
            mysqli_query($this->conn, "UPDATE scandiweb_products SET id = $counter WHERE id=$row[id]");
            $counter ++;
        }
    }

    //deletes checked items
    public function deleteThem (array $ids)
    {   
        $idsToDelete = implode(',', $ids); //convert to string
        //couldve just use json decode i guess?
        $sql = "DELETE FROM scandiweb_products WHERE id IN ( $idsToDelete )";
        mysqli_query($this->conn, $sql);
        $this->arrangeId();
    }

    //checks if SKU exist (for my form validator)
    public function skuExist($sku)
    {
        $data = json_decode($this->select(), true);
        $isexist = 'dont exist';
        foreach ($data as $row) 
        {              
            if (strtolower($row['sku']) === strtolower($sku)) 
             {
                $isexist = 'exist';
                break;
            }
        }
        return $isexist;
    }

}
