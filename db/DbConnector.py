from dotenv import load_dotenv
from db.Connectors.AlpesDbInterface import AlpesDbInterface
from db.Connectors.EstrellaDbInterface import EstrellaDbInterface
from db.Connectors.SypraDbInterface import SypraDbInterface




class DbConnector(object):
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(DbConnector, cls).__new__(cls)
        return cls.instance
    
    def __init__(self):
        self.alpes_interface = AlpesDbInterface()
        self.estrella_interface = EstrellaDbInterface()
        self.sypra_interface = SypraDbInterface()

    def alpes_query(self, query, returnable):
        return self.alpes_interface.execute_query(query,returnable)

    def estrella_query(self, query, returnable):
        return self.estrella_interface.execute_query(query, returnable)

    def sypra_query(self, query, returnable):
        return self.sypra_interface.execute_query(query, returnable)