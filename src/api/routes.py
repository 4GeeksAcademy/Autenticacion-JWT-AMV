from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)
CORS(api)


@api.route('/hello', methods=['GET'])
def say_hello():
    return jsonify({"message": "¡Conexión exitosa! El Backend y Frontend están hablando."}), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 201


@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=str(user.id))
    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"msg": f"Welcome back {user.email}!", "user": user.serialize()}), 200
