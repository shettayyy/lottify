# Lottify

Lottify assists with providing the backend services required to list, search, preview, upload and retrieve lottie files

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details open>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#design-decision">Design Decision</a></li>
    <li><a href="#schema-design">Schema Design</a></li>
    <li><a href="#linting">Linting</a></li>
    <li><a href="#environment-variables">Environment Variables</a></li>
    <li></li><a href="#deployment">Deployment</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Lottify assists with providing the backend services required to list, search, preview, upload and retrieve lottie files. The project is built using Node.js, Express.js, MongoDB and Mongoose. The project is also linted using ESLint and Prettier. The project is also using Husky, Lint-Staged, Commitlint and Conventional Commits for commit linting.

### Built With 🧡

<!-- Typescript -->
<a href="https://www.typescriptlang.org/"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="Typescript" />
</a>
<!-- Javascript -->
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference" />
  <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</a>
<!-- Node.js -->
<a href="https://nodejs.org/en/"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
</a>
<!-- Express.js -->
<a href="https://expressjs.com/"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
</a>
<!-- MongoDB -->
<a href="https://www.mongodb.com/"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</a>
<!-- Mongoose -->
<a href="https://www.docker.com/"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</a>
<!-- Docker -->
<a href="https://eslint.org/"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
</a>
<!-- Prettier -->
<a href="https://prettier.io/"/>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white" alt="Prettier" />
</a>
<!-- AWS -->
<a href="https://aws.amazon.com/"/>
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS" />
</a>

<!-- GETTING STARTED -->

## Getting Started 🚀

To get a local copy up and running follow these simple steps.

### Prerequisites 📋

- Node.js
- NPM

### Installation 🛠️

1. Clone the repo

   ```sh
   git clone https://github.com/shettayyy/lottify
   ```

2. Install NPM packages

   ```sh
   npm install
   ```

3. Download the `.env` file shared with you and add it in the root directory. Check .env.template for reference

## Usage 📝

Start the server

```sh
npm run start:dev
```

The server should be running on `http://localhost:3000/graphql`

For the production build

```sh
npm run build
npm start
```

## Design Decision 🎨

We use apollo server for building our endpoint. The server helps with the following:

- Get a list of all lottie files sorted by the latest uploaded. You can also search for a specific file by providing the search query. We search for the file name, author name, description and user filename. The returned list is paginated.
- Get a single lottie file by providing the id.
- Upload a lottie file. The file is uploaded to an AWS S3 bucket and the metadata is stored in the MongoDB database. The upload and metadata retrieval happens without blocking the main thread or making the user wait for the upload to complete.
- Get a signed URL for the lottie file. The signed URL is valid for 5 minutes and can be used to download the file from the S3 bucket.
- For the sake of better user reviews, you can clone, clear cloned and clear all lotties to start from scratch.

## Schema Design 📐

All details about the schema design can be found in the `src/graphql/schema.graphql` file or by visiting the `/graphql` endpoint. I have documented each field and it's visible on the studio.

## Linting 🧹

We are using the following tools for linting:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Lint-Staged](https://www.npmjs.com/package/lint-staged)
- [Commitlint](https://commitlint.js.org/#/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Environment Variables 🌍

We are using the following packages for managing environment variables:

- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Envalid](https://www.npmjs.com/package/envalid)

Envalid is used for validating the environment variables and Dotenv is used for loading the environment variables from the `.env` file.

## Deployment 🚀

The project is deployed on [Railway](railway.app). The deployment is done automatically when a new commit is pushed to the `main` branch.

<!-- CONTRIBUTING -->

## Contributor

- [Shettayyy](https://github.com/shettayyy)
