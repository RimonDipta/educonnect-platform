# EduConnect Platform

EduConnect is a real-time academic collaboration platform designed to bridge the gap between students, bridging knowledge exchange through Q&A, instant messaging, and resource sharing.

## 🚀 Features

For a deep dive into our feature set and specifications, see [ProjectFeat.md](ProjectFeat.md).

- **User Authentication**: Secure registration and login with JWT and bcrypt.
- **Role-Based Access**: Automatic role assignment (Junior/Senior) based on academic level.
- **Q&A System**: Post questions, filter by subjects, and get urgent help.
- **Real-time Chat**: Instant 1-on-1 messaging powered by Socket.IO.
- **Modern UI**: Responsive frontend built with React, Vite, and Tailwind CSS (planned).

## 🛠️ Technology Stack

For a detailed breakdown of our architecture and choices, see [Technology.md](Technology.md).

### Backend

- **Node.js & Express**: High-performance API server.
- **MongoDB & Mongoose**: Flexible NoSQL database schema.
- **Socket.IO**: Real-time bidirectional event-based communication.
- **JWT (JSON Web Tokens)**: Stateless authentication.

### Frontend

- **React**: Component-based UI library.
- **Redux Toolkit**: Efficient state management.
- **React Router**: Client-side routing.
- **Axios**: Promise-based HTTP client.
- **Lucide React**: Beautiful & consistent icons.

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/RimonDipta/educonnect-platform.git
    cd educonnect-platform
    ```

2.  **Install Dependencies** (Root, Client, and Server)

    ```bash
    npm run install:all
    ```

3.  **Environment Setup**
    - Create a `.env` file in the `server` directory:
      ```env
      PORT=5000
      MONGODB_URI=mongodb://localhost:27017/educonnect
      JWT_SECRET=your_super_secret_key
      NODE_ENV=development
      ```

4.  **Start Application**

    ```bash
    npm start
    ```

    - Server: `http://localhost:5000`
    - Client: `http://localhost:5173`

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and follow our coding standards.

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

## 📄 License

This project is licensed under the MIT License.
