FROM golang:latest
WORKDIR /app

COPY go.mod ./
RUN go mod download

COPY /cmd/ ./

RUN go build -o /go-server

EXPOSE 8080

CMD [ "/go-server" ]

# to build:
# docker build -t go-server .
# to run:
# docker run go-server
