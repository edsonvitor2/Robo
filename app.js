class Controller{
    
    constructor(){
        this.axios = require('axios');
        
    }

    listarJafalacao(){
        this.axios.get('http://localhost:5000/dados_usuarios_jafalcao')
            .then(response => {
                const dadosUsuarios = response.data;

                let usuario = dadosUsuarios.usuario;
                let senha = dadosUsuarios.senha;
                
                console.log(usuario,senha);

                this.robo = new Robo();
                this.robo.iniciarRobo(dadosUsuarios);
            })
            .catch(error => {
                console.error('Erro ao obter dados:', error);
            });

        }

    listarIpmiranda() {
        this.axios.get('http://localhost:5000/dados_usuarios_ipmiranda')
        .then(response => {
            const dadosUsuarios = response.data;

            let usuario = dadosUsuarios.usuario;
            let senha = dadosUsuarios.senha;
            
            console.log(usuario,senha);

            this.robo = new Robo();
            this.robo.iniciarRobo(dadosUsuarios);
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
    }

    listarDadosUsuarios() {
        this.axios.get('http://localhost:5000/dados_usuarios')
        .then(response => {
            const dadosUsuarios = response.data;
    
            // Array para armazenar os objetos de usuário
            let usuarios = [];
    
            // Iterar sobre cada usuário e criar um objeto para cada um
            dadosUsuarios.forEach(usuario => {
                let usuarioObj = {
                    id: usuario.id,
                    usuario: usuario.usuario,
                    senha: usuario.senha,
                    cartera: usuario.cartera,
                    hora_inicio: usuario.hora_inicio,
                    hora_fim: usuario.hora_fim,
                    hora_intervalo_inicio: usuario.hora_intervalo_inicio,
                    hora_intervalo_fim: usuario.hora_intervalo_fim,
                    logado: usuario.logado
                };
                usuarios.push(usuarioObj);
            });
    
            console.log(usuarios);
            this.criarTabelaUsuarios(usuarios);
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
    }

    criarTabelaUsuarios(value){
        let tbody = document.querySelector("#tabelaUser");

        // Limpar o conteúdo atual da tabela
        tbody.innerHTML = "";
    
        value.forEach(user => {
            let tr = document.createElement("tr");
            
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.usuario}</td>
                <td>${user.senha}</td>
                <td>${user.cartera}</td>
                <td>${user.hora_inicio}</td>
                <td>${user.hora_fim}</td>
                <td>${user.hora_intervalo_inicio}</td>
                <td>${user.hora_intervalo_fim}</td>
            `;
            
            tbody.appendChild(tr);
        });
    }
}

module.exports = Controller;