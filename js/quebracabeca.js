(function(){
    //array que armazena o estado do jogo
    var tiles = [],
        answer = [];
    var startScreen = document.querySelector("#startScreen");
        startScreen.addEventListener("click",startGame,false);
    var overScreen = document.querySelector("#overScreen");
        //init para inicializa os elementos do jogo
    function init(){
        //var i = indice
        for(var i = 1; i < 9;i ++){
            //declarando var para as pecas
            var tile = document.querySelector("#n"+i);
            //colocando as img nas configuracoes do css
            tile.style.background = "url('img/n"+i+".jpeg')";
            //linkando a movimentação quando clicado
            tile.addEventListener("click", moveTile, false);
            //array das imagens
            tiles.push(tile);
        }
        //espaço em branco
        tiles.push(null);
        answer = tiles;
        //chamar a function render
        render();
    }
    //render para espalhar pecas
    function render(){
        //criando uma nova variavel indice i dentro do array tiles
        for(var i in tiles){
        //nova var tile chamando o array tiles
            var tile = tiles[i];
            if(tile){
                tile.style.left = (i%3) * 100 + 5 + "px";
                if(i < 3){
                    tile.style.top = "5px";
                } else
                if(i < 6){
                    tile.style.top = "105px";
                } else {
                    tile.style.top = "205px";
                }
            }
        }
    }

    function moveTile(){
        var index = tiles.indexOf(this);
        if(index % 3 !== 0){
            if(!tiles[index-1]){
                tiles[index-1] = this;
                tiles[index] = null;
            }
        }
        if(index % 3 !== 2){
            if(!tiles[index+1]){
                tiles[index+1] = this;
                tiles[index] = null;
            }
        }
        if(index > 2){
            if(!tiles[index-3]){
                tiles[index-3] = this;
                tiles[index] = null;
            }
        }
        if(index < 6){
            if(!tiles[index+3]){
                tiles[index+3] = this;
                tiles[index] = null;
            }
        }
        render();
        if(chkWin()){
            gameOver();
        }
    }

    function chkWin() {
        for(var i in tiles){
            var a = tiles[i];
            var b = answer[i];
            if(a !== b){
                return false;
            }
        }
        return true;
    }
    function gameOver() {
        overScreen.style.opacity = "1";
        overScreen.style.zIndex = "1";
        setTimeout(function(){
            overScreen.addEventListener("click",window.location.href = "mapa.html", false);
        },5000);
    }

    function randomSort (oldArray) {
        var newArray;
        var cont = 0
        do{
            newArray = [];
            while(newArray.length < oldArray.length){
                var i = Math.floor(Math.random()*oldArray.length);
                if (newArray.indexOf(oldArray[i]) < 0) {
                    newArray.push(oldArray[i]);

                }
            }
            
        }while(!validGame(newArray));
        return newArray;
    }

    function validGame(array) {
        var inversoes = 0;
        var len = array.length;
        for(var i = 0; i < len - 1; i++){
            for(var j = i+1; j < len; j++){
                if(array[i] && array[j] && array[i].dataset.value < array[j].dataset.value){
                    inversoes++;
                }
            }
        }
        return inversoes%2 === 0;
    }

    function startGame() {
        tiles = randomSort(tiles);
        this.style.opacity = "0";
        this.style.zIndex = "-1";
        this.removeEventListener("click",startGame,false);
        render();
    }
    //chamar a function init
    init();
}());