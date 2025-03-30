from flask import Flask, request, jsonify, send_file
import os
import pprint
from flask_cors import CORS
import pymongo
import datetime
from gridfs import GridFS
from moviepy.editor import VideoFileClip, AudioFileClip
import googletrans
import gtts
import speech_recognition
from pytube import YouTube
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders


 
app = Flask(__name__)
CORS(app, supports_credentials=True)

# Directories Configuration
OUTPUT_VIDEO_DIR = 'dubbed\\final'
UPLOAD_FOLDER = 'static\\uploads'
OUTPUT_SUBTITLE_DIR = 'subtitles\\final'

app.config['DOWNLOAD_SUBTITLE'] = OUTPUT_SUBTITLE_DIR
app.config['DOWNLOAD_FOLDER'] = OUTPUT_VIDEO_DIR
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024 
ALLOWED_EXTENSIONS = {'mp4'}

# Email Configuration


sender_email = "bhashaai.in@gmail.com"
password = 'jrusjhgsyngbxaix'
smtp_server = 'smtp.gmail.com'
smtp_port = 587  # or 465 for SSL
email_subject = "File Dubbed Successfully"
email_body = "The file has been dubbed successfully and is attached to this email."



# Database Connectivity 
def db_connect():
    print("welcome to pymongo")
    client = pymongo.MongoClient("mongodb://localhost:27017")
    print(client)
    db = client['bhasha-ai']
    return db



# Support Functions 
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


"""
/***********************************************

Email Sending Functions

***********************************************/
"""

def send_email_with_attachment(sender_email, password, smtp_server, smtp_port, subject, body, file_path):
    db = db_connect()
    user = db['users']
    user_data = user.find_one({}, sort=[("_id", pymongo.DESCENDING)])
    receiver_email = user_data['email']
    
    
    # Create the MIMEMultipart object
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject

    # Attach the email body
    msg.attach(MIMEText(body, 'plain'))

    # Open the file in binary mode
    with open(file_path, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())

    # Encode file in ASCII characters to send by email
    encoders.encode_base64(part)

    # Add header
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {os.path.basename(file_path)}",
    )

    # Attach the file to the email
    msg.attach(part)

    # Create the SMTP session
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)  # Login to the email server
        text = msg.as_string()  # Convert the message to a string
        server.sendmail(sender_email, receiver_email, text)  # Send the email
        server.quit()  # Terminate the session
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")




"""
/***********************************************

APP Routes

***********************************************/
"""


@app.route("/")
def hello_world():
    return "Hello, World!"

# file uploading routes 

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
            dub["title"] = str(file.filename)
            print(dub["title"])
            result = dubs.insert_one(dub)
            dub_id = str(result.inserted_id)
            dub

            # Send email to user with download
            
        except:
            print("file not inserted")
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'success',
            "data_id": dub_id
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify(errors)
        resp.status_code = 500
        return resp


# file upload youtube route

@app.route('/upload_youtube', methods=['POST'])
def upload_youtube():
    # check if the post request has the file part
    name = request.form["name"]
    source = request.form["source"]
    destination = request.form["destination"]
    gender = request.form["gender"]
    link = request.form["link"]
    
    db = db_connect()
    dubs = db["dubbing"]
    fs = GridFS(db)
    
    dub = {
        "name": name,
        "source": source,
        "destination": destination,
        "gender" : gender,
        "link" : link,
        "date" : datetime.datetime.now(tz=datetime.timezone.utc),
    }
    
    print(name, source, destination, gender, link)
    success = False
    
    try:
        url = YouTube(link)
        video = url.streams.filter(progressive=True,file_extension='mp4')
        video.get_highest_resolution().download(output_path=app.config['UPLOAD_FOLDER'])
        title = url.title
        success = True
    except:
        print('Error downloading video')
    
    if title is None:
        resp = jsonify({
            "message": 'No file part in the request',
            "status": 'failed'
        })
        resp.status_code = 400
        return resp
  
    if success:
        try:
            print(title)
            # file_id = fs.put(download_path, filename=title)
            dub["title"] = str(title + ".mp4")
            result = dubs.insert_one(dub)
            dub_id = str(result.inserted_id)

            # Send email to user with download
        except:
            print("file not inserted")
            
        resp = jsonify({
            "message": 'Files successfully uploaded',
            "status": 'success',
            "data_id": dub_id
        })
        resp.status_code = 201
        return resp
    else:
        resp = jsonify("error is coming")
        resp.status_code = 500
        return resp


     
# file Dubbing routes

