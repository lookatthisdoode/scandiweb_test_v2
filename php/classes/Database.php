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
        } //не работает проверялка
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
        $this->arrangeId();
    }

    
    public function arrangeId()
    {
        $counter = 1;
        $data = json_decode($this->select(), true);
        foreach ($data as $row) {
            mysqli_query($this->conn, "UPDATE scandiweb_products SET id = $counter WHERE id=$row[id]");
            $counter ++;
        }
    }


    public function deleteThem (array $ids)
    {   
        $idsToDelete = implode(',', $ids); //convert to string
        $sql = "DELETE FROM scandiweb_products WHERE id IN ( $idsToDelete )";
        mysqli_query($this->conn, $sql);
        $this->arrangeId();
    }


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
