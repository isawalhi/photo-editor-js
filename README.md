# Photo Editor

This repository contains a basic Photo Editor app

## Scenarios

### Scenario 1.

* The user can select a photo file from his/her device and import it into the application
* The user can position and scale this photo on a canvas (note: photo must always cover full canvas size)
* Hit a submit button which will generate the print description
 These instructions should be stored locally as a JSON file.

### Scenario 2.

* The user can hit an import button which loads a previously saved JSON description
* Upon loading, the application should show a canvas that contains the photo
* Photo is scaled and positioned as expected according to the loaded print instructions

### Print description

The print description you will generate (in scenario #1 of your application)
can be in any format of your liking, as an example you could consider
the following output in JSON format:

    {
        "canvas": {
            "width": 15
            "height": 10,
            "photo" : {
                "id": “fileName”,
                "width": 20,
                "height": 20,
                "x": -2.5,
                "y": -5
            }
        }
    }

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
 * Bundle size is big due to antd library 
 * babel-import didn't work as expected, therefore antd components are imported form the lib
 * Scale factor is saved as part of the instructions
 * Image flickers when reset or apply instruction is applied, the transition should go smooth
 
