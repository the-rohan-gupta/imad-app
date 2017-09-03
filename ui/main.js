
//counter code
var button=document.getElementById("b1");


button.onclick = function()
{
	//create a request object
	var request=new XMLHttpRequest();

	//capture the response and store in a variable
	request.onreadystatechange=function()
	{

		if(request.readyState===XMLHttpRequest.DONE)
		{

			//take some action
			if(request.status===200)
			{

				var counter=request.responseText;
				 document.getElementById("s1").innerHTML = counter.toString();
			}
		}


	};

//make request to the server
request.open('GET','/counter',true);
request.send(null);


};





//submit name


var submit=document.getElementById('submit_btn');

submit.onclick=function()
{
	//make a request to the server and send the name
	//capture a lisr of name and render it as list

	var nameInput=document.getElementById('name');
	var name=nameInput.value;

	var request=new XMLHttpRequest();

	//capture the response and store in a variable
	request.onreadystatechange=function()
	{

		if(request.readyState===XMLHttpRequest.DONE)
		{

			//take some action
			if(request.status===200)
			{

				var names=request.responseText;
				names=JSON.parse(names);

				var list='';
				for(var i=0;i<names.length;i++)
				{
					list+='<li>'+names[i]+'</li>';
				}

				var ul=document.getElementById('namelist');
				ul.innerHTML=list;
							
			}
		}


	};

	request.open('GET','/submit-name?name='+name,true);
	request.send(null);


};







var submitButton=document.getElementById('submitButton');
submitButton.onclick=function()
{
  
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        var text=request.responseText;
        alert(text);
    };
    
    
    request.open('POST','http://guptarohan1711.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify({username:username,password:password}));
    
};















