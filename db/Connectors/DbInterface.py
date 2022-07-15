import pyodbc
from dotenv import load_dotenv


class DbInterface:
    def __init__(self):
        load_dotenv()
        self.cursor = None
        self.conn = None
        self.db_name = None
        self.password = None
        self.username = None
        self.driver = None
        self.server = None

    def connect(self):
        connection_string = f'DRIVER={self.driver};server={self.server};UID={self.username};PWD={self.password};Database={self.db_name}; '
        self.conn = pyodbc.connect(connection_string)
        self.cursor = self.conn.cursor()

    def close_connection(self):
        self.cursor.close()
        self.conn.close()

    def execute_query(self, query: str, returns: bool):
        self.connect()
        print(f"Executed Query:{query}")
        affected_rows = self.cursor.execute(query)
        rows = affected_rows.rowcount
        if returns:
            try:
                rows = self.cursor.fetchall()
            except pyodbc.ProgrammingError:
                rows=[[]]
        else:
            self.conn.commit()
        self.close_connection()

        return rows
