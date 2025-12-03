# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
First, set up the infrastructure. Go to the repository that you prepared for the frontend. If you haven’t done so already, create a branch for the stage locally and name it stage-1-frontend-api. This branch is where you’ll do your work.

Project Resources
Design resources for News Explorer
  🎨 Figma design for News Explorer

  🔤 Fonts for News Explorer

Design resources for custom projects
  📽️ Using Figma UI Kits for Project Design

  🔗 Free UI Toolkits from Figma

  🔗 Free Templates from Figma

  🎨 UI Toolkit Figma for Custom Projects

Project criteria documents
Custom Project Stage 1 Criteria
Custom Project Stage 2 and 3 Criteria
News Explorer Criteria Stage 1
News Explorer Criteria Stages 2 and 3
1. Scaffold the project infrastructure
Use Vite to set up the project infrastructure. You've used this tool before, but if you need a refresher, refer to this lesson.

2. Create the file structure
Prepare the project's file structure before you start creating components. Create separate directories for different types of files:

For React components: components
For auxiliary functions and API requests: utils
For images: images or assets
For third-party resources such as fonts: vendor
For CSS styles, you have two options:

Place the JS and CSS files together inside folders, grouped by component:
 components/
 ├── App
 │   ├── App.css
 │   └── App.jsx
 │
 └── Footer
     ├── Footer.css
     └── Footer.jsx
 
Or you can group files by type:
 blocks/
    ├── page.css
    └── footer.css
 
 components/
     ├── App.jsx
     └── Footer.jsx
 
3. Create component files
For News Explorer, we’ve provided a list of the minimum components needed for this project. Refer to the Figma and try to match each component with the part of the design it represents.

App — the root component of the application, created by Vite or CRA
Main page components
Header — the component that renders the site header on the page
Navigation — responsible for the navigation menu
SearchForm — contains the search bar
Main — the main component of the main page
NewsCard — the news articles
About — the component that displays information about the author
Footer — the component that renders the footer
Preloader — responsible for the preloader (described below)
The Saved News page will require similar components. Some can be reused, like Navigation, Footer, and NewsCard. Others might work better as separate components.
ModalWithForm — a generic, reusable modal component
LoginModal and RegisterModal — modal components that wrap ModalWithForm
For custom projects, the necessary components will vary, but the following should be included: App, Header, Navigation, Main, Footer, Preloader, ModalWithForm, LoginModal, RegisterModal, as well as components to render data from the server.

We strongly recommend using only functional components.

4. Routes
Use React Router to implement the necessary routes. There should be at least two routes:

The / route should display the project's main page.
One other route.
For News Explorer, the second route is called /saved-news.
For a custom project, the choice is yours. Options include a user profile page or an “about us” page.
There should be navigation links leading to all pages:

Clicking on the logo or "Home" navigation item should lead to /.
There should be working navigation links leading to all other routes.
5. HTML and CSS
For custom projects, you can use the UI toolkit that we prepared for you, or you can use some of the free templates and toolkits that Figma makes available.

🎨 UI Toolkit Figma for Custom Projects

🔗 Free UI Toolkits from Figma

🔗 Free Templates from Figma

If you're familiar with using Figma, you can create your own prototype there first and then start building the markup in the code editor.

For the News Explorer project, adhere to the provided Figma design:

🎨 Figma design for News Explorer

🔤 Fonts for News Explorer

All projects must meet the HTML and CSS requirements described in the project criteria PDFs.

💡 The CSS for this project is challenging, so we prepared a list of tips.

6. Hard-code the API data
Since Stages 1.1 and 1.2 are submitted simultaneously, you are welcome to implement API interactions as soon as you want. For custom applications, in particular, we recommend connecting with the API sooner rather than later to ensure you create your components appropriately.

However, it is feasible to hard-code this information while working on the initial build of the project. To do so, refer to the API’s documentation to see what sort of data it will provide in the response and use this to create an array of suitable objects.

7. Modal window behavior
At this stage of the project, it is sufficient for modals to open and close. Form submission behavior can wait for the next stage.

Modals should open upon clicking the corresponding button, and they should be closed by clicking on the cross icon or the area outside its borders or pressing the Escape key.

A modal sign-in. It has an email address and password field with a button labelled "Sign in" and a link below saying "Sign up"

8. The preloader
The preloader is an animation the user sees while waiting for the news API to respond. You can create the component now. We’ll explain how to use it in Stage 1.2.

A circular preloader with text underneath saying "Searching for news..."
A sample preloader

To implement it, create a component called <Preloader /> that contains a <div> with the class circle-preloader, plus the necessary text. Here's the CSS for the animation: 

.circle-preloader {
  display: block;
  width: 50px;
  height: 50px;
  border: 4px solid #444;
  border-bottom-color: #888;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  animation: spin .75s infinite linear;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

