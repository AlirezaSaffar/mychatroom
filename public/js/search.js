function setcookie(name, value, exday) {
  var date = new Date();
  date.setTime(date.getTime() + exday * 24 * 60 * 60000);
  var exp = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + ";" + exp + ";path=/";
}

function getcookie(name){
    var nmae =+ "=";
    var decodecookie = decodeURIComponent(document.cookie);
    var x= decodecookie.split(";");
    var i;
    var xx;
    for(i=0;i<x.length;i++){
xx= x[i];
while(xx.charAt(0)==' '){
    xx= xx.substring(1);

}
if(xx.indexOf(name)==0){
    return xx.substring(name.length+1);
}
    }
    return " ";
}

function exit(){
    setcookie("login", " ", -1);
    window.location.assign("/users/login");
  
  }

  function gohome(){
    window.location.assign("/users/contacts");
  }

  function search(){
    var me = getcookie("login");
    var friend = document.getElementById("username").value;
    console.log(friend);
    fetch("/api/users/search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          me: me,
            friend: friend
        }),
      }).then(response =>{

   
        return response.json();
      }).then(user =>{
        alert(user)
      }).catch(err=>{});   
      document.getElementById("username").value="";
   
  }

  var mycheck = getcookie("login");
  if (mycheck == " ") {
    window.location.assign("/users/login");
  }