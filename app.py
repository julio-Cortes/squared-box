from flask import Flask, request, jsonify, make_response, url_for

from controllers.RegistersView import RegistersView
from controllers.UsersView import UsersView
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
user_controller = UsersView()

register_controller = RegistersView()
register_controller.register(app)
user_controller.register(app)





if __name__ == '__main__':
    print(app.url_map)
    app.run()
