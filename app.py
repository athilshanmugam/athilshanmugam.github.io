from flask import Flask, request, jsonify, send_from_directory
import os
from flask_cors import CORS

app = Flask(__name__, static_folder='.')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        # Here you would typically:
        # 1. Validate the data
        # 2. Send an email
        # 3. Store in database
        # For now, we'll just return success
        return jsonify({'message': 'Message received successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 