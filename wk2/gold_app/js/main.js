/* 
	Marco Rodriguez -->
  	07-12-12 -->
 	Project 2 -->
	MIU 1207 -- >
*/
// Javascript file 

//Wait for DOM
window.addEventListener("DOMContentLoaded", function(){
	//getElementById Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	// populate options for ET Time 

	function fastestTime(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = ge('fastest')
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "fast");

		for(var i=0, f=fast.length; i<f; i++){ // loop thru our variable data
			var makeOption = document.createElement('option');
			var optText = fast[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// populate options for amount of power 

	function powerAmount(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = ge("hp"),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "hpr");

		for(var i=0, h=hpr.length; i<h; i++){ // loop thru our variable data
			var makeOption = document.createElement("option");
			var optText = hpr[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// populate options for power adders

	function powerAdders(){
		var formTag = document.getElementsByTagName("form"), // form element tag
			selectLi = ge('adder'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "adders");

		for(var i=0, a=adders.length; i<a; i++){ // loop thru our variable data
			var makeOption = document.createElement('option');
			var optText = adders[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}	
		selectLi.appendChild(makeSelect);
	}

	// function for radio buttons

	function getSelectedRadio(){
		var radios = document.forms[0].tranny;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				trannyValue = radios[i].value;
			}
		}
	}

	// function for checkbox option 

	function getCheckboxValue(){
		if(ge('ltech').checked){
			siteValue = ge('ltech').value;
		}else{
			siteValue = "No";
		}
	}

// toggle controls

	function toggleControls(n){
		switch(n){
			case "on":
				ge('contactForm').style.display  = "none";
				ge('clear').style.display 		= "inline";
				ge('displayLink').style.display 	= "none";
				ge('addNew').style.display 		= "inline";
				break;
					// off
			case "off":
				ge('contactForm').style.display  = "block";
				ge('clear').style.display 		= "inline";
				ge('displayLink').style.display 	= "inline";
				ge('addNew').style.display 		= "none";
				ge('items').style.display 		= "none";
				break;

			default:
				return false;		
		}
	}

	// stored data function
	// stores all object data

		function storeData(key){
			// if there is no key, this means this is brand new item and we need a new key.
			if(!key){
			var id 					= Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			}else{
				// set the id to the existing key we're editing so that it will save over the data
				//the key is the same key that's been passed along from the editSubmit event handler
				// id to the validate function, and then passed here, into the storeData function.
				id = key;
			}
		getSelectedRadio(); // calling the select radio function
		getCheckboxValue(); // checkbox value function
		var item  				= {};
			item.fname			= ["First Name:", 					ge('fname').value];
			item.lname			= ["Last Name:", 					ge('lname').value];
			item.email			= ["Email:", 						ge('email').value];
			item.date			= ["Date:", 						ge('date').value];
			item.make			= ["Make:", 						ge('make').value];
			item.car			= ["Car:", 							ge('car').value];
			item.caramount		= ["Number of cars you own:", 	ge('caramount').value];
			item.fastest		= ["Fastest Time:", 				ge('fast').value];
			item.hp				= ["Horse Power:", 					ge('hpr').value];
			item.adder			= ["Power Adder:", 					ge('adders').value];
			item.tranny			= ["Transmission:", 				trannyValue];
			item.ltech			= ["Referred from LS1Tech.com:", 	siteValue];
			item.comments		= ["Any Comments:", 				ge('comments').value];

			// save data stringify
			localStorage.setItem(id, JSON.stringify(item));
			alert("Contact Saved!");
	}

	// get data

	function getData(){
		toggleControls("on");
		if(localStorage.length ===0){
			alert("There is no data in local storage so default data was added."); // alert
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li'); // project 3 
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.fastest[1], makeSubList); // adds image to data
			// loop thru object
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi); // project 3
			} 
			makeItemLinks(localStorage.key(i), linksLi); // creates our edit and delete buttons
		}
	}

	// get image
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}

	// auto populate local storage
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}

	// make item links
	// creat edit and delete buttons for stored data

	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Contact";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		// line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		// delete 
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Contact";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem(){
		// grab data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// show form
		toggleControls("off");

		// populate the form fields with current localStorage values.
		ge('fname').value = item.fname[1];
		ge('lname').value = item.lname[1];
		ge('email').value = item.email[1];
		ge('date').value = item.date[1];
		ge('make').value = item.make[1];
		ge('car').value = item.car[1];
		ge('caramount').value = item.caramount[1];
		ge('fast').value = item.fastest[1];
		ge('hpr').value = item.hp[1];
		ge('adders').value = item.adder[1];
		var radios = document.forms[0].tranny;
		for(var i = 0; i<radios.length; i++){
			if(radios.value == "Auto" && item.tranny[1] == "Auto"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Manual" && item.tranny[1] == "Manual"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.ltech[1] == "Yes"){
			ge('ltech').setAttribute("checked", "checked");
		}
		ge('comments').value = item.comments[1];

		// remove the initial listener from the input save button
		save.removeEventListener("click", storeData);

		// change submit button value to edit button
		ge('submit').value = "Edit Contact";
		var editSubmit = ge('submit');

		//save key value
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Contact was deleted!");
			window.location.reload();
		}else{
			alert("Contact was not deleted.");
		}
	}	
	// clear local data

	function clearLocal(){
		if(localStorage.length === 0){
			alert("Nothing to delete."); // alert
		}else{
			localStorage.clear();
			alert("All Data Deleted");
			window.location.reload();
			return false;
		}
	}

	function validate(e){
		// define elements
		var getFname = ge('fname');
		var getLname = ge('lname');
		var getEmail = ge('email');

		// reset 
		errMsg.innerHTML = "";
			getFname.style.border = "1px solid black";
			getLname.style.border = "1px solid black";
			getEmail.style.border = "1px solid black";

		// error messages
		var messageArry = [];
		// first name validation
		if(getFname.value === ""){
			var fNameError = "Please enter your First Name."
			getFname.style.border = "1px solid red";
			messageArry.push(fNameError);
		}
		// last name validation
		if(getLname.value === ""){
			var lNameError = "Please enter your Last Name."
			getLname.style.border = "1px solid red";
			messageArry.push(lNameError);
		}
		// email validation
		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if(!(re.exec(getEmail.value))){
			var emailError = "Please enter a valid Email Address.";
			getEmail.style.border = "1px solid red";
			messageArry.push(emailError);
		}
		if(messageArry.length >= 1){
			for(var i =0, j=messageArry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML =messageArry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			// save our data if everything is okay
			storeData(this.key);
		}
		
	}

	// array data for the drop down fucnctions called 
	var fast = ["--ET Time--", "12's", "11's", "10's", "9's", "8's", "7's"],
		hpr = ["--Horse Power--", "400HP", "500HP", "600HP", "700HP", "800HP", "900HP", "1000HP", "1000HP+"],
		adders = ["--Power Adders--", "Nitrous Stage 1", "Nitrous Stage 2", "Nitrous Direct Port", "Nitrous Dry Kit", "--Forced Induction--", "Single Turbo", "Twin Turbo", "Single Turbo Meth", "Twin Turbo Race Fuel", "--Supercharged--", "Supercharged F1", "Supercharged F2", "Supercharged F3", "Supercharged F4"],
		trannyValue // transmission value
		siteValue = "No" // site value 
		errMsg = ge('errors');
		;

	// calling the functions for the populated option drop downs
		fastestTime();
		powerAmount();
		powerAdders();	

	//this displays the data
	var displayLink = ge("displayLink");
	displayLink.addEventListener("click", getData);
	// clears local data event
	var clearLink = ge("clear");
	clearLink.addEventListener("click", clearLocal);
	// submits stored data event 
	var save = ge("submit");
	save.addEventListener("click", validate);

});