# JobEazy

**JobEazy** is a web application designed to help users track and manage their job applications. Built with a Node.js and Express.js backend using TypeScript, and an Angular frontend styled with Tailwind CSS, this application offers a seamless experience for job seekers to organize their application process.

---

## 🚀 Features

- **Add and Manage Applications**: Input details like company, role, application date, and status.
- **Track Status Transitions**: Monitor changes such as 'Applied', 'Interviewing', 'Offer', and 'Rejected'.
- **Notes Section**: Attach relevant notes or next steps to each application.
- **Dashboard View**: Overview of all applications with filtering and sorting capabilities.

---

## 🛠 Tech Stack

- **Frontend**: Angular (TypeScript), Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Data Storage**: Local file system (JSON-based storage)

---

## ⚙️ Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/techo-anant/JobEazy.git
    cd JobEazy
    ```

2. Install backend dependencies:

    ```bash
    cd backend
    npm install 
    ```

3. Install frontend dependencies:

    ```bash
    cd ../jobeazy
    npm install
    ```

## Running the Application

1.	Start the backend server:

    ```bash
    cd backend
    npm run dev
    ```

2.	In a separate terminal, start the frontend application:

    ```bash
    cd ../jobeazy
    ng serve
    ```

3.	Open your browser and navigate to http://localhost:4200 to access the application.

## 📌 Notes
The backend uses a local JSON file (applications.json) to store application data. This setup is suitable for development and testing purposes. For production environments, consider integrating a database system.

Tailwind CSS is used for styling the frontend, providing a utility-first approach to design.