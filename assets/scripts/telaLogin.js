var email = document.querySelector(".tela-login .email");
var senha = document.querySelector(".tela-login .senha");
email.value="";
senha.value="";

function entrarLogin(){
    if (email.value==="" || senha.value===""){
        alert("Preencha os campos email e senha");
    }else{
        var login = {email: email.value, password: senha.value}
        var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",login);
    }
}

