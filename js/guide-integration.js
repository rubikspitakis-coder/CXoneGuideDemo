/**
 * CXone Guide Integration & Tracking Logic
 * This script handles page views, custom events, and visitor variables.
 */

// Initialize the CXone command queue if it doesn't exist
window.cxone = window.cxone || function() {
    (window.cxone.q = window.cxone.q || []).push(arguments);
};

// 1. Track Page Views automatically on load
window.addEventListener('DOMContentLoaded', () => {
    console.log('MedPulse: Page Loaded - Tracking with CXone Guide');
    
    // Standard page view tracking
    cxone('analytics', 'sendPageView', {
        title: document.title,
        url: window.location.href
    });

    // Example of setting a visitor variable based on URL context
    if (window.location.pathname.includes('support')) {
        cxone('analytics', 'setVisitorVariable', 'current_intent', 'seeking_support');
    }
});

/**
 * Track Call-to-Action clicks
 * @param {string} ctaName - Name of the button/link clicked
 */
function trackCta(ctaName) {
    console.log(`MedPulse: Tracking CTA - ${ctaName}`);
    cxone('analytics', 'setVisitorEvent', 'cta_click', {
        cta_id: ctaName,
        page: window.location.pathname
    });
}

/**
 * Track specific medical service interest
 * @param {string} serviceName - cardiology, pediatrics, etc.
 */
function trackService(serviceName) {
    console.log(`MedPulse: Tracking Service Interest - ${serviceName}`);
    
    // Set a variable to segment this visitor
    cxone('analytics', 'setVisitorVariable', 'interested_service', serviceName);
    
    // Log the event
    cxone('analytics', 'setVisitorEvent', 'service_viewed', {
        service: serviceName
    });

    // Optionally store a 'conversion' value if they show deep interest
    cxone('analytics', 'storeConversion', 'high_intent_service', 0);
}

/**
 * Track Support specific actions
 * @param {string} action - call_support, start_chat, etc.
 */
function trackSupportAction(action) {
    console.log(`MedPulse: Tracking Support Action - ${action}`);
    cxone('analytics', 'setVisitorEvent', 'support_interaction', {
        type: action
    });
}

// 2. Demonstration of dynamic personalization (Optional)
// You can use Guide variables to change the UI
/*
cxone('analytics', 'getVisitorVariable', 'interested_service', (value) => {
    if (value === 'cardiology') {
        // Change hero image or text to cardiology-specific
    }
});
*/
