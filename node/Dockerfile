# 1) Build from this Dockerfile's directory:
#       docker build -t "<some tag>" -f Dockerfile .
# 2) Start the image (e.g. in Docker)
# 3) Observe that "Hello World" is printed
# ---------------------------------------------------------------------------------------------

# Use alpine-based NodeJS base image
FROM node:latest

# Set the variable for the container's working directory
ARG WORK_DIRECTORY=/program

# Create app directory
RUN mkdir -p $WORK_DIRECTORY
WORKDIR $WORK_DIRECTORY

# Copy script to execute to working directory
COPY hello.js .

# Execute the hello script in NodeJS
CMD ["node", "hello.js"]