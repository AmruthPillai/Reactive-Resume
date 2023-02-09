package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"net"
	"net/http"
)

var server = Server{
	Name: "ServerOne",
}

// ref: https://www.digitalocean.com/community/tutorials/how-to-make-an-http-server-in-go
func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", indexHandler)
	mux.HandleFunc("/list/resumes/", resumeListHandler)
	mux.HandleFunc("/list/users/", userListHandler)
	mux.HandleFunc("/generate/resumes/", generateRandomResumeHandler)
	mux.HandleFunc("/generate/users/", generateRandomUsersHandler)

	ctx, cancelCtx := context.WithCancel(context.Background())
	server.Base = &http.Server{
		Addr:    ":8080",
		Handler: mux,
		BaseContext: func(l net.Listener) context.Context {
			ctx = context.WithValue(ctx, server.Name, l.Addr().String())
			return ctx
		},
	}
	log.Println("server started at localhost:8080")
	serverOne := server.Base
	go func() { // can add multiple go routines as per required - nb. ref link
		err := serverOne.ListenAndServe()
		if errors.Is(err, http.ErrServerClosed) {
			fmt.Printf("server one closed\n")
		} else if err != nil {
			fmt.Printf("error listening for server one: %s\n", err)
		}
		cancelCtx()
	}()
	<-ctx.Done()
}

func indexHandler(writer http.ResponseWriter, request *http.Request) {
	ctx := request.Context()
	log.Printf("get from indexHandler\n")
	log.Printf("from server: %s\n", ctx.Value(server.Name).(string))
	_, err := io.WriteString(writer, "test get from index handler\n")
	if err != nil {
		log.Fatal(err)
	}
}
