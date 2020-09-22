var email = document.querySelector(".tela-login .email");
var senha = document.querySelector(".tela-login .senha");
email.value="";
senha.value="";

function entrarLogin(){
    if (email.value==="" || senha.value===""){
        alert("Preencha os campos email e senha");
    }
}