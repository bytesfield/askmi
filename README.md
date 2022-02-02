<!-- @format -->

# AskMi (KoraPay Technical Test)

A Question and Answer Restful API.

# Description

This API is simple clone of Stack Overflow questions/answers system with a token-based user authentication using JWT. Some of the features are `User Registration`, `Email Verification`, `Login`, `Profile`, `Questions`, `Answers`,`Rating : up-voting/down-voting`, `Question Subscription`.

# Installation

## Step 1

Clone or download this repository to your machine:

- Clone the repo: `git clone https://gitlab.com/korapay-assessment/be-abraham-udele/-/archive/main/be-abraham-udele.zip`
- [Download from here](https://gitlab.com/korapay-assessment/be-abraham-udele/-/archive/main/be-abraham-udele.zip).

## Step 2

### Configuration

`npm install` to install all application dependencies.

Update Environment variables, rename `.env.example` to `.env` then update `DATABASE`, valueS to your credentials update `APP_PORT` to your desired port default is `3000`, also `APP_ENV` to `production`, `development` or `test` depending on your environment, default is `development`.

For email configuration in `.env` update the `EMAIL` or `MAILGUN` credentials respectively depending on your mailing service. When using mailgun, export the `mailgunService` from the `nodemailer.ts` module in the `src/utils/modules` directory, while `emailService` if you are using a other mailing service like smtp and pass the required parameters for sending mails. Update `REDIS_URI` to your url default `redis://localhost:6379`, update `JWT_SECRET` and `COOKIE_SESSION_SECRET` to your desired values.

To seed default data to test API execute

`npm run db:seed` to seed data to test API.`

To reverse seeded data execute

`npm run db:seed:undo`

For Testing execute

`npm test` to run tests.

### Step 3

Start your development server : `npm run dev` this serves the application to default `localhost:3000`
For production : `npm run build` this builds the Application and then `npm start` to start the server.

### Step 4

Open Postman run the Api endpoints. Documentation can be accessed below

Note: Use active emails for testing as you will receive emails to your inbox.

# Documentation

The API documentation is hosted on [Postman Doc](https://documenter.getpostman.com/view/10912779/UVeFMRvt)

# Contribution

Want to suggest some improvement on the codes? Make a pull request to the `dev` branch and it will be reviewed and possibly merged.

Find me on
<a href="https://twitter.com/SaintAbrahams/">Twitter.</a>
<a href="https://www.linkedin.com/in/abrahamudele/">Linkedin.</a>

# License

Source codes is license under the MIT license.
