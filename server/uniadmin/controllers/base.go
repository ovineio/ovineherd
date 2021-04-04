package controllers


import (

	"github.com/astaxie/beego"

)

// CategoriesController operations for Categories
type baseController  struct {
	Method string
	beego.Controller

}



func GetFast() string{
	return "fast"
}

func GetOption() string{
	return "option"
}

func GetAgility() string{
	return "agility"
}

func getRequestParam(c *baseController){
		beego.Debug(c)
}