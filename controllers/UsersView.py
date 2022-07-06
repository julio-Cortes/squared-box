from flask import request, make_response, jsonify

from db.DbConnector import DbConnector
from models.User import User
from flask_classful import FlaskView,route

class UsersView(FlaskView):
    def __init__(self):
        self.db_interface = DbConnector()

    @route("/login",  methods=["POST"])
    def login(self, email, password):
        email = request.form['email']
        password = request.form['password']
        user = self.db_interface.get_user(email, password)
        if len(user) != 0:
            logged_user = User(email, password)
            jwt = self.generate_jwt(logged_user)
            response = make_response(jsonify(
                token=jwt,
                message="Successful login"
            ), 200)
        else:
            response = make_response(jsonify(
                message="Invalid Credentials"
            ), 200)
        return response


    def generate_jwt(self, user):
        return 0

    def check_jwt(self, jwt):
        pass