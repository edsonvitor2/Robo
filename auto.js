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

            await page.type('[id="txt_CollectSearch"]', '36014142');
            console.log('Pesquisar após 5 segundos');

            await page.keyboard.press('Enter');
            
        } catch (erro) {
            console.error('Ocorreu um erro:', erro);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

module.exports = Robo;
