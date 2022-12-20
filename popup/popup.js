(() => {
    document.getElementById("ToggleExt").addEventListener('change', async (e) => {
        console.log(e.target.checked)
        var port = chrome.runtime.connect({ name: "knockknock" });
        port.postMessage({ joke: "Knock knock" });
        port.onMessage.addListener(function (msg) {
            if (msg.question === "Who's there?")
                port.postMessage({ answer: "Madame" });
            else if (msg.question === "Madame who?")
                port.postMessage({ answer: "Madame... Bovary" });
        });
    })
})();