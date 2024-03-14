class Botoes {
    constructor() {
        this.axios = require('axios');
        this.Controller = require('./app.js');
        this.control = new this.Controller();
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
        let robo6 = document.querySelector("#robo6");
        let robo7 = document.querySelector("#robo7");
        let robo8 = document.querySelector("#robo8");
        let robo9 = document.querySelector("#robo9");
        let robo10 = document.querySelector("#robo10");
        let robo11 = document.querySelector("#robo11");
        let robo12 = document.querySelector("#robo12");
        let robo13 = document.querySelector("#robo13");
        let robo14 = document.querySelector("#robo14");
        let robo15 = document.querySelector("#robo15");
        let robo16 = document.querySelector("#robo16");
        let robo17 = document.querySelector("#robo17");
        let robo18 = document.querySelector("#robo18");
        let robo19 = document.querySelector("#robo19");
        let robo20 = document.querySelector("#robo20");
        let robo21 = document.querySelector("#robo21");
        let robo22 = document.querySelector("#robo22");
        let robo23 = document.querySelector("#robo23");
        let robo24 = document.querySelector("#robo24");
        let robo25 = document.querySelector("#robo25");
        let robo26 = document.querySelector("#robo26");
        let robo27 = document.querySelector("#robo27");
        let robo28 = document.querySelector("#robo28");
        let robo29 = document.querySelector("#robo29");
        let robo30 = document.querySelector("#robo30");
        
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
            this.control.listarUsuario('Jafalcao');
        });
        robo2.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Ipmiranda';
            this.control.listarUsuario('lpmiiranda');
        });
        robo3.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Schsiilva';
            this.control.listarUsuario('schsiilva');
        });
        robo4.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'impereiira';
            this.control.listarUsuario('impereiira');
        });
        robo5.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Dhboorba';
            this.control.listarUsuario('dhaboorba');
        });
        robo6.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jakssantos';
            this.control.listarUsuario('jakssantos');
        });
        robo7.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'kacldabenicio';
            this.control.listarUsuario('kacldabenicio');
        });
        robo8.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'ecgliima';
            this.control.listarUsuario('ecgliima');
        });
        robo9.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'tdsddoliveira';
            this.control.listarUsuario('tdsddoliveira');
        });
        robo10.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'ammfernandes';
            this.control.listarUsuario('ammfernandes');
        });
        robo11.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'tsxaviier';
            this.control.listarUsuario('tsxaviier');
        });
        robo12.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'tbsaantos';
            this.control.listarUsuario('tbsaantos');
        });
        robo13.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'daaroliveira';
            this.control.listarUsuario('daaroliveira');
        });
        robo14.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'cdssanche';
            this.control.listarUsuario('cdssanche');
        });
        robo15.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'anldoliveira';
            this.control.listarUsuario('anldoliveira');
        });
        robo16.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'vmsousaa';
            this.control.listarUsuario('vmsousaa');
        });
        robo17.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'cxjsantoos';
            this.control.listarUsuario('cxjsantoos');
        });
        robo18.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'desdsilva';
            this.control.listarUsuario('desdsilva');
        });
        robo19.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'frlfernandes';
            this.control.listarUsuario('frlfernandes');
        });
        robo20.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'wdsilva';
            this.control.listarUsuario('wdsilva');
        });
        robo21.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'bjlacerda';
            this.control.listarUsuario('bjlacerda');
        });
        robo22.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'lcsilvaa';
            this.control.listarUsuario('lcsilvaa');
        });
        robo23.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'besrodrigues';
            this.control.listarUsuario('besrodrigues');
        });
        robo24.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'rrvciprianoo';
            this.control.listarUsuario('rrvciprianoo');
        });
        robo25.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'ycaraujo';
            this.control.listarUsuario('ycaraujo');
        });
        robo26.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'rwneto';
            this.control.listarUsuario('rwneto');
        });
        robo27.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'guuasilva';
            this.control.listarUsuario('guuasilva');
        });
        robo28.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jcfdcarvalho';
            this.control.listarUsuario('jcfdcarvalho');
        });
        robo29.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'kgfrodrigues';
            this.control.listarUsuario('kgfrodrigues');
        });
        robo30.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'capsilveira';
            this.control.listarUsuario('capsilveira');
        });
       

        removeUser.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Usuario'
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
