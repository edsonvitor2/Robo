import tkinter as tk
from tkinter import filedialog
import pandas as pd
import pyodbc

def selecionar_planilha():
    caminho_planilha = filedialog.askopenfilename(filetypes=[("Arquivos Excel", ".xlsx"), ("Todos os arquivos", ".*")])
    if caminho_planilha:
        carregar_planilha(caminho_planilha)

def carregar_planilha(caminho_planilha):
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
    
    # Carregar a planilha para um DataFrame pandas
    df = pd.read_excel(caminho_planilha)

    # Criar um cursor para executar comandos SQL
    cursor = connection.cursor()

    # Apagar os dados existentes da tabela
    cursor.execute("DELETE FROM BaseRobo")

    # Iterar sobre as linhas do DataFrame e inserir cada uma na tabela
    for index, row in df.iterrows():
        agencia = row['agencia']
        cpf_Cnpj = row['cpf_Cnpj']
        cliente = row['cliente']
        operacao = row['operacao']
        data_evento = row['data_evento']
        Cod_evento = row['Cod_evento']
        
        # Verificar se o valor é nulo e substituir por '-'
        Obs_Evento = row['Obs_Evento']
        if pd.isnull(Obs_Evento):
            Obs_Evento = '-'
        
        # Verificar se o valor é nulo e substituir por NULL
        Desc_Evento = row['Desc_Evento']
        if pd.isnull(Desc_Evento):
            Desc_Evento = None  # Usar None para representar NULL no Python

        comando = "INSERT INTO BaseRobo (agencia, cpf_Cnpj, cliente, operacao, data_evento, Cod_evento, Desc_Evento, Obs_Evento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        cursor.execute(comando, agencia, cpf_Cnpj, cliente, operacao, data_evento, Cod_evento, Desc_Evento, Obs_Evento)

    # Confirmar as mudanças
    connection.commit()
    print("Tabela atualizada!!")

    # Fechar a conexão
    connection.close()

# Criar a janela principal
root = tk.Tk()
root.title("Selecionar Planilha")

# Botão para selecionar a planilha
btn_selecionar_planilha = tk.Button(root, text="Selecionar Planilha", command=selecionar_planilha)
btn_selecionar_planilha.pack(pady=20)

# Iniciar o loop da interface gráfica
root.mainloop()