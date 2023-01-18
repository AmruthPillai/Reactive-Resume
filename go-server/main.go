package main

import (
	"context"
	"errors"
	"fmt"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/google/uuid"
	"io"
	"log"
	"net"
	"net/http"
	"os"
)

var server = Server{
	Name: "ServerOne",
}

// ref: https://www.digitalocean.com/community/tutorials/how-to-make-an-http-server-in-go
func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", indexHandler)
	mux.HandleFunc("/user", userHandler)
	mux.HandleFunc("/generate", generateRandomUsersAndResumeHandler)

	ctx, cancelCtx := context.WithCancel(context.Background())
	server.Base = &http.Server{
		Addr:    ":8080",
		Handler: mux,
		BaseContext: func(l net.Listener) context.Context {
			ctx = context.WithValue(ctx, server.Name, l.Addr().String())
			return ctx
		},
	}
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

const tempDataPath = "./data/data.json"
const randomData = 10

func generateRandomUsersAndResumeHandler(writer http.ResponseWriter, request *http.Request) {
	// create a data.json file - also check if exists
	// if exists load the data to memory
	file, err := os.OpenFile(tempDataPath, os.O_RDWR, 0666)
	if errors.Is(err, os.ErrNotExist) {
		// handle the case where the file doesn't exist
		file, err = os.Create(tempDataPath)
		if err != nil {
			log.Println("error during create file in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
		var randomResumeList Resumes
		var randomUsersList Users
		for i := 0; i < randomData; i++ {
			// make 100 random user and resume json objects
			randomResume := Resume{
				ID: uuid.New(),
			}
			randomUser := User{
				ID: uuid.New(),
			}
			err := gofakeit.Struct(&randomResume)
			if err != nil {
				log.Println("error during generating random resume in generateRandomUsersAndResumeHandler")
				log.Fatal(err)
			}
			err = gofakeit.Struct(&randomUser)
			if err != nil {
				log.Println("error during generating random user in generateRandomUsersAndResumeHandler")
				log.Fatal(err)
			}
			randomResumeList.resumes = append(randomResumeList.resumes, &randomResume)
			randomUsersList.users = append(randomUsersList.users, &randomUser)
		}
		err := randomResumeList.EncodeToJSON()
		if err != nil {
			log.Println("error during json encoding random resumes in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
		err = randomUsersList.EncodeToJSON()
		if err != nil {
			log.Println("error during json encoding random users in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
	}

}

func userHandler(writer http.ResponseWriter, request *http.Request) {
	ctx := request.Context()
	log.Printf("get from user handler\n")
	log.Printf("from server: %s\n", ctx.Value(server.Name))
	_, err := io.WriteString(writer, "test from user  handler\n")
	if err != nil {
		log.Fatal(err)
	}
}

func indexHandler(writer http.ResponseWriter, request *http.Request) {
	ctx := request.Context()
	log.Printf("get from indexHandler\n")
	log.Printf("from server: %s\n", ctx.Value(server.Name).(string))
	_, err := io.WriteString(writer, "test from index handler\n")
	if err != nil {
		log.Fatal(err)
	}
}
