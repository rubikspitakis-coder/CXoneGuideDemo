# MedPulse Healthcare - CXone Guide Native Demo Guide

This guide focuses on using **Native CXone Capabilities** (Guide Rules & Automation) to demonstrate visitor tracking and intelligent routing.

## 🚀 The Native Workflow

### 1. Tracking Intent (The No-Code Way)
Instead of custom JavaScript, use **Guide Rules** to set visitor variables.
- **Trigger:** Page Load
- **Condition:** Current Page URL -> contains -> `services.html`
- **Action:** `Set Variable` -> `interested_service` = `cardiology`
- **Why?** It avoids CORS errors and shows how business users can manage tracking without developers.

### 2. Personalization (The API Flex)
Demonstrate how CXone queries your backend before showing a proactive chat.
- **Rule Condition:** `External API Call` -> `https://[RAILWAY-URL]/api/is-vip`
- **Logic:** If the API returns `true`, show a "Priority Patient" chat bubble.

### 3. Agent Context (The Tagging)
- **Automation Trigger:** `Case Created`
- **Condition:** `Custom Condition` -> `https://[RAILWAY-URL]/api/check-cardiology`
- **Job:** `Add Tag` -> `Cardiology`

---

## 🛠 CXone Configuration Summary

### A. Custom Field (ACD > Digital > Settings)
- **Object:** Case
- **Ident:** `interested_service`
- **Type:** Single Selection (Dropdown)
- **Values:** `cardiology|Cardiology`, `neurology|Neurology`

### B. Tags (ACD > Digital > Settings)
- **Action:** Create a `Cardiology` tag with a bright color (e.g., Red).

### C. The Automation Rule (ACD > Digital > Automation Triggers)
- **Event:** Case created
- **Condition:** Custom condition -> `https://[RAILWAY-URL]/api/check-cardiology`
- **Job:** Add tags -> `Cardiology`

---

## 🎤 The Demo Narrative

1. **The Journey:** "A patient visits our Cardiology page. We don't need code to track this; a simple **Guide Rule** sets a visitor variable in the background."
2. **The Intelligence:** "Before we even offer chat, CXone calls our **Patient Database API** (on Railway). Because they are a VIP, we offer a specialized proactive engagement."
3. **The Escalation:** "When the patient chats, CXone analyzes that 'Cardiology' intent and automatically applies a **Tag** to the case. The agent has instant context."