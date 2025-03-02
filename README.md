# GitHub Repo Explorer

A lightweight React application to explore GoDaddy's GitHub repositories. It fetches repositories from the GoDaddy GitHub organization and allows users to view details such as description, languages used, stars, forks, and more.

This project is hosted on GitHub Pages.

View live at: https://netam-bhardwaj.github.io/github-repo-explorer/

# Features:

- Repository List: Fetches and displays a list of repositories from the GoDaddy GitHub organization.

- Search: Allows users to search repositories by name or description.

- Repository Details: Displays detailed information about a repository, including:

* Description
* Languages used
* Stars, forks, and watchers count
* Default branch
* Open issues count
* Last updated date

- Responsive Design: Works seamlessly on both desktop and mobile devices.

# Libraries/Technologies Used:

- Vite: Used for a faster development experience as this is a lightweight application.

- React Router DOM: Although, normal components could have been used here for navigation as this is a two page application but to build the project in a maintainable and scalable way I have used React Router DOM as this simplifies navigation and state management between pages.

- Axios: Lightweight HTTP client for fetching data.

- Lucide React: Offers a wide range of customizable icons for a polished UI.

- Vitest: Used for fast test execution and compatibility with the Vite ecosystem.

- TypeScript: Used for type safety and reducing runtime errors.

# Omissions:

- Pagination: Fetch and display repositories in pages for better performance.

- Advanced Filtering: Add filters for sorting repositories by stars, forks, etc.

- More detailed Repo details page: We have a lot of URLs in the response which we can make an API call to get additional information about each repo, but due to time constraints I have only kept useful information and didn't over engineer the solution and add unnecessary API calls.

# Installation:

```bash
git clone https://github.com/netam-bhardwaj/github-repo-explorer.git
cd github-repo-explorer
yarn install
yarn dev
```

Open your browser and visit: http://localhost:5173

# Running tests:

```bash
yarn test
yarn test:watch //watch mode.
```

# Deployment

The project is deployed using GitHub Pages.

Build the project:

```bash
yarn build
```

Deploy to GitHub Pages:

```bash
yarn deploy
```
