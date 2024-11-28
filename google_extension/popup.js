document.addEventListener("DOMContentLoaded", () => {
    const userIdDisplay = document.getElementById("userId");
    const generateIdButton = document.getElementById("generateId");

    chrome.storage.local.get("userId", (data) => {
        userIdDisplay.textContent = data.userId || "Not Set";
    });

    generateIdButton.addEventListener("click", () => {
        const newUserId = "user-" + Date.now();
        chrome.storage.local.set({ userId: newUserId }, () => {
            userIdDisplay.textContent = newUserId;
            alert("New User ID Generated!");
        });
    });
});
