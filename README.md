# Health Nexus 

Health Nexus is a modern healthcare management system built with React, TypeScript, and TailwindCSS. It provides a user-friendly interface for managing patients, staff, appointments, billing, and more.

## Features

- **Role-Based Dashboard**: Different views and functionalities for Admin, Doctor, Nurse, and Receptionist roles.
- **Patient Management**: View and manage patient details.
- **Staff Management**: Manage hospital staff information.
- **Appointments**: Schedule and manage appointments.
- **Wards & Beds**: Track bed availability and ward assignments.
- **Billing**: Manage billing and payment details.
- **User Profile**: Update user profile information.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## Folder Structure
```
      health-nexus-backend/
      ├── public/
      │   ├── favicon.ico
      │   ├── placeholder.svg
      │   └── robots.txt
      │
      ├── src/
      │   ├── components/
      │   │   ├── Analytics.tsx
      │   │   ├── Appointments.tsx
      │   │   ├── Billing.tsx
      │   │   ├── Dashboard.tsx
      │   │   ├── DoctorDashboard.tsx
      │   │   ├── LoginForm.tsx
      │   │   ├── Patients.tsx
      │   │   ├── Staff.tsx
      │   │   ├── UserProfile.tsx
      │   │   ├── Wards.tsx
      │   │   └── ui/               
      │   │
      │   ├── hooks/
      │   │   └── use-mobile.tsx
      │   │
      │   ├── lib/                  
      │   │
      │   ├── App.css
      │   ├── App.tsx
      │   ├── index.css
      │   ├── main.tsx
      │   └── vite-env.d.ts
      │
      ├── components.json           
      ├── index.html
      ├── package.json
      ├── postcss.config.js
      ├── tailwind.config.ts
      ├── tsconfig.app.json
      ├── tsconfig.json
      ├── tsconfig.node.json
      ├── vite.config.ts
      ├── eslint.config.js
```



## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd health-nexus-backend
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```


