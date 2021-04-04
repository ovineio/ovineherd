package controllers

import (
	"encoding/json"
	"errors"
	"base_service/models"
	"strconv"
	"strings"

	"github.com/astaxie/beego"
)

// CategoriesController operations for Categories
type ProductsController struct {
	baseController
}

// URLMapping ...
func (c *ProductsController) URLMapping() {
	beego.Debug("URLMapping")
	beego.Debug(c.Ctx.Input.Param(":method"))
	if c.Ctx.Input.Param(":method") == GetFast() {
		c.Method = "agility"
	} else {
		c.Method = "fast"
	}
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
func (c *ProductsController) GetAll() {
	beego.Debug("GetAll")
	beego.Debug(c.Method)
	var fields []string
	var sortby []string
	var order []string
	var query = make(map[string]string)
	var names = make(map[string]string)
	var category_ids string
	var page_size int64 = 10
	var page int64
	// type
	var types string

	if v := c.GetString("type"); v != "" {
		types = v
	}else{
		types="common"
	}
	query["type"]=types

	// fields: col1,col2,entity.col3
	if v := c.GetString("fields"); v != "" {
		fields = strings.Split(v, ",")
	}
	// limit: 10 (default is 10)
	if v, err := c.GetInt64("perPage"); err == nil {
		page_size = v
	}
	// offset: 0 (default is 0)
	if v, err := c.GetInt64("page"); err == nil {
		page = v
	}

	//分页

	// sortby: col1,col2
	if v := c.GetString("orderBy"); v != "" {
		sortby = strings.Split(v, ",")
	}
	// order: desc,asc
	if v := c.GetString("orderDir"); v != "" {
		order = strings.Split(v, ",")
	}
	// query: k:v,k:v
	if v := c.GetString("query"); v != "" {
		for _, cond := range strings.Split(v, ",") {
			kv := strings.SplitN(cond, ":", 2)
			if len(kv) != 2 {
				c.Data["json"] = errors.New("Error: invalid names key/value pair")
				c.ServeJSON()
				return
			}
			k, v := kv[0], kv[1]
			query[k] = v
		}
	}
	//beego.Debug("input")
	//
	//beego.Debug(c.Input())
	//beego.Debug(c.GetString("names"))
	// keys: k:v,k:v
	if v := c.GetString("names"); v != "" {
		for _, cond := range strings.Split(v, ",") {
			kv := strings.SplitN(cond, ":", 2)
			if len(kv) != 2 {
				c.Data["json"] = errors.New("Error: invalid query key/value pair")
				c.ServeJSON()
				return
			}
			k, v := kv[0], kv[1]
			names[k] = v
		}
	}

	if v := c.GetString("category_ids"); v != "" {
		category_ids = v
	}
	if c.Method == "fast" {
		v := models.GetAllProductsFast(types, query, names, fields, sortby, order, page, page_size, category_ids)
		c.Data["json"] = v
	} else {
		v := models.GetAllProducts(types, query, names, fields, sortby, order, page, page_size, category_ids)
		c.Data["json"] = v
	}

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
func (c *ProductsController) Post() {

	beego.Debug("Post")
	beego.Debug(c.Method)

	if c.Method == "fast" {
		//快速开发模式

		var data map[string]interface{}
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &data)
		if err == nil {
			types := models.GetMapValue("type", data)
			if types == "" {
				types="common"
				data["type"]=types
			//	c.Data["json"] = models.MessageErrorUint64(0, "添加权限失败,type不能为空")
			}

				c.Data["json"] = models.AddProductsFast(data, types.(string))
		} else {
			c.Data["json"] = models.MessageErrorUint64(0, err.Error())
		}

	} else {
		var Products models.ProductsData
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &Products)
		if err == nil {
			c.Data["json"] = models.AddProducts(&Products)
		} else {
			c.Data["json"] = models.MessageErrorUint64(0, err.Error())
		}
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
func (c *ProductsController) Put() {
	beego.Debug("Put")
	beego.Debug(c.Method)
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)

	if c.Method == "fast" {
		var data map[string]interface{}
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &data)
		if err == nil {
			c.Data["json"] = models.UpdateProductByIdFast(data, id)
		} else {
			c.Data["json"] = models.MessageErrorUint64(0, err.Error())
		}
	} else {
		v := models.ProductsData{Id: id}
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &v)
		if err == nil {
			data := models.UpdateProductById(&v)
			c.Data["json"] = data
		} else {
			c.Data["json"] = models.MessageErrorUint64(id, err.Error())
		}
	}

	c.ServeJSON()
}

func (c *ProductsController) GetOne() {
	beego.Debug("GetOne")

	beego.Debug(c.Method)

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	if c.Method == "fast" {
		v := models.GetProductsFastById(id,true)
		c.Data["json"] = v
	} else {
		v := models.GetProductsById(id)
		c.Data["json"] = v
	}

	c.ServeJSON()
	return
}

func (c *ProductsController) Delete() {
	beego.Debug("Delete")

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	data := models.DeleteProducts(id)

	c.Data["json"] = data

	c.ServeJSON()
}
