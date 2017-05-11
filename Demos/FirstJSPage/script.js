//alert("Hello, class! Good morning.")
function clicked(){
	console.log("Happy Thursday");
	//variables are called "var" in JS
	var firstValue = parseInt(document.getElementById("first").value);
	var secondValue = parseInt(document.getElementById("second").value);
	var sum = firstValue + secondValue
	console.log(sum);
	var myDiv = document.getElementById("outputDiv");
	myDiv.innerHTML=sum
}