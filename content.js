chrome.storage.sync.get(["blockedWords", "blockedSelectors"], ({ blockedWords, blockedSelectors }) => {
    const currentDomain = window.location.hostname;

    // Block by words
    if (blockedWords[currentDomain]) {
        blockedWords[currentDomain].forEach(word => {
            let elements = document.body.innerText;
            if (elements.includes(word)) {
                document.body.innerHTML = document.body.innerHTML.replace(new RegExp(word, "gi"), "[BLOCKED]");
            }
        });
    }

    // Block by CSS selectors
    if (blockedSelectors[currentDomain]) {
        blockedSelectors[currentDomain].forEach(selector => {
            let elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.display = 'none';
            });
        });
    }
});
