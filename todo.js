///// validate input - add css
///// validate date - add css
///// css list - bit more clean up
///// furtue date to go onto another 
///// local storage

(function(){

/////////////////////DATES///////////////////////////////

	var today = new Date();
	today.setHours(0,0,0,0);

	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday.setHours(0,0,0,0);

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0,0,0,0);


	var elems = document.querySelectorAll("nav li");

	var listElems = document.querySelectorAll("div > ul");

	var itemBox = document.getElementById("item");

	var dateBox = document.getElementById("date");

	var id;

	var json ={
		
	};

	var retrivedObject = localStorage.getItem('json');


	if( retrivedObject !== null && Object.keys(retrivedObject).length >= 1){
		json = JSON.parse(retrivedObject);
	}

	var num = 0;

	var addButton = document.getElementById("addButton");
	addButton.addEventListener("click", objectTask); 

	var removeButton = document.getElementById('removeButton');
	removeButton.addEventListener("click", removeList);

	$('#date').datepicker({dateFormat: "dd/mm/yy"});


	function onLoad(){

		if(json !== null || Object.keys(json).length !== 0){

				var loadDate;
				var loadTodo;
				var jsonLength = Object.keys(json).length;
				}  

				for(var prop in json) {
						var obj = prop;
						
						 loadDate = json[obj].date;
						 loadTodo = json[obj].todo;

					 selectId(loadDate);

					 makeList(id, loadTodo, obj);	 
		}
		num = jsonLength++;
		
	}

	onLoad(); 

	function objectTask(){

		var itemTask = itemBox.value;

		var dateee = dateBox.value;
		var dateSplit = dateBox.value.split('/'),
    	dateTask = new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0], 0, 0, 0, 0);
  

    	if (validate(itemTask, dateee) === false){
    		return
    	}

    	console.log(num);

    	dateTask = dateTask.getTime();

    	addToDataB(itemTask, dateTask);

    	newDate = json[num].date;
		
		selectId(newDate);
    
		makeList(id, itemTask, num);

	    num++
		clear();
		
		localStorage.setItem('json' , JSON.stringify(json));

	}

	var validate = function(itemTask, dateee){

		var ex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

	 	if(itemTask == "" || itemTask == null){
	 			alert("help");
	 			return false;
	 	}

	 	if(dateee != '' && dateee.match(ex)){
	 		if(regs = dateee.match(ex)) {

		 		if(regs[1] < 1 || regs[1] > 31) {
		 			alert("invalid day");
		 			return false;
	 			}
	 			if(regs[2] < 1 || regs[2] > 12) {
          			alert("Invalid value for month: " + regs[2]);
          			return false;
       			 }
        		// year value between 1902 and 2016
        		if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) {
          			alert("Invalid value for year: " + regs[3] + " - must be between 1902 and " + (new Date()).getFullYear());
          			return false;
        		}
				else if (!dateee.match(ex)){
	 			alert("date ssss");
	 			return false;
	 			}
		 	}
		 }else {
		 	alert("date help");
		 			return false;
		 };

	 }
	
	 var makeActive = function (){
		for (var i = 0; i < elems.length; i++) {
			elems[i].classList.remove('active');
				}
		this.classList.add('active');
	 };

	 var getList = function (){
	 	for (var i = 0; i < listElems.length; i++) {
	 		listElems[i].classList.remove('listActive');
	 	}
	 	var rel = this.getAttribute('rel');
	 	var ulNode = document.getElementById(rel);
	 		ulNode.classList.add('listActive');	
	 };


	 var addToDataB = function(list, date){

	 	var settings = {
	 		"todo":list,
	 		"date":date
	 	};

	 	json[num] = settings;

	 }


	 function selectId(date){

	 	if(today.getTime() === date){
			id = 'today';
			return
		} else if (yesterday.getTime() === date){
			id ='yesterday';
			return
		} else if (tomorrow.getTime() === date){
			id = 'tomorrow';
			return
		} else{
			id ='';
			clear();
			return
		}
	 }


   
   function makeList(id, itemTask, num) {

   
	   var itemText = document.createTextNode(itemTask);

		var itemLabel = document.createElement('label')
		itemLabel.setAttribute("for", "cbox");

		var itemInput = document.createElement('input');
		itemInput.type = "checkbox";
		itemInput.id = "cbox";

		var liText = document.createElement('li');
		liText.className = num;
		liText.appendChild(itemInput);
		liText.appendChild(itemLabel);
		liText.appendChild(itemText);	


		var ulText = document.getElementById(id);
		if(ulText === null){
			return
		}
		ulText.appendChild(liText);

   }
	
	function removeList() {
		var ul = document.querySelectorAll('.list');
			// ul selected
		var li;

		var classId;

		for (var k = 0; k < ul.length; k++){
			// all li selected in ul
			  li = ul[k].children;

			for(var j = 0; j < li.length; j++){
				while(li[j] && li[j].children[0].checked){
					classId = li[j].className;
					ul[k].removeChild(li[j]);
					delete json[classId];
					localStorage.setItem('json' , JSON.stringify(json));

				}	
			}
		}
	} 

	function clear() {
		itemBox.value = '';
		dateBox.value = '';

	}

	for (var i = 0; i < elems.length; i++){
		elems[i].addEventListener('click', function(){
			makeActive.call(this);
			getList.call(this);
		});
	}
})();





