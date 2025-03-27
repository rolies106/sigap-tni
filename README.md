# Clarium

Clarium Core, Whatsapp Bot for reporting

## Requirement

1. [required] Run `docker compose up -d --build mysql` to run mysql as a Database.
2. [required] Create `.env` file based on `.env.example`, and change the credential based on your installation.
3. As a default this bot will use ChatGPT and Dikte.in engine to process the audio and also do some AI related processing, so makesure you add token for that services to `.env` file.

## Installation

1. `npm install`, to fetch all the libraries required.
2. `npm start`, to run the services.