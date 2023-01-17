## Specifies a parent image
FROM golang:latest

RUN mkdir /app
## We copy everything in the root directory
## into our /app directory
ADD . /app
## We specify that we now wish to execute
## any further commands inside our /app
## directory
WORKDIR /app
## we run go build to compile the binary
## executable of our Go program

RUN go build ./...
EXPOSE 8080
## Our start command which kicks off
## our newly created binary executable
CMD ["go", "run", "./..."]
# to build:
## docker build -t go-server .
## to run:
## docker run go-server

