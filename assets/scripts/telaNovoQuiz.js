var tituloQuiz = document.querySelector(".tela-novo-quiz .titulo-quiz");
var perguntas = document.querySelector(".tela-novo-quiz .perguntas");
var niveis = document.querySelector(".tela-novo-quiz .niveis");
var numeroPergunta;
var numeroNiveis;
var camposEmBranco;
var pontoInterrogacao;
var informacoes = {title:"", data:{ perguntas:[], niveis:[]}};

function abrirTelaNovoQuiz(){
    trocarTelas(".tela-quizes",".tela-novo-quiz");
    tituloQuiz.value="";
    numeroPergunta = 0;
    numeroNiveis = 0;
    resetarNovoQuiz(perguntas);
    resetarNovoQuiz(niveis);
    adicionarPergunta();
    adicionarNivel();
}

function adicionarPergunta(){    
    numeroPergunta++;
    var pergunta = document.createElement("li");
    renderizarPergunta(pergunta);    
    perguntas.appendChild(pergunta);     
}
function adicionarNivel(){
    numeroNiveis++;
    var nivel = document.createElement("li");
    renderizarNivel(nivel);
    niveis.appendChild(nivel);     
}

function publicarQuiz(){
    camposEmBranco = 0;
    percorrerPerguntas();
    if (camposEmBranco === 0 && pontoInterrogacao !== -1){
        percorrerNiveis();
        if (camposEmBranco === 0){
            var requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes",informacoes,headerToken);
            requisicao.then(fecharTelaNovoQuiz);
        }    
    }
}

function percorrerPerguntas(){
    for (var i=0; i<numeroPergunta; i++){
        var camposPergunta = document.querySelectorAll(".tela-novo-quiz .perguntas li:nth-child("+(i+1)+") input");
        console.log(camposPergunta[0]);
        if (i === 0){
            for (var j=0; j<camposPergunta.length; j++){
                if (camposPergunta[j].value==="" || tituloQuiz.value === "" ){
                    alert("Preencha os campos título, pergunta e nivel");
                    camposEmBranco++;
                    return;
                }
            }
        }
        validarInformacoes(camposPergunta);
        salvarInformacoesPerguntas(camposPergunta,i);        
    }
}
function percorrerNiveis(){
    for (var i=0; i<numeroNiveis; i++){
        var camposNivel = document.querySelectorAll(".tela-novo-quiz .niveis li:nth-child("+(i+1)+") input");
        if (i === 0){
            for (var j=0; j<camposNivel.length; j++){
                if (camposNivel[j].value===""){
                    alert("Preencha os campos título, pergunta e nivel");
                    camposEmBranco++;
                    return;
                }
            }
        }
        salvarInformacoesNiveis(camposNivel,i);        
    }
}

function validarInformacoes(camposPergunta){
    tituloQuiz.value = validarEspacos(tituloQuiz.value);
    tituloQuiz.value = validarPrimeiraLetra(tituloQuiz.value);    
    for (var i = 0; i<9; i++){
        camposPergunta[i].value = validarEspacos(camposPergunta[i].value);
        camposPergunta[i].value = validarPrimeiraLetra(camposPergunta[i].value);
    }
    validarPontoInterrogacao(camposPergunta[0].value);
}
function validarEspacos(frase){
    var semEspaco = frase.trim();
    return semEspaco;
}
function validarPrimeiraLetra(frase){
    var primeiraLetra = frase.charAt(0);
    var primeiraLetraMaiuscula = primeiraLetra.toUpperCase();
    var letrasMinusculas = frase.substring(1);
    frase = primeiraLetraMaiuscula+letrasMinusculas;
    return frase;    
}
function validarPontoInterrogacao(frase){
    pontoInterrogacao = frase.lastIndexOf("?");
    if (pontoInterrogacao === -1 || pontoInterrogacao !== (frase.length-1)){
        pontoInterrogacao = -1;
        alert("Perguntas devem ter ponto de interrogação ao final");
        return;
    }
}

function salvarInformacoesPerguntas(camposPergunta,indicePergunta){
    informacoes.data.perguntas[indicePergunta] = {titulo:"",respostaCorreta:[],respostasErradas:[]};
    informacoes.title = tituloQuiz.value;
    informacoes.data.perguntas[indicePergunta].titulo = camposPergunta[0].value;
    informacoes.data.perguntas[indicePergunta].respostaCorreta = [camposPergunta[1].value,camposPergunta[2].value];
    informacoes.data.perguntas[indicePergunta].respostasErradas = [camposPergunta[3].value,camposPergunta[4].value,camposPergunta[5].value,camposPergunta[6].value,camposPergunta[7].value,camposPergunta[8].value];
}
function salvarInformacoesNiveis(camposNivel,indiceNivel){
    informacoes.data.niveis[indiceNivel]={titulo:"",porcentagens:"",link:"",descricao:""};
    informacoes.data.niveis[indiceNivel].porcentagens = [camposNivel[0].value,camposNivel[1].value];
    informacoes.data.niveis[indiceNivel].titulo = camposNivel[2].value;  
    informacoes.data.niveis[indiceNivel].link = camposNivel[3].value;
    informacoes.data.niveis[indiceNivel].descricao = camposNivel[4].value;
    console.log("nivel "+indiceNivel);
    console.log(informacoes.data.niveis[indiceNivel]);
}

function fecharTelaNovoQuiz(){
    trocarTelas(".tela-novo-quiz",".tela-quizes");
    pegarQuizes();
}

//Renderizar
function resetarNovoQuiz(elemento){
    elemento.innerHTML="";
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