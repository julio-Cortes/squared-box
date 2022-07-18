from db.DbConnector import DbConnector
from models.SquaredRegister import SquaredRegister
from repositories.AppRepository import AppRepository


class SquaredRegisterRepository(AppRepository):

    def get(self, from_date, to_date, is_sypra):
        empresa = 1 if is_sypra else 2
        query = f'''
            SELECT local_id, numero_caja, vendedor_id, fecha_caja, empresa, total, efectivo_cuadre, efectivo_real,
              debito_cuadre, debito_real, credito_cuadre, credito_real ,estado, mlocal.nombre 
             from sqb_cuadre inner join mlocal on mlocal.id_local=sqb_cuadre.local_id
              where fecha_caja between CONVERT(datetime, '{from_date}',103) and CONVERT(datetime, '{to_date}',103) and empresa = {empresa}
          ;
        '''
        rows = self.db_interface.alpes_query(query, returnable=True)
        vendors = self.get_vendors()
        rows = [SquaredRegister(local_id=i[0], numero_caja=i[1],vendedor_id=i[2], fecha_caja=i[3], empresa_id=i[4],
                                total=i[5], efectivo_cuadre=i[6], efectivo_real=i[7], debito_cuadre=i[8],
                                debito_real=i[9], credito_cuadre=i[10],
                                credito_real=i[11],  estado=i[12], local_name=i[13]
                                , vendedor_name=vendors[i[2]] if i[2] in vendors else 'Vendedor no encontrado') for i in rows]
        return rows

    def add(self, squared_register: SquaredRegister):
        query = f'''
            insert into sqb_cuadre (local_id, numero_caja, vendedor_id, fecha_caja, empresa, total, efectivo_cuadre, 
            efectivo_real, debito_cuadre, debito_real, credito_cuadre, credito_real, estado)
            values ({squared_register.localId}, {squared_register.numeroCaja}, {squared_register.vendedorId}, 
            '{squared_register.fechaCaja}', {squared_register.empresaId}, {squared_register.total }, {squared_register.efectivoCuadre},
             {squared_register.efectivoReal}, {squared_register.debitoCuadre}, {squared_register.debitoReal}, {squared_register.creditoCuadre},
             {squared_register.creditoReal}, {squared_register.estado}) 
        '''
        rows_affected = self.db_interface.alpes_query(query, returnable=False)
        return rows_affected
