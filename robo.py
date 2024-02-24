from flask import Flask, jsonify
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)  # Adiciona suporte a CORS à sua aplicação

# Função para obter os dados do usuário "jafalcao"
def obter_dados_jafalcao():
    try:
        # Estabelecer a conexão com o banco de dados SQL Server
        data_connection = (
            "Driver={SQL Server};"
            "Server=192.168.4.10;"
            "Database=merger;"
            "UID=sa;"
            "PWD=etropus@147258;"
        )
        connection = pyodbc.connect(data_connection)
        print("Conexão bem sucedida!!!")
        
        # Criar um cursor para executar comandos SQL
        cursor = connection.cursor()

        # Executar uma consulta para obter os dados do usuário "jafalcao"
        cursor.execute("SELECT id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado FROM usuariosRobo WHERE id = 1")

        # Obter a linha retornada pela consulta
        linha = cursor.fetchone()

        # Fechar a conexão
        connection.close()
        
        # Verificar se a linha foi encontrada
        if linha:
            # Converter a linha para um dicionário para que possa ser serializado para JSON
            dados = {
                "id": linha.id,
                "usuario": linha.usuario,
                "senha": linha.senha,
                "cartera": linha.cartera,
                "hora_inicio": linha.hora_inicio,
                "hora_fim": linha.hora_fim,
                "hora_intervalo_inicio": linha.hora_intervalo_inicio,
                "hora_intervalo_fim": linha.hora_intervalo_fim,
                "logado": linha.logado
            }
            print(dados)
            return jsonify(dados)
            
        else:
            return jsonify({"mensagem": "Nenhuma linha encontrada para o usuário 'jafalcao'"}), 404
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota para acessar os dados do usuário "jafalcao"
@app.route('/dados_usuarios_jafalcao')
def dados_usuarios_jafalcao():
    return obter_dados_jafalcao()

# Função para obter os dados do usuário "ipmiranda"
def obter_dados_ipmiranda():
    try:
        # Estabelecer a conexão com o banco de dados SQL Server
        data_connection = (
            "Driver={SQL Server};"
            "Server=192.168.4.10;"
            "Database=merger;"
            "UID=sa;"
            "PWD=etropus@147258;"
        )
        connection = pyodbc.connect(data_connection)
        print("Conexão bem sucedida!!!")
        
        # Criar um cursor para executar comandos SQL
        cursor = connection.cursor()

        # Executar uma consulta para obter os dados do usuário "ipmiranda"
        cursor.execute("SELECT id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado FROM usuariosRobo WHERE id = 2")

        # Obter a linha retornada pela consulta
        linha = cursor.fetchone()

        # Fechar a conexão
        connection.close()
        
        # Verificar se a linha foi encontrada
        if linha:
            # Converter a linha para um dicionário para que possa ser serializado para JSON
            dados = {
                "id": linha.id,
                "usuario": linha.usuario,
                "senha": linha.senha,
                "cartera": linha.cartera,
                "hora_inicio": linha.hora_inicio,
                "hora_fim": linha.hora_fim,
                "hora_intervalo_inicio": linha.hora_intervalo_inicio,
                "hora_intervalo_fim": linha.hora_intervalo_fim,
                "logado": linha.logado
            }
            print(dados)
            return jsonify(dados)
            
        else:
            return jsonify({"mensagem": "Nenhuma linha encontrada para o usuário 'ipmiranda'"}), 404
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota para acessar os dados do usuário "ipmiranda"
@app.route('/dados_usuarios_ipmiranda')
def dados_usuarios_ipmiranda():
    return obter_dados_ipmiranda()

# Inicie o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)
