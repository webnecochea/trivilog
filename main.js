//constantes importantes
const Tinicial = 20;
const Vinicial = 3;

//variables importantes
var tiempo = Tinicial;
var puntos = 0;
var vidas = Vinicial;
var enJuego = true;
var preguntaActual = 0;
var racha = 0;
var ki = 0;

//componentes importantes
let tablero = document.getElementById("tablero");
let correcta = document.getElementById("correcta");
let incorrecta = document.getElementById("incorrecta");
let tiempoFuera = document.getElementById("tiempoFuera");
let wally = document.getElementById("wally");
let Nombre = document.getElementById("Nombre");
let premios = document.getElementById("premios");
let DivInicio = document.getElementById("divinicio");
let final = document.getElementById("final");
let barraKI = document.getElementById("barraKI");
let IndKI = document.getElementById("IndKI");

//indicadores
let IndTiempo = document.getElementById("IndTiempo");
let IndPuntos = document.getElementById("IndPuntos");
let IndVida = document.getElementById("IndVida");


//inicializacion de componentes
tablero.style.display = 'none';
correcta.style.display = 'none';
incorrecta.style.display = 'none';
tiempoFuera.style.display = 'none';
premios.style.display = 'none';
final.style.display = 'none';

//Cargar preguntas del cuestionario y mezclarlas
listaPreguntas.sort(function() {return Math.random() - 0.5});
var cuestionario = listaPreguntas; 


//Funciones para recorrer las preguntas

    function iniciarReloj() {
        IndTiempo.innerHTML = ' '+tiempo;
        if(tiempo==0 && enJuego){
        finTiempo();
        }else{
            if(enJuego){
                tiempo-=1;
            }
            setTimeout("iniciarReloj()",1000);
        }
    }
    
    function finTiempo (){
        vidas--;
        IndVida.innerHTML = ' ' + vidas;
        enJuego = false;
        tablero.style.display = 'none';
        tiempoFuera.style.display = 'block';
    }

    function pintarOpciones(op){
        for(i=0; i<4 ; i++){
            document.getElementById(i+1).innerHTML = op[i];
            document.getElementById(i+1).style.display = 'block';
        }
    }

    function activarPregunta(){
        enJuego = true;
        tiempo = Tinicial;  
        preguntaActual = cuestionario.pop();
        document.getElementById("preguntas").innerHTML = preguntaActual.consigna;
        pintarOpciones(preguntaActual.op);
        limpiarPantalla();
    }

    function limpiarPantalla(){
        tablero.style.display = 'block';
        correcta.style.display = 'none';
        incorrecta.style.display = 'none';
        tiempoFuera.style.display = 'none';
        DivInicio.style.display = 'none';
        BtnBomba.style.display = 'block';
        BtnRobot.style.display = 'block';
        BtnReloj.style.display = 'block';
    }

    function compararRespuesta(num){
        if(enJuego){
            enJuego = false;
            if(preguntaActual.respuesta == num){
                respCorrecta();;
            }
            else{
                respErronea();
            }
        }
    }

    function respCorrecta(){
        puntos++;      
        racha++;    
        ki += 1000 + tiempo*30;
        IndPuntos.innerHTML = puntos;      
        tablero.style.display = 'none';
        correcta.style.display = 'block';
    }

    function respErronea(){
        vidas--;
        racha = 0;
        ki-=150;
        IndVida.innerHTML = vidas;
        tablero.style.display = 'none';
        incorrecta.style.display = 'block';
    }

    function seguir(){
        enJuego = false;
        if(racha>14){
            premio5();
            racha=0;
        }
        else{
            if(racha==3){
                premio3();
                racha=13;
            }
            else{
                if(vidas==0 || cuestionario.length==0){
                    finDelJuego();
                }
                else{
                    activarPregunta();                 
                }

            }
        }
    }

    function premio5(){
        correcta.style.display = 'none';
        premios.style.display = 'block';
        var p5 = premios5;
        p5.sort(function() {return Math.random() - 0.5});
        for(i=1; i<6; i++){
            lugar='premio'+i;
            document.getElementById(lugar).innerHTML=p5.pop();
        }
    }

    var acum = 0;

    function vegeta(){
        if(ki>15000){
            document.getElementById("conclusion").innerHTML='Sos lo máximo en conocimientos de logística, no habia visto algo así antes';
            document.getElementById("imgvegeta").src='./img/3.jpg';
            return 0;
        }
        else{
            if(ki>12000){
                document.getElementById("conclusion").innerHTML='Estás en un nivel altisimo, a la altura de un licenciado en logística';
                document.getElementById("imgvegeta").src='./img/3.jpg';
                return 0;
            }
            else{
                if(ki>8000){
                    document.getElementById("conclusion").innerHTML='Muy bien vas en camino a ser un gran logista'
                    document.getElementById("imgvegeta").src='./img/2.png';
                    return 0;
                }
                else{
                    if(ki>5000){
                        document.getElementById("conclusion").innerHTML='Buen intento pero podrías hacerlo mejor';
                        document.getElementById("imgvegeta").src='./img/1.png';
                        return 0;
                    }
                    else{
                        document.getElementById("conclusion").innerHTML='Necesitarás estudiar mucho, tenés potencial, pero tu ki de logista en este momento está por el suelo';
                        document.getElementById("imgvegeta").src='./img/1.png';
                        return 0;
                    }
                }
            }
        }
    }

    function KI(){
        vegeta();
        for(i=0;i<5000;i++){
            if(acum<ki){
                setTimeout("subirKI();",200);
            }
            else{return 0;}
        }
    }

    function subirKI(){
        if(acum<ki){
            acum+= Math.random()*10;
            barraKI.style.width= (acum*100/25000).toFixed()+'%';
            IndKI.innerHTML=acum.toFixed();
        }
        else{
            return 0;
        }
    }

    function premio3(){
        correcta.style.display = 'none';
        premios.style.display = 'block';
        var p3 = premios3;
        p3.sort(function() {return Math.random() - 0.5});
        for(i=1; i<4; i++){
            lugar='premio'+i;
            document.getElementById(lugar).innerHTML=p3.pop();
        }
    }

    function finDelJuego(){
        if(ki<0){
            ki=0;
        }
        limpiarPantalla();
        document.getElementById("tablero").style.display = 'none';
        document.getElementById("control").style.display = 'none';
        final.style.display='block';
        document.getElementById("findelj").innerHTML = 'Fin del juego! '+ Nombre.value + ' ha sumado: '+ puntos +' punto/s'
        
    }

    function comenzar(){
     
    }

