<?php

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
        if (!$this->conn) {
            echo 'nepoluchilos podcluchisa';
        } //не работает
    }


    public function getData()   //old one for dev purposes(display before react)
    {
        $result = mysqli_query($this->conn, "select * from scandiweb_products");
        return $result;
    }

    public function select()    // new, already returning a json
    {
        $result = mysqli_query($this->conn, "select * from scandiweb_products");
        $rows = array();
         while ($row = mysqli_fetch_assoc($result)) {
             $rows[] = $row;
        }
        return json_encode($rows);
    }

    public function insert($sql)
    {   
        mysqli_query($this->conn, $sql);
    }

    public function arrangeId()
    {
        $counter = 1;
        //get all data just to get qty
        $data = $this->select();
        while ($row = mysqli_fetch_row($data)) {
            mysqli_query($this->conn, "UPDATE scandiweb_products SET id = $counter WHERE id=$row[0]");
            $counter ++;
        }
    }
    //maybe just use product id to render checkboxes



    public function deleteThem (array $ids)
    {
        $idstodelete = "";
        // formats array into sql string
        foreach ($ids as $key => $value) {
            if ($key == count($ids)-1) {
                $idstodelete .= intval($value);
            } else {
                $idstodelete .= $value . ", ";
            }
        }

        $sql = "DELETE FROM scandiweb_products WHERE id IN ( $idstodelete )";
        mysqli_query($this->conn, $sql);
        $this->arrangeId();
        $this->connect()->close();
    }



    public function skuExist($sku)
    {
        $data = $this->select();
        $isexist = 0;
        while ($row = mysqli_fetch_row($data)) {
            if (strtolower($row [1]) === strtolower($sku)) {
                $isexist = 1;
            }
        }
        return $isexist;  //defo returns true/false
    }
}
