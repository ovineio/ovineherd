package controllers

import (
	"encoding/json"
	"github.com/astaxie/beego"
	"base_service/models"
	"strconv"
	"strings"
	"errors"
)

// CategoriesController operations for Categories
type OrdersController struct {
	beego.Controller
}

// URLMapping ...
func (c *OrdersController) URLMapping() {
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
func (c *OrdersController) GetAll() {
	beego.Debug("GetAll")

	var fields []string
	var sortby []string
	var order []string
	var query = make(map[string]string)
	var names = make(map[string]string)
	var page_size int64 = 10
	var page int64
	// type

	// fields: col1,col2,entity.col3
	if v := c.GetString("fields"); v != "" {
		fields = strings.Split(v, ",")
	}
	// limit: 10 (default is 10)
	if v, err := c.GetInt64("page_size"); err == nil {
		page_size = v
	}
	// offset: 0 (default is 0)
	if v, err := c.GetInt64("page"); err == nil {
	//	page = (v-1)*page_size
		page =v
	}

	// sortby: col1,col2
	if v := c.GetString("sortby"); v != "" {
		sortby = strings.Split(v, ",")
	}
	// order: desc,asc
	if v := c.GetString("order"); v != "" {
		order = strings.Split(v, ",")
	}
	// query: k:v,k:v
	if v := c.GetString("query"); v != "" {
		for _, cond := range strings.Split(v, ",") {
			kv := strings.SplitN(cond, ":", 2)
			if len(kv) != 2 {
				c.Data["json"] = errors.New("Error: invalid query key/value pair")
				c.ServeJSON()
				return
			}
			k, v := kv[0], kv[1]
			query[k] = v
		}
	}
	//
	//beego.Debug(c.Input())
	//beego.Debug(c.GetString("names"))
	// keys: k:v,k:v
	if v := c.GetString("names"); v != "" {
		for _, cond := range strings.Split(v, ",") {
			kv := strings.SplitN(cond, ":", 2)
			if len(kv) != 2 {
				c.Data["json"] = errors.New("Error: invalid names key/value pair")
				c.ServeJSON()
				return
			}
			k, v := kv[0], kv[1]
			names[k] = v
		}
	}

	//if v := c.GetString("category_ids"); v != "" {
	//	category_ids=v
	//}

	v := models.GetAllOrders(query,names, fields, sortby, order, page, page_size)
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
func (c *OrdersController) Post() {


	beego.Debug("Post")
	//var d models.Categorie
	var Orders  models.OrdersData
	 err := json.Unmarshal(c.Ctx.Input.RequestBody, &Orders)
	 beego.Debug(Orders)
	if err == nil {
		c.Data["json"]  = models.AddOrders(&Orders)
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
func (c *OrdersController) Put() {
	beego.Debug("Put")
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr,10, 64)
	v := models.OrdersData{Id: id}
	err := json.Unmarshal(c.Ctx.Input.RequestBody, &v)
	if	err == nil {
		data := models.UpdateOrdersById(&v)
		c.Data["json"] =data
	} else {
		c.Data["json"] =models.MessageErrorUint64(id,err.Error())
	}
	c.ServeJSON()
}


func (c *OrdersController) GetOne() {
	beego.Debug("GetOne")
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr,10, 64)
	v := models.GetOrdersById(id)

	c.Data["json"] = v
	c.ServeJSON()
	return
}


func (c *OrdersController) Delete() {
	beego.Debug("Delete")

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr,10, 64)
	data := models.DeleteOrders(id)

	c.Data["json"] = data

	c.ServeJSON()
}
