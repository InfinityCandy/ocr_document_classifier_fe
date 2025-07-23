## Project Setup

Each one of the steps described below contains the commands that need to be run in order to complete the configuration step.

This guide assumes that you already have NPM or NVM installed and configured in your machine.

1. Navigate to project's root folder:

```
$ cd ocr_document_classifier_fe
```

2. Install dependencies:

```
$ npm install
```

3. Run project:

```
$ npm start
```

## Architecture Overview

For the Architecture Overview visit the BE portion of this project: https://github.com/InfinityCandy/OCR_document_classifier_BE

### 1. Design Choices and Justifications

- The FE is structured such that it follows the Clean Architecture project's structure, where we have the following pieces:

  - Domain: Contains the models used on the application
  - Infrastructure/Adapters: Contains the login to connect to the remote services (Django) to retrive information.
  - Use cases: Contains application's main logic.
  - Presentation: Contains the Pages and Components used in the application's UI.

- ReactJS: Choosen due to the familiarity with the library.

## AI Tools used

- Cursor: Used to create a quick an simple UI for an applicatio whose logic is more loaded to the BE part.

- ChatGPT: For querying more general questions.

## Improvements

- Work on the UI look and feel.
- Add some testing around the different UI components of the application.
- Add necessary logic for deployment into AWS using CDK.
- Add GitHub actions pipeline for CI/CD.
