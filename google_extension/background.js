chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "logCopy") {
        fetch('http://127.0.0.1:5000/logs/copy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id : "1",
                copied_text: message.data,
                url: message.sheetUrl
            })
        }).then(() => console.log("Copy log sent"))
          .catch(error => console.error("Error logging copy event:", error));
    }

    if (message.action === "logPaste") {
        fetch('http://127.0.0.1:5000/logs/paste', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id : "1",
                pasted_text: message.data,
                url: message.url,
                copied_from_sheet: message.copiedFromSheet,
            })
        }).then(() => console.log("Paste log sent"))
          .catch(error => console.error("Error logging paste event:", error));
    }

    if (message.action === "logFileUpload") {
        fetch('http://127.0.0.1:5000/logs/file_upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id : "1",
                file_name: message.files,
                url: message.url
            })
        }).then(() => console.log("File upload log sent"))
          .catch(error => console.error("Error logging file upload:", error));
    }

    if (message.action === "logWhatsappFileUpload") {
        console.log("Received message:", message);
        fetch('http://127.0.0.1:5000/logs/whatsapp_file_upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id : "1",
                receiver: message.chatPerson,
                file_name : message.fileName,
                url: message.url
            })
        }).then(() => console.log("File upload log sent"))
          .catch(error => console.error("Error logging file upload:", error));
    }
});
