class Botoes {
    constructor() {
        this.sql = require('mssql');
        this.axios = require('axios');
        this.Controller = require('./app.js');
        this.control = new this.Controller();
        this.editar = false;
        this.initButtons();
        this.usuario;
        this.status;
        
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
        let removeUser = document.querySelector("#removeUser");
        let desligarRobo = document.querySelector("#desligarRobo")
        
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
        let robo27 = document.querySelector("#robo28");
        let robo28 = document.querySelector("#robo27");
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
        desligarRobo.addEventListener("click", e => {
            let user = this.usuario;
            this.control.fecharNavegador(user);
        });

        removeUser.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'Usuario'
        });

        iniciarRobo.addEventListener("click", e => {
            console.log(this.usuario);
            console.log(this.status);
            this.control.listarUsuario(this.usuario);
        });

        robo1.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jafalcao';
            this.status = "status-robo1"; 
            this.usuario = 'Jafalcao';
        });
        robo2.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'lpmiiranda';
            this.status = "status-robo2"; 
            this.usuario = 'lpmiiranda';
        });
        robo3.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'schsiilva';
            this.status = "status-robo3"; 
            this.usuario = 'schsiilva';
        });
        robo4.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'impereiira';
            this.status = "status-robo4"; 
            this.usuario = 'impereiira';
        });
        robo5.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'dhaboorba';
            this.status = "status-robo5"; 
            this.usuario = 'dhaboorba';
        });
        robo6.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jakssantos';
            this.status = "status-robo6"; 
            this.usuario = 'jakssantos';
        });
        robo7.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'kacldabenicio';
            this.status = "status-robo7"; 
            this.usuario = 'kacldabenicio';
        });
        robo8.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'ecgliima';
            this.status = "status-robo8"; 
            this.usuario = 'ecgliima';
        });
        robo9.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'tdsddoliveira';
            this.status = "status-robo9"; 
            this.usuario = 'tdsddoliveira';
        });
        robo10.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'ammfernandes';
            this.status = "status-robo10"; 
            this.usuario = 'ammfernandes';
        });
        robo11.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'tsxaviier';
            this.status = "status-robo11"; 
            this.usuario = 'tsxaviier';
        });
        robo12.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'tbsaantos ';
            this.status = "status-robo12"; 
            this.usuario = 'tbsaantos';
        });
        robo13.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'daaroliveira';
            this.status = "status-robo13"; 
            this.usuario = 'daaroliveira';
        });
        robo14.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'cdssanche';
            this.status = "status-robo14"; 
            this.usuario = 'cdssanche';
        });
        robo15.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'anldoliveira';
            this.status = "status-robo15"; 
            this.usuario = 'anldoliveira';
        });
        robo16.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'vmsousaa';
            this.status = "status-robo16"; 
            this.usuario = 'vmsousaa';
        });
        robo17.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'cxjsantoos';
            this.status = "status-robo17"; 
            this.usuario = 'cxjsantoos';
        });
        robo18.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'desdsilva';
            this.status = "status-robo18"; 
            this.usuario = 'desdsilva';
        });
        robo19.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'frlfernandes';
            this.status = "status-robo19"; 
            this.usuario = 'frlfernandes';
        });
        robo20.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'wdsilva';
            this.status = "status-robo20"; 
            this.usuario = 'wdsilva';
        });
        robo21.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'bjlacerda';
            this.status = "status-robo21"; 
            this.usuario = 'bjlacerda';
        });
        robo22.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'lcsilvaa';
            this.status = "status-robo22"; 
            this.usuario = 'lcsilvaa';
        });
        robo23.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'besrodrigues';
            this.status = "status-robo23"; 
            this.usuario = 'besrodrigues';
        });
        robo24.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'rrvciprianoo';
            this.status = "status-robo24"; 
            this.usuario = 'rrvciprianoo';
        });
        robo25.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'ycaraujo';
            this.status = "status-robo25"; 
            this.usuario = 'ycaraujo';
        });
        robo26.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'rwneto';
            this.status = "status-robo26"; 
            this.usuario = 'guuasilva';
        });
        robo27.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'guuasilva';
            this.status = "status-robo27"; 
            this.usuario = 'kgfrodrigues';
        });
        robo28.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'jcfdcarvalho';
            this.status = "status-robo28"; 
            this.usuario = 'jcfdcarvalho';
        });
        robo29.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'kgfrodrigues';
            this.status = "status-robo29"; 
            this.usuario = 'kgfrodrigues';
        });
        robo30.addEventListener("click",e =>{
            document.querySelector("#userSelect").innerHTML = 'capsilveira';
            this.status = "status-robo30"; 
            this.usuario = 'capsilveira';
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
