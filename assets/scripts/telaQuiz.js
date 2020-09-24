var tela = document.querySelector(".tela-quiz");
var id;
var indicePergunta = 1;
var quantidadePerguntas;
var quiz;

function abrirTelaQuiz(quiz){
    id = quiz.getAttribute("id");
    trocarTelas(".tela-quizes",".tela-quiz");
    var requisicao = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",headerToken);
    requisicao.then(carregarQuiz);
}
function carregarQuiz(quizes){
    for (var i = 0; i < quizes.data.length; i++){
        if (quizes.data[i].id == id){ 
            quantidadePerguntas = quizes.data[i].data.perguntas.length;
            quiz = quizes.data[i];
            iniciarPerguntas(); 
        }
    }    
}
function iniciarPerguntas(){
    if (indicePergunta <= quantidadePerguntas){        
        renderizarPerguntas(quiz.title,quiz.data.perguntas[indicePergunta-1]);
    }else{
        alert("acabou");
    }    
    indicePergunta++;
}
function escolherResposta(){
    mostrarResposta();
    setTimeout(iniciarPerguntas,2000);
}
function mostrarResposta(){
    var respostas = tela.querySelectorAll(".opcao-resposta");
    for (var i = 0; i < respostas.length; i++){
        if (respostas[i].innerText === quiz.data.perguntas[indicePergunta-2].respostaCorreta[0]){
            respostas[i].classList.add("resposta-correta");
        }else{
            respostas[i].classList.add("resposta-errada");
        }
    }
}

//Renderizar
function renderizarPerguntas(titulo,pergunta){
    tela.innerHTML = "<h1>"+titulo+"</h1>"+
                    "<div class='pergunta'><h2>"+indicePergunta+". "+ pergunta.titulo+"</h2></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostaCorreta[1]+"'><p>"+pergunta.respostaCorreta[0]+"</p></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostasErradas[1]+"'><p>"+pergunta.respostasErradas[0]+"</p></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostasErradas[3]+"'><p>"+pergunta.respostasErradas[2]+"</p></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostasErradas[5]+"'><p>"+pergunta.respostasErradas[4]+"</p></div>";
}