from db.DbConnector import DbConnector


class AppRepository(object):
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(AppRepository, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.db_interface = DbConnector()

    def get_vendors(self):
        query = f'''
           select id_vendedor, nombre from mvendedores;
           '''
        rows = self.db_interface.alpes_query(query, returnable=True)
        if rows is not None:
            vendors = {}
            for row in rows:
                if len(row) > 0:
                    vendors[row[0]] = row[1]
            return vendors
        return {}

    def get_sub_means(self):
        query = f'''
        select id_sub_medio,nombre from sub_medios_pago; 
        '''
        rows = self.db_interface.alpes_query(query, returnable=True)
        sub_means = []
        if rows is not None:
            for item in rows:
                if len(item) > 0 :
                    sub_means.append({
                        'id':item[0],
                        'name': item[1]
                    })

        return sub_means