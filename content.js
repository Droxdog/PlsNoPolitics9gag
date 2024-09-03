// Log to confirm that the content script is loaded
console.log("Content script loaded");

// Retrieve the blocked words and selectors from chrome.storage
chrome.storage.sync.get(["blockedWords", "blockedSelectors"], ({ blockedWords, blockedSelectors }) => {
    // Log the retrieved blocked words and selectors for debugging
    console.log("Blocked Words:", blockedWords);
    console.log("Blocked Selectors:", blockedSelectors);

    const currentDomain = window.location.hostname;

    // Block content by words
    if (blockedWords[currentDomain]) {
        blockedWords[currentDomain].forEach(word => {
            console.log(`Blocking word: ${word}`);
            let elements = document.body.innerText;
            if (elements.includes(word)) {
                // Replace the blocked word with [BLOCKED]
                document.body.innerHTML = document.body.innerHTML.replace(new RegExp(word, "gi"), "[BLOCKED]");
            }
        });
    }

    // Block content by CSS selectors
    if (blockedSelectors[currentDomain]) {
        blockedSelectors[currentDomain].forEach(selector => {
            console.log(`Blocking selector: ${selector}`);
            let elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Hide the element from the page
                element.style.display = 'none';
            });
        });
    }
});
