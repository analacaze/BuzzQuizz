var pontuacao;

function abrirTelaFimQuiz(){
    trocarTelas(".tela-quiz",".tela-fim-quiz");
    calcularPontuacao();
    renderizarFim();
}
function calcularPontuacao(){
    pontuacao = (acertos/quantidadePerguntas)*100;
    pontuacao = Math.ceil(pontuacao);
}

//Renderizar
function renderizarFim(){
    var telaFim = document.querySelector(".tela-fim-quiz");
    telaFim.innerHTML = "<h1>"+quiz.title+"</h1>"+
                        "<div class='resultado'>"+
                        "<h2>Você acertou "+acertos+" de "+quantidadePerguntas+" perguntas!</h2>"+
                        "<h2>Score: "+pontuacao+"%</h2></div>"+
                        "<div class='texto'>"+
                        "<h3>"+quiz.data.niveis[0].titulo+"</h3>"+
                        "<p>"+quiz.data.niveis[0].descricao+"</p></div>"+
                        "<img src='"+quiz.data.niveis[0].link+">";
}