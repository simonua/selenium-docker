# 1) Build from this Dockerfile's directory:
#       docker build -t "<some tag>" -f Dockerfile .
# 2) Start the image (e.g. in Docker)
# 3) Observe that the button's value is printed.
# ---------------------------------------------------------------------------------------------

# 1) Restore npm packages in a separate layer
FROM node:latest as build
WORKDIR /home/node
COPY package.json .
RUN npm config set unsafe-perm true
RUN npm i

# 2) Build the final image
FROM node:latest

# 3) Install latest stable Chrome
# https://gerg.dev/2021/06/making-chromedriver-and-chrome-versions-match-in-a-docker-image/
RUN echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" | \
    tee -a /etc/apt/sources.list.d/google.list && \
    wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | \
    apt-key add - && \
    apt-get update && \
    apt-get install -y google-chrome-stable libxss1

# 4) Install the Chromedriver version that corresponds to the installed major Chrome version
# https://blogs.sap.com/2020/12/01/ui5-testing-how-to-handle-chromedriver-update-in-docker-image/
RUN google-chrome --version | grep -oE "[0-9]{1,10}.[0-9]{1,10}.[0-9]{1,10}" > /tmp/chromebrowser-main-version.txt && \
    wget --no-verbose -O /tmp/latest_chromedriver_version.txt https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$(cat /tmp/chromebrowser-main-version.txt) && \
    wget --no-verbose -O /tmp/chromedriver_linux64.zip https://chromedriver.storage.googleapis.com/$(cat /tmp/latest_chromedriver_version.txt)/chromedriver_linux64.zip && rm -rf /opt/selenium/chromedriver && unzip /tmp/chromedriver_linux64.zip -d /opt/selenium && rm /tmp/chromedriver_linux64.zip && mv /opt/selenium/chromedriver /opt/selenium/chromedriver-$(cat /tmp/latest_chromedriver_version.txt) && chmod 755 /opt/selenium/chromedriver-$(cat /tmp/latest_chromedriver_version.txt) && ln -fs /opt/selenium/chromedriver-$(cat /tmp/latest_chromedriver_version.txt) /usr/bin/chromedriver

# 4) Set the variable for the container working directory, create and set the working directory
ARG WORK_DIRECTORY=/program
ENV NODE_ENV=development NODE_PATH=$WORK_DIRECTORY
# Working directory will be created if it doesn't exist (no explicit 'mkdir' needed)
WORKDIR $WORK_DIRECTORY 
COPY --from=build /home/node/* ./

# 6) expose a volume for mounting the tests
VOLUME ${WORK_DIRECTORY}/app

EXPOSE 8080

# 7) Execute the script in NodeJS
CMD ["node", "app/runtest.js"]