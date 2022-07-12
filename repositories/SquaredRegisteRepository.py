from db.DbConnector import DbConnector


class SquaredRegistersRepository(object):
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(SquaredRegistersRepository, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.db_interface = DbConnector()

    def get_registers(self, is_sypra, date):
        query = '''
            SELECT * from sqb_cuadre where day(fecha_caja) and month(fecha_caja) and year(fecha_caja)={}
        '''
        if is_sypra:
            rows = self.db_interface.sypra_query(query, returnable=True)
        else:
            rows = self.db_interface.estrella_query(query, returnable=True)
        return rows
