
## Log Server

### Setup

1. **Create a virtual environment**:
    ```sh
    python3 -m venv venv
    ```

2. **Activate the virtual environment**:
    - On Unix or MacOS:
        ```sh
        source venv/bin/activate
        ```
    - On Windows:
        ```sh
        .\venv\Scripts\activate
        ```

3. **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Run the server**:
    ```sh
    python src/app.py
    ```

### Endpoints

- **`GET /get_logs`**: Fetch logs with pagination.
- **`POST /logs/<log_type>`**: Add a new log entry.

### Example Log Types

- `copy`
- `paste`
- `file-upload`
- `whatsapp-file-upload`

## Google Extension

### Setup

1. **Load the extension in Chrome**:
    - Open Chrome and go to [chrome://extensions/].
    - Enable "Developer mode".
    - Click "Load unpacked" and select the [google_extenstion].

2. **Usage**:
    - The extension will log user actions and send them to the Log Server.