from flask import Flask, request, jsonify, json
import os
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pymongo
import datetime
from gridfs import GridFS
import pprint

 
app = Flask(__name__)
CORS(app, supports_credentials=True)


 
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 *1024
 
ALLOWED_EXTENSIONS = {'mp4'}

def db_connect():
    print("welocome to pymongo")
    client = pymongo.MongoClient("mongodb://localhost:27017")
    print(client)
    db = client['bhasha-ai']
    return db


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
  
@app.route("/")
def hello_world():
    return "Hello, World!"
 
@app.route('/upload', methods=['POST'])
def upload_file():
    # check if the post request has the file part
    name = request.form["name"]
    source = request.form["source"]
    destination = request.form["destination"]
    gender = request.form["gender"]
    
    db = db_connect()
    dubs = db["dubbing"]
    fs = GridFS(db)
    
    dub = {
        "name": name,
        "source": source,
        "destination": destination,
        "gender" : gender,
        "date" : datetime.datetime.now(tz=datetime.timezone.utc),
    }
    
    print(name, source, destination, gender)
    
    if 'files[]' not in request.files:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    files = request.files.getlist('files[]')
      
    errors = {}
    success = False
      
    for file in files:      
        if file and allowed_file(file.filename):
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            resp = jsonify({
                "message": 'File type is not allowed',
                "status": 'failed'
            })
            return resp
         
    if success and errors:
        errors['message'] = 'File(s) successfully uploaded'
        errors['status'] = 'failed'
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
    if success:
        try:
            file_id = fs.put(file, filename=file.filename)
            dub["fileId"] = str(file_id)
            print(file_id)
            result = dubs.insert_one(dub)
            dub_id = str(result.inserted_id)

            # Send email to user with download
            
        except:
            print("file not inserted")
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'successs',
            "data_id": dub_id
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp
     
@app.route('/video',methods =['GET'])
def images():
    db = db_connect()
    dubs = db["dubbing"]
    video = dubs.find_one()
    print(video)
    
    
    return jsonify(video)
    
if __name__ == "__main__":
    app.run(port=5001, debug=True)