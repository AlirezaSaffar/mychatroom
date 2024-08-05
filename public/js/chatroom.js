function setcookie(name,value,exday){
    var date= new Date();
    date.setTime(date.getTime()+ exday*24*60*60000);
    var exp="expires="+ date.toGMTString() ;
    document.cookie= name + "=" +value + ";" +exp +";path=/";
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



            function refresh(){
                fetch("/api/users/refresh", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      sender: getcookie("login"),
                        receiver: getcookie("contact")
                    }),
                  }).then(response =>{
                
                   
                    return response.json();
                  }).then(user =>{
                    console.log(user);
                  
                   ar=user.messages
                   ss=user.sw
                   var i;
                   var j;
                   if(ar.length>26){
                       j=ar.length-26;
                   }else{j=0;}
           var myvar;
           var hervar;             
           myvar= document.getElementsByClassName('me');
           hervar= document.getElementsByClassName('client');
           if (ar.length<26){k=ar.length;}else{k=26;}
           
                   for(i=0;i<k;i++){
                       if(ss[j]==true){
                           myvar[i].innerHTML= ar[j];
           
                       }else{
                           hervar[i].innerHTML= ar[j];}
                       j++;
                       }


                  }).catch(err=>{}); 
              
 
       }

   
    document.getElementById('wel').innerHTML = getcookie("contact");




function exit(){
    check=false;
    setcookie("login", " ", -1);
    window.location.assign("/users/login");
  
  }

  function gohome(){
    window.location.assign("/users/contacts");
  }
        

            function send(){
             var message;
             message = document.getElementById('mas').value;
             var sender= getcookie("login");
             var receiver=getcookie("contact")
             fetch("/api/users/chatroom", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  message: message,
                    sender: sender,
                    receiver:receiver
                }),
              }).then((res) => {console.log(res)});           
document.getElementById('mas').value=""; 

}

var check=true;
var mycheck = getcookie("login");
if (mycheck == " ") {
  window.location.assign("/users/login");
  check =false;
}
if(check)
{ setInterval(refresh,500);}


