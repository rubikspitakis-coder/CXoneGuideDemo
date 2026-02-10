# CXone Guide Tracking Demo - Setup & Instructions

This project is a high-fidelity "MedPulse Healthcare" demo site designed to showcase **CXone Guide's** ability to track web behavior and translate it into actionable agent context via **DFO Tags**.

## 🚀 Current Status
- **Website:** 3-page modern Healthcare site (Home, Services, Support).
- **Styling:** Tailwind CSS (CDN).
- **Tracking:** Custom JS (`js/guide-integration.js`) captures intent (e.g., "Cardiology") using `cxone('analytics', 'setVisitorVariable', 'interested_service', '...')`.
- **Integration:** Initialized with Tenant `1092` and Guide App ID `bb179a83-...`.
- **Deployment:** Pushed to GitHub and ready for Railway.

---

## 🛠 CXone Side Configuration (Next Steps)

To make the "Cardiology" interest appear as a tag on the Agent Desktop, follow these steps in your CXone Admin:

### 1. Create the Custom Field
This ensures CXone "catches" the variable being sent from the website.
- **Path:** ACD > Digital > Settings > Custom Fields
- **Action:** Create New
- **Name:** `Interested Service`
- **Key:** `interested_service` (Must match JS exactly)
- **Type:** Text
- **Visibility:** Visible for Agents

### 2. Create the Tags
- **Path:** ACD > Digital > Settings > Tags
- **Action:** Create tags for `Cardiology` (Red), `Neurology` (Blue), and `Support` (Green).

### 3. Create the Automation Rule (The "Wow" Factor)
This automatically applies the tag when the chat starts.
- **Path:** ACD > Digital > Settings > Automation Rules
- **Action:** New Rule (On Case Created)
- **Condition:** If `Interested Service` (Custom Field) -> `Equals` -> `cardiology`
- **Action:** `Add Tags` -> `Cardiology`

---

## 🎤 The Demo Script

1. **Step 1: The Browse**
   Open the site. Navigate to **Services > Cardiology**.
   *Narrative: "The patient is researching heart care. Guide is silently noting this interest as 'cardiology' in the background."*

2. **Step 2: The Escalation**
   Navigate to **Support** and click **Start Live Chat**.
   *Narrative: "The patient needs help. They launch a chat from the support portal."*

3. **Step 3: The Intelligent Agent**
   Open **MAX/CXone Agent**. Accept the chat.
   *Narrative: "Notice the **Cardiology tag** is already there. The agent knows exactly what this patient was looking at before they even said hello. This is Intelligence-Led Routing."*

4. **Step 4: The Data**
   Open **Guide Admin > Real-time Monitor**.
   *Narrative: "For the marketing team, we can see exactly which services are driving the most chat escalations today."*

---

## 📂 Project Structure
- `index.html`: Home page.
- `services.html`: Service listings with tracking buttons.
- `support.html`: FAQ and Chat trigger.
- `js/guide-config.js`: CXone initialization snippet.
- `js/guide-integration.js`: The "Brains" - custom tracking logic.
