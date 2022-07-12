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
        date = args['date']
        is_sypra = args['is_sypra'] == "true"
        date = date.split("-")
        day, month, year = date[2], date[1], date[0]
        return self.register_repository.get_registers(day, month, year, is_sypra)

    def get_in_progress(self):
        args = request.args.to_dict()
        date = args['date']
        is_sypra = args['is_sypra'] == "true"
        date = date.split("-")
        day, month, year = date[2], date[1], date[0]
        return self.register_repository.get_registers(day, month, year, is_sypra)
