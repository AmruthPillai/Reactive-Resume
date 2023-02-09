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

type Resume struct {
	ID        uuid.UUID `json:"id,omitempty"`
	shortID   string    `json:"short_id, omitempty" fake:"{uuid}"`
	Name      string    `json:"name,omitempty"  fake:"{firstname}"`
	Slug      string    `json:"slug,omitempty" fake:"{randomstring}"`
	Image     string    `json:"image,omitempty"`
	Basics    string    `json:"basics,omitempty"`   // JSONB in database, can do further processing here
	Sections  string    `json:"sections,omitempty"` // Another jsonb field
	Metadata  string    `json:"metadata,omitempty"` // jsonb again
	Public    bool      `json:"public,omitempty" fake:"{bool}"`
	CreatedAt time.Time `json:"created_at,omitempty" fake:"{date}"`
	UpdatedAt time.Time `json:"updated_at,omitempty" fake:"{date}" `
	UserID    uuid.UUID `json:"user_id,omitempty" fake:"{uuid}"`
}

type Resumes struct {
	resumes []*Resume
}

const RandomResumes = 10
const ResumeDataPath = "./data/resumedata.json"

func generateRandomResumeHandler(writer http.ResponseWriter, request *http.Request) {
	log.Printf("get from generateRandomResumeHandler\n")
	var randomResumeList Resumes

	for i := 0; i < RandomResumes; i++ {
		r := &Resume{
			ID:        uuid.New(),
			shortID:   "",
			Name:      gofakeit.Name(),
			Basics:    "",
			Sections:  "",
			Metadata:  "",
			Public:    false,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
			UserID:    uuid.New(),
		}

		randomResumeList.resumes = append(randomResumeList.resumes, r)
	}
	log.Println("generated resumes")

	for _, resume := range randomResumeList.resumes {
		b, err := json.Marshal(resume)
		if err != nil {
			log.Fatal(err)
		}

		err = os.WriteFile(ResumeDataPath, b, 0644)
		if err != nil {
			log.Fatal(err)
		}
		log.Println("resume data wrote to file")

		_, err = writer.Write(b)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func resumeListHandler(writer http.ResponseWriter, request *http.Request) {
	log.Printf("get from resumeListHandler\n")
	// load resumes from file
	file, err := os.ReadFile(ResumeDataPath)
	if err != nil {
		log.Fatal(err)
	}
	_, err = writer.Write(file)
	if err != nil {
		log.Fatal(err)
	}
}
