## Set up project and run

Make sure [Node.js](https://nodejs.org/) is installed.

Before running project make sure to install:

`npm install -g json-server`

Navigate to the project folder and install dependencies:

`npm install`


### Start development server

First run

`json-server --watch db.json --port 3004`

Then run

`npm start`

Open [http://localhost:3000/users](http://localhost:3000/users) in the browser to see list of user.
Open [http://localhost:3000/addUser](http://localhost:3000/addUser) in the browser to add new user.

### Build application

`npm run build`

The built files are output to the `dist/` folder.
