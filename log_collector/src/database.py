from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class CopyLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50))
    copied_text = db.Column(db.Text)
    url = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f'<CopyLog {self.id}>'

    @staticmethod
    def display_names():
        return {
            'id': 'ID',
            'user_id': 'User ID',
            'copied_text': 'Copied Text',
            'url': 'URL',
            'timestamp': 'Timestamp'
        }

class PasteLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50))
    pasted_text = db.Column(db.Text)
    url = db.Column(db.String(100))
    copied_from_sheet = db.Column(db.Boolean)
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f'<PasteLog {self.id}>'

    @staticmethod
    def display_names():
        return {
            'id': 'ID',
            'user_id': 'User ID',
            'pasted_text': 'Pasted Text',
            'url': 'URL',
            'copied_from_sheet': 'Copied From Sheet',
            'timestamp': 'Timestamp'
        }
    


class FileUploadLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50))
    file_name = db.Column(db.String(100))
    url = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f'<FileUploadLog {self.id}>'

    @staticmethod
    def display_names():
        return {
            'id': 'ID',
            'user_id': 'User ID',
            'file_name': 'File Name',
            'url': 'URL',
            'timestamp': 'Timestamp'
        }

class WhatsappFileUploadLog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50))
    receiver = db.Column(db.String(50))
    file_name = db.Column(db.String(100))
    url = db.Column(db.String(100))
    timestamp = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f'<WhatsappFileUploadLog {self.id}>'

    @staticmethod
    def display_names():
        return {
            'id': 'ID',
            'user_id': 'User ID',
            'receiver': 'Receiver',
            'file_name': 'File Name',
            'url': 'URL',
            'timestamp': 'Timestamp'
        }