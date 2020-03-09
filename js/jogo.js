var criaJogo = function(sprite){

    var palavraSecreta = "";
    var lacunas = [];
    var etapas = 1;

    var processaChute = function(chute){
        if (!chute.trim()) throw Error("chute invalido");
        var exp = new RegExp(chute, "gi"),
            resultado,
            acertou = false;

            while (resultado = exp.exec(palavraSecreta)){
                lacunas[resultado.index] = chute;
                acertou = true;
            }

            if (!acertou){  
                sprite.nextFrame();
            }
        
    };

    var setPalavraSecreta = function(palavra){
        if (!palavra.trim()) throw Error("palavra invalida");
        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    var criaLacunas = function(){
        lacunas = Array(palavraSecreta.length).fill('');        
    }

    var getLacunas = function(){
        return lacunas;
    };

    var getEtapa = function(){
        return etapas;
    };

    var proximaEtapa = function(){
        etapas++;
    }

    var reinicia = function(){
        lacunas = [];
        sprite.reset();
        palavraSecreta = '';
        etapas = 1;
    }

    var perdeu = function(){
        return (sprite.isFinished());
    }

    var ganhouOuPerdeu = function(){
        return (perdeu() || ganhou());
    }

    var ganhou = function(){
        return lacunas.length
        ? !lacunas.some(function(lacuna){
            return lacuna == '';
        })
        : false;
    }

    return {
        setPalavraSecreta: setPalavraSecreta,
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu, 
        reinicia: reinicia
    };

};