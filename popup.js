const toggle = document.getElementById("toggle");

// Load saved state
chrome.storage.sync.get("enabled", (data) => {
	toggle.checked = data.enabled !== false; // default = true
});

// Save new state
toggle.addEventListener("change", () => {
	chrome.storage.sync.set({ enabled: toggle.checked });
});

// Send message to background when toggled
toggle.addEventListener("change", () => {
	chrome.runtime.sendMessage({ action: "updateEnabled", enabled: toggle.checked });
});
