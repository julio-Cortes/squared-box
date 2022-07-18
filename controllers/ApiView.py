from flask import json
from flask_classful import FlaskView, route

from repositories.AppRepository import AppRepository


class ApiView(FlaskView):
    def __init__(self):
        self.app_repository = AppRepository()

    @route("/sub_means/", methods=["GET"])
    def get_sub_means(self):
        return json.dumps(self.app_repository.get_sub_means())
