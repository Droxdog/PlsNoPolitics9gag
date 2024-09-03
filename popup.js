function updateList() {
    chrome.storage.sync.get("blockedWords", ({ blockedWords }) => {
        const list = document.getElementById("blockedList");
        list.innerHTML = "";
        blockedWords.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            list.appendChild(li);
        });
    });
}

document.getElementById("block").addEventListener("click", () => {
    const word = document.getElementById("word").value;
    chrome.storage.sync.get("blockedWords", ({ blockedWords }) => {
        blockedWords.push(word);
        chrome.storage.sync.set({ blockedWords }, updateList);
    });
});

updateList();
