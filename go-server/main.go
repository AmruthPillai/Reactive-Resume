package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
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
	mux.HandleFunc("/resume/list/", resumeListHandler)
	mux.HandleFunc("/user/list/", userListHandler)
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

func resumeListHandler(writer http.ResponseWriter, request *http.Request) {
	log.Printf("get from resumeListHandler\n")
	var randomResumeList Resumes
	// load resumes from file
	file, err := os.OpenFile(tempDataPathForResumes, os.O_RDONLY, 0444)
	if err != nil {
		log.Fatal(err)
	}
	// load file if stuff exists
	resumeBinData, _ := io.ReadAll(file)
	json.Unmarshal(resumeBinData, &randomResumeList)

	_, err = io.WriteString(writer, string(resumeBinData))
	if err != nil {
		log.Fatal(err)
	}
}

func userListHandler(writer http.ResponseWriter, request *http.Request) {

}

//const tempDataPathForResumes = "./data/resumedata.json"
//const tempDataPathForUsers = "./data/userdata.json"
//const randomData = 10

func generateRandomUsersAndResumeHandler(writer http.ResponseWriter, request *http.Request) {
	// TODO: handle errors
	//var randomResumeList Resumes
	log.Printf("get from generateRandomUsersAndResumeHandler\n")

	// TODO: refactor to struct method
	//var randomUsersList Users
	//usersFile, err := os.OpenFile(tempDataPathForUsers, os.O_RDWR, 0766)
	//defer usersFile.Close()
	//if errors.Is(err, os.ErrNotExist) {
	//	// handle the case where the file doesn't exist
	//	resumesFile, err = os.Create(tempDataPathForUsers)
	//	if err != nil {
	//		log.Println("error during create user file in generateRandomUsersAndResumeHandler")
	//		log.Fatal(err)
	//	}
	//	randomUser := User{
	//		ID: uuid.New(),
	//	}
	//	for i := 0; i < randomData; i++ {
	//		// make 100 random user and resume json objects
	//		err = gofakeit.Struct(&randomUser)
	//		if err != nil {
	//			log.Println("error during generating random user in generateRandomUsersAndResumeHandler")
	//			log.Fatal(err)
	//		}
	//		randomUsersList.users = append(randomUsersList.users, &randomUser)
	//	}
	//	err = randomUsersList.EncodeToJSON(usersFile)
	//	if err != nil {
	//		log.Println("error during json encoding random users in generateRandomUsersAndResumeHandler")
	//		log.Fatal(err)
	//	}
	//	generateRandomUsersAndResumeHandler(writer, request)
	//} else if err != nil {
	//	log.Println("error during os.Open of random users in generateRandomUsersAndResumeHandler")
	//	log.Fatal(err)
	//}
	//
	//// load file if stuff exists
	//resumeBinData, _ := io.ReadAll(resumesFile)
	//json.Unmarshal(resumeBinData, &randomResumeList)
	//
	//userBinData, _ := io.ReadAll(usersFile)
	//json.Unmarshal(userBinData, &randomUsersList)
	//
	//_, _ = io.WriteString(writer, "generated data successfully\n")
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
