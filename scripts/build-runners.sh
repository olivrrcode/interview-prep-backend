#!/bin/bash
set -e

echo "Building code runners..."
cd backend/docker/code-runner

echo "Building JavaScript runner..."
cd javascript && docker build -t code-runner-javascript .
cd ..

echo "Building Java runner..."
cd java && docker build -t code-runner-java .
cd ..

echo "Building Python runner..."
cd python && docker build -t code-runner-python .
cd ..

echo "Starting application..."
cd ../../..
