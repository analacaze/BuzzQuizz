var objetoToken = {token:""};

function abrirTelaQuizzes(token){
    trocarTelas(".tela-login",".tela-quizes");
    objetoToken.token = token.data.token;
    console.log(objetoToken);
}

function trocarTelas(seletorTelaAntiga,seletorTelaAtual){
    var telaAntiga = document.querySelector(seletorTelaAntiga);
    var telaAtual = document.querySelector(seletorTelaAtual);

    telaAntiga.setAttribute("class","fechada");
    telaAtual.classList.remove("fechada");
}