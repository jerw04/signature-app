### SIGN-THAT-DOC

````markdown
# Document Signature App ✍️

This is a full-stack web app where users can upload PDF documents, drag and drop their signature on them, and save the position securely. It also includes user authentication and a dashboard to manage your uploaded files.

## Features

- Upload PDF files
- Drag and drop a signature onto the PDF
- Save the position of the signature
- View uploaded documents
- JWT-based login and registration
- Clean and responsive UI built with Tailwind CSS

## Tech Stack

**Frontend:**
- React
- Tailwind CSS
- React-PDF
- React Draggable

**Backend:**
- Node.js
- Express
- MongoDB (Mongoose)
- Multer for file uploads
- JSON Web Tokens for auth

## How to Run Locally

### Backend
cd server
npm install
npm start
````

Create a `.env` file in the `server/` folder with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend

```bash
cd client
npm install
npm start
```

Make sure `pdf.worker.mjs` is inside `client/public`.

## Environment Config (Frontend)

In `client/src/config.js`:

```js
const API_BASE = 'https://signature-app-px77.onrender.com';
export default API_BASE;
```

## Live Links

* Backend: [Render Link](https://signature-app-px77.onrender.com)
* Frontend: [Vercel Link](https://your-vercel-url.vercel.app)

## Author

Jerwin Manuel \n
VIT University
📩 [jerwin.manuel2022@vitstudent.ac.in](mailto:jerwin.manuel2022@vitstudent.ac.in)


