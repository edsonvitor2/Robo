import pyodbc

def obter_dados():
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

    # Executar uma consulta para obter os dados da linha com id 2 da tabela usuariosRobo
    cursor.execute("SELECT * FROM usuariosRobo WHERE id = 2")

    # Obter a linha retornada pela consulta
    linha = cursor.fetchone()

    # Imprimir os dados
    print(linha)

    # Fechar a conexão
    connection.close()

def editar():
    # Estabelecer a conexão com o banco de dados SQL Server
    data_connection=(
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

    # Nova senha a ser atribuída
    new_password = "Trocar@2070"

    # Executar uma consulta para editar a senha do id 1
    cursor.execute("UPDATE usuariosRobo SET senha = ? WHERE id = 1", new_password)
    
    # Confirmar as mudanças
    connection.commit()
    print("Senha do id 1 atualizada!")

    # Fechar a conexão
    connection.close()

def inserir(id, usuario, senha, cartera, hora_inicio,hora_fim,hora_intervalo_inicio,hora_intervalo_fim,logado):
    # Estabelecer a conexão com o banco de dados SQL Server
    data_connection=(
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

    # Executar uma instrução SQL para inserir um novo usuário na tabela usuariosRobo
    cursor.execute("INSERT INTO usuariosRobo (id, usuario, senha, cartera, hora_inicio,hora_fim,hora_intervalo_inicio,hora_intervalo_fim,logado) VALUES (?, ?, ?,?, ?, ?,?, ?, ?)", (id, usuario, senha, cartera, hora_inicio,hora_fim,hora_intervalo_inicio,hora_intervalo_fim,logado))
    
    # Confirmar as mudanças
    connection.commit()
    print("Novo usuário inserido!")

    # Fechar a conexão
    connection.close()
