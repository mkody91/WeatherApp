


var tempColor = 0;
var title = ["Current Temperature","Forecast","Sunrise / Sunset"];
var count = 0;
var weatherData = [];
var weatherIcon = "";
var sunrise;
var sunset;

time = function(unixTime) {
  var date = new Date(unixTime*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Will display time in 10:30:23 format
  if (hours > 11) {
  var formattedTime = hours + '' + minutes.substr(-2);
  }
  else {
  var formattedTime = hours + ':' + minutes.substr(-2);
  }

  var hours24 = parseInt(formattedTime.substring(0,2));
  var hour = ((hours24 + 11) % 12) + 1;
  var amPm = hours24 > 11 ? 'pm' : 'am';
  var minute = formattedTime.substring(2);
  return hour + ':' + minute + amPm;
}
onload = function(){

	var request = new XMLHttpRequest();
	request.open("GET","http://api.openweathermap.org/data/2.5/weather?zip=16625,us&appid=8b513c182246bf6974d6f80fa343f585&units=imperial", true);

	request.onload = function(){

		var responseJSONData = JSON.parse(request.responseText);
		weatherData[0] = responseJSONData.main.temp;
		weatherData[1] = responseJSONData.weather[0].main;
		weatherData[2] = responseJSONData.weather[0].description;
		weatherData[3] = responseJSONData.sys.sunrise;
		weatherData[4] = responseJSONData.sys.sunset;
		sunrise = time(responseJSONData.sys.sunrise);
		sunset = time(responseJSONData.sys.sunset);
		weatherIcon = responseJSONData.weather[0].icon;
		tempColor = responseJSONData.main.temp;
		document.getElementById("city").innerHTML = responseJSONData.name;
		document.getElementById("name").innerHTML = title[count];
		document.getElementById("main").innerHTML = "<img id='icon' src='images/" + weatherIcon + ".png'>" +  "<br>" + tempColor + "&#8457;" ;

//anonymous function below changes the background determined by the temperature range cold to hot
//and after the statement becomes true it initializes itself
		(function(){

			if(tempColor < 32)
			{
				document.body.style.backgroundColor="#00FFFF";
			}
			else if(tempColor < 50)
			{
				document.body.style.backgroundColor="#3399FF";
			}
			else if(tempColor < 70 )
			{
				document.body.style.backgroundColor="#FFFF00";
			}
			else if(tempColor < 90)
			{
				document.body.style.backgroundColor="#FF6600";
			}
			else if(tempColor > 90)
			{
				document.body.style.backgroundColor="#FF1919";
			}
			else
			{
				console.log("Color Error");
			}
		})();
	}

	request.onerror = function(){

		console.log("Connection Error");
	}

	request.send();
}

// leftScroll function is attached to the left button cycles through the arrays by decrementing by one
// until it is less than zero then resets at the top of the list
leftScroll = function(){

	count--;

	if(count < 0)
	{
		count = title.length - 1;
	}

	if(count === 0 )
	{
		document.getElementById("main").innerHTML = "<img id='icon' src='images/" + weatherIcon + ".png'>" +  "<br>" + tempColor + "&#8457;";
	}
	else if(count === 1)
	{

		document.getElementById("name").innerHTML = title[count];
		document.getElementById("main").innerHTML = weatherData[2];
	}
	else if(count === 2)
	{

		document.getElementById("name").innerHTML = title[count];
		document.getElementById("main").innerHTML = "Sunrise " + sunrise + "<br>"  + "Sunset " + sunset;
	}

	document.getElementById("name").innerHTML = title[count];
}

// rightScroll function is attached to the right button cycles through the arrays by incrementing by one
// until it is more than the length of the array then resets at the botto of the list
rightScroll = function(){

	count++;

	if(count > title.length - 1)
	{
		count = 0;
	}

	if(count === 0 )
	{
		document.getElementById("main").innerHTML = "<img id='icon' src='images/" + weatherIcon + ".png'>" + "<br>" + tempColor + "&#8457;";
	}
	else if(count === 1)
	{

		document.getElementById("name").innerHTML = title[count];
		document.getElementById("main").innerHTML = weatherData[2];
	}
	else if(count === 2)
	{

		document.getElementById("name").innerHTML = title[count];
		document.getElementById("main").innerHTML = "Sunrise " + sunrise + "<br>" + "Sunset " + sunset;
	}

	document.getElementById("name").innerHTML = title[count];
}
