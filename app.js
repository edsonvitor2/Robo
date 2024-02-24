class Controller{
    
    constructor(){
        this.axios = require('axios');
    }

    listarJafalacao(){
        this.axios.get('http://localhost:5000/dados_usuarios_jafalcao')
            .then(response => {
                const dadosUsuarios = response.data;
                console.log(dadosUsuarios);
            })
            .catch(error => {
                console.error('Erro ao obter dados:', error);
            });
        }

    listarIpmiranda() {
        this.axios.get('http://localhost:5000/dados_usuarios_ipmiranda')
        .then(response => {
            const dadosUsuarios = response.data;
            console.log(dadosUsuarios);
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
    }
}

module.exports = Controller;