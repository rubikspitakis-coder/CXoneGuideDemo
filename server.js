const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (CXone sends JSON)
app.use(bodyParser.json());

// Serve static files (Your MedPulse Website)
app.use(express.static(path.join(__dirname, '.')));

/**
 * CXone Automation Trigger Endpoint
 * URL: https://[your-railway-url]/api/check-cardiology
 * 
 * CXone sends the Case object payload.
 * We check if the custom field 'interested_service' equals 'cardiology'.
 */
app.post('/api/check-cardiology', (req, res) => {
    try {
        const caseData = req.body;
        console.log('Received CXone Trigger Request:', JSON.stringify(caseData));

        // Logic: Check if the custom field matches 'cardiology'
        // Note: The payload structure varies slightly by DFO version, 
        // but custom_fields usually live in the root or 'custom_fields' object.
        
        let isCardiology = false;
        
        // Check standard location
        if (caseData.custom_fields && caseData.custom_fields.interested_service === 'cardiology') {
            isCardiology = true;
        } 
        // Check flat structure (sometimes seen in triggers)
        else if (caseData.interested_service === 'cardiology') {
            isCardiology = true;
        }

        console.log(`Decision: Is Cardiology? ${isCardiology}`);
        
        // Return boolean as text (standard for some CXone custom conditions) 
        // or JSON boolean depending on what your specific tenant expects.
        // Usually, a 200 OK with "true" body works best.
        res.send(isCardiology);
        
    } catch (error) {
        console.error('Error processing trigger:', error);
        res.status(500).send(false);
    }
});

/**
 * Fallback Route
 */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MedPulse Demo Server running on port ${PORT}`);
});
