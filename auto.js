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

            await page.type('[id="txt_CollectSearch"]', '36015470'); // 36015470 erro de 2 contratos ou mais 
            console.log('Pesquisar após 5 segundos');

            await page.keyboard.press('Enter');

            await this.delay(5000); // Espera 5 segundos

            // Encontra todos os elementos <a> na página
            const links = await page.$$('a');

            // Verifica se algum dos links tem o texto "nome"
            for (const link of links) {
                const textoLink = await page.evaluate(element => element.textContent.trim(), link);
                if (textoLink === 'A A PEREIRA SIQUEIRA') {
                    // Tenta clicar no link com o texto "nome"
                    try {
                        await link.click();
                        console.log('Clicou no link com o texto "A A PEREIRA SIQUEIRA".');
                        await this.delay(5000); // Espera 5 segundos
                        break;
                    } catch (error) {
                        console.error('Erro ao clicar no link:');
                        break;
                    }
                }
            }
            console.log('continuando!!')
            
                /*
                let collectOmniIndexPlaceHolder;
            try {
                collectOmniIndexPlaceHolder = await page.$('#CollectOmniIndexPlaceHolder');
                console.log('mais de 1 contrato encontrado')
            } catch (error) {
                console.error('Erro ao verificar a existência do elemento:', error);
            }
            
            const conteudoTagsB = await page.$$eval('b', elements => elements.map(element => element.textContent.trim()));

                const textoEsperado = 'Contas em Assessorias Externas - NÃO DISPONÍVEIS';
                
                if (conteudoTagsB.includes(textoEsperado)) {
                    console.log(`O texto "${textoEsperado}" foi encontrado dentro das tags <b>.`);
                    // Faça algo se o texto for encontrado
                } else {
                    console.log(`O texto "${textoEsperado}" não foi encontrado dentro das tags <b>.`);
                    // Faça algo se o texto não for encontrado
                }*/
        } catch (erro) {
            console.error('Ocorreu um erro:', erro);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

module.exports = Robo;
