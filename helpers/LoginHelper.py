from repositories.UserRepository import UserRepository


class LoginHelper:
    @staticmethod
    def find_token(request):
        code = 0
        message= {}
        if "Authorization" in request.headers:
            token = request.headers["Authorization"]
            code = 200
            user = UserRepository().get_by_token(token)
            if len(user) == 0:
                message = {
                           "message": "Authentication Token is missing!",
                           "data": None,
                           "error": "Unauthorized"
                       }
                code = 401
            else:
                message['token'] = token
                message['user'] = user[0]
        else:
            message =  {
                       "message": "Authentication Token is missing!",
                       "data": None,
                       "error": "Unauthorized"
                   }
            code = 401
        return message, code
