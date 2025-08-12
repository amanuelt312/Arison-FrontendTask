# VoomGo 🚗

A modern React-based driver management and approval system built with TypeScript and Tailwind CSS.

## 🚀 Technologies Used

### Core Dependencies

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing

### State Management & Data Fetching

- **Zustand** - Lightweight state management
- **TanStack React Query** - Server state management and caching

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Development Tools

- **ESLint** - Code linting and formatting
- **SWC** - Fast React refresh plugin

## 📁 Project Structure

```
voomgo/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── layout/         # Layout components (Navbar, Sidebar)
│   │   ├── nav/            # Navigation components
│   │   └── ui/             # Basic UI components (Button, Input, Modal)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries and API config
│   ├── pages/              # Page components
│   ├── store/              # Zustand store configuration
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd voomgo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Build & Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment.

## 🔧 Key Features

- **Authentication System** - Protected routes with auth refresh
- **Driver Management** - View and manage driver information
- **Approval Workflow** - Driver approval and suspension system
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript implementation
- **Modern Architecture** - React Server Components ready
