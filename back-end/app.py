from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
#app.config["MONGO_URI"] = "mongodb+srv://alinox360:carpoolbuddy123@cluster0.q1ris70.mongodb.net/Logindata.login?retryWrites=true&w=majority&appName=Cluster0"
#mongo = PyMongo(app)
CORS(app, resources={r"/*": {"origins": "exp://10.40.174.182:8081"}})


@app.route('/login', methods=['POST'])
def login():
   # mongo.db.inventory.insert_one({"a":1})
    try:
        print('Received login request...')
        # Parse JSON request data
        data = request.json
        print('Received data:', data)

        # Extract email and password from the request data
        email = data.get('email')
        password = data.get('password')
        print('Email:', email)
        print('Password:', password)

        # Perform authentication (dummy example)
        # Replace this with your actual authentication logic
        if email == 'example@example.com' and password == 'password':
            print('Login successful')
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            print('Invalid credentials')
            return jsonify({'success': False, 'error': 'Invalid credentials'}), 401
    except Exception as e:
        print('An error occurred:', e)
        return jsonify({'success': False, 'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
