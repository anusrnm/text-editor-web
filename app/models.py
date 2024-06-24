# app/models.py

from . import db

class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'File(name={self.name})'
