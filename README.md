Certainly! Here's the full \*\*README.md\*\* content for your \*\*Document Signature App\*\*, written in clean and structured Markdown:



---



```markdown

\# 🖋️ Document Signature App



A full-stack web application that allows users to \*\*upload\*\*, \*\*digitally sign\*\*, and \*\*manage PDF documents\*\* securely and beautifully.



\## 🚀 Features



\- 📄 Upload PDF documents via a responsive UI

\- 🖊 Drag-and-drop signature onto PDFs

\- 🔐 User authentication (JWT-based)

\- 📁 Dashboard showing uploaded files

\- 📌 Saves signature coordinates for each document

\- ✅ Modern, clean UI with Tailwind CSS

\- ☁️ Backend deployed on \[Render](https://signature-app-px77.onrender.com)

\- 🌐 Frontend deployed on \[Vercel](https://your-vercel-url.vercel.app) \*(replace with actual)\*



---



\## 📸 Screenshots



\### 🔐 Login/Register

!\[Login Screenshot](./screenshots/login.png)



\### 📤 Upload + Dashboard

!\[Dashboard Screenshot](./screenshots/dashboard.png)



\### 🖊 Sign PDF

!\[Sign PDF Screenshot](./screenshots/signpdf.png)



---



\## 🧱 Tech Stack



\*\*Frontend\*\*  

\- React

\- Tailwind CSS

\- React Router DOM

\- Axios

\- React PDF

\- React Draggable



\*\*Backend\*\*  

\- Node.js

\- Express

\- MongoDB (via Mongoose)

\- Multer for file upload

\- JSON Web Tokens (JWT)



---



\## 🛠️ Project Structure



```



signature-app/

├── client/                  # Frontend (React)

│   ├── src/pages/           # Auth, Upload, Dashboard, SignPDF

│   ├── public/pdf.worker.mjs

│   └── ...

├── server/                  # Backend (Express)

│   ├── routes/

│   ├── controllers/

│   └── models/

└── README.md



````



---



\## 🧪 Running Locally



\### Backend



```bash

cd server

npm install

npm start

````



Create a `.env` file with:



```

PORT=5000

MONGO\_URI=your\_mongodb\_connection\_string

JWT\_SECRET=your\_strong\_secret\_key

```



\### Frontend



```bash

cd client

npm install

npm start

```



Make sure `pdf.worker.mjs` is in `client/public`.



---



\## ⚙️ Environment Config (Frontend)



Create `client/src/config.js`:



```js

const API\_BASE = 'https://signature-app-px77.onrender.com';

export default API\_BASE;

```



---



\## 📦 Deployment



\* Backend: Render

\* Frontend: Vercel (`npm run build` before deploy)

\* Updated all `localhost` references to use dynamic `API\_BASE` via config.



---



\## 📌 Future Improvements



\* Actual signature drawing (canvas-based)

\* Digital signing with certificates

\* Signature preview before saving

\* PDF download with stamped signature



---



\## 🤝 Author



Jerwin Manuel

\\\[VIT University]

\[jerwin.manuel2022@vitstudent.ac.in](mailto:jerwin.manuel2022@vitstudent.ac.in)



---



```



Let me know if you want a version that includes screenshots, deploy guides, or badges like GitHub stars/build status.

```



