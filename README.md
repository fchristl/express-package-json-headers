# Fill version and name from package.json in headers for express applications

## Setup

    npm install --save express-package-json-headers
    
## Usage

The package exports a middleware function called `addPackageJsonHeaders`. It parses the contents of `package.json` in 
current working directory and sets the `X-Package-Version` and `X-Package-Name` headers respectively.

A primitive example can be found in [the example folder](example/index.js):

    const {addPackageJsonHeaders} = require('../dist/index');
    const express = require('express');
    const app = express();
    
    app.use(addPackageJsonHeaders);
    
    app.get('/', (req, res) => res.send('Hi!'));
    app.listen(3000);