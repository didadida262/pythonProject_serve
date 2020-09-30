# -*- coding: utf-8 -*-
from flask import Flask,jsonify,request,current_app
from flask_cors import CORS,cross_origin
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
import json


app = Flask(__name__)

@app.route('/')
def jsonp():
    name = request.args.get('callback','')
    print(name)
    resp_data = {
        "username": "hhvcg",
        "theme": "dark",
    }
    return name + '(' + json.dumps(resp_data, ensure_ascii=False) + ')'

# 首页格言
@app.route('/word', methods= ["GET"])
def test():
    res = {
        "data": "百般乐器，唢呐为王，不是升天，就是拜堂"
    }
    return json.dumps(res, ensure_ascii=False)

@app.route('/signIn',methods= ["POST"])
def login():
    # username = request.values.get('username')
    # password = request.form['password']
    # data = request.get_data()
    # data = json.loads(data)
    username = request.json.get('username')
    password = request.json.get('password')
    res = {
        "username": username,
        "password": password
    }

    # s = Serializer(current_app.config["SECRET_KEY"],expires_in=3600)
    # token = s.dumps({"id":data['username']}).decode("ascii")
    # return token
    return json.dumps(res, ensure_ascii=False)


CORS(app)
app.run()