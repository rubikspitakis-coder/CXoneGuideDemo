/**
 * CXone Guide Integration & Tracking Logic
 * Robust version for Pre-sales Demos
 */

window.cxone = window.cxone || function() {
    (window.cxone.q = window.cxone.q || []).push(arguments);
};

// 1. Track Page Views automatically on load
window.addEventListener('DOMContentLoaded', () => {
    console.log('MedPulse: Page Loaded - Initializing Tracking...');
    
    // Give the loader a moment to breathe before sending the page view
    setTimeout(() => {
        cxone('analytics', 'sendPageView', {
            title: document.title,
            url: window.location.href
        });
        console.log('MedPulse: Page View Sent');
    }, 1000);
});

/**
 * Robust Tracking Function
 * Tries multiple methods to ensure the variable sticks for the demo.
 */
function trackService(serviceName) {
    console.log(`MedPulse: User clicked ${serviceName}. Attempting to set variables...`);

    // Strategy 1: Standard Analytics (The one usually blocked by CORS if not whitelisted)
    try {
        cxone('analytics', 'setVisitorVariable', 'interested_service', serviceName);
        console.log('MedPulse: Strategy 1 (Analytics) fired.');
    } catch (e) {
        console.warn('MedPulse: Strategy 1 failed', e);
    }

    // Strategy 2: Event-based (Sometimes gets through even if variables fail)
    try {
        cxone('analytics', 'setVisitorEvent', 'service_viewed', {
            service: serviceName
        });
    } catch (e) {
        console.warn('MedPulse: Event tracking failed', e);
    }

    // Strategy 3: Visual Confirmation for Demo
    // We log this to prove the JS is running, even if the Network call fails
    console.log(`MedPulse: INTENT CAPTURED -> ${serviceName}`);
    console.log('--> PLEASE WAIT 5 SECONDS BEFORE STARTING CHAT <--');
}

function trackCta(ctaName) {
    cxone('analytics', 'setVisitorEvent', 'cta_click', {
        cta_id: ctaName,
        page: window.location.pathname
    });
}

function trackSupportAction(action) {
    cxone('analytics', 'setVisitorEvent', 'support_interaction', {
        type: action
    });
}