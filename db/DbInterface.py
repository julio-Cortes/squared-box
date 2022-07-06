from dotenv import load_dotenv
import os
import pyodbc
load_dotenv()


class DbInterface:
    def __init__(self):
        self.conn = None
        self.cursor = None
        self.driver = os.getenv("DB_DRIVER")
        self.server= os.getenv("DB_SERVER")
        self.username = os.getenv("DB_USERNAME")
        self.password = os.getenv("DB_PASSWORD")
        self.database = os.getenv("DB_NAME")
        self.connect()

    def connect(self):
        connection_string = f'DRIVER={self.driver};server={self.server};UID={self.username};PWD={self.password};Database={self.database};'
        self.conn = pyodbc.connect(connection_string)
        self.cursor = self.conn.cursor()

    def close_connection(self):
        self.cursor.close()
        self.conn.close()

    def execute(self, query, is_select):
        self.cursor.execute(query)
        if is_select:
            rows = self.cursor.fetchall()
            return rows
        return None

    def get_ventas_boleta_cabecera(self):
        query = '''select from dbo.ventas_boleta_cabecera;'''
        is_select = True
        rows = self.execute(query, is_select)
        return rows

    def get_user(self, email, password):
        query = f"SELECT id from dbo.sq_users where email='{email}' and password='{password}'"
        is_select = True
        rows = self.execute(query, is_select)
        return rows


