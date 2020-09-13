# PennApps XXI Virtual Hackathon Submission

Devpost: [link](https://devpost.com/software/interviewme-6s7wrk)

Team: 
* Kai Chen
* Amy Lei
* Raymond Wu
* Jonathan Zhang

Stack:
* React.js
* Django REST API

## Quickstart:
### General Setup
* `git clone git@github.com:kx-chen/pennapps.git`
* `cd pennapps`

### Run Django Backend
* `pip install -r requirements.txt`
* `cd djangoapp/reactapp`

### Run React Frontend
* `cd djangoapp/reactapp`
* `npm install`
* `npm run build`
* `cd ../` (back to `djangoapp`)
* `python3 manage.py runserver`

### Run Speech to Text Service
* Change directory into `voice` (in root)
* `npm i`
* `export GOOGLE_APPLICATION_CREDENTIALS=<credentials>`
Replace credentials with the name of the json file containing the credentials.
* `node app.js`
