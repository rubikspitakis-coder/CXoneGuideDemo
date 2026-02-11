const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

/**
 * CXone Automation Trigger Endpoint
 */
app.post('/api/check-cardiology', (req, res) => {
    try {
        const payload = req.body;
        console.log('--- New CXone Trigger Request ---');
        
        let isCardiology = false;
        let fields = [];

        // Navigate the CXone payload structure (Contact > CustomFields)
        if (payload.contact && Array.isArray(payload.contact.customFields)) {
            fields = payload.contact.customFields;
        } else if (Array.isArray(payload.customFields)) {
            fields = payload.customFields;
        }

        // Find the specific field by 'ident'
        const interestField = fields.find(f => f.ident === 'interested_service');
        
        if (interestField) {
            console.log(`Found field: ${interestField.ident} = ${interestField.value}`);
            if (interestField.value === 'cardiology') {
                isCardiology = true;
            }
        } else {
            console.log('Field "interested_service" not found in payload.');
            console.log('Available fields:', fields.map(f => f.ident).join(', '));
        }

        console.log(`Decision: Is Cardiology? ${isCardiology}`);
        
        // CXone custom condition expects a 200 OK with boolean body
        res.status(200).send(isCardiology);
        
    } catch (error) {
        console.error('Error processing trigger:', error);
        res.status(200).send(false); // Fallback to false
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`MedPulse Demo Server running on port ${PORT}`);
});