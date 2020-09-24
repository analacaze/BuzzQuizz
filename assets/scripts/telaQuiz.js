var tela = document.querySelector(".tela-quiz");
var id;
var indicePergunta = 1;
var quantidadePerguntas;
var quiz;

function abrirTelaQuiz(quiz){
    id = quiz.getAttribute("id");
    console.log(quiz);
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
    setTimeout(iniciarPerguntas,2000);
}

//Renderizar
function renderizarPerguntas(titulo,pergunta){
    console.log(titulo);
    tela.innerHTML = "<h1>"+titulo+"</h1>"+
                    "<div class='pergunta'><h2>"+indicePergunta+". "+ pergunta.titulo+"</h2></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostas[1]+"'><p>"+pergunta.respostas[0]+"</p></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostas[3]+"'><p>"+pergunta.respostas[2]+"</p></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostas[5]+"'><p>"+pergunta.respostas[4]+"</p></div>"+
                    "<div onclick='escolherResposta()' class='opcao-resposta'><img src='"+pergunta.respostas[7]+"'><p>"+pergunta.respostas[6]+"</p></div>";
}