//variables de los comodines
var Nbombas = 1;
var Nrobots = 1;
var Npasar = 1;
var Nreloj = 1;

//indicadores de cantidad
let IndBomba = document.getElementById('IndBomba');
let IndRobot = document.getElementById('IndRobot');
let IndPasar = document.getElementById('IndPasar');
let IndReloj = document.getElementById('IndReloj');

//botones de los comodines
let BtnBomba = document.getElementById("BtnBomba");
let BtnRobot = document.getElementById("BtnRobot");
let BtnPasar = document.getElementById("BtnPasar");
let BtnReloj = document.getElementById("BtnReloj");
var numeros = [1,2,3,4];

//funciones de los comodines

    function boom(){
        var numeros = [1,2,3,4];
        if(enJuego && Nbombas>0){
            numeros.sort(function() {return Math.random() - 0.5});
            BtnBomba.style.display = 'none';
            var hides=0;            
            while(hides<2){
                var indice = numeros.pop();
                if (indice != preguntaActual.respuesta){
                    document.getElementById(indice).style.display = 'none';
                    hides++;
                }
            }
            Nbombas--;
            IndBomba.innerHTML= '['+ Nbombas +']';
        }  
        else{
            if(!enJuego){
                alert('no hay opciones para bombardear');
            }
            else{
                alert('No hay bombas disponibles');
            }
        }
    }

    function pasar(){
        if(enJuego && Npasar>0){
            enJuego=false;
            seguir();
            Npasar--;
            IndPasar.innerHTML= '['+ Npasar +']';
        }
        else{
            if(!enJuego){
                alert('No hay una pregunta activa para saltearla');
            }
            else{
                alert('No dispones de este comodin');
            }
        }
    }       

    function mas20(){       
        if(enJuego && Nreloj>0){
            tiempo+=20;
            Nreloj--;
            IndReloj.innerHTML= '['+ Nreloj +']';
            BtnReloj.style.display = 'none';
        }
        else{
            alert('No dispones de tiempo extra');
        }
    }

    function robot(){
        if(Nrobots==0){
            wally.innerHTML = 'Lo siento, mi bateria está muy baja en este momento';
        }
        else{
            let ans = preguntaActual.respuesta - 1;
            let dice = preguntaActual.op[ans];
            wally.innerHTML = 'Mis algoritmos señalan que la respuesta correcta es: ' + dice;
            BtnRobot.style.display = 'none';
            Nrobots--;
            IndRobot.innerHTML = '['+ Nrobots +']';
        }
    }

    //sumade premios
    function limpiarPremios(){
        for(i=1; i<6; i++){
            lugar='premio'+i;
            document.getElementById(lugar).innerHTML='';
        }
    }

    function masBomba(n){
        correcta.style.display = 'block';
        premios.style.display = 'none';
        Nbombas+=n;
        IndBomba.innerHTML = '['+ Nbombas +']';
        limpiarPremios();
    }
    function masRobot(n){
        correcta.style.display = 'block';
        premios.style.display = 'none';
        Nrobots+=n;
        IndRobot.innerHTML = '['+ Nrobots +']';
        limpiarPremios();
    }
    function masReloj(n){
        correcta.style.display = 'block';
        premios.style.display = 'none';
        Nreloj+=n;
        IndReloj.innerHTML = '['+ Nreloj +']';
        limpiarPremios();
    }
    function masPasar(n){
        correcta.style.display = 'block';
        premios.style.display = 'none';
        Npasar+=n;
        IndPasar.innerHTML = '['+ Npasar +']';
        limpiarPremios();
    }
    function masVida(n){
        correcta.style.display = 'block';
        premios.style.display = 'none';
        vidas+=n;
        IndVida.innerHTML = vidas;
        limpiarPremios();
    }
    function masPunto(n){
        correcta.style.display = 'block';
        premios.style.display = 'none';
        puntos+=n;
        IndPuntos.innerHTML = puntos;
        limpiarPremios();
    }



function inicio(){
    document.getElementById('nombrey').innerHTML= Nombre.value;
    activarPregunta();
    iniciarReloj();
}


//Comenzar Juego
