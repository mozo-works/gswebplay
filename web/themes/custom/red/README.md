# Installation

Red brand theme uses [Gulp](http://gulpjs.com) to compile Sass. Gulp needs Node.

#### Step 1
Make sure you have Node and npm installed. 
You can read a guide on how to install node here: https://docs.npmjs.com/getting-started/installing-node

#### Step 2
Install bower: `npm install -g bower`.

#### Step 3
Go to the root of Red brand theme and run the following commands: `npm run setup`.

#### Step 4
Update `browserSyncProxy` in **config.json**.

#### Step 5
Run the following command to compile Sass and watch for changes: `gulp`.


### Style guide

/* Color palette */

$brick: #c5241f;
$dark-sky-blue: #4990e2;
$orangey-yellow: #f8ae1c;
$dark-blue-grey: #1a284a;

$greyish-brown: #4a4a4a;
$pinkish-grey: #bbbbbb;
$white: #e0e0e0;
$white-two: #d8d8d8;

/* Text styles */

.Text-Style {
  font-family: NotoSansCJKjp;
  font-size: 28px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: normal;
}

.Text-Style-2 {
  font-family: NotoSansCJKjp;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.75;
  letter-spacing: normal;
}
