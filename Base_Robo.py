import tkinter as tk
from tkinter import filedialog, ttk
import pandas as pd
import pyodbc

def selecionar_planilha():
    caminho_planilha = filedialog.askopenfilename(filetypes=[("Arquivos Excel", ".xlsx"), ("Todos os arquivos", ".*")])
    if caminho_planilha:
        carregar_planilha(caminho_planilha)

def carregar_planilha(caminho_planilha):
    try:
        # Atualizar a etiqueta para "Carregando base..." e iniciar a animação da barra de progresso
        lbl_status.config(text="Carregando base...")
        progress_bar.config(mode='determinate')  # Mudar o modo da barra de progresso para determinate
        progress_bar['value'] = 0  # Inicializar o valor da barra de progresso

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

        # Carregar a planilha para um DataFrame pandas
        df = pd.read_excel(caminho_planilha)

        # Criar um cursor para executar comandos SQL
        cursor = connection.cursor()

        total_linhas = len(df)
        linhas_processadas = 0

        # Iterar sobre as linhas do DataFrame e inserir cada uma na tabela
        for index, row in df.iterrows():
            agencia = row['agencia']
            cpf_cnpj = row['cpf_cnpj']
            cliente = row['cliente']
            operacao = row['operacao']
            data_evento = row['data_evento']
            cod_evento = row['cod_evento']

            # Verificar se o valor é nulo e substituir por '-'
            obs_evento = row['obs_evento']
            if pd.isnull(obs_evento):
                obs_evento = '-'

            # Verificar se o valor é nulo e substituir por NULL
            desc_evento = row['desc_evento']
            if pd.isnull(desc_evento):
                desc_evento = '-'  # Usar None para representar NULL no Python

            comando = "INSERT INTO BaseRobo (agencia, cpf_cnpj, cliente, operacao, data_evento, cod_evento, desc_evento, obs_evento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            cursor.execute(comando, (agencia, cpf_cnpj, cliente, operacao, data_evento, cod_evento, desc_evento, obs_evento))

            linhas_processadas += 1
            progresso = (linhas_processadas / total_linhas) * 100
            progress_bar['value'] = progresso

        # Confirmar as mudanças
        connection.commit()
        print("Tabela atualizada!!")

        # Fechar a conexão
        connection.close()

        # Atualizar a etiqueta para "Concluído"
        lbl_status.config(text="Concluído")

    except Exception as e:
        # Se ocorrer um erro, exibir a mensagem de erro na etiqueta
        lbl_status.config(text="Error: " + str(e))
        print("Error:", e)

# Criar a janela principal
root = tk.Tk()
root.title("Base Robo")

# Definir o tamanho da janela
largura = 600
altura = 400
largura_tela = root.winfo_screenwidth()
altura_tela = root.winfo_screenheight()
x = (largura_tela - largura) / 2
y = (altura_tela - altura) / 2
root.geometry(f"{largura}x{altura}+{int(x)}+{int(y)}")

# Criar um frame para conter o botão e a etiqueta de status
frame = ttk.Frame(root)
frame.place(relx=0.5, rely=0.5, anchor=tk.CENTER)

# Criar um botão para selecionar a planilha
btn_selecionar_planilha = ttk.Button(frame, text="Selecionar Planilha", command=selecionar_planilha)
btn_selecionar_planilha.pack()

# Criar uma etiqueta para exibir o status do carregamento
lbl_status = ttk.Label(frame, text="")
lbl_status.pack()

# Criar uma barra de progresso para indicar o progresso do carregamento
progress_bar = ttk.Progressbar(frame, mode='indeterminate')
progress_bar.pack()

# Iniciar o loop da interface gráfica
root.mainloop()
