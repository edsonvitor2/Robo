class Robo {
    constructor() {
        this.puppeteer = require('puppeteer'); // instancia puppeteer
    }

    async iniciarRobo(usuario, cliente) {
        try {
            const browser = await this.puppeteer.launch({ headless: false }); // Instancia o navegador 
            const page = await browser.newPage(); // Abre uma nova página
            await page.goto('https://alpheratz.itapevarec.com.br/Alpheratz/login.aspx'); // Abre o site 
            
            /*const browser = await this.puppeteer.launch({
                executablePath: "C:\\Program Files\\Google\\Chrome\\Applicationchrome.exe",
                headless: false  // ou true, dependendo de sua preferência
            });*/

            var clientes = cliente;
            var contador = 0;
    
            while (contador < clientes.length) { // Loop vai rodar enquanto houver clientes
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
                        console.log('Cliente:');
                        console.log(clientes[contador].cpf_cnpj);
    
                        await page.waitForSelector('[id="txt_username"]'); // Espera o site carregar o campo de login
                        await page.type('[name="txt_username"]', `${clientes[contador].cpf_cnpj}`); // Digita o CPF/CNPJ 
                        await page.type('[name="txt_password"]', `${usuario.senha}`); // Digita a senha 
                        await this.delay(5000); // Espera 5 segundos
    
                        await page.reload(); // Atualiza a página
                        contador++; // Incrementa o contador para ir para o próximo cliente na próxima iteração
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
