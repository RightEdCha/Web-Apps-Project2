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

function loadProduct()
{
	var itemId = getCookie('itemId');
	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/items/" + itemId;
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			var jsonObj = JSON.parse(this.responseText);

			var dir1 = document.getElementById('product-info-wrapper');

			var img = document.createElement('img');
			img.setAttribute('src','css/images/product-placeholder.jpg');
			img.setAttribute('class','column');
			img.setAttribute('id','product-pic')
			dir1.appendChild(img);

			dir = document.createElement('div');
			dir.setAttribute('class','column');
			dir.setAttribute('id', 'text')
			dir1.appendChild(dir);

			var p = document.createElement('p');
			p.textContent = "Name: " + jsonObj.name;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "Price: $" + jsonObj.salePrice;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "UPC: " + jsonObj.upc;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "Brand: " + jsonObj.brandName;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "Size: " + jsonObj.size;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "Color: " + jsonObj.color;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "Gender: " + jsonObj.gender;
			dir.appendChild(p);

			var p = document.createElement('p');
			p.textContent = "Description: " + jsonObj.shortDescription;
			dir.appendChild(p);

			var bttn = document.createElement('input');
			bttn.setAttribute('type', 'submit');
			bttn.setAttribute('value', 'Add To Cart');
			bttn.setAttribute('id','cart-bttn');
			bttn.setAttribute('onclick','addToCart()')
			dir1.appendChild(bttn);

		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();

}

function addToCart()
{
	var userName = getCookie('username');
	var itemId = getCookie('itemId');

	if(userName == "")
	{
		window.location = "login.html";
	}
	else
	{
		var xhttp = new XMLHttpRequest();
		var url = "http://localhost:8080/online-store-app/store/carts?productId=" + itemId + "&username=" + userName;
		xhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.cookie = "itemId=";
				window.location ="cart.html";
			}
		};
		xhttp.open("POST", url, true);
		xhttp.send();
	}
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