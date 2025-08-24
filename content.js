function redirectIfShorts() {
	chrome.storage.sync.get("enabled", (data) => {
		if (data.enabled === false) return; // Disabled

		if (!window.location.href.includes("/shorts/")) return;

		const shortsRegex = /^https:\/\/www\.youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;
		const match = window.location.href.match(shortsRegex);

		if (match) {
			const videoId = match[1];
			const newUrl = `https://www.youtube.com/watch?v=${videoId}`;
			window.location.replace(newUrl);
		}
	});
}

// Run immediately
redirectIfShorts();

// Also watch for SPA-style navigation
const observer = new MutationObserver(redirectIfShorts);
observer.observe(document.body, { childList: true, subtree: true });
