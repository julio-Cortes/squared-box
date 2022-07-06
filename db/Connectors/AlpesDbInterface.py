import os

from db.Connectors.DbInterface import DbInterface


class AlpesDbInterface(DbInterface):
    def __init__(self):
        super().__init__()
        self.conn = None
        self.cursor = None
        self.driver = os.getenv("DB_DRIVER")
        self.server = os.getenv("DB_SERVER")
        self.username = os.getenv("DB_USERNAME")
        self.password = os.getenv("DB_PASSWORD")
        self.db_name = os.getenv("DB_NAME_ALPES_CENTRAL")

    def close_connection(self):
        super(AlpesDbInterface, self).close_connection()

    def execute_query(self, query: str, returns: bool) -> [[]]:
        return super(AlpesDbInterface, self).execute_query(query, returns)

    def connect(self):
        super(AlpesDbInterface, self).connect()
