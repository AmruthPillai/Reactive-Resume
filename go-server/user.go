package main

import (
  "github.com/google/uuid"
  "time"
)

type User struct {
  ID         uuid.UUID
  Name       string    `fake:"{firstname}"`
  UserName   string    `fake:"{username}"`
  Email      string    `fake:"{email}"`
  Password   string    `fake:"{password}"`
  ResetToken string    `fake:"{randomstring}"`
  Provider   string    `fake:"{randomstring}"`
  createdAt  time.Time `fake:"{year}-{month}-{day}" format:"2006-01-02"`
  updatedAt  time.Time `fake:"{year}-{month}-{day}" format:"2006-01-02"`
}

type Users struct {
  users []*User
}

func (u Users) EncodeToJSON() error {

}
