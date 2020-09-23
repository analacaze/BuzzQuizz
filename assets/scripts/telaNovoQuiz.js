var tituloQuiz = document.querySelector(".tela-novo-quiz .titulo-quiz");
tituloQuiz.value="";
var numeroPergunta = 1;
var numeroNiveis = 1;
var informacoes = {title:"", data:{ perguntas:[{titulo:"",respostas:""}], niveis:[{titulo:"",porcentagens:"",link:"",descricao:""}]}};

function abrirTelaNovoQuiz(){
    trocarTelas(".tela-quizes",".tela-novo-quiz");
    numeroPergunta=1;
    numeroNiveis=1;
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
function publicarQuiz(){
    var camposPergunta = document.querySelectorAll(".tela-novo-quiz .perguntas li input");
    var camposNivel = document.querySelectorAll(".tela-novo-quiz .niveis li input");

    for (var i=0; i<camposPergunta.length; i++){
        if (camposPergunta[i].value==="" || tituloQuiz.value === "" ){
            alert("Preencha os campos título, pergunta e nivel");
            return;
        }
    }
    for (var i=0; i<camposNivel.length; i++){
        if (camposNivel[i].value==="" || tituloQuiz.value === "" ){
            alert("Preencha os campos título, pergunta e nivel");
            return;
        }
    }
    validarInformacoes(camposPergunta);
    salvarInformacoes(camposPergunta,camposNivel);
    var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",informacoes,headerToken);
    requisicao.then(fecharTelaNovoQuiz);
}
function fecharTelaNovoQuiz(){
    trocarTelas(".tela-novo-quiz",".tela-quizes");
    pegarQuizes();
}
function validarInformacoes(camposPergunta){
    tituloQuiz.value = validarPrimeiraLetra(tituloQuiz.value);
    for (var i =0; i<9; i++){
        camposPergunta[i].value = validarPrimeiraLetra(camposPergunta[i].value);
    }
}

function validarPrimeiraLetra(titulo){
    var primeiraLetra = titulo.charAt(0);
    var primeiraLetraMaiuscula = primeiraLetra.toUpperCase();
    var letrasMinusculas = titulo.substring(1);
    titulo = primeiraLetraMaiuscula+letrasMinusculas;
    return titulo;    
}
function salvarInformacoes(camposPergunta,camposNivel){
    informacoes.title = tituloQuiz.value;
    informacoes.data.perguntas.titulo = camposPergunta[0].value;
    informacoes.data.perguntas.respostas = [camposPergunta[1].value,camposPergunta[2].value,camposPergunta[3].value,camposPergunta[4].value,
                                            camposPergunta[5].value,camposPergunta[6].value,camposPergunta[7].value,camposPergunta[8].value];
    informacoes.data.niveis.porcentagens = [camposNivel[0].value,camposNivel[1].value];
    informacoes.data.niveis.titulo = camposNivel[2].value;  
    informacoes.data.niveis.link = camposNivel[3].value;
    informacoes.data.niveis.descricao = camposNivel[4].value;

    console.log(informacoes.data.perguntas);
    console.log(informacoes.title);
}

//Renderizar
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