# MedPulse Healthcare - CXone Guide Demo

A professional healthcare-themed demonstration site for showcasing **CXone Guide** tracking, segmentation, and live agent escalation.

## Demo Flow

### 1. Anonymous Tracking
- Open the site. Explain that CXone Guide is already tracking the visitor anonymously.
- Navigate between **Home** and **Services**.

### 2. Behavioral Segmentation
- Navigate to **Services**.
- Click on **Cardiology** or **Neurology**.
- **The Magic:** These clicks fire `cxone('analytics', 'setVisitorVariable', 'interested_service', 'cardiology')`.
- Show the customer (in your CXone dashboard) how this visitor has been automatically moved into a "High Interest" segment.

### 3. Contextual Escalation
- Navigate to **Patient Support**.
- Click **Start Live Chat**.
- **The Magic:** The agent receives the chat with the `interested_service` context already attached, allowing them to say: *"I see you're interested in our Cardiology services, how can I help with that today?"*

## Technical Setup

- **Hosted on:** Railway (Auto-deploys from GitHub)
- **Styling:** Tailwind CSS (CDN)
- **Integration:** `js/guide-config.js` (Contains the CXone loader)
- **Tracking:** `js/guide-integration.js` (Contains the custom event logic)

## Key APIs Used in this Demo

- `cxone('analytics', 'sendPageView')`: Automatic on page load.
- `cxone('analytics', 'setVisitorVariable', 'key', 'value')`: Used to segment users based on their clicks.
- `cxone('analytics', 'setVisitorEvent', 'event_name')`: Used for funnel tracking.
