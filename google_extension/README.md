# User Activity Monitor

User Activity Monitor is a Chrome extension that monitors clipboard actions, file uploads, and paste actions with user details.

## Features

- Monitors file uploads and logs details such as file name, website URL, and timestamp.
- Detects dynamically added file input elements and attaches event listeners.
- Logs user actions and sends them to the background script.
- Monitors file uploads on WhatsApp Web and logs details such as recipient and file information.

## Installation

1. Clone the repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the directory containing the extension's source code.

## Files

- `background.js`: Contains the background script for handling messages and logging.
- `content.js`: Contains the content script for monitoring user actions and file uploads.
- `icons/`: Directory containing extension icons.
- `manifest.json`: Configuration file for the Chrome extension.
- `popup.html`: HTML file for the extension's popup settings page.
- `popup.js`: JavaScript file for handling interactions in the popup settings page.
- `styles.css`: CSS file for styling the popup settings page.

## Usage

1. After installing the extension, navigate to any website.
2. The extension will automatically monitor file uploads and log the details.
3. Open the extension's popup by clicking on the extension icon in the Chrome toolbar to view and generate a new user ID.

## Development

To modify the extension, make changes to the source files and reload the extension in Chrome by navigating to `chrome://extensions/` and clicking the reload button for the User Activity Monitor extension.
