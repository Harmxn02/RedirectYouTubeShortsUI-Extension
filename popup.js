const toggle = document.getElementById("toggle");

// Load saved state (default = enabled)
chrome.storage.sync.get("enabled", (data) => {
	toggle.checked = data.enabled !== false;
});

// Save new state on toggle
toggle.addEventListener("change", () => {
	chrome.storage.sync.set({ enabled: toggle.checked });
});
