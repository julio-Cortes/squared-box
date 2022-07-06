import json

from flask import request

from db.DbConnector import DbConnector
from repositories.RegisterRepository import RegisterRepository
from flask_classful import FlaskView, route


class RegistersView(FlaskView):
    def __init__(self):
        self.register_repository = RegisterRepository()

    def get(self):
        args = request.args.to_dict()
        from_date, to_date = args['from'], args['to']
        is_sypra = args['is_sypra'] == "true"
        from_date = from_date.split("-")
        from_date_formatted = from_date[0] + "-" + from_date[2] + "-" + from_date[1]
        to_date = to_date.split("-")
        to_date_formatted = to_date[0] + "-" + to_date[2] + "-" + to_date[1]
        return self.register_repository.get_registers(from_date_formatted, to_date_formatted, is_sypra)
