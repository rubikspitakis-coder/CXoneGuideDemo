const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// --- TAFE NSW Demo Routing ---

// 1. ICT Course Area Hub
app.get('/course-areas/information-and-communication-technology', (req, res) => {
    res.sendFile(path.join(__dirname, 'ict_area.html'));
});

// 2. Specific Cyber Security Course
app.get('/course-areas/information-and-communication-technology/courses/certificate-iv-in-cyber-security--22603VIC-01', (req, res) => {
    res.sendFile(path.join(__dirname, 'cyber_security.html'));
});

// Standard Pages
app.get('/support', (req, res) => res.sendFile(path.join(__dirname, 'support.html')));

// --- API Endpoints ---

/**
 * Automation Trigger Endpoint
 */
app.post('/api/check-cardiology', (req, res) => {
    try {
        // We reuse the logic but map 'cyber_security' to true
        // The CXone side might still send 'interested_service', so we look for that.
        const payload = req.body;
        let isMatch = false;
        let fields = [];

        if (payload.contact && Array.isArray(payload.contact.customFields)) {
            fields = payload.contact.customFields;
        } else if (Array.isArray(payload.customFields)) {
            fields = payload.customFields;
        }

        const interestField = fields.find(f => f.ident === 'interested_service');
        
        // If interest is 'cyber_security' OR 'cardiology' (legacy), return true
        if (interestField && (interestField.value === 'cyber_security' || interestField.value === 'cardiology')) {
            isMatch = true;
        }

        console.log(`Decision: Is Target Interest? ${isMatch}`);
        res.status(200).send(isMatch);
        
    } catch (error) {
        console.error('Error:', error);
        res.status(200).send(false);
    }
});

/**
 * VIP Check
 */
app.get('/api/is-vip', (req, res) => {
    console.log('--- Guide Rule API Call: checking VIP status ---');
    res.status(200).send(true);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`TAFE NSW Demo Server running on port ${PORT}`);
});