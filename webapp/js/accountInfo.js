var json;
var allItems;
var purchasedItems = [];

function loadInformation()
{
	loadAccount();
	loadAllItems();
}

function loadAccount()
{
	var emailCon = document.getElementById("cemail");
	var lnameCon = document.getElementById("clname"); 
	var fnameCon = document.getElementById("cfname");

	var username = getCookie('username');

	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/customers/" + username;
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			json = JSON.parse(this.responseText);
			emailCon.textContent = "Email: " + json.email; 
			lnameCon.textContent = "Last Name: " + json.lname;
			fnameCon.textContent = "FIrst Name: " + json.fname;
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function loadAllItems()
{
	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/items";
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			allItems = JSON.parse(this.responseText);
			loadPurchaseHistory();
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function loadPurchaseHistory() 
{
	var username = getCookie('username');
	for(var i = 0; i < allItems.length; i++)
	{
		var xhttp2 = new XMLHttpRequest();
		var url2 = "http://localhost:8080/online-store-app/store/carts?productId=" + allItems[i].itemId;
		xhttp2.onreadystatechange = function() 
		{
			if(this.readyState == 4 && this.status == 200)
			{
				var jsonarray2 = JSON.parse(this.responseText);
				for(var j = 0; j < jsonarray2.length; j++)
				{
					if(jsonarray2[j].username == username)
					{
						getProductById(jsonarray2[j].productId);
					}
				}
			}
		}
		xhttp2.open("GET", url2, true);
		xhttp2.send();
	}
}

function getProductById(itemId)
{
	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/items/" + itemId;
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			obj = JSON.parse(this.responseText);
			var table = document.getElementById('purchase-history');
			var row = table.insertRow(-1); /**Creates a new <tr> element at 1st or last postion, depending on browser. **/
			var productImage = row.insertCell(0);
			var productName = row.insertCell(1);
			var price = row.insertCell(2);

			productImage.innerHTML = "<img src='css/images/product-placeholder.jpg'>";
			productName.innerHTML = obj.name;
			price.innerHTML = "$" + obj.salePrice;				
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

		

function updateAccount()
{
	var email = document.getElementById("email").value;
	var lname = document.getElementById("lname").value; 
	var fname = document.getElementById("fname").value;

	if(email == "")
	{
		email = json.email;
	}
	if(lname == "")
	{
		lname = json.lname;
	}
	if(fname == "")
	{
		fname = json.fname;
	}

	var username = getCookie('username');

	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/customers?fname=" + fname + "&lname=" + lname + "&username=" + username + "&email=" + email; 
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			window.location = "accountInfo.html";
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
