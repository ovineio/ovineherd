package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	"base_service/models"
	"strconv"
)

// CategoriesController operations for Categories
type SpecificationsController struct {
	beego.Controller
}

// URLMapping ...
func (c *SpecificationsController) URLMapping() {
	c.Mapping("Post", c.Post)
	c.Mapping("Put", c.Put)
	c.Mapping("Delete", c.Delete)
	c.Mapping("GetOne", c.GetOne)
	c.Mapping("GetAll", c.GetAll)
}

// GetAll ...
// @Title Get All
// @Description get Categories
// @Param	query	query	string	false	"Filter. e.g. col1:v1,col2:v2 ..."
// @Param	fields	query	string	false	"Fields returned. e.g. col1,col2 ..."
// @Param	sortby	query	string	false	"Sorted-by fields. e.g. col1,col2 ..."
// @Param	order	query	string	false	"Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ..."
// @Param	limit	query	string	false	"Limit the size of result set. Must be an integer"
// @Param	offset	query	string	false	"Start position of result set. Must be an integer"
// @Success 200 {object} models.Categories
// @Failure 403
// @router / [get]
//自定义开发模式
func (c *SpecificationsController) GetAll() {
	beego.Debug("GetAll")


	var product_id uint64



	// limit: 10 (default is 10)
	if v, err := c.GetUint64("product_id"); err == nil {
		product_id = v
	}


	v := models.GetAllSpecifications(product_id)
	c.Data["json"] = v
	c.ServeJSON()
	return
}



// Post ...
// @Title Post
// @Description create Categories
// @Param	body		body 	models.Categories	true		"body for Categories content"
// @Success 201 {int} models.Categories
// @Failure 403 body is empty
// @router / [post]
func (c *SpecificationsController) Post() {


	beego.Debug("Post")
	//var d models.Categorie
	var Specifications  models.SpecificationsData
	 err := json.Unmarshal(c.Ctx.Input.RequestBody, &Specifications)
	if err == nil {
		c.Data["json"]  = models.AddSpecifications(&Specifications)
	}else{
		c.Data["json"] =models.MessageErrorUint64(0,err.Error())
	}
	c.ServeJSON()
	return

}

// Put ...
// @Title Put
// @Description update the Categories
// @Param	id		path 	string	true		"The id you want to update"
// @Param	body		body 	models.Categories	true		"body for Categories content"
// @Success 200 {object} models.Categories
// @Failure 403 :id is not int
// @router /:id [put]
func (c *SpecificationsController) Put() {
	beego.Debug("Put")
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr,10, 64)
	v := models.SpecificationsData{Id: id}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &v)
	if	err == nil {
		data := models.UpdateSpecificationsById(&v)
		c.Data["json"] =data
	} else {
		c.Data["json"] =models.MessageErrorUint64(id,err.Error())
	}
	c.ServeJSON()
}


func (c *SpecificationsController) GetOne() {
	beego.Debug("GetOne")
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr,10, 64)
	v := models.GetSpecificationsById(id)

	c.Data["json"] = v
	c.ServeJSON()
	return
}


func (c *SpecificationsController) Delete() {
	beego.Debug("Delete")

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr,10, 64)
	data := models.DeleteSpecifications(id)

	c.Data["json"] = data

	c.ServeJSON()
}
