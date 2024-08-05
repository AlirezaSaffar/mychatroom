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
var mycheck= getcookie("login");
if(mycheck!=" "){
    window.location.assign('/users/contacts');
}
function signup(){
    console.log("hey")
     var pass = document.getElementById('password') .value  ;
     var name = document.getElementById('user').value;

fetch("/api/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
            password: pass
        }),
      }).then((res) => {console.log(res)});  
      if(name.length>=4 && pass.length>=4){
        alert("Your account has been successfully created");
        window.location.assign("/users/login");
      }else{
       alert("size of username and password must be more than 4 letters");
      }  
}


   