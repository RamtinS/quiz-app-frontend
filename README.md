# Quiz-app-Frontend: Hubro
This project serves as the backend for a full-stack application. This is a part of a project of IDATT2105 Full-stack application development at NTNU.

## Team
- Ramtin Forouzandehjoo Samavat
- Tobias Skipevåg Oftedal
- Jeffrey Yaw Annor Tabiri

##Table of Contents
- [Overview](#overview)
- [Wiki](#wiki)
- [Features](#features)
- [Setup and Run](#setup-and-run)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview
The Semester Project is a full-stack web application aiming to provide a comprehensive and user-friendly platform for creating, managing, and taking quizzes for educational, training, or entertainment purposes. The project utilizes the following technologies:

Frontend: Vue.js
Backend: Java 21 with Spring Boot V3
Database: MySQL for runtime and H2 for tests

## Wiki
These are system documents which describes the various aspects of a software system. These documents capture the details of the system's design, implementation, operation and maintenance, serving as a reference for developers.
- [System Architecture Program](#overview)
- [Class Diagram](#wiki)
- [Flowchart](#flowchar)
- [Sequence Diagram](#credits)
- [Wireframes](#frames)

## Features
* Users of the program can log in securely, register themselves and manage their accounts.
* Authenticated users can create quizzes by adding questions and specifying categories.
* Users can tag questions with keywords and categorize them into topics or subjects.
* Users can search for quizzes and filter them based on their fields.
* Allows users to add, edit, delete, organize, and manage their quiz.
* Allows users to gain score on every quiz and track their progress
* Allows users to contact us if there were to be any problems by writing in our feedback channel.

## Setup and Run

1. Clone the repository
   ```sh
   git clone git@github.com:Skippyoftedal/quiz-app-frontend.git
   ```
   
2. Install all dependencies
   ```sh
   npm install
   ```
3. Compile 
   1. Hot-Reload for Development: 
      ```sh 
      npm run dev
      ```
   2. Minify for Production: 
      ```sh 
      npm run build
      ```

## Test

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

## License
This project is licensed under the MIT License.

## Acknowledgements
Special thanks to the subject teachers for creating this assignment and providing us with the opportunity to develop this project.

