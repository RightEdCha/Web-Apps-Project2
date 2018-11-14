var jsonArray;
var listViewFlag;
var listLegnth;

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

function loadDefaultProductList() 
{
	var table = document.getElementById("product-list-table");

	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/items/";
	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			jsonArray = JSON.parse(this.responseText);
			var table = document.getElementById("product-list-table");
			table.parentNode.removeChild(table);
			listLength = 10;
			populateGrid();
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function searchProduct()
{
	var searchKey = document.getElementById('searchbar').value;
	if (searchKey == "")
	{
		//Show an alert saying that the search is empty.
	}
	else
	{
		var xhttp = new XMLHttpRequest();
		var url = "http://localhost:8080/online-store-app/store/items/search/" + searchKey;
		xhttp.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				jsonArray = JSON.parse(this.responseText);
				if(document.getElementById('viewButton').checked)
				{					
					listLength = jsonArray.length;
					var table = document.getElementById("product-list-table");
					var rows = table.getElementsByTagName("tr").length;

					for(var i=1; i<rows; i++)
					{
						table.deleteRow(1);
					}

					populateTable();
				}
				else
				{
					removeGrid();
					listLength = jsonArray.length;
					populateGrid();
				}
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}
}

function switchView()
{
	//List View
	if(document.getElementById('viewButton').checked)
	{
		removeGrid();
		var tableHeaders = [ 
			"Image", "Product Name", "Price", "Brand", "Size", "Color", "Gender"
		];

		//Create the table element
		var table = document.createElement('table');
		table.setAttribute('id', 'product-list-table');
		table.setAttribute('style', 'width:100%');
		var dir = document.getElementById("product-list");
		dir.appendChild(table);

		for(var i=0; i<tableHeaders.length; i++)
		{
			var temp = document.createElement('th');
			temp.setAttribute('style', 'width:14%');
			temp.textContent = tableHeaders[i];
			table.appendChild(temp);
		}

		//run list view
		populateTable();
	}
	//Grid View
	else
	{
		var table = document.getElementById("product-list-table");
		table.parentNode.removeChild(table);

		populateGrid(jsonArray.length);

		
	}
}
function removeGrid()
{
		var paras = document.getElementsByClassName('tile-view');

		while (paras[0]) 
		{
		    paras[0].parentNode.removeChild(paras[0]);
		}

}

function populateTable()
{
	var table = document.getElementById('product-list-table');
	for(var i=0; i<listLength; i++)
	{
		var row = table.insertRow(-1); /**Creates a new <tr> element at 1st or last postion, depending on browser. **/
		row.setAttribute('id','view'+i);
		var productImage = row.insertCell(0);
		var productName = row.insertCell(1);
		var price = row.insertCell(2);
		var brand = row.insertCell(3);
		var size = row.insertCell(4);
		var color = row.insertCell(5);
		var gender = row.insertCell(6);

		productImage.innerHTML = "<a href ='#' onclick='getProductInfoTable(this)' id='view" + i + "'><img src='css/images/product-placeholder.jpg'></a>";
		productName.innerHTML = jsonArray[i].name;
		price.innerHTML = "$" + jsonArray[i].salePrice;
		brand.innerHTML = jsonArray[i].brandName;
		size.innerHTML = jsonArray[i].size;
		color.innerHTML = jsonArray[i].color;
		gender.innerHTML = jsonArray[i].gender;
	}
}

function populateGrid()
{
	var dir = document.getElementById("product-list")

		for(var i=0; i<listLength; i++)
		{
			var link = document.createElement('a');
			link.setAttribute('href','#');
			link.setAttribute('onclick','getProductInfoGrid(this)');
			link.setAttribute('id','view'+i);
			dir.appendChild(link);

			var tileView = document.createElement('div');
			tileView.setAttribute('class','tile-view');
			link.appendChild(tileView);

			var img = document.createElement('img');
			img.setAttribute('src','css/images/product-placeholder.jpg');
			img.setAttribute('class','tile-pic');
			tileView.appendChild(img);

			var textWrapper = document.createElement('div');
			textWrapper.setAttribute('class','tile-text');
			tileView.appendChild(textWrapper);

			var text = document.createElement('p');
			text.textContent = 'Product Name: ' + jsonArray[i].name;
			textWrapper.appendChild(text);

			var text = document.createElement('p');
			text.textContent = 'Price: $' + jsonArray[i].salePrice;
			textWrapper.appendChild(text);

			var text = document.createElement('p');
			text.textContent = 'Brand: ' + jsonArray[i].brandName;
			textWrapper.appendChild(text);

			var text = document.createElement('p');
			text.textContent = 'Size: ' + jsonArray[i].size;
			textWrapper.appendChild(text);

			var text = document.createElement('p');
			text.textContent = 'Color: ' + jsonArray[i].color;
			textWrapper.appendChild(text);

			var text = document.createElement('p');
			text.textContent = 'Gender: ' + jsonArray[i].gender;
			textWrapper.appendChild(text);			

		}
}

function getProductInfoTable(ele){
	var jsonArrayNumber = ele.id.substring(4);
	document.cookie = "itemId=" + jsonArray[jsonArrayNumber].itemId + ";";
	window.location = "productView.html";
}

function getProductInfoGrid(ele){
	var jsonArrayNumber = ele.id.substring(4);
	document.cookie = "itemId=" + jsonArray[jsonArrayNumber].itemId + ";";
	window.location = "productView.html";
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