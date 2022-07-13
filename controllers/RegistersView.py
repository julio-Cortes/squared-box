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
        from_date=args['from']
        from_separated  =from_date.split('-')
        from_date = from_separated[0]+"-"+from_separated[2]+"-"+from_separated[1]
        to_date=args['to']
        to_separated  =to_date.split('-')
        to_date = to_separated[0]+"-"+to_separated[2]+"-"+to_separated[1]
        is_sypra = args['is_sypra'] == "true"
        return self.register_repository.get_registers(from_date, to_date, is_sypra)

    def get_in_progress(self):
        args = request.args.to_dict()
        date = args['date']
        is_sypra = args['is_sypra'] == "true"
        date = date.split("-")
        day, month, year = date[2], date[1], date[0]
        return self.register_repository.get_registers(day, month, year, is_sypra)
