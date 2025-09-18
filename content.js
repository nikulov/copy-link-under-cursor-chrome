let hoveredLink = null;

document.addEventListener('mouseover', e => {
    const a = e.target.closest('a');
    hoveredLink = a ? a.href : null;
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg === 'getLink') return sendResponse(hoveredLink);
    if (msg?.type === 'copyText' && typeof msg.text === 'string') {

        navigator.clipboard.writeText(msg.text).then(
            () => sendResponse({ok:true}),
            () => {

                try {
                    const ta = document.createElement('textarea');
                    ta.value = msg.text;
                    ta.style.position = 'fixed';
                    ta.style.left = '-9999px';
                    document.body.appendChild(ta);
                    ta.focus();
                    ta.select();
                    document.execCommand('copy');
                    ta.remove();
                    sendResponse({ok:true});
                } catch (_e) {
                    sendResponse({ok:false});
                }
            }
        );
        return true; // async response
    }
});