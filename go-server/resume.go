package main

import (
	"encoding/json"
	"github.com/google/uuid"
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
