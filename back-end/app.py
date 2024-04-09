from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
import datetime
import bcrypt

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://alinox360:carpoolbuddy123@cluster0.q1ris70.mongodb.net/Login?retryWrites=true&w=majority&appName=Cluster0&ssl=true"
mongo = PyMongo(app)
CORS(app, resources={r"/*": {"origins": "exp://10.40.163.212:8083"}})


#this is for creating the account from the registration page
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Validate registration data (e.g., check for unique username or email)

    # Hash the password before storing it in the database
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Store user data in MongoDB Atlas
    users_collection = mongo.db.users
    user_data = {
        'username': username,
        'email': email,
        'password': hashed_password
    }
    users_collection.insert_one(user_data)

    return jsonify({'success': True, 'message': 'User registered successfully'})


#this is for actually logging in
@app.route('/login', methods=['POST'])
def login():
    try:
        print('Received login request...')
        if not mongo.cx:
            return jsonify({'success': False, 'error': 'Failed to connect to MongoDB'}), 500
        
        # Parse JSON request data
        data = request.json
        print('Received data:', data)

        # Extract email and password from the request data
        email = data.get('email')
        password = data.get('password')
        print('Email:', email)
        print('Password:', password)

        
        if email == '1' and password == '1':
            print('Login successful')
            mongo.db.logindata.insert_one({'email': email, 'timestamp': datetime.datetime.now()})
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            print('Invalid credentials')
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    except Exception as e:
        print('An error occurred:', e)
        return jsonify({'success': False, 'error': str(e)}), 500
    
   

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)