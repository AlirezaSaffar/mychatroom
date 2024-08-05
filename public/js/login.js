
function setcookie(name, value, exday) {
  var date = new Date();
  date.setTime(date.getTime() + exday * 24 * 60 * 60000);
  var exp = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + ";" + exp + ";path=/";
}

function getcookie(name) {
  var nmae = +"=";
  var decodecookie = decodeURIComponent(document.cookie);
  var x = decodecookie.split(";");
  var i;
  var xx;
  for (i = 0; i < x.length; i++) {
    xx = x[i];
    while (xx.charAt(0) == " ") {
      xx = xx.substring(1);
    }
    if (xx.indexOf(name) == 0) {
      return xx.substring(name.length + 1);
    }
  }
  return " ";
}

var mycheck = getcookie("login");
if (mycheck != " ") {
  window.location.assign("/users/contacts");
}
function login() {
  var p, u;
  var i = 0;
  p = document.getElementById("password").value;
  u = document.getElementById("user").value;
  var b= false;
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: u,
        password: p
    }),
  }).then(response =>{

   
    return response.json();
  }).then(user =>{
    console.log(user);
    if(user==false){alert('your password is incorrect');}else{
        alert('wellcome');
        setcookie('login', user,5);
        window.location.assign("/users/contacts");
    }
  }).catch(err=>{});   
 
   
  
}

   