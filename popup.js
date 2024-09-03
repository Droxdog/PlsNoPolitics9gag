function updateList() {
    const currentDomain = window.location.hostname;

    chrome.storage.sync.get(["blockedWords", "blockedSelectors"], ({ blockedWords, blockedSelectors }) => {
        // Update blocked words list
        const wordList = document.getElementById("blockedListWords");
        wordList.innerHTML = "";
        if (blockedWords[currentDomain]) {
            blockedWords[currentDomain].forEach(word => {
                const li = document.createElement("li");
                li.textContent = word;
                wordList.appendChild(li);
            });
        }

        // Update blocked selectors list
        const selectorList = document.getElementById("blockedListSelectors");
        selectorList.innerHTML = "";
        if (blockedSelectors[currentDomain]) {
            blockedSelectors[currentDomain].forEach(selector => {
                const li = document.createElement("li");
                li.textContent = selector;
                selectorList.appendChild(li);
            });
        }
    });
}

document.getElementById("blockWord").addEventListener("click", () => {
    const word = document.getElementById("word").value;
    const currentDomain = window.location.hostname;

    chrome.storage.sync.get("blockedWords", ({ blockedWords }) => {
        if (!blockedWords[currentDomain]) {
            blockedWords[currentDomain] = [];
        }
        blockedWords[currentDomain].push(word);
        chrome.storage.sync.set({ blockedWords }, updateList);
    });
});

document.getElementById("blockSelector").addEventListener("click", () => {
    const selector = document.getElementById("selector").value;
    const currentDomain = window.location.hostname;

    chrome.storage.sync.get("blockedSelectors", ({ blockedSelectors }) => {
        if (!blockedSelectors[currentDomain]) {
            blockedSelectors[currentDomain] = [];
        }
        blockedSelectors[currentDomain].push(selector);
        chrome.storage.sync.set({ blockedSelectors }, updateList);
    });
});

updateList();
