#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "Installing dependencies and building projects..."

sudo npm install || { echo "Failed to install root dependencies"; exit 1; }

# Build src/user
echo "Building src/user..."
cd src/user
 sudo npm install || { echo "Failed to install dependencies in src/user"; exit 1; }
 sudo npm run build || { echo "Failed to build src/user"; exit 1; }
cd ../..

# Build src/task
echo "Building src/task..."
cd src/task
 sudo npm install || { echo "Failed to install dependencies in src/task"; exit 1; }
 sudo npm run build || { echo "Failed to build src/task"; exit 1; }
cd ../..

# Build src/fields
echo "Building src/fields..."
cd src/fields
 sudo npm install || { echo "Failed to install dependencies in src/fields"; exit 1; }
 sudo npm run build || { echo "Failed to build src/fields"; exit 1; }
cd ../..

# Build src/client
echo "Building src/client..."
cd src/client
 sudo npm install || { echo "Failed to install dependencies in src/client"; exit 1; }
 sudo npm run build || { echo "Failed to build src/client"; exit 1; }
cd ../..

# Build src/blogs
echo "Building src/blogs..."
cd src/blogs
 sudo npm install || { echo "Failed to install dependencies in src/blogs"; exit 1; }
 sudo npm run build || { echo "Failed to build src/blogs"; exit 1; }
cd ../..

# Final build and start
echo "Final build and starting the server..."
sudo npm run build || { echo "Final build failed"; exit 1; }

# Start the server
echo "Starting the server..."
 sudo nohup npm run start > server.log 2>&1 &

echo "Server is running in the background. Logs can be found in server.log."
