from flask import request
from flask_classful import FlaskView, route

from repositories.SquaredRegisteRepository import SquaredRegistersRepository


class SquaredRegistersView(FlaskView):
    def __init__(self):
        self.register_repository = SquaredRegistersRepository()

    def get(self):
        pass

    @route("/", methods=["POST"])
    def post(self, slug=None):
        print(request)
        print(slug)

    def get_in_progress(self):
        pass

