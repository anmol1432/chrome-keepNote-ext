(() => {
    document.getElementById("ToggleExt").addEventListener('change', async (e) => {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { "message": e.target.checked });
        });
    })
})();