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
	mux.HandleFunc("/generate/", generateRandomUsersAndResumeHandler)

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

const tempDataPathForResumes = "./data/resumedata.json"
const tempDataPathForUsers = "./data/userdata.json"
const randomData = 10

func generateRandomUsersAndResumeHandler(writer http.ResponseWriter, request *http.Request) {
	// TODO: handle errors
	var randomResumeList Resumes
	log.Printf("get from generateRandomUsersAndResumeHandler\n")

	resumesFile, err := os.OpenFile(tempDataPathForResumes, os.O_RDWR, 0666)
	defer resumesFile.Close()
	if errors.Is(err, os.ErrNotExist) {
		// handle the case where the file doesn't exist
		resumesFile, err = os.Create(tempDataPathForResumes)
		if err != nil {
			log.Println("error during create resume file in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
		for i := 0; i < randomData; i++ {
			// make 100 random user and resume json objects
			randomResume := Resume{
				ID: uuid.New(),
			}

			err := gofakeit.Struct(&randomResume)
			if err != nil {
				log.Println("error during generating random resume in generateRandomUsersAndResumeHandler")
				log.Fatal(err)
			}
		}
		err := randomResumeList.EncodeToJSON(resumesFile)
		if err != nil {
			log.Println("error during json encoding random resumes in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
	}
	var randomUsersList Users
	usersFile, err := os.OpenFile(tempDataPathForUsers, os.O_RDWR, 0666)
	defer usersFile.Close()
	if errors.Is(err, os.ErrNotExist) {
		// handle the case where the file doesn't exist
		resumesFile, err = os.Create(tempDataPathForUsers)
		if err != nil {
			log.Println("error during create user file in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
		randomUser := User{
			ID: uuid.New(),
		}
		for i := 0; i < randomData; i++ {
			// make 100 random user and resume json objects
			err = gofakeit.Struct(&randomUser)
			if err != nil {
				log.Println("error during generating random user in generateRandomUsersAndResumeHandler")
				log.Fatal(err)
			}
			randomUsersList.users = append(randomUsersList.users, &randomUser)
		}
		err = randomUsersList.EncodeToJSON(usersFile)
		if err != nil {
			log.Println("error during json encoding random users in generateRandomUsersAndResumeHandler")
			log.Fatal(err)
		}
	}

	// load file if stuff exists

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
