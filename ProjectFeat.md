# 🎓 EduConnect Project Features

> A real-time academic collaboration platform connecting Juniors with Seniors for instant guidance.

## 🚀 Core Platform Features

### A. Authentication & Identity 🔐

**Secure & Robust User Management**

- **Core Auth**: Email/password login with JWT session handling.
- **Verification**: Institution email verification (OTP/Magic Link) to ensure trusted network.
- **Security**: Refresh token rotation and multi-device logout capabilities.
- **Profile System**:
  - 🏫 **Academic Details**: Institution, Department, Level (School/College/University).
  - 🎓 **Expertise**: Subject tagging for Seniors.
  - 🟢 **Status**: Real-time availability (Online/Busy/Offline).

### B. Role & Access Control 🛡️

**Smart Role Assignment**
| Role | Assignment Logic | Permissions |
|------|------------------|-------------|
| **Junior** | School/College Students | Post questions, Request help |
| **Senior** | University Students | Accept requests, Provide guidance |
| **Admin** | System Administrators | Platform management (Post-MVP) |

### C. Question & Request System (The Core) 💡

**Instant Help Dispatch**

- 📝 **Short-form Questions**: Character-limited queries for quick consumption.
- 🏷️ **Smart Tagging**: Subject-based routing (Physics, Math, CSE, etc.).
- 🚨 **Urgency Flags**: Mark requests as `Normal` or `Urgent`.
- 📡 **Broadcasting Engine**:
  - Real-time alerts to matching Seniors.
  - Prioritizes Online-only users.
  - Auto-expiration for unanswered requests.

---

## ⚡ Real-Time Interaction

### D. Matching Engine 🤝

**Connecting the Right People**

1.  **Criteria**: Matches based on Subject Overlap, Institution, and Reputation.
2.  **Flow**:
    - Senior receives request ➡️ Accepts/Declines.
    - Request **Locks** upon acceptance.
    - Junior notified instantly.

### E. Chat System 💬

**Seamless Communication**

- **1:1 Private Chat**: WebSocket-based instant messaging.
- **UX Features**: Typing indicators, Online/Offline status.
- **Lifecycle**: Auto-starts on match, auto-ends on inactivity or manual closure.

---

## ⭐ Trust & Gamification

### F. Reputation & Feedback 🏆

**Meritocratic Community**

- **(+) Positive Actions**: Accepted responses, High ratings, Fast replies.
- **(-) Negative Actions**: Declining after accepting, Reports.
- **Feedback Loop**: 5-star rating system with optional text feedback.

### G. Trust & Safety 👮

- ✅ **Verification Badges**: For verified institution emails.
- 🚫 **Moderation**: Report system, effective cooldowns, and secure transcript logs.

---

## 📱 User Experience

### H. Notifications 🔔

- **Real-Time**: New Request, Match Found, Chat Started.
- **Async**: Email digests for missed opportunities.

### I. Dashboard 📊

- **Juniors**: Track active requests and chat history.
- **Seniors**: View incoming requests, reputation score, and stats.
- **Global**: Dark mode support 🌙 and Subject filtering.

---

## 🔮 Future Roadmap (Post-MVP)

- **Admin Panel**: User management and analytics.
- **Office Hours**: Scheduled availability for seniors.
- **Leaderboards**: Subject-wise senior rankings.
- **AI Tagging**: Automated subject classification.
