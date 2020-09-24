var tela = document.querySelector(".tela-quiz");
var id;
var indicePergunta = 1;
var quantidadePerguntas;
var quiz;
var respostasAleatorias = [];
var acertos = 0;

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
        embaralharRespostas();
        renderizarPerguntas(quiz.title,quiz.data.perguntas[indicePergunta-1]);
    }else{
        abrirTelaFimQuiz(quantidadePerguntas,acertos);
    }    
    indicePergunta++;
}
function embaralharRespostas(){
    respostasAleatorias=[];
    respostasAleatorias.push([quiz.data.perguntas[indicePergunta-1].respostaCorreta[0],quiz.data.perguntas[indicePergunta-1].respostaCorreta[1]]);
    respostasAleatorias.push([quiz.data.perguntas[indicePergunta-1].respostasErradas[0],quiz.data.perguntas[indicePergunta-1].respostasErradas[1]]);
    respostasAleatorias.push([quiz.data.perguntas[indicePergunta-1].respostasErradas[2],quiz.data.perguntas[indicePergunta-1].respostasErradas[3]]);
    respostasAleatorias.push([quiz.data.perguntas[indicePergunta-1].respostasErradas[4],quiz.data.perguntas[indicePergunta-1].respostasErradas[5]]);
    respostasAleatorias = respostasAleatorias.sort(aleatoria);
    console.log(respostasAleatorias);
}
function escolherResposta(respostaEscolhida){
    mostrarResposta(respostaEscolhida);
    setTimeout(iniciarPerguntas,2000);
}
function mostrarResposta(respostaEscolhida){
    var respostas = tela.querySelectorAll(".opcao-resposta");
    for (var i = 0; i < respostas.length; i++){
        if (respostas[i].innerText === quiz.data.perguntas[indicePergunta-2].respostaCorreta[0]){
            respostas[i].classList.add("resposta-correta");
            if (respostaEscolhida === i){
                acertos++;
            }
        }else{
            respostas[i].classList.add("resposta-errada");
        }
    }
}

//Renderizar
function renderizarPerguntas(titulo,pergunta){
    tela.innerHTML = "<h1>"+titulo+"</h1>"+
                    "<div class='pergunta'><h2>"+indicePergunta+". "+ pergunta.titulo+"</h2></div>"+
                    "<div onclick='escolherResposta(0)' class='opcao-resposta'><img src='"+respostasAleatorias[0][1]+"'><p>"+respostasAleatorias[0][0]+"</p></div>"+
                    "<div onclick='escolherResposta(1)' class='opcao-resposta'><img src='"+respostasAleatorias[1][1]+"'><p>"+respostasAleatorias[1][0]+"</p></div>"+
                    "<div onclick='escolherResposta(2)' class='opcao-resposta'><img src='"+respostasAleatorias[2][1]+"'><p>"+respostasAleatorias[2][0]+"</p></div>"+
                    "<div onclick='escolherResposta(3)' class='opcao-resposta'><img src='"+respostasAleatorias[3][1]+"'><p>"+respostasAleatorias[3][0]+"</p></div>";
}

//Aleatória
function aleatoria(){
    return (Math.random() - 0.5);
}
