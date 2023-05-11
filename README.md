# **Davao Parking Admin** <!-- omit in toc -->

This is the repository for the Parking Admin Dashboard.

# **Table of Contents** <!-- omit in toc -->

- [**Tech Stack**](#tech-stack)
  - [**Main**](#main)
  - [**Routing**](#routing)
  - [**Styling and UI**](#styling-and-ui)
  - [**State Management**](#state-management)
  - [**Data Management**](#data-management)
  - [**Testing**](#testing)
- [**Project Structure**](#project-structure)
  - [**Directory Structure**](#directory-structure)
  - [**Directory Definitions**](#directory-definitions)
    - [**Application**](#application)
    - [**Domain**](#domain)
    - [**Tests**](#tests)
- [**Commands**](#commands)
- [**👀 Want to learn more?**](#-want-to-learn-more)

# **Tech Stack**

## **Main**

- ReactJS (Vite): https://vitejs.dev/guide/

## **Routing**

- React Router: https://reactrouter.com/en/main

## **Styling and UI**

- TailwindCSS: https://tailwindcss.com/docs/installation
- Ant Design: https://ant.design/components/overview/

## **State Management**

- Redux: https://redux.js.org/introduction/getting-started

## **Data Management**

- Apollo Client (GraphQL): https://www.apollographql.com/docs/react/
- Axios (REST): https://axios-http.com/docs/intro

## **Testing**

- Vitest: https://vitest.dev/guide/
- React-testing-library: https://testing-library.com/docs/react-testing-library/intro/

# **Project Structure**

This project follows the [Domain-Driven Design (DDD)](https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design) approach _(hope to be)_. The project is divided into three main directories: `application`, `domain`, and `tests`.

## **Directory Structure**

```
.
├── data/
├── public/
├── src/
│   ├── application/
│   │   ├── assets/
│   │   │   ├── ...
│   │   ├── components/
│   │   │   ├── ...
│   │   ├── layouts/
│   │   │   ├── ...
│   │   ├── pages/
│   │   │   ├── ...
│   │   ├── redux/
│   │   │   ├── ...
│   │   ├── styles/
│   │   │   ├── ...
│   │   ├── utils/
│   │   │   ├── ...
│   │   ├── ...
│   ├── domain/
│   │   ├── gql-docs/
│   │   │   ├── ...
│   │   ├── infra/
│   │   │   ├── ...
│   │   ├── services/
│   │   │   ├── ...
│   │   ├── utils/
│   │   │   ├── ...
│   ├── tests/
│       ├── application
│       │   ├── ...
│       ├── domain
│       │   ├── ...
│       ├── ...
├── ...
```

## **Directory Definitions**

- data/
  - This directory holds all JSON data that are useful to store information for the dashboard.
- public/
  - This directory holds all files, images, etc. that are accessible to the public or to the users of the dashboard.
- src/
  - This directory holds all files that are related to the development of the dashboard, such as the `components`, `logics`, etc.
- src/application/
  - This directory holds all of the files that are related to the application of the dashboard, such as the `pages`, `layouts`, etc.
- src/domain/
  - This directory holds all of the files that are related to the domain of the dashboard, such as the `services`, `infrastructures`, etc.

### **Application**

The `application` directory holds all of the files that are related to the development of the dashboard, such as the `components`, `styles`, etc.

- src/application/components
  - This directory holds all of the components that are being used to develop the dashboard.
- src/application/layouts
  - This directory holds all of the layout files and is responsible for consistent layout of the web page.
- src/application/pages
  - This directory holds all of the dashboard pages and is also responsible for the url paths for each content of the dashboard.
- src/application/redux
  - This directory holds all of the redux files and is responsible for the state management of the dashboard.
- src/application/styles
  - This directory holds all files that are related to the styling of the dashboard.
- src/application/utils
  - This directory holds all of the helper functions that are useful in making the project.

### **Domain**

The `domain` directory holds all of the files that are related to the domain of the dashboard, such as the `services`, `infrastructures`, etc.

- src/domain/gql-docs
  - This directory holds all of the GraphQL documents that are being used to query and mutate data from the server.
- src/domain/infra
  - This directory holds all of the files that are related to the infrastructure of the dashboard, such as the `apollo-client`, `axios`, etc.
- src/domain/services
  - This directory holds all of the files that are related to the services of the dashboard, such as the `auth`, `parking`, etc.
- src/domain/utils
  - This directory holds all of the helper functions that are useful in making the project.

### **Tests**

The `tests` directory holds all of the tests that are related to the application and domain of the dashboard.

- src/tests/application
  - This directory holds all of the tests that are related to the application of the dashboard.
- src/tests/domain
  - This directory holds all of the tests that are related to the domain of the dashboard.

# **Commands**

- `npm run dev` - starts the development server
- `npm run build` - builds the app for production
- `npm run lint` - runs the linter
- `npm run test` - runs the tests
- `npm run preview` - starts the production server

# **👀 Want to learn more?**

Feel free to contact [BoJoNVi](https://github.com/BoJoNVi) if you have any questions and clarifications about this project.
