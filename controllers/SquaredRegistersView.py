import json

from flask import request
from flask_classful import FlaskView, route

from models.SquaredRegister import SquaredRegister
from repositories.SquaredRegisterRepository import SquaredRegisterRepository


class SquaredRegistersView(FlaskView):
    def __init__(self):
        self.squared_register_repository = SquaredRegisterRepository()

    def get(self):
        args = request.args.to_dict()
        from_date = args['from']
        from_separated = from_date.split('-')
        from_date = from_separated[0] + "-" + from_separated[2] + "-" + from_separated[1]
        to_date = args['to']
        to_separated = to_date.split('-')
        to_date = to_separated[0] + "-" + to_separated[2] + "-" + to_separated[1]
        is_sypra = args['is_sypra'] == "true"
        squared_registers = self.squared_register_repository.get(from_date, to_date, is_sypra)
        squared_registers = [i.cast_to_json() for i in squared_registers]
        return json.dumps(squared_registers)

    #TODO :Nulos
    @route("/", methods=["POST"])
    def post(self, slug=None):
        empresa = 1 if request.get_json()['is_sypra']==True else 2
        squared_register = request.get_json()['squared_register']
        fecha = squared_register['fechaCaja'].split("-")
        fecha_formatted = fecha[2] + "-" + fecha[1] +"-" + fecha[0]
        squared_register_model = SquaredRegister(local_id=squared_register['localId'],
                                                 local_name=squared_register['localName'],
                                                 numero_caja=squared_register['numeroCaja'],
                                                 vendedor_id=squared_register['vendedorId'],
                                                 vendedor_name=squared_register['vendedorName'],
                                                 fecha_caja=fecha_formatted,
                                                 empresa_id=empresa,
                                                 efectivo_real=squared_register['efectivoReal'],
                                                 cigarros_real=squared_register['cigarrosReal'],
                                                 debito_real=squared_register['debitoReal'],
                                                 credito_real=squared_register['debitoCuadre'],
                                                 estado=1,
                                                 efectivo_cuadre=squared_register['efectivoCuadre'],
                                                 cigarros_cuadre=squared_register['cigarrosCuadre'],
                                                 debito_cuadre=squared_register['debitoCuadre'],
                                                 credito_cuadre=squared_register['creditoCuadre']
                                                 )

        rows_affected = self.squared_register_repository.add(squared_register_model)
        if rows_affected == 1:
            return {'message': "Creacion exitosa"},200
        else:
            return {'message': "Creacion fallida"},500



