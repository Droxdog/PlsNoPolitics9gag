chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ blockedWords: [] }, () => {
        console.log("Initialized with empty block list");
    });
});
