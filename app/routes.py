# app/routes.py

from flask import Blueprint, render_template, request, redirect, url_for, flash
from .models import db, File
import os

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    files = File.query.all()
    return render_template('index.html', files=files)

@bp.route('/editor/<int:file_id>', methods=['GET', 'POST'])
def editor(file_id):
    file = File.query.get_or_404(file_id)

    if request.method == 'POST':
        file.content = request.form['content']
        db.session.commit()
        flash('File saved successfully.', 'success')

    return render_template('editor.html', file=file)

@bp.route('/new_file', methods=['GET', 'POST'])
def new_file():
    if request.method == 'POST':
        name = request.form['name']
        content = request.form['content']
        new_file = File(name=name, content=content)
        db.session.add(new_file)
        db.session.commit()
        flash('File created successfully.', 'success')
        return redirect(url_for('main.index'))

    return render_template('editor.html', file=None)

@bp.route('/delete_file/<int:file_id>', methods=['POST'])
def delete_file(file_id):
    file = File.query.get_or_404(file_id)
    db.session.delete(file)
    db.session.commit()
    flash('File deleted successfully.', 'success')
    return redirect(url_for('main.index'))
