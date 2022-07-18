import os

import jwt
from flask import request, current_app

from db.DbConnector import DbConnector
from models.User import User
from repositories.AppRepository import AppRepository


def generate_jwt(user):
    return (jwt.encode(
        {"user_id": user.id},
        os.getenv("SECRET_KEY"),
        algorithm="HS256"
    )).decode('UTF-8')



class UserRepository(AppRepository):


    def get(self, email: str, password: str):
        query = f'''
        SELECT id, email, password, role_id from sqb_users where email='{email}' and password='{password}';
        '''
        row = self.db_interface.alpes_query(query, returnable=True)
        l = []
        if row:
            id = row[0][0]
            email = row[0][1]
            password = row[0][2]
            role_id = row[0][3]
            l.append(User(id, email, password, role_id))
        return l

    def get_by_id(self, id):
        query = f'''
        SELECT id, email, password, role_id from sqb_users where id = {id};
        '''
        row = self.db_interface.alpes_query(query, returnable=True)
        l = []
        if row:
            id = row[0][0]
            email = row[0][1]
            password = row[0][2]
            role_id = row[0][3]
            l.append(User(id, email, password, role_id))
        return l

    def get_by_token(self, token):
        token = token.encode('UTF-8')
        data = jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
        current_user = self.get_by_id(data["user_id"])[0]
        return current_user

