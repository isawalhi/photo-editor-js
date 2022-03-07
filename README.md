# Albelli Photo Editor

This repository contains a basic Photo Editor app

## System requirements

In order to build the project you will need [Node.js](https://nodejs.org/en/).

In the root of this repository, you can resolve all these dependencies via
the command line using:

    npm install
    
You can now start developing the application using Webpack by typing:

    npm start
    
The following will happen:

 * All JavaScript is included and built for the browser
 * All SASS styles are converted into CSS
 * Your browser will open and run the application
 * File watchers are started

You can add / remove / change files to in the source folder and your
browser will automatically update to reflect the changes using live reload.

You can run the by typing:

    npm run test:coverage

## Issues
 * Hot module replacement is broken 
 * Bundle size is a big due to antd library 
 * babel-import didn't work as expected, therefore antd components are imported form the lib
 * Scale factor is saved as part of the instructions
 * Image flickers when reset or apply instruction is applied, the transition should go smooth
 
