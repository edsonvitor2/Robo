from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import pyodbc
import datetime
from datetime import time

app = Flask(__name__)
CORS(app)  # Adiciona suporte a CORS à sua aplicação

# Estabelece conexão com o banco de dados SQL Server
data_connection = (
    "Driver={SQL Server};"
    "Server=192.168.4.10;"
    "Database=merger;"
    "UID=sa;"
    "PWD=etropus@147258;"
)

def obter_proximo_id():
    try:
        # Estabelece a conexão com o banco de dados
        connection = pyodbc.connect(data_connection)
        cursor = connection.cursor()

        # Executa a consulta para obter o número total de usuários
        cursor.execute("SELECT COUNT(*) FROM usuariosRobo")

        # Recupera o número total de usuários
        total_usuarios = cursor.fetchone()[0]

        # Incrementa o número total de usuários em 1 para obter o próximo ID disponível
        proximo_id = total_usuarios + 1


        return proximo_id
    except Exception as e:
        print("Erro ao obter próximo ID:", str(e))
        return None

# Função de inserção de dados atualizada para incluir novos parâmetros
def inserir_dados(usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado, tempoMedioAcionamento, acionamentos, tempo_logado):
    try:
        proximo_id = obter_proximo_id()

        if proximo_id is not None:
            connection = pyodbc.connect(data_connection)
            cursor = connection.cursor()

            cursor.execute("INSERT INTO usuariosRobo (id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado, tempoMedioAcionamento, acionamentos, tempo_logado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                           (proximo_id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado, tempoMedioAcionamento, acionamentos, tempo_logado))

            connection.commit()

            
            return True
        else:
            return False
    except Exception as e:
        print("Erro ao inserir dados:", str(e))
        return False

# Função de recebimento de dados atualizada para incluir novos parâmetros
@app.route('/receber_dados', methods=['POST'])
def receber_dados():
    data = request.get_json()
    usuario = data.get('usuario')
    senha = data.get('senha')
    cartera = data.get('cartera')
    hora_inicio = data.get('hora_inicio')
    hora_fim = data.get('hora_fim')
    hora_intervalo_inicio = data.get('hora_intervalo_inicio')
    hora_intervalo_fim = data.get('hora_intervalo_fim')
    logado = data.get('logado')
    tempoMedioAcionamento = data.get('tempoMedioAcionamento')
    acionamentos = data.get('acionamentos')
    tempo_logado = data.get('tempo_logado')

    if usuario and senha and cartera and hora_inicio and hora_fim and hora_intervalo_inicio and hora_intervalo_fim and logado is not None:
        if inserir_dados(usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado, tempoMedioAcionamento, acionamentos, tempo_logado):
            return jsonify({"mensagem": "Dados inseridos com sucesso!"}), 200
        else:
            return jsonify({"mensagem": "Erro ao inserir dados"}), 500
    else:
        return jsonify({"mensagem": "Dados incompletos"}), 400
    

@app.route('/editar_usuarios', methods=['POST'])
def editar_usuarios():
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
    tempoMedioAcionamento = data.get('tempoMedioAcionamento')

    # Cria uma conexão com o banco de dados
    conn = pyodbc.connect(data_connection)
    cursor = conn.cursor()

    # Atualiza os dados na linha correspondente ao ID
    cursor.execute("UPDATE usuariosRobo SET usuario=?, senha=?, cartera=?, hora_inicio=?, hora_fim=?, hora_intervalo_inicio=?, hora_intervalo_fim=?, logado=?, tempoMedioAcionamento=? WHERE id=?", (usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado, tempoMedioAcionamento,id))

    # Commit para salvar as alterações no banco de dados
    conn.commit()

    # Fecha a conexão com o banco de dados
    cursor.close()
    conn.close()

    return jsonify({'mensagem': 'Dados do usuário atualizados com sucesso'})

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
                "logado": linha.logado,
                "tempo_logado": linha.tempo_logado
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


def obter_dados_usuarios():
    try:
        connection = pyodbc.connect(data_connection)
        print("Conexão bem sucedida!!!")
        
        cursor = connection.cursor()

        # Executar uma consulta para obter todos os usuários
        cursor.execute("SELECT id, usuario, senha, cartera, hora_inicio, hora_fim, hora_intervalo_inicio, hora_intervalo_fim, logado , tempoMedioAcionamento, tempo_logado FROM usuariosRobo")

        # Obter todas as linhas retornadas pela consulta
        linhas = cursor.fetchall()

        dados_usuarios = []

        # Processar cada linha e adicionar os dados do usuário a uma lista
        for linha in linhas:
            dados = {
                "id": linha.id,
                "usuario": linha.usuario,
                "senha": linha.senha,
                "cartera": linha.cartera,
                "hora_inicio": linha.hora_inicio[:8],  # Extrair os primeiros 8 caracteres para obter o formato "00:00:00"
                "hora_fim": linha.hora_fim[:8],        # Extrair os primeiros 8 caracteres para obter o formato "00:00:00"
                "hora_intervalo_inicio": linha.hora_intervalo_inicio[:8],  # Extrair os primeiros 8 caracteres para obter o formato "00:00:00"
                "hora_intervalo_fim": linha.hora_intervalo_fim[:8],        # Extrair os primeiros 8 caracteres para obter o formato "00:00:00"
                "logado": linha.logado,
                "tempo_medio_acionamento": linha.tempoMedioAcionamento[:8],
                "tempo_logado": linha.tempo_logado[:8]
            }
            dados_usuarios.append(dados)

        print(dados_usuarios)
        return jsonify(dados_usuarios)
            
    except Exception as e:
        return jsonify({"erro": str(e)}), 500


# Rota para acessar os dados de todos os usuários
@app.route('/dados_usuarios')
def dados_usuarios():
    return obter_dados_usuarios()

def obter_dados_base_robo():
    try:
        connection = pyodbc.connect(data_connection)
        print("Conexão bem sucedida!!!")
        
        cursor = connection.cursor()

        # Executar uma consulta para obter todos os dados da tabela baseRobo
        cursor.execute("SELECT agencia, cpf_cnpj, cliente, operacao, data_evento, cod_evento, desc_evento, obs_evento FROM baseRobo")

        # Obter todas as linhas retornadas pela consulta
        linhas = cursor.fetchall()

        dados_base_robo = []

        # Processar cada linha e adicionar os dados à lista
        for linha in linhas:
            # Converte a string de data_evento para um objeto datetime
            data_evento = datetime.datetime.strptime(linha.data_evento, "%Y-%m-%d")

            # Adiciona os dados à lista
            dados = {
                "agencia": linha.agencia,
                "cpf_cnpj": linha.cpf_cnpj,
                "cliente": linha.cliente,
                "operacao": linha.operacao,
                "data_evento": data_evento.strftime("%Y-%m-%d"),  # Ajuste para o formato correto
                "cod_evento": linha.cod_evento,
                "desc_evento": linha.desc_evento,
                "obs_evento": linha.obs_evento
            }
            dados_base_robo.append(dados)

        print(dados_base_robo)
        return jsonify(dados_base_robo)
            
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota para acessar os dados da tabela baseRobo
@app.route('/dados_base_robo')
def dados_base_robo():
    return obter_dados_base_robo()


# Inicia o servidor Flask
if __name__ == '__main__':
    app.run(debug=True)