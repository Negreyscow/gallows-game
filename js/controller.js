var criaController = function(jogo){
    var $entrada = $('#entrada');
    var $lacunas = $('.lacunas');

    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(lacuna => {
            $('<li>')
            .addClass("lacuna")
            .text(lacuna)
            .appendTo($lacunas);
        });;
    };

    var mudaPlaceHolder = function (texto) {
        $entrada.attr("placeholder", texto);
    };

    var guardaPalavraSecreta = function () {
        //var palavra = $("#entrada").val().trim();
        //jogo.setPalavraSecreta(palavra);
        jogo.setPalavraSecreta($entrada.val().trim());
        $entrada.val("");
        mudaPlaceHolder("chuta");
        exibeLacunas();
    };

    var leChute = function(){
        try {
            jogo.processaChute($entrada.val().trim().substr(0,1));
            $entrada.val();
            exibeLacunas();
    
            if (jogo.ganhouOuPerdeu()){
                setTimeout(function(){
                    if (jogo.ganhou()){
                        alert("GANHOU!");
                    } else if (jogo.perdeu()){
                        alert("PERDEU");
                    }
                    reinicia();
                }, 200);
            }
        } catch (err){
            alert(err.message);
        }
    };

    var reinicia = function(){
        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder("palavra secreta");
    }

    var inicia = function () {
        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }
    return { inicia: inicia };
};