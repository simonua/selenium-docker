#!/bin/bash
# build the image
docker build -t packagejson .
# run the image, binding the current directory to the container
docker run --rm -it --mount type=bind,source="$(pwd)",target=/program/app packagejson