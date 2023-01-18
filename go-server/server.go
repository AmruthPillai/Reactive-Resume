package main

import "net/http"

//type Server interface {
//	Get()
//	IndexHandler(writer http.ResponseWriter, req http.Request)
//}

type Server struct {
	Name string
	Base *http.Server
}

func (s Server) String() string {
	return s.Name
}
