class Robo {
    constructor() {
        this.puppeteer = require('puppeteer'); // instancia puppeteer
    }

    async iniciarRobo(usuario) {
        try {
            console.log('deu certo', usuario);

            const browser = await this.puppeteer.launch({ headless: false }); // instancia o navegador 
            const page = await browser.newPage(); // abre o navegador
            await page.goto('https://alpheratz.itapevarec.com.br/Alpheratz/login.aspx'); // abre o site 
            
            await page.waitForSelector('[id="txt_username"]'); // esperar o site carregar o campo de login
        
            await page.type('[name="txt_username"]', `${usuario.usuario}`); // digita o login 
            await page.type('[name="txt_password"]', `${usuario.senha}`); // digita a senha 
            await page.click('[name="btn_login"]'); // clica no botao de login


            await page.waitForSelector('[id="menuitemsTEST"]');
            await page.click('[href="ft5/collect.aspx"]');

            await this.delay(5000); // Espera 5 segundos

            await page.waitForSelector('[id="bt_search"]');
            await page.click('[id="bt_search"]');

            
            await this.delay(5000); // Espera 5 segundos

            await page.type('[id="txt_CollectSearch"]', '13185479'); // 36015470 erro de 2 contratos ou mais 
            console.log('Pesquisar após 5 segundos');

            await page.keyboard.press('Enter');

            await this.delay(5000); // Espera 5 segundos

            // Encontra todos os elementos <a> na página
            const links = await page.$$('a');

            // Verifica se algum dos links tem o texto "nome"
            for (const link of links) {
                const textoLink = await page.evaluate(element => element.textContent.trim(), link);
                if (textoLink === 'A C LINO TRANSPORTE ME') {
                    // Tenta clicar no link com o texto "nome"
                    try {
                        await link.click();
                        console.log('Clicou no link com o texto "A C LINO TRANSPORTE ME".');
                        await this.delay(5000); // Espera 5 segundos
                        break;
                    } catch (error) {
                        console.error('Erro ao clicar no link:');
                        break;
                    }
                }
            }

            console.log('continuando!!');

            const conteudoTagsB = await page.$$eval('b', elements => elements.map(element => element.textContent.trim()));

                const textoEsperado = 'Contas em Assessorias Externas - NÃO DISPONÍVEIS';
                
                if (conteudoTagsB.includes(textoEsperado)) {
                    console.log(`O texto "${textoEsperado}" foi encontrado dentro das tags <b>.`);
                    await this.delay(5000); // Espera 5 segundos
                    await page.goto('https://alpheratz.itapevarec.com.br/Alpheratz/login.aspx');
                } else {
                    console.log(`O texto "${textoEsperado}" não foi encontrado dentro das tags <b>.`);

                    this.selecionarMensagem();
                    let mensagem = this.selecionarMensagem();
                    console.log(mensagem);
                    await page.type('[id="TaskResults"]', `${mensagem}`);

                    await this.delay(15000);
                    await page.click('[id="bt_SaveWorkflowTracking"]');

                }
            
        } catch (erro) {
            console.error('Ocorreu um erro:', erro);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Função para selecionar aleatoriamente uma mensagem com base nas porcentagens
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
