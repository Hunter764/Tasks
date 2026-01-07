# Elegant Todo App

<div align="center">

A beautiful, minimalist task management application built with modern web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Features

- **Full CRUD Operations** - Create, read, update, and delete tasks seamlessly
- **Dark/Light Theme** - System-aware theme switching with smooth transitions
- **Priority Levels** - Organize tasks by high, medium, or low priority with visual indicators
- **Responsive Design** - Beautiful UI that works flawlessly on all devices
- **Real-time Updates** - Instant synchronization powered by TanStack Query
- **Smart Filtering** - View all, active, or completed tasks with one click
- **Persistent Storage** - All your tasks saved securely with MongoDB
- **Smooth Animations** - Delightful micro-interactions throughout the app
- **Accessible** - Built with accessibility best practices

---

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **[Lucide Icons](https://lucide.dev/)** - Elegant icon set

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[TanStack Query](https://tanstack.com/query)** - Server state & caching

### Backend & Database
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling

### Form & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### UI/UX
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Geist Font](https://vercel.com/font)** - Beautiful typography

---

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
todo-app/
├── actions/              # Server actions
│   └── todo-actions.js   # CRUD operations
├── app/                  # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Home page
├── components/           # React components
│   ├── providers/        # Context providers
│   ├── ui/              # shadcn/ui components
│   ├── theme-toggle.jsx  # Theme switcher
│   ├── todo-filter.jsx   # Filter controls
│   ├── todo-form.js      # Task creation form
│   ├── todo-item.jsx     # Individual task card
│   └── todo-list.jsx     # Task list container
├── hooks/                # Custom React hooks
│   └── use-create-todo.js
├── lib/                  # Utility functions
│   ├── db.js            # MongoDB connection
│   └── utils.js         # Helper functions
├── model/               # Mongoose models
│   └── todo.js          # Todo schema
├── store/               # Zustand store
│   └── todo-store.js    # Global state
└── validations/         # Zod schemas
    └── todo.js          # Todo validation
```

---

## Features in Detail

### Task Management
- **Create Tasks**: Add new tasks with title, description, and priority level
- **Edit Tasks**: Update task details (coming soon)
- **Complete Tasks**: Mark tasks as done with satisfying animations
- **Delete Tasks**: Remove tasks with smooth transitions
- **Filter Tasks**: View all, active, or completed tasks instantly

### Priority System
- **High Priority**: For urgent and important tasks
- **Medium Priority**: For standard tasks
- **Low Priority**: For tasks that can wait

### Theme System
- **Light Mode**: Clean and bright interface
- **Dark Mode**: Easy on the eyes for extended use
- **System Sync**: Automatically matches your system preferences
- **Persistent**: Your theme choice is saved

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |

---

## Build for Production

```bash
npm run build
npm run start
```

---



## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- Design inspiration from modern task management apps
- Built with amazing open-source tools and libraries
- Icons by [Lucide](https://lucide.dev/)
- UI components by [shadcn/ui](https://ui.shadcn.com/)

---

<div align="center">

**Built with Next.js and React**

</div>
