package main

import "testing"

func Test_genrateResumeData(t *testing.T) {
  tests := []struct {
    name string
    want func(err error)
    got  error
  }{
    {
      name: "happy flow",
      want: func(err error) {

      },
    },
    {
      name: "not happy flow",
      want: func(err error) {

      },
    },
  }
  for _, tt := range tests {
    t.Run(tt.name, func(t *testing.T) {
      got := genrateResumeData()
      tt.want(got)
    })
  }
}
