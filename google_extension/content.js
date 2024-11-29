// Monitor copy events
document.addEventListener('copy', (event) => {
    if (window.location.hostname === "docs.google.com" && 
        window.location.pathname.startsWith("/spreadsheets/")) {
        
        const copiedData = event.clipboardData.getData("text");
        if (copiedData.trim() !== "") {
            chrome.storage.local.set({ lastCopiedData: copiedData }, () => {
                // Send the copied data to the background script
                chrome.runtime.sendMessage({
                    action: "logCopy",
                    data: copiedData,
                    sheetUrl: window.location.href
                });
            });
        }
    }
});

// Listen for paste events
document.addEventListener("paste", (event) => {
    let pastedData = (event.clipboardData || window.clipboardData).getData("text");
    
    if (pastedData) {
        // Get the last copied data from Chrome storage
        chrome.storage.local.get("lastCopiedData", (result) => {
            let lastCopiedData = result.lastCopiedData || null;

            // Log the paste action with information on whether it matches the last copied data
            chrome.runtime.sendMessage({
                action: "logPaste",
                data: pastedData,
                url: window.location.href,
                copiedFromSheet: pastedData === lastCopiedData, // Check if pasted content matches the last copied
            });
        });
    }
});

(function () {
    let chatPersonName = ""; // Stores the current chat person's name
    let selectedFileName = ""; // Stores the selected file name

    // Function to get the chat person's name
    function updateChatPersonName() {
        const personNameElement = document.querySelector('div._amig span.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e');
        if (personNameElement) {
            chatPersonName = personNameElement.textContent || "Unknown";
        }
    }

    // Mutation observer to monitor chat person's name changes
    const chatObserver = new MutationObserver(() => {
        updateChatPersonName();
    });

    chatObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Function to get the file name being uploaded
    function updateSelectedFileName() {
        const fileNameElement = document.querySelector('span.x1f6kntn.x1wm35g');
        if (fileNameElement) {
            selectedFileName = fileNameElement.textContent || "Unknown File";
        }
    }

    // Mutation observer to monitor file name changes
    const fileObserver = new MutationObserver(() => {
        updateSelectedFileName();
    });

    fileObserver.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Function to detect upload button click and send log
    function monitorUploadButtonClick() {
        document.body.addEventListener("click", (event) => {
            const uploadButton = event.target.closest('div[role="button"].x78zum5.x6s0dn4.xl56j7k.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1f6kntn.xk50ysn.x7o08j2.xtvhhri.x1rluvsa.x14yjl9h.xudhj91.x18nykt9.xww2gxu.xu306ak.x12s1jxh.xkdsq27.xwwtwea.x1gfkgh9.x1247r65.xng8ra');
            if (uploadButton) {
                sendLog(chatPersonName, selectedFileName);
            }
        });
    }

    // Function to send the log using chrome.runtime.sendMessage
    function sendLog(personName, fileName) {
        chrome.runtime.sendMessage({
            action: "logWhatsappFileUpload",
            chatPerson: personName,
            fileName: fileName,
            url: window.location.href
        });
    }

    // Start monitoring for upload button clicks
    monitorUploadButtonClick();
})();


// General function to handle file inputs
function monitorFileInputs() {
    // Detect file uploads through standard file input elements
    document.querySelectorAll('input[type="file"]').forEach((inputElement) => {
        inputElement.addEventListener('change', (event) => {
            if (event.target.files && event.target.files.length > 0) {
                const fileList = Array.from(event.target.files).map((file) => file.name);
                console.log("Uploaded Files:", fileList);

                // Send file upload details to the background script
                const fileListString = fileList.join(", ");
                chrome.runtime.sendMessage({
                    action: "logFileUpload",
                    files: fileListString,
                    url: window.location.href,
                });
            }
        });
    });
}

// Observe the DOM for dynamically added file input elements
const fileInputObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'INPUT' && node.type === 'file') {
                    // Attach the event listener to new file inputs
                    node.addEventListener('change', (event) => {
                        if (event.target.files && event.target.files.length > 0) {
                            const fileList = Array.from(event.target.files).map((file) => file.name);
                            const fileListString = fileList.join(", ");

                            // Send file upload details to the background script
                            chrome.runtime.sendMessage({
                                action: "logFileUpload",
                                files: fileListString,
                                url: window.location.href,
                            });
                        }
                    });
                }
            });
        }
    }
});

// Start observing the document for file inputs
fileInputObserver.observe(document.body, {
    childList: true,
    subtree: true,
});


// Initialize monitoring
monitorFileInputs();

