chrome.commands.onCommand.addListener(async command => {
    if (command !== 'copy-hover-link') return;

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return;

    chrome.tabs.sendMessage(tab.id, 'getLink', async link => {
        if (!link) return;
        try {
            await navigator.clipboard.writeText(link);
        } catch (_) { /* no output */ }
    });
});