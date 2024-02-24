
class Botoes {
    constructor() {
        this.Controller = require('./app.js');
        this.control = new Controller();
        this.nome;

        this.initButtons();
    }

    initButtons() {
        

        let iniciarRobo = document.querySelector("#iniciarRobo");
        let editar = document.querySelector("#edit");
        let usuario = document.querySelector("#user");
        let adm = document.querySelector("#adm"); 
        let voltar = document.querySelector("#votlar");
        let voltarEdit = document.querySelector("#voltarEdit");
        let removeUser = document.querySelector("#removeUser")

        let robo1 = document.querySelector("#robo1");
        let robo2 = document.querySelector("#robo2");
        let robo3 = document.querySelector("#robo3");
        let robo4 = document.querySelector("#robo4");
        let robo5 = document.querySelector("#robo5");
        let voltarRobos = document.querySelector("#voltarRobos");

        // BOTOES INTERFACE //
        adm.addEventListener("click", e => {

            document.querySelector(".login").style.display = 'block';
            document.querySelector(".userRobo").style.display = 'none';

        });

        usuario.addEventListener("click", e => {
            console.log("usuario");
        });

        voltar.addEventListener("click", e =>{
            document.querySelector(".login").style.display = 'none';
            document.querySelector(".userRobo").style.display = 'block';
        });

        logar.addEventListener("click", e =>{
            document.querySelector(".userRobo").style.display = 'none';
            
        });
        editar.addEventListener("click",e=>{
            document.querySelector("#robos").style.display = 'none';
            document.querySelector("#funcoes").style.display = 'none';
            document.querySelector("#tableUser").style.display = 'block';
            document.querySelector("#UserEdit").innerHTML = this.nome;
            

        });
        voltarEdit.addEventListener("click",e =>{
            document.querySelector("#tableUser").style.display = 'none';
            document.querySelector("#robos").style.display = 'block';
            document.querySelector("#funcoes").style.display = 'block';
        }); 


        // ROBOS //


        robo1.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jaFalcao';
            this.nome = 'jaFalcao';
            this.control.listarJafalacao();

        });
        robo2.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Ipmiranda';
            this.nome = 'Ipmiranda';
            this.control.listarIpmiranda();

        });
        robo3.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Schsiilva';
            this.nome = 'Schsiilva';
        });
        robo4.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Impereira';
            this.nome = 'Impereira';
        });
        robo5.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Dhboorba';
            this.nome = 'Dhboorba';
        });

        removeUser.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Usuario'
            this.nome = 'Usuario'
        });

        iniciarRobo.addEventListener("click", e => {
            
        });
    }
}

var btn = new Botoes();
