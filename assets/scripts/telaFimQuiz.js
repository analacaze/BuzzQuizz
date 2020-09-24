

function abrirTelaFimQuiz(quantidadePerguntas, acertos){
    trocarTelas(".tela-quiz",".tela-fim-quiz");
    renderizarFim(quantidadePerguntas, acertos);
}

//Renderizar
function renderizarFim(quantidadePerguntas, acertos){
    var telaFim = document.querySelector(".tela-fim-quiz");
    telaFim.innerHTML = "<h1>O quão Potterhead você é?</h1>"+
                        "<div class='resultado'>"+
                        "<h2>Você acertou "+acertos+" de "+quantidadePerguntas+" perguntas!</h2>"+
                        "<h2>Score: 88%</h2></div>"+
                        "<div class='texto'>"+
                        "<h3>Você é praticamente um aluno de Hogwarts!</h3>"+
                        "<p>Muito bem! Você realmente está bem antenado com tudo a respeito de 'Harry Potter'. Você pode até fazer o teste de novo para fechar mais uma vez!</p></div>"+
                        "<img src='assets/imagens/dumbledore.jpg' alt='gato'>";
}