let enabled = true; // default

// Load saved state
chrome.storage.sync.get("enabled", (data) => {
	enabled = data.enabled !== false;
});

// Listen for toggle updates
chrome.runtime.onMessage.addListener((msg) => {
	if (msg.action === "updateEnabled") {
		enabled = msg.enabled;
	}
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (!enabled) return;

	if (changeInfo.status === "loading" && tab.url) {
		const shortsRegex = /^https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
		const match = tab.url.match(shortsRegex);

		if (match) {
			const videoId = match[1];
			const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
			chrome.tabs.update(tabId, { url: newUrl });
		}
	}
});
