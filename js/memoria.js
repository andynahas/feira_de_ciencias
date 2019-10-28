(function(){
    var matches = 0;
    var images = [];
    var flippedCards = [];
    var modalGameOver = document.querySelector("#modalGameOver");
    var imgMatchSign = document.querySelector("#imgMatchSign");
    for(var i = 0; i < 16; i++){//chamar as imagens internas do card
        var img = {
            src: "img/" + i + ".jpeg",
            id: i%8
        };
        images.push(img);
    }

    startGame();//executar a function

    function startGame(){//inicializar distribuição das cartas
        matches = 0;
        flippedCards = [];
        images  = randomSort(images);//chamando function de embaralhar card
        var frontFaces = document.getElementsByClassName("front");//chamando class "front"
        var backFaces = document.getElementsByClassName("back");//chamando class "back"

        for(var i = 0; i < 16; i++){
            frontFaces[i].classList.remove("flipped","match");
            backFaces[i].classList.remove("flipped","match");

            var card = document.querySelector("#card" + i);
            //ajustar o css para cada card
            card.style.left = i % 8 === 0 ? 5 + "px" : i % 8 * 165 + 5 + "px";//posicionar 8 cartas de cima
            card.style.top = i < 8 ? 5 + "px" : 250 + "px";//posicionar 8 cartas de baixo 
            //ajustar movimento do card
            card.addEventListener("click", flipCard, false)
        
            frontFaces[i].style.background = "url('"+ images[i].src +"')";//atribuindo cada imagem
            frontFaces[i].setAttribute("id",images[i].id);//validando comparação
        }
        modalGameOver.style.zIndex = -2;
        modalGameOver.removeEventListener("click",startGame,false);
    }

    function randomSort(oldArray){//configurando a aleatoriedade
        var newArray = [];//criando array vazio
        while(newArray.length !== oldArray.length){//avaliar elementos
            var i = Math.floor(Math.random()*oldArray.length);//gerar valores aleatorios entre 0 e 15
            if(newArray.indexOf(oldArray[i]) < 0){//verificar se newArray possui elemento indicado pelo numero aleatorio
                newArray.push(oldArray[i]);
            }
        }
        return newArray;
    }

    function flipCard(){//configurando a movimentação do card
        if(flippedCards.length < 2){//verificando se 2 cards estao virados
            var faces = this.getElementsByClassName("face");//chamando cards atravez de class
            if(faces[0].classList.length > 2){//verificando se o card ja esta virado
                return;//se true o card anula a class "flipped" ate que 2 cards estejam virados
            }
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");
            flippedCards.push(this);
            if(flippedCards.length === 2){//verificando se os cards são iguais
                if(flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id){
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");
                    
                    matchCardSign();
                    matches++;
                    flippedCards = [];
                    
                    if(matches === 8){//verificando se todas os cards foram combinados
                        gameOver();
                    }
                }
            }
        }else{//caso tente virar mais de 2 cards a class flipped sera anulada nos 2 cards virados
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");
            flippedCards = [];
        }
    }
    
    function gameOver(){
        modalGameOver.style.zIndex = 10;
        setTimeout(function(){
            modalGameOver.addEventListener("click", window.location.href = "mapa.html", false);        
        },5000);
    }

    function matchCardSign(){//modificando o css para quando as cartas combinarem
        imgMatchSign.style.zIndex = 1;
        imgMatchSign.style.top = 150 + "px";
        imgMatchSign.style.opacity = 0;
        setTimeout(function(){//retornando o css ao padrao apos 1.5s
        imgMatchSign.style.zIndex = -1;
        imgMatchSign.style.top = 250 + "px";
        imgMatchSign.style.opacity = 1;
        },1500);
    }
}());