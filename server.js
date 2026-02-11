const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

/**
 * 1. CXone Automation Trigger Endpoint
 * This is used to "bridge" the gap because the CXone UI 
 * sometimes hides custom fields in Automation Triggers.
 */
app.post('/api/check-cardiology', (req, res) => {
    try {
        const payload = req.body;
        console.log('--- Automation Trigger Request ---');
        
        let isCardiology = false;
        let fields = [];

        if (payload.contact && Array.isArray(payload.contact.customFields)) {
            fields = payload.contact.customFields;
        } else if (Array.isArray(payload.customFields)) {
            fields = payload.customFields;
        }

        const interestField = fields.find(f => f.ident === 'interested_service');
        
        if (interestField && interestField.value === 'cardiology') {
            isCardiology = true;
        }

        console.log(`Decision: Is Cardiology? ${isCardiology}`);
        res.status(200).send(isCardiology);
        
    } catch (error) {
        console.error('Error in /api/check-cardiology:', error);
        res.status(200).send(false);
    }
});

/**
 * 2. CXone Guide "External API Call" Endpoint
 * Use this in a Guide Rule to show a "VIP" proactive offer.
 * URL: https://[your-url]/api/is-vip
 */
app.get('/api/is-vip', (req, res) => {
    // In a real scenario, you'd check a database or cookie.
    // For the demo, we always return true to fire the rule.
    console.log('--- Guide Rule API Call: checking VIP status ---');
    res.status(200).send(true);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MedPulse Demo Server running on port ${PORT}`);
});
