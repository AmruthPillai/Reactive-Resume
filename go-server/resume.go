package main

import (
	"encoding/json"
	"errors"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/google/uuid"
	"log"
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

func (r Resumes) EncodeToJSONFile(file *os.File) error {
	marshal, err := json.Marshal(r)
	if err != nil {
		return err
	}
	_, err = file.Write(marshal)
	if err != nil {
		return err
	}
	return nil
}

const tempDataPathForResumes = "./data/resumedata.json"
const tempDataPathForUsers = "./data/userdata.json"
const randomData = 10

func getResumeData() (Resumes, error) {
	log.Printf("printing from getResumeData\n")
	err := genrateResumeData() // if err == nil, the file exists and generated
	if err != nil {
		return Resumes{}, err
	}
	// if it exists then just get them unmarshalled  as go structs
	return Resumes{}, err
}

func genrateResumeData() error {
	var randomResumeList Resumes
	log.Printf("printing from genrateResumeData\n")
	resumesFile, err := os.OpenFile(tempDataPathForResumes, os.O_RDWR, 0766)
	defer func(resumesFile *os.File) {
		err := resumesFile.Close()
		if err != nil {
			log.Fatal(err)
		}
	}(resumesFile)

	switch err != nil {
	case errors.Is(err, os.ErrNotExist):
		resumesFile, err = os.Create(tempDataPathForResumes)
		if err != nil {
			return err
		}
		for i := 0; i < randomData; i++ {
			// make 100 random user and resume json objects
			randomResume := Resume{
				ID: uuid.New(),
			}

			err := gofakeit.Struct(&randomResume)
			if err != nil {
				return err
			}
		}
		err := randomResumeList.EncodeToJSONFile(resumesFile)
		if err != nil {
			return err
		}
	default:
		return err
	}

	return nil
}
