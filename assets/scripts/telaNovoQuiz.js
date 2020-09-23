var numeroPergunta = 1;
var numeroNiveis = 1;

function abrirTelaNovoQuiz(){
    trocarTelas(".tela-quizes",".tela-novo-quiz");
    adicionarPergunta();
    adicionarNivel();
}

function adicionarPergunta(){
    var perguntas = document.querySelector(".tela-novo-quiz .perguntas");
    var pergunta = document.createElement("li");
    renderizarPergunta(pergunta);    
    perguntas.appendChild(pergunta); 
    numeroPergunta++;
}
function adicionarNivel(){
    var niveis = document.querySelector(".tela-novo-quiz .niveis");
    var nivel = document.createElement("li");
    renderizarNivel(nivel);
    niveis.appendChild(nivel); 
    numeroNiveis++;
}

function renderizarPergunta(pergunta){
    pergunta.innerHTML = "<h1>Pergunta "+numeroPergunta+"</h1>"+
                        "<input type='text' placeholder='Digite a pergunta'>"+
                        "<input class='correta' type='text' placeholder='Digite a resposta correta'>"+
                        "<input class='correta' type='text' placeholder='Link para imagem correta'>"+
                        "<input class='errada' type='text' placeholder='Digite uma resposta errada 1'>"+
                        "<input class='errada' type='text' placeholder='Link para imagem errada 1'>"+
                        "<input class='errada' type='text' placeholder='Digite uma resposta errada 2'>"+
                        "<input class='errada' type='text' placeholder='Link para imagem errada 2'>"+
                        "<input class='errada' type='text' placeholder='Digite uma resposta errada 3'>"+
                        "<input class='errada' type='text' placeholder='Link para imagem errada 3'>";
}
function renderizarNivel(nivel){
    nivel.innerHTML = "<h1>Nível "+numeroNiveis+"</h1>"+
                    "<input class='porcentagem' type='text' placeholder='% Mínima de acerto do nível'>"+
                    "<input class='porcentagem' type='text' placeholder='% Máxima de acerto do nível'>"+
                    "<input type='text' placeholder='Título do nível'>"+
                    "<input type='text' placeholder='Link da imagem do nível'>"+
                    "<input type='text' placeholder='Descrição do nível'>";
}