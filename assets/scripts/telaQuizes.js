var headerToken = {headers: {"User-Token":""}}

function abrirTelaQuizes(token){
    trocarTelas(".tela-login",".tela-quizes");
    salvarToken(token.data.token);
    pegarQuizes();
}

function trocarTelas(seletorTelaAntiga,seletorTelaAtual){
    var telaAntiga = document.querySelector(seletorTelaAntiga);
    var telaAtual = document.querySelector(seletorTelaAtual);
    telaAntiga.setAttribute("class","fechada");
    telaAtual.classList.remove("fechada");
}
function salvarToken(token){
    headerToken.headers["User-Token"] = token;
}
function pegarQuizes(){
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",headerToken);
    requisicao.then(listarQuizes);
}
function listarQuizes(quizes){
    var lista = document.querySelector(".tela-quizes ul")
    var tamanho = quizes.data.length;

    for (var i = 0; i<1; i++){
        var quiz = document.createElement("li");
        renderizarQuiz(quiz);
        lista.appendChild(quiz);
    }
    console.log(tamanho);
}
function renderizarQuiz(quiz){
    quiz.innerText = "O quão potter head você é?";
    quiz.setAttribute("class","quiz");
}