[![Build Status](https://travis-ci.org/agl0809/location-history-player.svg?branch=master)](https://travis-ci.org/agl0809/location-history-player)

- [Installation](#installation)
- [Settings](#settings)
- [Available scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Dependencies](#scaffolding)  
- [Scaffolding](#scaffolding)


## Installation
```bash
git clone https://github.com/agl0809/location-history-player/
cd location-history-player
npm install
```

## Settings
There are two different ways to setting up the data provided in **constants.js**<br>

[Firebase service](https://api-project-923029851043.firebaseio.com/locations.json)<br>
By default Firebase service example will be used.   
```javascript
export const JSON_FILE_URL = 'https://api-project-923029851043.firebaseio.com/locations.json';
``` 

[Google Takeout](https://takeout.google.com/settings/takeout)<br> 
Use a specific data file downloading the location history JSON file. Then move it to `/public` project folder .<br>
```javascript
export const JSON_FILE_URL = '/YOUR_FILE_NAME.json';
``` 

## Available scripts  
In the project directory, you can run:

**npm start**<br>
Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.<br>
The page will reload if you make edits.You will also see any lint errors in the console.

**npm test**<br>
Launches the test runner in the interactive watch mode.

**npm run build**<br>
Builds the app for production to the `build` folder.

## Dependencies 
[leaflet](https://github.com/Leaflet/Leaflet)<br>
[leaflet.heat](https://github.com/Leaflet/Leaflet.heat)

## Scaffolding
[create-react-app](https://github.com/facebook/create-react-app)







 
