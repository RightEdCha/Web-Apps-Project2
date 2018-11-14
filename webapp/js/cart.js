var jsonObj;

function director1()
{
	if (getCookie('username')== "")
	{
		window.location = "login.html";
	}
	else 
	{
		window.location = "accountInfo.html"
	}
}

function director2()
{
	if (getCookie('username')== "")
	{
		window.location = "login.html";
	}
	else 
	{
		window.location = "cart.html"
	}
}

function loadCart() 
{
	var username = getCookie('username');
	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/carts?username=" + username;
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			jsonObj = JSON.parse(this.responseText);		
			populateTable();
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function populateTable()
{
	var table = document.getElementById('cart-list');
	var subPrice = 0.00;
	var totalPrice = 0.00;
	for(var i=0; i<jsonObj.items.length; i++)
	{
		var row = table.insertRow(-1); /**Creates a new <tr> element at 1st or last postion, depending on browser. **/
		row.setAttribute('id','view'+i);

		var productImage = row.insertCell(0);
		productImage.setAttribute('class','column1');

		var productName = row.insertCell(1);
		productName.setAttribute('class','column1');

		var price = row.insertCell(2);
		price.setAttribute('id', 'price'+i)
		price.setAttribute('class','column1');

		var removeBttn = row.insertCell(3);
		removeBttn.setAttribute('class','column1');

		productImage.innerHTML = "<img src='css/images/product-placeholder.jpg'>";
		productName.innerHTML = "Name: " + jsonObj.items[i].productName;
		price.innerHTML = "Price: $" + jsonObj.items[i].salePrice;
		removeBttn.innerHTML = "<input type='submit' value='Remove' onclick='remove(this)'>";

		subPrice += jsonObj.items[i].salePrice;
		totalPrice = subPrice * 1.08;
	}

	document.getElementById('subtotal').textContent = "Subtotal: $" + subPrice.toFixed(2);
	document.getElementById('total-price').textContent = "Total Price: $" + totalPrice.toFixed(2);
}

function remove(ele)
{
	var jsonArrayNumber = ele.parentNode.parentNode.id.substring(4);
	var productId = jsonObj.items[jsonArrayNumber].productId;
	var cartId = jsonObj.cartId;
	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/carts?cartId="+cartId+"&productId=" + productId;
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			window.location = "cart.html"
		}
	};
	xhttp.open("DELETE", url, true);
	xhttp.send();
}

function checkout() 
{
	var cartId = jsonObj.cartId;
	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/carts/purchase/" + cartId;
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			window.location = "cart.html"
		}
	};
	xhttp.open("PUT", url, true);
	xhttp.send();
}

function getCookie(cname) 
{
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}