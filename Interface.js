class Botoes {
    constructor() {
        this.axios = require('axios');
        this.Controller = require('./app.js');
        this.control = new this.Controller();
        this.nome;
        this.editar = false;
        this.initButtons();
    }

    initButtons() {
        let subirBase = document.getElementById('subirBase');
        let salvarUsuario = document.querySelector("#salvarUsuario");
        let novoUsuario = document.querySelector("#newUser");
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

        novoUsuario.addEventListener("click", e => {
            document.querySelector("#robos").style.display = 'none';
            document.querySelector("#funcoes").style.display = 'none';
            document.querySelector("#tableUser").style.display = 'block';
        });

        adm.addEventListener("click", e => {

            document.querySelector(".login").style.display = 'block';
            document.querySelector(".userRobo").style.display = 'none';

        });

        usuario.addEventListener("click", e => {
            console.log("usuario");
        });

        salvarUsuario.addEventListener("click", e => {
            if(this.editar == true){
                this.editarUsuario();
                
            }else if (this.editar == false){
                this.obterNovoUsuario();
            }
            
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
            document.querySelector(".table_user_edit").style.display = 'block';
            document.querySelector("#UserEdit").innerHTML = this.nome;
            this.editar = true;
            this.control.listarDadosUsuarios();
            
        });
        voltarEdit.addEventListener("click",e =>{
            document.querySelector("#tableUser").style.display = 'none';
            document.querySelector(".table_user_edit").style.display = 'none'
            document.querySelector("#robos").style.display = 'block';
            document.querySelector("#funcoes").style.display = 'block';
            this.editar = false;
            document.querySelector("#tabelaUser").innerHTML = '';
        }); 


        // ROBOS //


        robo1.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jaFalcao';
            this.nome = 'jaFalcao';
            this.control.listarUsuario('Jafalcao');
        });
        robo2.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Ipmiranda';
            this.nome = 'lpmiranda';
            this.control.listarUsuario('lpmiiranda');
        });
        robo3.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Schsiilva';
            this.nome = 'Schsiilva';
            this.control.listarUsuario('schsiilva');
        });
        robo4.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'impereiira';
            this.nome = 'Impereira';
            this.control.listarUsuario('impereiira');
        });
        robo5.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Dhboorba';
            this.nome = 'Dhboorba';
            this.control.listarUsuario('dhaboorba');
        });

        removeUser.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Usuario'
            this.nome = 'Usuario'
        });

        iniciarRobo.addEventListener("click", e => {
            
        });
    }

    editarUsuario(){
        let dados = {
            id: document.querySelector("#id").value,
            usuario: document.querySelector("#usuario").value,
            senha: document.querySelector("#senha").value,
            cartera: document.querySelector("#cartera").value,
            hora_inicio: document.querySelector("#hora_inicio").value,
            hora_fim: document.querySelector("#hora_fim").value,
            hora_intervalo_inicio: document.querySelector("#hora_intervalo_inicio").value,
            hora_intervalo_fim: document.querySelector("#hora_intervalo_fim").value,
            logado: 'nao',
            tempoMedioAcionamento: document.querySelector("#tempo_medio_acionamento").value,
        }
       this.control.editarUsuario(dados,dados.id);

    }
    obterNovoUsuario(){
       let dados = {
            id: '00',
            usuario: document.querySelector("#usuario").value,
            senha: document.querySelector("#senha").value,
            cartera: document.querySelector("#cartera").value,
            hora_inicio: document.querySelector("#hora_inicio").value,
            hora_fim: document.querySelector("#hora_fim").value,
            hora_intervalo_inicio: document.querySelector("#hora_intervalo_inicio").value,
            hora_intervalo_fim: document.querySelector("#hora_intervalo_fim").value,
            logado: 'nao',
            tempoMedioAcionamento: document.querySelector("#tempo_medio_acionamento").value,
            acionamentos:0,
            tempo_logado:"00:00:00"
        }
        console.log(dados);
        const urlApiFlask = 'http://localhost:5000/receber_dados';
        // Envia os dados para a API Flask
        this.axios.post(urlApiFlask, dados)
        .then(response => {
        console.log('Dados enviados com sucesso:', response.data);
        })
        .catch(error => {
        console.error('Erro ao enviar dados:', error);
        });
    }

   
}

var btn = new Botoes();