/*(function(){

/////////////////////DATES///////////////////////////////

	var today = new Date();
	today.setHours(0,0,0,0);

	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday.setHours(0,0,0,0);

	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0,0,0,0);


	var elems = document.querySelectorAll("nav li");

	var listElems = document.querySelectorAll("div > ul");

	var itemBox = document.getElementById("item");

	var dateBox = document.getElementById("date");

	var id;

	var json ={
		
	};

	var retrivedObject = localStorage.getItem('json');


	if( retrivedObject !== null && Object.keys(retrivedObject).length >= 1){
		json = JSON.parse(retrivedObject);
		console.log(json);
	}


	var num = 0;

	var addButton = document.getElementById("addButton");
	addButton.addEventListener("click", objectTask); 

	var removeButton = document.getElementById('removeButton');
	removeButton.addEventListener("click", removeList);

	$('#date').datepicker({dateFormat: "dd/mm/yy"});

	function onLoad(){

		if(json !== null || Object.keys(json).length !== 0){

				var loadDate;
				var loadTodo;
				var jsonLength = Object.keys(json).length;

				
			for (var i = 0; i < jsonLength; i++) {

				while( json[i] == undefined)
				console.log(json[i]);

				 loadDate = json[i].date;
				 loadTodo = json[i].todo;

				 selectId(loadDate);

				 makeList(id, loadTodo, num);
				
			}


			 num = jsonLength++;
		}
		return
	} 

	onLoad(); 

	function objectTask(){

		var itemTask = itemBox.value;

		var dateee = dateBox.value;
		var dateSplit = dateBox.value.split('/'),
    	dateTask = new Date(dateSplit[2],dateSplit[1]-1,dateSplit[0], 0, 0, 0, 0);
  

    	if (validate(itemTask, dateee) === false){
    		return
    	}

    	dateTask = dateTask.getTime();

    	addToDataB(itemTask, dateTask);

    	newDate = json[num].date;
		
		selectId(newDate);
    
		makeList(id, itemTask, num);

	    num++
		clear();
		
		localStorage.setItem('json' , JSON.stringify(json));

	}

	var validate = function(itemTask, dateee){

		var ex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;

	 	if(itemTask == "" || itemTask == null){
	 			alert("help");
	 			return false;
	 	}

	 	if(dateee != '' && dateee.match(ex)){
	 		if(regs = dateee.match(ex)) {

		 		if(regs[1] < 1 || regs[1] > 31) {
		 			alert("invalid day");
		 			return false;
	 			}
	 			if(regs[2] < 1 || regs[2] > 12) {
          			alert("Invalid value for month: " + regs[2]);
          			return false;
       			 }
        		// year value between 1902 and 2016
        		if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) {
          			alert("Invalid value for year: " + regs[3] + " - must be between 1902 and " + (new Date()).getFullYear());
          			return false;
        		}
				else if (!dateee.match(ex)){
	 			alert("date ssss");
	 			return false;
	 			}
		 	}
		 }else {
		 	alert("date help");
		 			return false;
		 };

	 }
	
	 var makeActive = function (){
		for (var i = 0; i < elems.length; i++) {
			elems[i].classList.remove('active');
				}
		this.classList.add('active');
	 };

	 var getList = function (){
	 	for (var i = 0; i < listElems.length; i++) {
	 		listElems[i].classList.remove('listActive');
	 	}
	 	var rel = this.getAttribute('rel');
	 	var ulNode = document.getElementById(rel);
	 		ulNode.classList.add('listActive');	
	 };


	 var addToDataB = function(list, date){

	 	var settings = {
	 		"todo":list,
	 		"date":date
	 	};

	 	json[num] = settings;

	 }


	 function selectId(date){

	 	if(today.getTime() === date){
			id = 'today';
			return
		} else if (yesterday.getTime() === date){
			id ='yesterday';
			return
		} else if (tomorrow.getTime() === date){
			id = 'tomorrow';
			return
		} else{
			id ='';
			clear();
			return
		}
	 }


   
   function makeList(id, itemTask, num) {

   
	   var itemText = document.createTextNode(itemTask);

		var itemLabel = document.createElement('label')
		itemLabel.setAttribute("for", "cbox");

		var itemInput = document.createElement('input');
		itemInput.type = "checkbox";
		itemInput.id = "cbox";

		var liText = document.createElement('li');
		liText.className = num;
		liText.appendChild(itemInput);
		liText.appendChild(itemLabel);
		liText.appendChild(itemText);	

		var ulText = document.getElementById(id);
		ulText.appendChild(liText);

   }
	
	function removeList() {
		var ul = document.querySelectorAll('.list');
			// ul selected
		var li;

		var classId;

		for (var k = 0; k < ul.length; k++){
			// all li selected in ul
			  li = ul[k].children;

			for(var j = 0; j < li.length; j++){
				while(li[j] && li[j].children[0].checked){
					classId = li[j].className;
					ul[k].removeChild(li[j]);
					delete json[classId];
					localStorage.setItem('json' , JSON.stringify(json));

				}	
			}
		}
	} 

	function clear() {
		itemBox.value = '';
		dateBox.value = '';

	}

	for (var i = 0; i < elems.length; i++){
		elems[i].addEventListener('click', function(){
			makeActive.call(this);
			getList.call(this);
		});
	}
})(); */