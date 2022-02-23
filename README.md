# selenium-docker

## Image Setups

This repo contains a variety of distinct docker image setups:

### node
This is the simplest of the setups as it is just a NodeJS image that executes a "Hello World" NodeJS script.

### node-chrome
This setup downloads latest Chrome and corresponding chromedriver, installs Selenium, then executes a Selenium test.

### node-chrome-packagejson
The same setup as _node-chrome_ but using a _package.json_ file to install dependencies. This makes it more cross-functional when just installing and running the project outside of a container.

## Misc
Issue on Stackoverflow: https://stackoverflow.com/questions/71135033/nodejs-selenium-webdriver-for-linux-chrome-docker-image