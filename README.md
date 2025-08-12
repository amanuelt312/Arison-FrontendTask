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

## Pages

### Login (`/login`)

- **Purpose**: Authenticate admin users.
- **Behavior**: Validates email/password, uses React Query mutation, shows button loading state and error text.

### User Management (`/user-management`)

- **Purpose**: Main dashboard landing page.
- **Contains**:
  - `DriverOverview`: high-level driver metrics.
  - `ApprovalRequests`: list preview of pending driver approvals with quick navigation.
  - `DriverTable`: searchable, paginated driver list with actions (suspend/activate).
- **States**: Uses shared `Loading` and `EmptyState` patterns where applicable.

### Driver Approval (`/driver-approval`, `/driver-approval/:id`)

- **Purpose**: Review and approve/decline pending driver applications.
- **Layout**:
  - Left: list of pending drivers.
  - Right: contact details and documents for the selected request with Approve/Decline actions.
- **States**:
  - Loading via `Loading` component.
  - Empty list via `EmptyState` with helpful messaging.

### Driver Detail (`/drivers/:id`)

- **Purpose**: Inspect a driver’s profile, stats, vehicle details, documents, and activity.
- **Highlights**: Summary stats, vehicle information, documents, and tabbed sections for trips/withdrawals/ratings.
- **States**: Loading via `Loading`, error text for failed fetches.

### Drivers Alias (`/drivers`)

- **Purpose**: Shortcut route that currently maps to the User Management view.

### Auth & Navigation

- Protected routes use `RequireAuth` to redirect unauthenticated users to `/login`.
- API requests are centralized in `src/lib/api.ts` with automatic token refresh on 401 and preflight refresh near expiry.
