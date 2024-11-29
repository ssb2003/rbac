# User Management System

This project is a **User Management System** built using **Refine Framework**, **Ant Design**, and **TypeScript**. It allows for efficient management of users, roles, and permissions with a modern, responsive UI. The system includes role-based access control (RBAC), search and filter functionalities, and supports both light and dark modes.

The project structure was initialized using **npx superplate-cli**, with the **Refine Framework** handling admin panel functionalities. The application is styled with **Ant Design**, ensuring an intuitive and professional user experience.

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Technologies Used](#technologies-used)  
3. [Dependencies and Requirements](#dependencies-and-requirements)  
4. [Setup Instructions](#setup-instructions)  
5. [Features](#features)  
6. [Screenshots](#screenshots)  

---

## Project Overview

The **User Management System** facilitates user and role management. Key functionalities include:

- **User and Role Management:** Create, update, delete users, and assign roles. Role-based access control (RBAC) ensures different levels of user access.  
- **Search and Filter:** Users can be searched and filtered based on details like name, email, and role.  
- **Light/Dark Mode:** Toggle between light and dark modes for accessibility in different environments.  
- **Responsive Design:** Adapts seamlessly to mobile, tablet, and desktop devices.  

---

## Technologies Used

- **[Refine Framework](https://refine.dev/):** For creating the admin panel and handling RBAC.  
- **[Ant Design](https://ant.design/):** UI component library for professional and modern designs.  
- **[TypeScript](https://www.typescriptlang.org/):** Provides type safety and improves code quality.  
- **[React](https://reactjs.org/):** Used for building the user interface.  
- **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS):** Used for styling, including light/dark themes.  
- **[React Context API](https://reactjs.org/docs/context.html):** Manages the global theme (light/dark mode).  

---

## Dependencies and Requirements

### Core Dependencies

- **React**: Frontend library for building the user interface.  
- **Refine Framework**: Handles user roles and permissions with ease.  
- **Ant Design**: Offers pre-built UI components for a clean, professional appearance.  
- **TypeScript**: Ensures type safety and better development practices.  
- **React Router**: For managing routing in the application.  
- **Axios**: For making HTTP requests to the backend.  

### Development Dependencies

- **React Scripts**: A set of scripts for starting, building, and testing the app.  
- **Prettier**: A code formatter for consistent style.  
- **ESLint**: A linter for identifying and fixing code quality issues.  

### Installation Requirements

- **Node.js (v14 or higher):** Required to run the application.  
- **npm or yarn:** For managing dependencies.  



## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ssb2003/rbac
cd rbac
npm install
npm run dev