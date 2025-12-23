News Explorer Frontend
A modern news aggregation web application built with React and Vite. This project allows users to search for news articles, save their favorites, and manage their reading preferences through a clean, responsive interface.

 Features
News Search: Search for articles using keywords with real-time API integration
Article Management: Save and organize favorite articles for later reading
User Authentication: Secure login and registration system
Responsive Design: Optimized for desktop, tablet, and mobile devices
Modern UI: Clean, intuitive interface following contemporary design principles
 Technologies Used
Core Technologies
React 18 - Modern functional components with hooks
Vite - Fast build tool and development server
React Router - Client-side routing and navigation
JavaScript/TypeScript - Modern ES6+ features
Development Tools
ESLint - Code linting and quality enforcement
React DevTools - Component debugging and optimization
CSS3 - Modern styling with Flexbox and Grid
API Integration
News API - Real-time news data fetching
Custom Backend API - User authentication and saved articles management
 Installation
Prerequisites
Node.js (version 16 or higher)
npm, yarn, or pnpm package manager
Setup Instructions
Clone the repository

bash
git clone <repository-url>
cd news-explorer-frontend

Install dependencies

bash

# Using npm

npm install

# Using yarn

yarn install

# Using pnpm

pnpm install

Environment Configuration

bash

# Create environment file

cp .env.example .env

# Add your API credentials

VITE_NEWS_API_KEY=your_news_api_key_here
VITE_BACKEND_URL=your_backend_url_here

Start the development server

bash
npm run dev

Open your browser
Navigate to http://localhost:5173 to view the application

 Project Structure
angelscript
src/
├── components/ # Reusable UI components
│ ├── App/ # Root application component
│ ├── Header/ # Site header and navigation
│ ├── Navigation/ # Navigation menu
│ ├── SearchForm/ # News search functionality
│ ├── NewsCard/ # Individual news article display
│ ├── Preloader/ # Loading spinner component
│ ├── ModalWithForm/ # Reusable modal component
│ ├── LoginModal/ # User login interface
│ ├── RegisterModal/ # User registration interface
│ ├── About/ # About section component
│ └── Footer/ # Site footer
├── pages/ # Page-level components
│ ├── MainPage/ # Home page with news search
│ └── SavedNewsPage/ # User's saved articles
├── utils/ # Utility functions and API calls
│ ├── api.js # API service functions
│ └── helpers.js # Helper utilities
├── assets/ # Static assets
│ ├── images/ # Image files
│ └── fonts/ # Custom fonts
└── vendor/ # Third-party CSS (normalize, etc.)

 Design Resources
This project follows the design specifications from:

Figma Design for News Explorer
Typography Guidelines
 Responsive Design
The application is fully responsive and tested on:

Desktop: 1280px and above
Tablet: 768px - 1279px
Mobile: 320px - 767px
 Routing
/ - Main page with news search and results
/saved-news - User's saved articles (authentication required)
 Available Scripts
bash

# Development server

npm run dev

# Production build

npm run build

# Preview production build

npm run preview

# Run linting

npm run lint

# Fix linting issues

npm run lint:fix

 Deployment
Build for Production
bash
npm run build

The build artifacts will be stored in the dist/ directory and can be deployed to any static hosting service.

Deployment Options
Netlify: Drag and drop the dist folder
Vercel: Connect your Git repository
GitHub Pages: Use the built-in Actions workflow
 Configuration
Vite Configuration
The project uses a custom Vite configuration for:

React plugin setup
Path aliases for cleaner imports
Development server settings
Build optimization
ESLint Rules
React Hooks rules for proper hook usage
Modern JavaScript best practices
Code formatting standards
 Development Workflow
Branch Strategy: Use feature branches for new development
Code Style: Follow the established ESLint configuration
Component Structure: Use functional components with hooks
CSS Organization: Component-scoped styles with BEM methodology
Testing: Manual testing across different device sizes
Known Issues
Modal animations may need refinement in older browsers
Search results pagination to be implemented in future versions
Offline functionality planned for upcoming releases
Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
 License
This project is part of a web development bootcamp curriculum. All rights reserved.

 Support
For questions or issues:

Check the project documentation
Open an issue in this repository
Contact the development team
Built with  using React and Vite
