var pontuacao;
var nivel;

function abrirTelaFimQuiz(){
    trocarTelas(".tela-quiz",".tela-fim-quiz");
    calcularPontuacao();
    calcularNivel();
    renderizarFim();
}
function calcularPontuacao(){
    pontuacao = (acertos/quantidadePerguntas)*100;
    pontuacao = Math.ceil(pontuacao);
}
function calcularNivel(){
    for (var i=0; i<quiz.data.niveis.length; i++){
        if ((pontuacao >= quiz.data.niveis[i].porcentagens[0]) && (pontuacao <= quiz.data.niveis[i].porcentagens[1])){
            nivel = i;
        }
    }
}
function voltarTelaQuizes(){
    trocarTelas(".tela-fim-quiz",".tela-quizes");
}
//Renderizar
function renderizarFim(){
    var telaFim = document.querySelector(".tela-fim-quiz");
    telaFim.innerHTML = "<h1>"+quiz.title+"</h1>"+
                        "<div class='resultado'>"+
                        "<h2>Você acertou "+acertos+" de "+quantidadePerguntas+" perguntas!</h2>"+
                        "<h2>Score: "+pontuacao+"%</h2></div>"+
                        "<div class='texto'>"+
                        "<h3>"+quiz.data.niveis[nivel].titulo+"</h3>"+
                        "<p>"+quiz.data.niveis[nivel].descricao+"</p></div>"+
                        "<img src='"+quiz.data.niveis[nivel].link+"'>"+
                        "<button onclick='voltarTelaQuizes()'>Voltar para quizes</button>";
}