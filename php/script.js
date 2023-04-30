
function blockEDash (field)
{
    var invalidChars = [
        "-", "+", "e",
    ]
    document.getElementById(field).addEventListener("keydown", function(e) {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })
    document.getElementById(field).addEventListener("input", function() {
        this.value = this.value.replace(/[e\+\-]/gi, "");
    })
}

function submitform()
{
    event.preventDefault();

    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var sku = document.getElementById('sku')
    var name = document.getElementById('name')
    var price = document.getElementById('price')
    var weight = document.getElementById('weight')
    var dvd = document.getElementById('size')
    var width = document.getElementById('width')
    var length = document.getElementById('length')
    var height = document.getElementById('height')
    var type = document.getElementById('product_type')
    var errorMsg = document.getElementById('error')
    errorMsg.innerHTML = ""
    //should be a better way to get all the values from it



    try {
        if (sku.value == "")                throw "SKU field is required";
        if (sku.value.length < 5 )          throw "SKU should be longer than 5 symbols";
        if (sku.value.length > 10)          throw "SKU should be shorted than 10 symbols";
        if (format.test(sku.value))         throw "SKU must not contain any special characters";
        if (checkSKU(sku.value) == 1)       throw "This SKU is already exist";
        if (name.value == "")               throw "Enter name";
        if (name.value.length < 3)          throw "Name must be longer that 3 digits";
        if (name.value.length > 15)         throw "Name must be shorter that 15 digits";
        if (format.test(name.value))        throw "Name must not contain any special characters";
        if (price.value == "")              throw "Enter price";
        if (price.value.length > 10)        throw "Price should be longer than 10 digits";
        if (!type)                          throw "You must choose the type of product";
        if (dvd) if (dvd.value == "")       throw "Size field is required";
        if (weight) if (weight.value == "") throw "Weight field is required";
        if (width) if (width.value == "")   throw "Width field is required";
        if (length) if (length.value == "") throw "Length field is required";
        if (height) if (height.value == "") throw "Height field is required";

        // fetch('request.php', {

        //make an array and submit
        //document.getElementById("product_form").submit();
    } catch (e) {
        errorMsg.innerHTML = e;
    }
}

function checkSKU(sku)
{
    var checkSKU = new XMLHttpRequest();
    checkSKU.open("GET","requests/checksku.request.php?sku="+sku, false);
    checkSKU.send();

    if (checkSKU.readyState == 4 && checkSKU.status == 200) return checkSKU.response;
}


