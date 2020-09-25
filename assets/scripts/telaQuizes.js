var headerToken = {headers: {"User-Token":""}}

function abrirTelaQuizes(token){
    trocarTelas(".tela-login",".tela-quizes");
    salvarToken(token.data.token);
    pegarQuizes();
}
function trocarTelas(seletorTelaAntiga,seletorTelaAtual){
    var telaAntiga = document.querySelector(seletorTelaAntiga);
    var telaAtual = document.querySelector(seletorTelaAtual);
    telaAntiga.classList.add("fechada");
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
    resetarQuizes(lista);
    for (var i = 0; i<tamanho; i++){
        var quiz = document.createElement("li");
        renderizarQuizes(quiz,quizes.data[i]);
        lista.appendChild(quiz);
    }
}
function criarNovoQuiz(){
    abrirTelaNovoQuiz();
}
function abrirQuiz(quiz){
    abrirTelaQuiz(quiz);
}

//Renderizar
function resetarQuizes(quizes){
    quizes.innerHTML = "<li class='botao' onclick='criarNovoQuiz()'>Novo Quizz<ion-icon class='icone' name='add-circle'></ion-icon></li></ul>"
}
function renderizarQuizes(quiz,data){
    quiz.innerText = data.title;
    quiz.setAttribute("class","quiz");
    quiz.setAttribute("id",data.id);
    quiz.setAttribute("onclick","abrirQuiz(this)");
}