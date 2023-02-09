package main

import (
	"encoding/json"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/google/uuid"
	"log"
	"net/http"
	"os"
	"time"
)

type User struct {
	ID         uuid.UUID `json:"id,omitempty"`
	Name       string    `json:"name,omitempty" fake:"{firstname}"`
	UserName   string    `json:"user_name,omitempty"  fake:"{username}"`
	Email      string    `json:"email,omitempty" fake:"{email}"`
	Password   string    `json:"password,omitempty" fake:"{password}"`
	ResetToken uuid.UUID `json:"reset_token,omitempty" fake:"{randomstring}"`
	Provider   string    `json:"provider,omitempty" fake:"{randomstring}"`
	CreatedAt  time.Time `json:"created_at,omitempty" fake:"{year}-{month}-{day}" format:"2006-01-02"`
	UpdatedAt  time.Time `json:"updated_at,omitempty" fake:"{year}-{month}-{day}" format:"2006-01-02"`
}

type Users struct {
	users []*User
}

const RandomUsers = 10
const UserDataPath = "./data/userdata.json"

func generateRandomUsersHandler(writer http.ResponseWriter, request *http.Request) {
	log.Printf("get from generateRandomUsersHandler\n")
	var randomUserList Users

	for i := 0; i < RandomUsers; i++ {
		u := &User{
			ID:         uuid.New(),
			Name:       gofakeit.Name(),
			UserName:   gofakeit.Username(),
			Email:      gofakeit.Email(),
			Password:   gofakeit.Password(true, false, false, false, false, 32),
			ResetToken: uuid.New(),
			Provider:   "",
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		}

		randomUserList.users = append(randomUserList.users, u)
	}
	log.Println("generated users")

	for _, user := range randomUserList.users {
		b, err := json.Marshal(user)
		if err != nil {
			log.Fatal(err)
		}
		err = os.WriteFile(UserDataPath, b, 0644)
		if err != nil {
			log.Fatal(err)
		}
		log.Println("user data wrote to file")
		_, err = writer.Write(b)
		if err != nil {
			log.Fatal(err)
		}
	}

}

func userListHandler(writer http.ResponseWriter, request *http.Request) {
	log.Printf("get from userListHandler\n")
	// load resumes from file
	file, err := os.ReadFile(UserDataPath)
	if err != nil {
		log.Fatal(err)
	}
	_, err = writer.Write(file)
	if err != nil {
		log.Fatal(err)
	}
}
