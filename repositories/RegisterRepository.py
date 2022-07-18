import json

from db.DbConnector import DbConnector
from repositories.AppRepository import AppRepository


class RegisterRepository(AppRepository):

    def get(self, from_date, to_date, is_sypra):
        vendors = self.get_vendors()
        query = f'''

        SELECT mlocal.id_local, tipo_doc,id_vendedor,nro_caja,Convert(date, fecha) as fecha,
               SUM(pago_efectivo - vuelto) as efectivo, SUM(pago_cheque) as pago_cheque, SUM(pago_t_debito) as t_debito,
               SUM(pago_t_credito) as t_credito,       SUM(pago_t_propia) as t_propia, SUM(pago_cupon) as pago_cupon,
               SUM(total_boleta) as total,
               sub_medio, sub_medio2, sub_medio3, sub_medio4,
               SUM(monto_sub_medio) as sb_1, SUM(monto_sub_medio2) as sb_2, SUM(monto_sub_medio3) as sb_3, SUM(monto_sub_medio4) as sb_4,
               mlocal.nombre
        from ventas_boleta_cabecera inner join mlocal on mlocal.id_local=ventas_boleta_cabecera.id_local
        where fecha between '{from_date}' and '{to_date}' group by mlocal.nombre,id_vendedor,nro_caja, tipo_doc,Convert(date, fecha),
                                          mlocal.id_local, sub_medio4, sub_medio3, sub_medio2, sub_medio ;

                '''
        if is_sypra:
            rows = self.db_interface.sypra_query(query, returnable=True)
        else:
            rows = self.db_interface.estrella_query(query, returnable=True)
        return self.process_register_rows(rows, vendors)

    def process_register_rows(self, rows, vendors):
        if rows is not None:
            registers = []
            for row in rows:
                if len(row) > 0:
                    id = f'{row[0]}-{row[2]}-{row[3]}-{row[4]}'
                    found_dict = list(filter(lambda register: register['id'] == id, registers))
                    splited_date = row[4].split("-")
                    row[4] = splited_date[2] + "-" + splited_date[1] + "-" + splited_date[0]
                    if len(found_dict) == 0:
                        registers.append({
                            'id': id,
                            'localId':row[0],
                            'vendedorName': vendors[row[2]] if row[2] in vendors else 'Vendedor no encontrado',
                            'vendedorId': row[2],
                            'numeroCaja': row[3],
                            'fecha': row[4],
                            'Boleta': {
                                'efectivo': 0,
                                'pagoCheque': 0,
                                'tarjetaDebito': 0,
                                'tarjetaCredito': 0,
                                'tarjetaPropia': 0,
                                'total': 0,
                            },
                            'Factura': {
                                'efectivo': 0,
                                'pagoCheque': 0,
                                'tarjetaDebito': 0,
                                'tarjetaCredito': 0,
                                'tarjetaPropia': 0,
                                'total': 0,
                            },
                            'Cigarro': {
                                'efectivo': 0,
                                'pagoCheque': 0,
                                'tarjetaDebito': 0,
                                'tarjetaCredito': 0,
                                'tarjetaPropia': 0,
                                'total': 0,
                            },
                            'Cupon': {
                                'pago_cupon': 0,
                                'total': 0,
                                'sub_medio': 0,
                                'sub_medio2': 0,
                                'sub_medio3': 0,
                                'sub_medio4': 0,
                                'sb_1': 0,
                                'sb_2': 0,
                                'sb_3': 0,
                                'sb_4': 0
                            },
                            "localName": row[-1]

                        })
                        found_dict = list(filter(lambda register: register['id'] == id, registers))
                    if row[1] == 2:
                        self.map_cupon(row, found_dict[0])
                    else:
                        self.map_normal(row, found_dict[0])
            registers = (sorted(registers, key=lambda d: d['localName']))
            return registers

        return []

    def map_normal(self, row, found_dict):
        tipo = 'Boleta'
        if row[1] == 1:
            tipo = 'Factura'
        elif row[1] == 3:
            tipo = 'Cigarro'
        found_dict[tipo] = {
            'efectivo': row[5],
            'pagoCheque': row[6],
            'tarjetaDebito': row[7],
            'tarjetaCredito': row[8],
            'tarjetaPropia': row[9],
            'total': row[11],
        }
        return found_dict

    def map_cupon(self, row, found_dict):
        found_dict['Cupon'] = {
            'pago_cupon': row[10],
            'total': row[10],
            'sub_medio': row[12],
            'sub_medio2': row[13],
            'sub_medio3': row[14],
            'sub_medio4': row[15],
            'sb_1': row[16],
            'sb_2': row[17],
            'sb_3': row[18],
            'sb_4': row[19],
        }
        return found_dict
