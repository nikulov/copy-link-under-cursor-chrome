let hoveredLink = null;

document.addEventListener('mouseover', e => {
    const a = e.target.closest('a');
    hoveredLink = a ? a.href : null;
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg === 'getLink') sendResponse(hoveredLink);
});