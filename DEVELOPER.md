
# GLR Reporting - Developer README

## Overview

This project is a React-based web application used for managing GLR reports. It leverages modern tools like **Vite** for fast development builds, **ESLint** for linting, and **Prettier** for code formatting. This README explains the setup, configuration, and available commands for working with the GLR Reporting application.

## Project Structure

The project is configured as a module-based React app, with the following key dependencies and tools:

- **Vite**: A fast development server and build tool.
- **React**: For building the user interface.
- **PrimeReact**: A UI component library.
- **AG-Grid**: A powerful data grid used for displaying tabular data.
- **Lodash**: Utility functions for data manipulation.
- **Date-fns**: Utility library for date formatting and parsing.
- **ESLint & Prettier**: For linting and formatting JavaScript code.
- **Husky & Lint-Staged**: Used for ensuring code quality before committing.

---

## Scripts and Commands

The project is configured with several npm scripts that you can use to manage the development lifecycle. Below is a breakdown of each command and what it does:

### Development and Build

- **`npm run dev`**  
  Runs the Vite development server. This is used for local development, and the app will be available at `localhost:3000` by default. It also provides hot module reloading (HMR) for quick feedback as you develop.

  ```bash
  npm run dev
  ```

- **`npm run build`**  
  Builds the project for production by generating static assets in the `dist` folder. The assets are optimized for production, including minified JavaScript and CSS.

  ```bash
  npm run build
  ```

- **`npm run preview`**  
  Starts a local server to preview the build. This is useful for testing the production build locally before deploying.

  ```bash
  npm run preview
  ```

### Deployment

- **`npm run deploy`**  
  Deploys the production build to GitHub Pages. Before deploying, it runs the `build` command to ensure that the latest changes are compiled.

  ```bash
  npm run deploy
  ```

### Code Quality and Formatting

- **`npm run lint`**  
  Runs **ESLint** on the specified files (`src/components/*.{js,jsx}`) to check for JavaScript code quality issues.

  ```bash
  npm run lint
  ```

- **`npm run lint:fix`**  
  Runs **ESLint** with the `--fix` flag, which attempts to automatically fix linting issues.

  ```bash
  npm run lint:fix
  ```

- **`npm run prettier`**  
  Runs **Prettier** to format all the JavaScript, JSX, JSON, CSS, and Markdown files under the `src/` folder.

  ```bash
  npm run prettier
  ```

- **`npm run format`**  
  A convenience command that runs both the `lint:fix` and `prettier` commands, ensuring that the code is linted and formatted in one go.

  ```bash
  npm run format
  ```

### Git Hooks

- **Husky & Lint-Staged**  
  The project uses **Husky** and **Lint-Staged** to ensure that only properly formatted code is committed. Husky runs the lint and format checks before the commit is finalized, ensuring that all JavaScript code is clean and adheres to the project's coding standards.

---

## Dependencies

### Core Dependencies

- **React & React-DOM**: Core libraries for building and rendering the UI.
- **PrimeReact**: A component library with rich UI elements like buttons, modals, and tables.
- **AG-Grid**: A grid library for rendering tabular data with support for features like sorting, filtering, and editing.
- **Lodash**: Provides utility functions for data manipulation.
- **Date-fns**: A date utility library for formatting and parsing dates.

### Development Dependencies

- **Vite**: The build tool and dev server for the project.
- **ESLint**: Linting tool for identifying and reporting on JavaScript patterns.
- **Prettier**: Code formatter for ensuring consistent code style.
- **Husky & Lint-Staged**: Used for setting up Git hooks to lint and format code before commits.
- **gh-pages**: Utility to deploy the app to GitHub Pages.

---

## Environment Variables

The project uses several environment variables defined in `.env` files to manage configuration:

- **`VITE_GLR_REPORTING_URL`**: API endpoint for fetching and updating study data.
- **`VITE_ADD_ROW_ALLOWED_ROLES`**: Defines which user roles are allowed to add new rows to the data grid.
- **`VITE_VIEW_LOG_ALLOWED_ROLES`**: Defines which user roles are allowed to view logs.

Make sure to create a `.env` file in the root directory and add the necessary environment variables.

---

## Deployment

To deploy the application, you can use GitHub Pages. The deploy script automatically builds the app and pushes it to the `gh-pages` branch:

1. Run the build script:
   ```bash
   npm run build
   ```

2. Deploy the build:
   ```bash
   npm run deploy
   ```

---

## Running the Application Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/glr-reporting.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

---

## Contribution Guidelines

- Ensure all code passes linting and formatting before submitting a pull request. You can do this by running:
  ```bash
  npm run format
  ```

- For code style consistency, follow the Prettier and ESLint configurations already defined in the project.
  
---

## License

This project is licensed under the MIT License.

--- 

## Additional Notes

- **Vite** is used instead of Create React App (CRA) for faster builds and improved performance.
- **ESLint** is configured to work with **React Hooks** and enforce best practices for modern React development.
- **Prettier** ensures code is consistently formatted across the project.
