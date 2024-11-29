# Cross-Site Copy-Paste and File Upload Logger

This project provides a system to monitor user actions, specifically copy, paste, and file upload activities, across websites using a Google Chrome Extension and a Flask Application backend for log collection and display.

## Features

### Google Chrome Extension

Tracks:
- **Copy Logs**: Captures text copied and its source URL.
- **Paste Logs**: Captures text pasted, verifies if it matches copied content, and logs the target URL.
- **File Upload Logs**: Monitors file uploads and captures file names across websites.
- **WhatsApp-Specific Logs**: Tracks file uploads and the recipient's name on WhatsApp Web.

### Log Collector (Flask Application)

- Accepts logs from the Chrome extension.
- Stores logs in an SQLite database.
- Provides a web interface to view the collected logs.

## Project Structure

```
google_chrome_extension/
├── manifest.json       # Chrome extension configuration
├── background.js       # Handles background tasks and server communication
├── content.js          # Injected script for monitoring user actions
└── README.md           # Instructions specific to the Chrome extension

log_collector/
├── src
│   ├── app.py          # Main Flask app for log collection and viewing
│   ├── database.py     # SQLite database handling
│   └── templates/
│       └── index.html  # Web interface for log viewing
└── requirements.txt    # Python dependencies
```

## Getting Started

### Prerequisites

- **Google Chrome**: To run the Chrome extension.
- **Python 3.8+**: To run the Flask application.
- **SQLite**: Used as the database for log storage.

### 1. Setting Up the Chrome Extension

**Installation Steps:**

1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable Developer Mode.
3. Click `Load unpacked` and select the `google_chrome_extension/` folder.
4. The extension will be installed and ready for use.

### 2. Setting Up the Flask Application

**Installation Steps:**

1. Navigate to the `log_collector/` directory:
    ```sh
    cd log_collector
    ```
2. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```
3. Run the Flask application:
    ```sh
    python src/app.py
    ```
4. Open your browser and navigate to `http://127.0.0.1:5000` to view logs.

## Usage

### Chrome Extension Logs:

- **Copy Logs**: Captures text copied and the source URL.
- **Paste Logs**: Captures text pasted and the target URL. Logs if the pasted content matches recently copied content.
- **File Upload Logs**: Monitors file upload actions and logs file names.
- **WhatsApp File Upload Logs**: Tracks:
    - File name of the uploaded document.
    - Name of the recipient in the chat.

### Flask Application:

- Logs collected by the extension are sent to the Flask server and stored in SQLite.
- Logs can be viewed in the browser interface provided by the Flask app.

## API Endpoints

### Flask Server Endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /log     | Collects logs from the extension. |
| GET    | /        | Displays all logs in a web view.  |

## Example Logs

### Copy Log:

```json
{
    "type": "copy",
    "data": "Copied text",
    "website": "https://sheets.google.com",
    "timestamp": "2024-11-27T10:00:00Z"
}
```

### Paste Log:

```json
{
    "type": "paste",
    "data": "Pasted text",
    "website": "https://web.whatsapp.com",
    "timestamp": "2024-11-27T10:05:00Z",
    "isCopied": true
}
```

### File Upload Log:

```json
{
    "type": "fileUpload",
    "fileName": "document.pdf",
    "website": "https://drive.google.com",
    "timestamp": "2024-11-27T10:10:00Z"
}
```

### WhatsApp File Upload Log:

```json
{
    "type": "whatsappFileUpload",
    "fileName": "image.png",
    "chatPerson": "John Doe",
    "timestamp": "2024-11-27T10:15:00Z"
}
```

## Future Enhancements

- **Authentication**: Add user login to restrict log access.
- **Search and Filter Logs**: Improve log browsing functionality.
- **Real-Time Monitoring**: Enable real-time log viewing on the web interface.
- **And many more**

## Contributions

Feel free to submit issues or pull requests for improvements or bug fixes.

## Contact

For queries, please contact: [Your Email or GitHub Profile].