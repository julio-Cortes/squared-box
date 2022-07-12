from flask import request, make_response, jsonify

from db.DbConnector import DbConnector
from helpers.LoginHelper import LoginHelper
from models.User import User
from flask_classful import FlaskView, route

from repositories.UserRepository import UserRepository, generate_jwt


class UsersView(FlaskView):
    def __init__(self):
        self.db_interface = DbConnector()
        self.user_repository = UserRepository()

    @route("/login", methods=["POST"])
    def login(self):
        email = request.get_json()['email']
        password = request.get_json()['password']
        user = self.user_repository.get(email, password)
        if len(user) == 1:
            jwt = generate_jwt(user[0])

            response = make_response(jsonify(
                token=jwt,
                message="Successful login",
                role=user[0].role_id
            ), 200)
            del user[0]
        else:
            response = make_response(jsonify(
                message="Invalid Credentials"
            ), 401)

        return response

    def get_role(self):
        return LoginHelper.find_token(request)
