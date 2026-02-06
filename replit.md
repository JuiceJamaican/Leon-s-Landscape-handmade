# Leon's Landscape Supplies

## Overview

A minimalist business website for Leon's Landscape Supplies, a company offering landscape materials, machine rentals, and firewood delivery services. The application features a public-facing marketing site with service pages and a protected admin panel for content management. Built with a React frontend and Express backend using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight alternative to React Router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and hover effects
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js running on Node.js
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints defined in shared/routes.ts
- **Build System**: Vite for frontend, esbuild for server bundling

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: shared/schema.ts
- **Migrations**: Drizzle Kit with push command (db:push)
- **Pattern**: Singleton pattern for site content (single row stores all configuration)

### Authentication
- **Method**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL via connect-pg-simple
- **Protected Routes**: Admin panel requires authentication
- **Secret Access**: 5-click logo trigger navigates to /admin

### Key Design Decisions

1. **Shared Schema Pattern**: Database schemas and API route definitions live in /shared directory, accessible to both client and server for type safety.

2. **Content Management**: Site uses a single-row "site_content" table storing all configurable content (images, YouTube links, contact info) rather than multiple tables.

3. **Component Library**: shadcn/ui components in client/src/components/ui/ provide consistent, accessible UI primitives with Radix UI primitives underneath.

4. **Path Aliases**: TypeScript paths configured for clean imports (@/ for client/src, @shared/ for shared directory).

## External Dependencies

### Database
- PostgreSQL (required, configured via DATABASE_URL environment variable)
- Drizzle ORM for database operations
- connect-pg-simple for session persistence

### Authentication
- Replit Auth via OpenID Connect
- Passport.js with openid-client strategy
- Session-based authentication with express-session

### UI Framework
- Tailwind CSS for styling
- Radix UI primitives (accordion, dialog, dropdown, etc.)
- shadcn/ui component patterns

### Required Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Secret for session encryption
- `ISSUER_URL`: Replit OIDC issuer (defaults to https://replit.com/oidc)
- `REPL_ID`: Automatically provided by Replit