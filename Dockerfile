# DevContainer
FROM node:22.6.0-bullseye AS develop 
WORKDIR /workspace
COPY . .
RUN npm install

# Build Image
FROM node:22.6.0-bullseye AS build
WORKDIR /workspace
COPY ./ .
RUN npm install && npm run build
