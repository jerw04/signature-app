Thanks for pointing that out! Here's your improved `README.md` without the backslashes or unnecessary code-style formatting in the headings and regular text — only **actual code blocks** and **paths** are shown as code.

---

```markdown
# 🖋️ Document Signature App

A full-stack web application that allows users to **upload**, **digitally sign**, and **manage PDF documents** securely and beautifully.

---

## 🚀 Features

- 📄 Upload PDF documents via a responsive UI  
- 🖊 Drag-and-drop signature onto PDFs  
- 🔐 User authentication (JWT-based)  
- 📁 Dashboard showing uploaded files  
- 📌 Saves signature coordinates for each document  
- ✅ Modern, clean UI with Tailwind CSS  
- ☁️ Backend deployed on [Render](https://signature-app-px77.onrender.com)  
- 🌐 Frontend deployed on [Vercel](https://your-vercel-url.vercel.app) *(replace with actual)*  

---

## 📸 Screenshots

### 🔐 Login/Register
![Login Screenshot](./screenshots/login.png)

### 📤 Upload + Dashboard
![Dashboard Screenshot](./screenshots/dashboard.png)

### 🖊 Sign PDF
![Sign PDF Screenshot](./screenshots/signpdf.png)

---

## 🧱 Tech Stack

**Frontend**

- React  
- Tailwind CSS  
- React Router DOM  
- Axios  
- React-PDF  
- React-Draggable  

**Backend**

- Node.js  
- Express  
- MongoDB (via Mongoose)  
- Multer for file upload  
- JSON Web Tokens (JWT)  

---

## 🛠️ Project Structure

```

signature-app/
├── client/              # Frontend (React)
│   ├── src/pages/       # Auth, Upload, Dashboard, SignPDF
│   ├── public/pdf.worker.mjs
│   └── ...
├── server/              # Backend (Express)
│   ├── routes/
│   ├── controllers/
│   └── models/
└── README.md

````

---

## 🧪 Running Locally

### Backend

```bash
cd server
npm install
npm start
````

Create a `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
```

### Frontend

```bash
cd client
npm install
npm start
```

📌 Make sure `pdf.worker.mjs` is placed in `client/public`.

---

## ⚙️ Environment Config (Frontend)

Create a `client/src/config.js` file:

```js
const API_BASE = 'https://signature-app-px77.onrender.com';
export default API_BASE;
```

---

## 📦 Deployment

* **Backend**: Render
* **Frontend**: Vercel (run `npm run build` before deploying)
* ✅ All `localhost` references are updated to use dynamic `API_BASE` via config file.

---

## 📌 Future Improvements

* ✍️ Signature drawing (canvas-based)
* 🔏 Digital signing with certificates
* 👀 Signature preview before saving
* 📥 PDF download with signature embedded

---

## 🤝 Author

**Jerwin Manuel**
VIT University
📧 [jerwin.manuel2022@vitstudent.ac.in](mailto:jerwin.manuel2022@vitstudent.ac.in)

```

