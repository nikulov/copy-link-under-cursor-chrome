chrome.commands.onCommand.addListener(async command => {
    if (command !== 'copy-hover-link') return;

    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    if (!tab?.id) return;

    chrome.tabs.sendMessage(tab.id, 'getLink', link => {
        if (!link) return;
        chrome.tabs.sendMessage(tab.id, {type:'copyText', text: link});
    });
});