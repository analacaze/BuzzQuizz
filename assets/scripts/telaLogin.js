var email = document.querySelector(".tela-login .email");
var senha = document.querySelector(".tela-login .senha");
var botao = document.querySelector(".tela-login button");
email.value="";
senha.value="";

function entrarLogin(){
    if (email.value==="" || senha.value===""){
        alert("Preencha os campos email e senha");
    }else{
        desabilitarBotao();
        var login = {email: email.value, password: senha.value}
        var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",login);
        requisicao.then(abrirTelaQuizes).catch(erroLogin);
    }    
}
function desabilitarBotao(){
    botao.disabled = true;
}
function habilitarBotao(){
    botao.disabled = false;
}
function erroLogin(erro){
    alert("Email/Senha incorretos");
    habilitarBotao();
}

