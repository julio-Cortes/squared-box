import os

from dotenv import load_dotenv
from flask import Flask, request, jsonify, make_response, url_for, send_from_directory

from controllers.RegistersView import RegistersView
from controllers.UsersView import UsersView
from flask_cors import CORS


load_dotenv()
app = Flask(__name__, static_url_path='', static_folder="frontend/out")
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
CORS(app)
user_controller = UsersView()
wsgi_app = app.wsgi_app
register_controller = RegistersView()
register_controller.register(app)
user_controller.register(app)


@app.route('/api')
def Welcome():
    return "Welcome to the API!!!"


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    print(app.url_map)
    app.run()
