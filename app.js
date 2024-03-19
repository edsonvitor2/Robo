class Controller {
    constructor() {
        this.ControllerRobo = require('./auto.js');
        this.robo = new this.ControllerRobo();
        this.puppeteer = require('puppeteer'); // instancia puppeteer
        this.axios = require('axios');
        this.sql = require('mssql');
        this.config = {
            user: 'sa',
            password: 'etropus@147258',
            server: '192.168.4.10',
            database: 'merger',
            options: {
                encrypt: false // Se necessário
            },
        };

        // Inicia a verificação dos usuários logados imediatamente após a criação do objeto Controller
        this.verificarLogados();
    }

    async verificarLogados() {
        try {
            // Conecta ao banco de dados
            await this.sql.connect(this.config);

            // Define o intervalo para verificar os usuários logados a cada 5 segundos
            setInterval(async () => {
                // Executa a consulta para selecionar todos os usuários
                const result = await this.sql.query('SELECT * FROM usuariosRobo');

                // Itera sobre os resultados e verifica o status de logado de cada usuário
                for (const user of result.recordset) {
                    let logado = user.logado;
                    console.log(user.status);
                    console.log(`Usuário ${user.usuario} está logado: ${user.logado}`);
                    if(logado == 'sim'){
                        document.querySelector(`${'.'+user.usuario}`).style.color = "green";
                        document.querySelector(`${'.'+user.usuario}`).innerHTML = "LIGADO!";
                    }else{
                        document.querySelector(`${'.'+user.usuario}`).style.color = "red";
                    }
                    // Aqui você pode adicionar lógica para lidar com o status logado de cada usuário, se necessário
                }
            }, 5000); // 5000 milissegundos = 5 segundos
        } catch (err) {
            // Se houver algum erro, exibe-o
            console.error('Erro ao verificar status de logado dos usuários:', err);
        }
    }

    async listarUsuario(User) {
        try {
            // Conecta ao banco de dados
            await this.sql.connect(this.config);

            // Executa a consulta com parâmetros
            const result = await this.sql.query`SELECT * FROM usuariosRobo WHERE usuario = ${User}`;

            // Exibe os resultados
            let usuario = result.recordset[0];

            this.robo.iniciarRobo(usuario);

        } catch (err) {
            // Se houver algum erro, exibe-o
            console.error('Erro ao conectar ou consultar o banco de dados:', err);
        }
    }

    async listarDadosUsuarios() {
        try {
            // Conecta ao banco de dados
            await this.sql.connect(this.config);

            // Executa a consulta
            const result = await this.sql.query('SELECT * FROM usuariosRobo');

            // Exibe os resultados
            const usuarios = result.recordset;

            console.log(usuarios); // Exibe os usuários recebidos do banco de dados

            // Exiba os resultados na tabela, se necessário
            this.criarTabelaUsuarios(usuarios);
        } catch (err) {
            // Se houver algum erro, exibe-o
            console.error('Erro ao conectar ou consultar o banco de dados:', err);
        } finally {
            // Fecha a conexão se quiser
        }
    }

    async editarUsuario(usuario, id) {
        try {
            // Conecta ao banco de dados
            await this.sql.connect(this.config);

            // Executa a consulta de atualização
            const result = await this.sql.query`UPDATE usuariosRobo 
                SET usuario = ${usuario.usuario}, senha = ${usuario.senha}, 
                    cartera = ${usuario.cartera}, hora_inicio = ${usuario.hora_inicio}, 
                    hora_fim = ${usuario.hora_fim}, 
                    hora_intervalo_inicio = ${usuario.hora_intervalo_inicio}, 
                    hora_intervalo_fim = ${usuario.hora_intervalo_fim}, 
                    tempoMedioAcionamento = ${usuario.tempoMedioAcionamento} 
                WHERE id = ${id}`;

            console.log('Usuário atualizado com sucesso!');
            // Você pode adicionar qualquer lógica adicional aqui, como retornar uma mensagem de sucesso ou atualizar a interface do usuário

        } catch (err) {
            // Se houver algum erro, exibe-o
            console.error('Erro ao atualizar usuário:', err);
        } finally {
            // Fecha a conexão
        }
    }

    criarTabelaUsuarios(value) {
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
                <td>${this.formatarHora(user.hora_inicio)}</td>
                <td>${this.formatarHora(user.hora_fim)}</td>
                <td>${this.formatarHora(user.hora_intervalo_inicio)}</td>
                <td>${this.formatarHora(user.hora_intervalo_fim)}</td>
                <td>${this.formatarHora(user.tempoMedioAcionamento)}</td>
                <td>${this.formatarHora(user.tempo_logado)}</td>
            `;

            tr.addEventListener("click", e => {
                document.querySelector("#id").value = user.id;
                document.querySelector("#usuario").value = user.usuario;
                document.querySelector("#senha").value = user.senha;
                document.querySelector("#cartera").value = user.cartera;
                document.querySelector("#hora_inicio").value = this.formatarHora(user.hora_inicio);
                document.querySelector("#hora_fim").value = this.formatarHora(user.hora_fim);
                document.querySelector("#hora_intervalo_inicio").value = this.formatarHora(user.hora_intervalo_inicio);
                document.querySelector("#hora_intervalo_fim").value = this.formatarHora(user.hora_intervalo_fim);
                document.querySelector("#tempo_medio_acionamento").value = this.formatarHora(user.tempoMedioAcionamento);
            });

            tbody.appendChild(tr);
        });
    }

    formatarHora(hora) {
        // Verifica se a hora é válida
        if (!hora) return '';
        // Formato: HH:MM:SS
        return hora.slice(0, 8);
    }

    fecharNavegador(user) {
        console.log(user);
        this.robo.fecharNavegador(user);
    }
}

module.exports = Controller;