# 🧠 Second Brain App

🚀 **Your Personal Digital Memory Bank**

Second Brain App is a productivity tool that helps you **store, organize, and revisit important content** like links, video URLs, screenshots, and notes—all in one secure and searchable space. Whether you're doing research, planning projects, or collecting inspiration, Second Brain helps you never lose what matters.

---

## 🌟 Features

✅ **Save Anything** – Links, video URLs, screenshots, and notes
✅ **Tag-Based Organization** – Categorize your items with custom tags
✅ **Search & Filter** – Quickly find saved content
✅ **Secure Authentication** – User login with JWT tokens
✅ **Modern UI** – Fast, responsive, and mobile-friendly interface
✅ **Shareable Content** – Share saved content with others (optional)
✅ **Reminders & Revisit** – Option to mark items for future follow-up *(coming soon)*

---

## 🛠️ Tech Stack

**Frontend:** React + Vite, Tailwind CSS, Context API
**Backend:** Node.js, Express.js
**Database:** MongoDB + Mongoose
**Authentication:** JWT
**Validation:** Zod
**Storage:** Cloudinary (for screenshots) *(optional)*
**Deployment:** Vercel (Frontend), Render (Backend)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/second-brain-app.git
cd second-brain-app
```

### 2️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in the `backend/` folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Run the Application

```bash
# Start backend server
cd backend
npm start

# Start frontend dev server
cd ../frontend
npm run dev
```

Then visit: [http://localhost:5173](http://localhost:5173)

---

## 📂 Folder Structure

```
second-brain-app/
 ├── backend/                # Express.js Server
 │   ├── models/             # Mongoose Models
 │   ├── routes/             # API Routes
 │   ├── controllers/        # Business Logic for API
 │   ├── middleware/         # Authentication & Error Handling
 │   ├── config/             # MongoDB & Environment Config
 │   └── index.js            # Main Server Entry Point
 │
 ├── frontend/               # React.js Client (Vite)
 │   ├── src/
 │   │   ├── components/     # Reusable UI Components
 │   │   ├── pages/          # Application Pages (Login, Home, SaveItem)
 │   │   ├── context/        # State Management with Context API
 │   │   ├── services/       # API Integration with Axios
 │   │   ├── assets/         # Images, Icons, Styles
 │   │   ├── App.jsx         # Main App Component
 │   │   └── main.jsx        # React Entry Point
 │   └── public/             # Static Assets
 │
 ├── .env.example            # Sample Environment Variables
 ├── README.md               # Project Documentation
 ├── package.json            # Root Dependencies (if mono-repo)
 └── .gitignore              # Ignored Files and Folders
```

---

## 📌 API Endpoints

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/auth/register` | Register a new user              |
| POST   | `/api/auth/login`    | Login and receive JWT token      |
| GET    | `/api/items`         | Fetch all saved items            |
| POST   | `/api/items`         | Save a new item (link/note/etc.) |
| DELETE | `/api/items/:id`     | Delete a saved item              |
| PUT    | `/api/items/:id`     | Update an existing item          |

---

## 🎨 UI Preview

🚧 **(Add UI Screenshots Here Once Ready)** 🚧

---

## 🎯 Future Enhancements

🔹 Browser Extension for 1-click saves
🔹 Reminders & revisit scheduler
🔹 AI-based tag suggestions and summarization
🔹 Offline mode
🔹 Export/backup as JSON or CSV
🔹 Dark mode toggle

---

## 🏆 Contributing

We welcome all contributors! Here's how to get started:

1. Fork the repository 🍴
2. Create a new branch (`git checkout -b feature-name`) 🌿
3. Make your changes and commit (`git commit -m 'Added something new'`) ✅
4. Push to your forked branch (`git push origin feature-name`) 🚀
5. Submit a Pull Request 📬

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ by [Vipin Kumar Chauhan](https://www.linkedin.com/in/vipin-kumar-chauhan-278077299)

📧 Email: [vipinchauhan4644@gmail.com](mailto:vipinchauhan4644@gmail.com)
🌐 Website (optional): [your-portfolio.com](https://your-portfolio.com)

---

🧠 **Second Brain App – Capture What Matters, Find It When It Counts!**





