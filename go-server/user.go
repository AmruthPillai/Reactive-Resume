package main

import (
	"encoding/json"
	"github.com/google/uuid"
	"os"
	"time"
)

type User struct {
	ID         uuid.UUID `json:"id,omitempty"`
	Name       string    `json:"name,omitempty" fake:"{firstname}"`
	UserName   string    `json:"user_name,omitempty"  fake:"{username}"`
	Email      string    `json:"email,omitempty" fake:"{email}"`
	Password   string    `json:"password,omitempty" fake:"{password}"`
	ResetToken string    `json:"reset_token,omitempty" fake:"{randomstring}"`
	Provider   string    `json:"provider,omitempty" fake:"{randomstring}"`
	CreatedAt  time.Time `json:"created_at,omitempty" fake:"{year}-{month}-{day}" format:"2006-01-02"`
	UpdatedAt  time.Time `json:"updated_at,omitempty" fake:"{year}-{month}-{day}" format:"2006-01-02"`
}

type Users struct {
	users []*User
}

func (u Users) EncodeToJSON(file *os.File) error {
	marshal, err := json.Marshal(u)
	if err != nil {
		return err
	}
	_, err = file.Write(marshal)
	if err != nil {
		return err
	}
	return nil
}
