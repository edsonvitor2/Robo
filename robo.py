from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)  # Adiciona suporte a CORS à sua aplicação

# Estabelece conexão com o banco de dados SQL Server
data_connection = (
    "Driver={SQL Server};"
    "Server=DESKTOP-71U6D3E;"
    "Database=merger;"
    "UID=sa;"
    "PWD=edson1234;"
)

def inserir_dados(id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado):
    try:
        connection = pyodbc.connect(data_connection)
        cursor = connection.cursor()

        print("Valores a serem inseridos:")
        print("id:", id)
        print("usuario:", usuario)
        print("senha:", senha)
        print("cartera:", cartera)
        print("hora_inicio:", hora_inicio)
        print("hora_fim:", hora_fim)
        print("hora_intervalo_inicio:", hora_intervalo_inicio)
        print("hora_intervalo_fim:", hora_intervalo_fim)
        print("logado:", logado)

        # Executa a inserção dos dados na tabela
        cursor.execute("INSERT INTO usuariosRobo (id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                       (id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado))
        
        connection.commit()
        connection.close()
        return True
    except Exception as e:
        print("Erro ao inserir dados:", str(e))
        return False


@app.route('/receber_dados', methods=['POST'])
def receber_dados():
    data = request.get_json()
    id = data.get('id')
    usuario = data.get('usuario')
    senha = data.get('senha')
    cartera = data.get('cartera')
    hora_inicio = data.get('hora_inicio')
    hora_fim = data.get('hora_fim')
    hora_intervalo_inicio = data.get('hora_intervalo_inicio')
    hora_intervalo_fim = data.get('hora_intervalo_fim')
    logado = data.get('logado')

    # Verifica se todos os campos necessários foram recebidos
    if id and usuario and senha and cartera and hora_inicio and hora_fim and hora_intervalo_inicio and hora_intervalo_fim and logado is not None:
        # Chama a função inserir_dados com todos os argumentos necessários
        if inserir_dados(id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado):
            return jsonify({"mensagem": "Dados inseridos com sucesso!"}), 200
        else:
            return jsonify({"mensagem": "Erro ao inserir dados"}), 500
    else:
        return jsonify({"mensagem": "Dados incompletos"}), 400

# Função para obter os dados do usuário "jafalcao"
def obter_dados_jafalcao():
    try:
        
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

# Inicia o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)