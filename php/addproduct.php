<?php header('Content-type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="style.css">
        <script type="text/javascript" src="script.js"></script>
        <link rel="icon" href="icon.png">
        <title>Add Product</title>
    </head>

    <body>

        <nav>
            <div class="pagettl"><h1>Add Product</h1></div>
            <button id="Save" onclick="submitform()">Save</button>
            <button id="goback" onclick="location.href = 'index.php'">CANCEL</button>
            <button onclick="checkformdata()">VSEFORMYy</button>
        </nav>

        <p class="divider"></p>

        <div class="formBody">

            <div id="error"></div>

            <form id="product_form" action="index.php" method="post">
                SKU:<br><input type="text" name="sku" id="sku"><br>
                Name:<br> <input type="text" name="name" id="name"><br>
                Price:<br><input type="number" name="price" id="price" onfocus="blockEDash(this.id)"><br>

                <p>Select type of product:</p>

                <select id="productType" onchange="changeform(this.value)">
                    <option value="">Choose Type</option>
                    <option value="Book">Book</option>
                    <option value="DVD">DVD</option>
                    <option value="Furniture">Furniture</option>
                </select>

                <p></p>

                <div id="bottomform"></div>
            </form>
        </div>
    </body>
</html>
