### Node-Project
- The homepage at '/' will show live updates on the JSON file.
- The '/add?key=XXX&val=XXX' route takes two query parameters: key and val and adds them to the JSON file. If either of them is missing, you will get an error with status 400.
- The '/getValue?key=XXX' route takes an key parameter and returns the corresponding value from the JSON. If the key is not found, then you will get an error with status 404.
- Any other route will give an error with status 400.

### Instructions
- npm install - will install all the dev and non dev dependencies
- npm start - starts the server at port 3000
- npm test - runs the test suite with mocha
- npm build - babel compiles ES6 code into ES5 into the dist/ directory
- npm clean - deletes the dist/ directory