@app.route("/dubbing")
def dub_video():
    
    # db connection for latest entry of database / new upload file
    try:
        print("not in fs.file")
        db = db_connect()
        collection = db['dubbing']
        latest_entry_values = collection.find_one({}, sort=[("_id", pymongo.DESCENDING)])
        pprint.pprint(latest_entry_values)
        video_name = dict(latest_entry_values)['title']
    except:
        print("fs error")
        # db = db_connect()
        # collection = db['fs.files']
        # latest_entry = collection.find_one({}, sort=[("_id", pymongo.DESCENDING)])
        # pprint.pprint(latest_entry)
        # video_name = dict(latest_entry)['filename']
        # print(video_name)
    
    # source and destination language taking 
        
    db = db_connect()
    collection = db['dubbing']
    latest_entry_values = collection.find_one({}, sort=[("_id", pymongo.DESCENDING)])
    pprint.pprint(latest_entry_values)
    source_lang = dict(latest_entry_values)['source']
    destination_lang = dict(latest_entry_values)['destination']
    
    
    
    
    # folder declaration for saving files
    
    # for taking input file folder of uploaded video
    upload_video_dir = 'static/uploads' 
    os.makedirs(upload_video_dir, exist_ok=True)
    video_file = os.path.join(upload_video_dir, video_name)
    
    # audio path of for extracted audio files and converted files
    output_dir = 'dubbed/audio'
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, 'sample1.wav')
    converted_audio_file = os.path.join(output_dir, "final_sample12.mp3")
    
    # video path of for extracted video files
    output_video_dir = 'dubbed/video'
    audio_less_video_file = os.path.join(output_video_dir, "sample1.mp4")
    
    # video path of for converted video files
    final_dir = 'dubbed/final'
    final_file = os.path.join(final_dir, "final_sample1.mp4")
    
    # if final_file:
    #     os.remove(final_file)
    
    # video file clip taking
    vid = video_file
    video = VideoFileClip(vid)

    
    # changing video to audio
    
    aud = video.audio
    aud.write_audiofile(output_file)

    # converting the audio into text using Google Translate'
    recognizer = speech_recognition.Recognizer()
    with speech_recognition.AudioFile(output_file) as source:
        print("voice accept")
        voice = recognizer.listen(source)
        text = recognizer.recognize_google(voice, language=source_lang)
        print(text)

    translator = googletrans.Translator()
    translation = translator.translate(text, dest=destination_lang)
    print(translation.text)

    converted_audio = gtts.gTTS(translation.text, lang=destination_lang)
    
    converted_audio.save(converted_audio_file)

    # extracting audio from video
    try:
        final_video = VideoFileClip(vid).without_audio()
        final_video.write_videofile(audio_less_video_file, fps=60)
        # Further processing or actions with the final video
    except FileNotFoundError:
        print("File not found. Please check the file path.")

    # adding audio and video

    audio = AudioFileClip(converted_audio_file)
    video = VideoFileClip(audio_less_video_file)

    final_clip = video.set_audio(audio)
    final_clip.write_videofile(final_file, fps=60)
    
    # removing extra files
    
    os.remove(audio_less_video_file)
    os.remove(converted_audio_file)
    os.remove(output_file)
    
    # return send_file(final_file, as_attachment=True)
    
    try:
        resp = jsonify({
            "message": 'File Dubbed successfully',
            "status": 'success'
        })
        resp.status_code = 200 
        try:      
            send_email_with_attachment(sender_email, password, smtp_server, smtp_port, email_subject, email_body, final_file)
            print("sent email")
        except:
            print("email not sent")
        return send_file(final_file, as_attachment=True)
    except Exception as e:
        return str(e), 500 
    # resp = jsonify({
    #         "message": 'File Dubbed successfully',
    #         "status": 'success'
    #     })
    # resp.status_code = 200
    # return resp


# file get video routes
    
@app.route('/get_file', methods=['GET'])
def get_file():
    file_path = os.path.join(app.config['DOWNLOAD_FOLDER'], "final_sample1.mp4")
    # Send the file using Flask's send_file function
    return send_file(file_path, as_attachment=True)


# generating subtitles

@app.route('/subtitles')
def generate_subtitles():
    db = db_connect()
    collection = db['dubbing']
    latest_entry_values = collection.find_one({}, sort=[("_id", pymongo.DESCENDING)])
    pprint.pprint(latest_entry_values)
    source_lang = dict(latest_entry_values)['source']
    destination_lang = dict(latest_entry_values)['destination']
    video_name = dict(latest_entry_values)['title']
    
    # folder declaration for saving files
    
    # for taking input file folder of uploaded video
    upload_video_dir = 'static/uploads' 
    os.makedirs(upload_video_dir, exist_ok=True)
    video_file = os.path.join(upload_video_dir, video_name)
    
    # audio path of for extracted audio files and converted files
    output_dir = 'dubbed/audio'
    os.makedirs(output_dir, exist_ok=True)
    output_file = os.path.join(output_dir, 'sample1.wav')
    
    print("hello")
    # video path of for converted video files
    final_dir = 'subtitles/final'
    final_file = os.path.join(final_dir,"output.txt")
    
    # os.remove(final_file)
    
    # video file clip taking
    vid = video_file
    video = VideoFileClip(vid)

    
    # changing video to audio
    
    aud = video.audio
    aud.write_audiofile(output_file)

    # converting the audio into text using Google Translate'
    recognizer = speech_recognition.Recognizer()
    with speech_recognition.AudioFile(output_file) as source:
        print("voice accept")
        voice = recognizer.listen(source)
        text = recognizer.recognize_google(voice, language=source_lang)
        print(text)

    translator = googletrans.Translator()
    translation = translator.translate(text, dest=destination_lang)
    print(translation.text)
    with open(final_file, "w", encoding="utf-8") as file:
        file.write(translation.text)
        
    # removing extra files
    os.remove(output_file)
    
    # return send_file(final_file, as_attachment=True)
    
    try:
        resp = jsonify({
            "message": 'File Dubbed successfully',
            "status": 'success'
        })
        resp.status_code = 200
        return send_file(final_file, as_attachment=True)
    except Exception as e:
        return str(e), 500 
    # resp = jsonify({
    #         "message": 'File Dubbed successfully',
    #         "status": 'success'
    #     })
    # resp.status_code = 200
    # return resp


# GET SUBTITLES
@app.route('/get_subtitle', methods=['GET'])
def get_subtitle():
    file_path = os.path.join(app.config['DOWNLOAD_SUBTITLE'], "output.txt")
    # Send the file using Flask's send_file function
    return send_file(file_path, as_attachment=True)



if __name__ == "__main__":
    app.run(port=5001, debug=True)