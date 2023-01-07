# About
This code is a Node.js server using the Express.js framework and the EJS template engine. It allows users to upload multiple photos using the Multer library, which are then processed and modified by the Graphics Magick library. The modified photos are then saved in a new folder and displayed in the "results" template.

# Installation
To use this code, you will need to install the required packages:
1. Express.js: **`npm install express`**
2. EJS:        **`npm install ejs`**
3. Multer:     **`npm install multer`**
4. Path:       **`npm install path`**

or, if you have the `package.json` file from this repository, you can simply run `npm i`

You need the `ImageMagick` magic and the `GraphicsMagick` packages too.

Mac (using [brew](https://brew.sh)):
1. **`brew install imagemagick graphicsmagick`**

Windows (using [chocolatey](https://chocolatey.org/install)):
1. **`choco install graphicsmagick imagemagick`**

Linux (using sudo on Ubuntu, Debian, and other Debian-based distributions):
1. **`sudo apt-get install graphicsmagick imagemagick`**

Linux (using CentOS, Fedora, and other Red Hat-based distributions):
1. **`sudo yum install graphicsmagick imagemagick`**

# Running the code
Once the packages are installed, you can start the server by running `node index.js` in the terminal. You can then access the upload form at `http://localhost:3000/`.
