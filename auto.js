class Robo {
    constructor() {
        this.puppeteer = require('puppeteer'); // instancia puppeteer
        this.sql = require('mssql');
        this.config={
            user: 'sa',
            password: 'etropus@147258',
            server: '192.168.4.10',
            database: 'merger',
            options: {
                encrypt: false // Se necessário
            },
        }
    }

    async iniciarRobo(usuario) {
        try {
            const browser = await this.puppeteer.launch({ headless: false }); // Instancia o navegador 
            const page = await browser.newPage(); // Abre uma nova página
            await page.goto('https://alpheratz.itapevarec.com.br/Alpheratz/login.aspx'); // Abre o site 
            this.delay(5000)
            await page.waitForSelector('[id="txt_username"]'); // Espera o site carregar o campo de login
            await page.type('[name="txt_username"]', `${usuario.usuario}`); // Digita o CPF/CNPJ 
            await page.type('[name="txt_password"]', `${usuario.senha}`); // Digita a senha 
            await page.keyboard.press('Enter');

            var acionamentos = 80;
            var contador = 0;
    
            while (contador < acionamentos) { // Loop vai rodar enquanto houver clientes
                const dataAtual = new Date();
                const hora = dataAtual.getHours();
                const minutos = dataAtual.getMinutes();
                const segundos = dataAtual.getSeconds();
    
                const horario = `${hora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
                let intervalo_inicio = usuario.hora_intervalo_inicio;
                let intervalor_fim = usuario.hora_intervalo_fim;
                let inicio = usuario.hora_inicio;
                let fim = usuario.hora_fim;
    
                if (horario > inicio && horario < fim) {
                    if (horario > intervalo_inicio && horario < intervalor_fim) {
                        console.log('Horario de lanche');
                        break;
                    } else {
                        console.log('Iniciando');

                        await page.waitForSelector('[id="menuitemsTEST"]');
                        await page.click('[href="ft5/collect.aspx"]');

                        await this.delay(5000); // Espera 5 segundos

                        await page.waitForSelector('[id="bt_search"]');
                        await page.click('[id="bt_search"]');

                        
                        await this.delay(5000); // Espera 5 segundos

                        const result = await this.sql.query`SELECT * FROM baseRobo`;
                        // Verifica se há resultados
                        if (result && result.recordset && result.recordset.length > 0) {
                            // Itera sobre cada linha retornada
                            for (const [index, row] of result.recordset.entries()) {
                                if (row.agencia == 'SFIN XXV' && row.desc_evento == '-') {
                                    console.log(row);
                                    setTimeout(async () => {
                                        console.log(`Ação executada para a linha ${index + 1}`);
                                        await page.type('[id="txt_CollectSearch"]', '13185479'); //36015470 erro de 2 contratos ou mais 
                                        console.log('Pesquisar após 5 segundos');
                                        await this.delay(5000); // Espera 5 segundos
                                        contador++; // Incrementa o contador para ir para o próximo cliente na próxima iteração
                                    }, (index + 1) * 5000);
                                }
                            }
                        } else {
                            console.log("Nenhum resultado encontrado.");
                        }
                    }
                } else {
                    console.log("fora do horario de serviço");
                    break; // Sai do loop se estiver fora do horário de serviço
                }
            }
    
            await browser.close(); // Fecha o navegador após o loop
        } catch (erro) {
            console.error('Ocorreu um erro:', erro);
        }
    }
    
    
    

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    //Função para selecionar aleatoriamente uma mensagem com base nas porcentagens
    selecionarMensagem() {
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

// Chame a função selecionarMensagem() para obter uma mensagem aleatória
console.log('Mensagem selecionada:', mensagem);

}

}

module.exports = Robo;
