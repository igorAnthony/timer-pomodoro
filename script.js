var contador_pomodoro = 0;
let result_checkbox = document.getElementById("iniciaAutomatico");
var verifica_descanso = false;

$(document).ready(function () {
    
    $("#btn-pomodoro").click(function () {
        $("#pomodoro-display").show();
        $("#dcurto-display").hide();
        $("#dlongo-display").hide();
        $("#btn-pomodoro").css({ "background": "#525252" });
        $("#btn-dcurto").css({ "background": "none" });
        $("#btn-dlongo").css({ "background": "none" });
    });
    $("#btn-dcurto").click(function () {
        $("#pomodoro-display").hide();
        $("#dcurto-display").show();
        $("#dlongo-display").hide();
        $("#btn-dcurto").css({ "background": "#525252" });
        $("#btn-pomodoro").css({ "background": "none" });
        $("#btn-dlongo").css({ "background": "none" });
    });
    $("#btn-dlongo").click(function () {
        $("#pomodoro-display").hide();
        $("#dcurto-display").hide();
        $("#dlongo-display").show();
        $("#btn-dlongo").css({ "background": "#525252" });
        $("#btn-pomodoro").css({ "background": "none" });
        $("#btn-dcurto").css({ "background": "none" });
    });
    $("#btn1").click(function () {
        console.log("entrei aq");
        if ($("#descanso_longo").val() != "" && $("#descanso_curto").val() != "" && $("#pomodoro_timer").val() != "") {
            $(".row-menu").fadeOut(1000);
            $("#timer").fadeIn(3000);

            inicializaPomodoro();
        } else {
            alert("Existem campos vazios, não é possível iniciar. Preencha todos os campos!");
        }
    });

    $("#btn_iniciar").click(function () {
        if (verifica_descanso == true) {
            inicializaPomodoro();
        } else {
            inicializaDescanso();
        }
        $("#time_descanso").fadeOut(1000);
        $("#timer").fadeIn(3000);

    });
    $("#btn_pular").click(function () {
        $("#time_descanso").hide();
        inicializaPomodoro();
    });
    $("#btn_home").click(function () {
        $("#timer").fadeOut(1000);
        $("#time_descanso").fadeOut(1000);
        $(".row-menu").fadeIn(3000);
        document.getElementById("minutes").innerHTML = "";
    });

});
function inicializaDescanso() {
    verifica_descanso = true;
    if (contador_pomodoro % 4 != 0) {
        iniciarTimerDescanso($("#descanso_curto").val() * 60, 2);
    } else {
        iniciarTimerDescanso($("#descanso_longo").val() * 60, 2);
    }
}
function inicializaPomodoro() {
    verifica_descanso = false;
    iniciarTimerPomodoro($("#pomodoro_timer").val() * 60, 2);
    
}
function iniciarTimerPomodoro(duration, nm_countdown) {
    var timer = duration, minutes, seconds;
    var snd = new Audio("./sounds/gtaSAMissionPassed.mp3");
    console.log("entrou timer pomodoro");
    var intervalo = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#minutes").html(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
        if (minutes == 0 && seconds == 0) {
            clearInterval(intervalo);
            contador_pomodoro++;
            preencheContador();
            if (result_checkbox.checked) {
                inicializaDescanso();
            } else {
                snd.load();
                snd.play();
                $("#timer").fadeOut(4000);
                $('#time_descanso').fadeIn(8000);

                if (contador_pomodoro % 4 != 0) {
                    $('#pergunta_descansoCurto').fadeIn(8000);
                    $('#pergunta_descansoLongo').hide();
                    $('#pergunta_pomodoro').hide();
                    $('#gif_feliz').hide();
                } else {
                    $('#pergunta_descansoCurto').hide();
                    $('#gif_feliz').fadeIn(8000).attr("src", "./gif/" + (Math.floor(Math.random() * 26) + 1).toString() + ".gif");
                    $('#pergunta_descansoLongo').fadeIn(8000).html("Parabéns você concluiu " + contador_pomodoro / 4 + " pomodoro!! Iniciar Descanso Longo?");
                    $('#pergunta_pomodoro').hide();
                }
            }
        }

    }, 1000);
}
function iniciarTimerDescanso(duration, nm_countdown) {
    var timer = duration, minutes, seconds;
    var snd = new Audio("./sounds/gtaAhShit.mp3");

    var intervalo = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        document.getElementById("minutes").innerHTML = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
        if (minutes == 0 && seconds == 0) {
            clearInterval(intervalo);
            if (result_checkbox.checked) {
                inicializaPomodoro();
            } else {
                snd.load();
                snd.play();
                $('#timer').fadeOut(2000);
                $('#time_descanso').fadeIn(5000);
                $('#pergunta_descansoCurto').hide();
                $('#pergunta_descansoLongo').hide();
                $('#gif_feliz').hide();
                $('#pergunta_pomodoro').fadeIn(5000);
                $('#btn_pular').hide();
            }
        }

    }, 1000);
}
function preencheContador() {
    $("#ContadorPomodoroFeitos").html("Pomodoros completados: " + contador_pomodoro);
}
