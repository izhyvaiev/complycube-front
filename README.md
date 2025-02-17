## Description

React based identity verification UI for [ComplyCube](https://complycube.com/)

## Preparation

Run the following command to copy the appropriate environment variables into the correct file

```bash
cp .env.example .env
```

This repo uses git submodule [complycube-shared](https://github.com/izhyvaiev/complycube-shared)
The module provides shared typings and validation for front and back end  
After cloning this repo please fetch submodule sources with following command:

```bash
git submodule update --init --recursive
```

To run this app you'll need a Node v22
To start code run the commands below
Due to ComplyCube api are not accepting web url patterns with custom port number
(Or at least I wasn't able to figure out such pattern)
App needs to be run on 80 port, which might require at some systems run it as root using `sudo`

```bash
npm install
npm run dev
```

## Basic overview

App use redux storage to ensure user can continue where he left if he accidentally closes browser
Session id is server-side generated for every new flow
To pick-up a previous session you can just open URL http://localhost/verification/sessionId
If you've all documents were submitted to ComplyCube, you will be automatically redirected to results page

What wasn't done due to the lack of time:
(I'm aware this is a requirement in production app, I had it in mind, and I'm really sorry I do not have time to do all 100%)
- Automatic token refresh on expiration. API endpoint is on place, this would be done as an extension of baseQuery
- Initial intention of the login page was to verify if session exists by user email and if yes - get it from server and put to redux store to allow user to continue where he lest
- End-to-end tests, this is a must have and a main miss. I'm aware of that.
- Better handling of document submission (now user need to close the pop-up to proceed to next screen). Not sure if automatic transition there will be the best idea, but adding it is a single line of code