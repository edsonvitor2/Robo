class Robo {
    constructor() {
        // Instancia o Puppeteer e o MSSQL
        this.puppeteer = require('puppeteer'); // instancia puppeteer
        this.sql = require('mssql');

        // Configurações de conexão com o banco de dados
        this.config={
            user: 'sa',
            password: 'etropus@147258',
            server: '192.168.4.10',
            database: 'merger',
            options: {
                encrypt: false // Se necessário
            },
        }

        // Variável para armazenar informações do cliente
        this.cliente;
    }

    async iniciarRobo(usuario) {
        try {
            // Inicia o navegador Puppeteer
            const browser = await this.puppeteer.launch({ headless: false }); // Instancia o navegador 
            const page = await browser.newPage(); // Abre uma nova página
            await page.goto('https://alpheratz.itapevarec.com.br/Alpheratz/login.aspx'); // Abre o site 

            // Espera o site carregar o campo de login
            await page.waitForSelector('[id="txt_username"]');
            // Digita o CPF/CNPJ e a senha
            await page.type('[name="txt_username"]', `${usuario.usuario}`);
            await page.type('[name="txt_password"]', `${usuario.senha}`);
            await page.keyboard.press('Enter'); // Pressiona Enter

            // Variáveis para controlar o número de iterações e o horário atual
            var acionamentos = 40;
            var contador = 0;

            while (contador < acionamentos) { // Loop vai rodar enquanto houver clientes
                const dataAtual = new Date();
                const hora = dataAtual.getHours();
                const minutos = dataAtual.getMinutes();
                const segundos = dataAtual.getSeconds();
                const horario = '09:00:00';

                let intervalo_inicio = usuario.hora_intervalo_inicio;
                let intervalor_fim = usuario.hora_intervalo_fim;
                let inicio = usuario.hora_inicio;
                let fim = usuario.hora_fim;

                // Verifica se está dentro do horário de trabalho
                if (horario > inicio && horario < fim) {
                    // Verifica se está dentro do intervalo de lanche
                    if (horario > intervalo_inicio && horario < intervalor_fim) {
                        console.log('Horario de lanche');
                        break;
                    } else {
                        console.log('Iniciando');

                        // Realiza a busca
                        await page.waitForSelector('[href="ft5/collect.aspx"]', { timeout: 5000 });
                        await page.click('[href="ft5/collect.aspx"]');
                        console.log('entrando na pesquisa');

                        await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos

                        await page.waitForSelector('[id="bt_search"]');
                        await page.click('[id="bt_search"]');

                        await this.delay(5000); // Espera 5 segundos

                        // Executa a consulta SQL para obter os clientes
                        const result = await this.sql.query`SELECT * FROM baseRobo`;
                        const clientes = [];
                        for (const [index, row] of result.recordset.entries()) {
                            clientes.push(row);
                        }

                        // Loop sobre os clientes
                        for (let i = 0; i < clientes.length; i++) {
                            if (clientes[i].agencia == usuario.cartera && clientes[i].desc_evento == 'ok' || clientes[i].desc_evento == 'OK') {

                                this.cliente = clientes[i];
                                console.log('carteira ok', this.cliente);

                                await page.type('[id="txt_CollectSearch"]', this.cliente.operacao);
                                await this.delay(5000); // Espera 5 segundos

                                await page.keyboard.press('Enter');
                                await this.delay(5000);

                                // Encontra todos os elementos <a> na página
                                const links = await page.$$('a');

                                // Verifica se algum dos links tem o texto do cliente
                                for (const link of links) {
                                    const textoLink = await page.evaluate(element => element.textContent.trim(), link);
                                    if (textoLink === this.cliente.cliente) {
                                        // Tenta clicar no link com o texto do cliente
                                        try {
                                            await link.click();
                                            console.log('Clicou no link com o texto', this.cliente.cliente);
                                            await this.delay(5000); // Espera 5 segundos
                                            break;
                                        } catch (error) {
                                            console.error('Erro ao clicar no link:');
                                            break;
                                        }
                                    }else{
                                        console.log('link diferente',textoLink);
                                        console.log('nome diferente',this.cliente.cliente);
                                    }
                                }

                                console.log('continuando!!');

                                const conteudoTagsB = await page.$$eval('b', elements => elements.map(element => element.textContent.trim()));

                                const textoEsperado = 'Contas em Assessorias Externas - NÃO DISPONÍVEIS';

                                if (conteudoTagsB.includes(textoEsperado)) {
                                    console.log(`O texto "${textoEsperado}" foi encontrado dentro das tags <b>.`);
                                    await this.delay(5000); // Espera 5 segundos

                                    // Imprime o ID do cliente atualizar para verificação
                                    var clienteAtualizar = this.cliente;
                                    console.log('ID do cliente a ser atualizado:', clienteAtualizar.operacao);

                                    // Atualiza a obs_evento do cliente para fora da base no banco de dados
                                    const atualizarClienteQuery = `UPDATE baseRobo SET desc_evento = 'fora da base' WHERE operacao = ${clienteAtualizar.operacao}`;
                                    await this.sql.query(atualizarClienteQuery);

                                    // Vai para o começo do while
                                    break;
                                } else {
                                    console.log(`O texto "${textoEsperado}" não foi encontrado dentro das tags <b>.`);

                                    //await this.selecionarMensagem();
                                    let mensagem = await this.selecionarMensagem();
                                    //let mensagem = 'Telefone indisponível no momento';
                                    console.log(mensagem);
                                    await page.type('[id="TaskResults"]', `${mensagem}`);
                                    if( mensagem == 'Telefone indisponível no momento' || 
                                        mensagem == 'Telefone ocupado' ||
                                        mensagem == 'Telefone não atende' ||
                                        mensagem == 'Contato desligou' ||
                                        mensagem == 'Desconhece o cliente' ||
                                        mensagem == 'Ligação muda' ||
                                        mensagem == 'Ligação muda' ||
                                        mensagem == 'Ligação interrompida/ruim' ||
                                        mensagem == 'Recado')
                                        {
                                        console.log('Pressionou Enter. Aguardando 5 segundos...');
                                        await new Promise(resolve => setTimeout(resolve, 5000));
                                        await page.keyboard.press('ArrowDown');
                                        await page.keyboard.press('Enter');
                                        console.log('Esperou 5 segundos.');
                                        await page.click('[id="bt_SaveWorkflowTracking"]');
                                        await new Promise(resolve => setTimeout(resolve, 5000));
                                        
                                        var clienteAtualizar = this.cliente;
                                    console.log('ID do cliente a ser atualizado:', clienteAtualizar.operacao);

                                    // Atualiza a obs_evento do cliente para fora da base no banco de dados
                                    const atualizarClienteQuery = `UPDATE baseRobo SET desc_evento = 'Acionado' WHERE operacao = ${clienteAtualizar.operacao}`;
                                    await this.sql.query(atualizarClienteQuery);
                                    await new Promise(resolve => setTimeout(resolve, 180000));
                                    }
                                }
                                break;
                            } else {
                                console.log("carteira acabou!!!");
                                continue;
                            }
                        }
                        console.log('saiu do for');
                        await page.goto('https://alpheratz.itapevarec.com.br/Alpheratz/login.aspx');
                    }
                } else {
                    console.log("fora do horario de serviço");
                    break; // Sai do loop se estiver fora do horário de serviço
                }
            }
            alert('Limite de acionamentos atingido');
        } catch (erro) {
            console.error('Ocorreu um erro:', erro);
        }
    }
    
    // Função de atraso
    async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Função para selecionar aleatoriamente uma mensagem com base nas porcentagens
    async selecionarMensagem() {
        // Array com as mensagens disponíveis
        const mensagensGrupo1 = [
            'Telefone ocupado',
            'Telefone não atende',
            'Telefone indisponível no momento',
            'Contato desligou',
            'Desconhece o cliente',
            'Ligação muda'
        ];

        const mensagensGrupo2 = [
            'Ligação interrompida/ruim',
            'Solicita contato outro dia/hora',
            'Recado'
        ];

        // Função para selecionar aleatoriamente uma mensagem com base nas porcentagens
        const random = Math.random(); // Gerar um número aleatório entre 0 e 1

        // Selecionar uma mensagem com base na porcentagem
        if (random > 0.2) {
            // 80% das vezes, seleciona uma mensagem do primeiro grupo
            return mensagensGrupo1[Math.floor(Math.random() * mensagensGrupo1.length)];
        } else if(random <= 0.2) {
            // 20% das vezes, seleciona uma mensagem do segundo grupo
            return mensagensGrupo2[Math.floor(Math.random() * mensagensGrupo2.length)];
        }
    }

}

module.exports = Robo;
