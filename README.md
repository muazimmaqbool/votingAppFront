🗳️ Online Voting System (React + Node.js)

A complete online voting application built using React for frontend and Node.js + MongoDB for backend.
This system provides role-based access with Admin Dashboard and Voter Panel, JWT Authentication, secure voting process, and responsive UI.

🚀 Features
🔐 Authentication System

Voter login with Aadhar + password

Admin login with JWT authentication

Role-based routing (Admin & User)

Auto-login using token storage

Logout functionality

👤 Admin Dashboard

Admin can:

✅ Add new candidates

✅ View all voters

✅ See who has voted

✅ View vote count with party names

✅ Manage profile

✅ Change password

✅ Secure routes using JWT токеn

✅ Responsive sidebar with mobile support

🧑‍💼 Voter Panel

Voters can:

✅ View list of candidates

✅ Vote only once

✅ Cannot undo vote

✅ Confirmation before vote submission

✅ Profile page

✅ Change password

✅ Responsive UI

📊 Vote Count

Displays vote count party-wise

Real-time updates after voting

📋 All Voters Page (Admin)

Shows:

Name

Address

Aadhar Card Number

Voting status (Yes / No)

Scrollable list, responsive layout.

🛠️ Tech Stack
Frontend

React (Vite)

React Router

Context API

Tailwind CSS

Fetch API

LocalStorage

JWT Auth handling

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT authentication

CORS enabled

Bcrypt for password hashing

🔑 Default Credentials
Admin
Aadhar: 123456789012
Password: Admin123

Voter
Password (for all voters): Sopore@123


⚠️ Voters should change password after first login.

📦 Installation Guide
1️⃣ Clone Repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

🔹 Frontend Setup
cd client
npm install

Create .env.local
VITE_API_BASE_URL=http://localhost:3000


Then:

npm run dev


App runs at:

http://localhost:5173

🔹 Backend Setup
cd server
npm install
npm start


Backend runs at:

http://localhost:3000

🔗 API Endpoints (Backend)
Authentication
Endpoint	Method
/user/signup	POST
/user/login	POST
/profile/password	PUT
Admin
Endpoint	Method
/admin/candidates	GET
/admin/users	GET
/admin/voteCount	GET
🔒 Security Measures

JWT-based auth

Protected routes

Password hashing

Admin only routes

One-time vote restriction

📁 Project Structure
/client
  /components
  /context
  /pages
  /api

/server
  /routes
  /models
  /middleware
  /controllers

✅ Completed Modules

✔ Authentication

✔ Admin Dashboard

✔ Candidate Management

✔ Voting System

✔ Voter Management

✔ Vote Count Page

✔ Password Change

✔ ENV configuration

✔ JWT Auto-login

🌟 Future Enhancements

OTP / SMS verification

Election expiry date

Multiple elections

Results export (PDF / Excel)

Audit logs

Graphical vote analytics

Admin role management

Biometric auth simulation

🙌 Author

Muazim Maqbool
📍 Kashmir, India
👨‍💻 Software Engineer & Full-Stack Developer
📸 Instagram: @MuazimCodes

⭐ Support

If you like this project, don’t forget to:

⭐ Star this repo

🍴 Fork it

🐛 Submit issues


For support, email fake@fake.com or join our Slack channel.

