package main

import (
	"encoding/json"
	"github.com/google/uuid"
	"time"
)

type Resume struct {
	ID      uuid.UUID
	shortID string
	Name    string `fake:"{firstname}"`
	Slug    string `fake:"{randomstring}"`
	Image   string
	// JSONB in database, can do further processing here
	Basics string
	// Another jsonb field
	Sections string
	// jsonb again
	Metadata  string
	Public    bool      `fake:"{bool}"`
	createdAt time.Time `fake:"{year}-{month}-{day}" format:"2006-01-02"`
	updatedAt time.Time `fake:"{year}-{month}-{day}" format:"2006-01-02"`
	UserID    uuid.UUID `fake:"{uuid}"`
}

type Resumes struct {
	resumes []*Resume
}

func (r Resumes) EncodeToJSON() error {
	marshal, err := json.Marshal(r)
	if err != nil {
		return err
	}
}
