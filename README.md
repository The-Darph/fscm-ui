# fscm-ui

> Front-end interface to view data coming from the fscm API.

## What it is

Once deployed you can grab a list of fasisct events happening right now from your own API.
By default this is just a front-end that assumes you are running the `fscm-api` API backend
which is written in Rust but requires nothing but a simple build and deploy command to get going.

The data used to populate the database is open source but it's on your to run and maintain your own
database and backend. This front-end only works with the backend you connect it to and it will not work
with the official `fscm-api` backend unless you have the API key.

## Setup

TBD

1. Run `npm install` (ensure you're using Node v22.15.0)
2. There may or may not be configs to edit for your environment

## Build

TBD - I'll write this up as soon as the project gets more involved

## Deploy

TBD - Likely going to deploy using PM2 and/or git hooks
