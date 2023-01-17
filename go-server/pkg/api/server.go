package api

import (
	"fmt"
	"log"
	"net/http"
)

func Server() {
	http.HandleFunc("/", index)
	log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
func index(writer http.ResponseWriter, request *http.Request) {
	log.Printf("given url.path:%s\n", request.URL.Path)
	fmt.Fprintf(writer, "given url.path:%s\n", request.URL.Path)
}
