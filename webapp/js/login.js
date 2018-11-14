function login2() {
	var username = document.getElementById("login-username").value;

	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/customers/" + username;

	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			var jsonOBJ = JSON.parse(this.responseText);
			document.cookie = "username=" + jsonOBJ.username;
			window.location = "index.html";
		}
	};

	xhttp.open("GET", url, true);
	xhttp.send();
}

function signup2() {
	var username = document.getElementById("signup-username").value;
	var fname = document.getElementById("signup-fname").value;
	var lname = document.getElementById("signup-lname").value;
	var email = document.getElementById("signup-email").value;

	var xhttp = new XMLHttpRequest();
	var url = "http://localhost:8080/online-store-app/store/customers/" + username;

	xhttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 500) 
		{
			var xhttp2 = new XMLHttpRequest();
			var url2 = "http://localhost:8080/online-store-app/store/customers?" + "fname=" + fname + "&" + "lname=" + lname + "&" + "username=" + username + "&" + "email=" + email;

			console.log(url2);
			xhttp2.onreadystatechange = function()
			{
				if (this.readyState == 4 && this.status == 200)
				{
					document.cookie = "username=" + username;
					window.location = "index.html";
				}
			}

			xhttp2.open("POST",url2,true);
			xhttp2.send();
		}
	};

	xhttp.open("GET", url, true);
	xhttp.send();

}

function getCookie(cname) {
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