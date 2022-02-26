# tm-bst

TM Blood Sugar Tracker

# setup

## A) server

### --base

npm init
npm install express;
npm install -D typescript ts-node-dev @types/express @types/node;

npx tsc --init

"start": "ts-node-dev ./index.ts"

### --logger

npm i winston morgan;
npm i -D @types/morgan
utils/logger.ts

### --db

npm i mongoose

### heroku deployment subtree

npx heroku login
npx heroku git:remote -a tm-bst
git subtree push --prefix server/ heroku main
