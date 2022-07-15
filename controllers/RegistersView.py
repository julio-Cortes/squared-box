import json

from flask import request

from db.DbConnector import DbConnector
from models.SquaredRegister import SquaredRegister
from repositories.RegisterRepository import RegisterRepository
from flask_classful import FlaskView, route

from repositories.SquaredRegisterRepository import SquaredRegisterRepository


def reformat_datetime_dd_mm_yyyy_to_yyyy_mm_dd(date):
    date = date.split('-')
    return f'{date[2]}-{date[1]}-{date[0]}'

def clean_registers(registers, squared_registers):
    returnable = []
    for t in registers:
        add = True
        for m in squared_registers:
            if areEqual(t, m):
                add = False
                break
        if add:
            returnable.append(t)
    return returnable


def areEqual(register, squared_register: SquaredRegister):
    return (register['localId'] == squared_register.localId
                and register['vendedorId'] == squared_register.vendedorId
                and register['numeroCaja'] == squared_register.numeroCaja
                and reformat_datetime_dd_mm_yyyy_to_yyyy_mm_dd(register['fecha'])
                == squared_register.fechaCaja)


class RegistersView(FlaskView):
    def __init__(self):
        self.register_repository = RegisterRepository()
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
        registers = self.register_repository.get(from_date, to_date, is_sypra)
        squared_registers = self.squared_register_repository.get(from_date, to_date, is_sypra)
        registers = clean_registers(registers, squared_registers)
        return json.dumps(registers)
