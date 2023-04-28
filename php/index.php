<?php
    header('Content-type: text/html; charset=utf-8');
    include_once 'classes/Database.php';
    include_once 'classes/DVD.php';
    include_once 'classes/Furniture.php';
    include_once 'classes/Book.php';
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css">
        <link rel="icon" href="icon.png">
        <script type="text/javascript" src="script.js"></script>
        <title>test_scandiweb</title>
        <script type="text/javascript">
            

        </script>
    </head>

    <body>

        <nav>
            <div id="pgttl" class="pagettl"><h1>Product List</h1></div>
            <button id="add" onclick="location.href = 'addproduct.php'">ADD</button>
            <button  onclick="deletethem()">MASS DELETE</button>
        </nav>

        <div class="divider"></div>

        <div id="containerProduct">
            <?php
                $database = new Database;
                $data = $database->getData();
                $map = ["DVD" => 'makeDVD', "Book" => 'makeBook', "Furniture" => 'makeFurniture'];

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
                
                
                //to database
                // if ($_POST) {
                //     var_dump($_POST) ;
                //     $map[$_POST['product_type']]($_POST)->toDB();
                //     //echo "<script> location.href='index.php'; </script>";
                // }
                
                //render
                
                
                
                
                while ($row = mysqli_fetch_assoc($data)) {
                    $render = $map[$row['product_type']]($row);

                    echo "<div class='mydiv'" . $row['id'] . "'>";
                    echo "<input type='checkbox' id='checkbox" . $row['id'] . "' class='delete-checkbox'>";
                    echo "<div class='deletetext'>Check to delete</div>";

                    $render->toHTML();

                    echo "</div>";
                }
                
            ?>
        </div>
    </body>
</html>
