package controllers

import (
	"encoding/json"
	"errors"
	"base_service/models"
	"strconv"
	"strings"
	"github.com/astaxie/beego"
)

// ConfigurationsController operations for Configurations
type AuthorizationsController struct {
	baseController
}

// URLMapping ...
func (c *AuthorizationsController) URLMapping() {
	beego.Debug(c.Ctx.Input.Param(":method"))
	if c.Ctx.Input.Param(":method") == GetFast() {
		c.Method = "agility"
	} else {
		c.Method = "fast"
	}
	c.Mapping("Post", c.Post)
	c.Mapping("GetOne", c.GetOne)
	c.Mapping("GetAll", c.GetAll)
	c.Mapping("Put", c.Put)
	c.Mapping("Delete", c.Delete)
}

// Post ...
// @Title Post
// @Description create Configurations
// @Param	body		body 	models.Configurations	true		"body for Configurations content"
// @Success 201 {int} models.Configurations
// @Failure 403 body is empty
// @router / [post]
func (c *AuthorizationsController) Post() {

	beego.Debug("Post")
	beego.Debug(c.Method)

	if c.Method == "fast" {
		//快速开发模式

		var data map[string]interface{}
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &data)
		beego.Debug(data)
		if err == nil {
			types := models.GetMapValue("type", data)
			if types == "" {
				types="common"
				data["type"]=types
			//	c.Data["json"] = models.MessageErrorUint64(0, "添加权限失败,type不能为空")
			}
				c.Data["json"],_ = models.AddAuthorizationsFast(data, types.(string))
		} else {
			c.Data["json"] = models.MessageErrorUint64(0, err.Error())
		}

	}

	c.ServeJSON()
	return

}

// GetOne ...
// @Title Get One
// @Description get Configurations by id
// @Param	id		path 	string	true		"The key for staticblock"
// @Success 200 {object} models.Configurations
// @Failure 403 :id is empty
// @router /:id [get]
func (c *AuthorizationsController) GetOne() {
	beego.Debug("GetOne")

	beego.Debug(c.Method)

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	if c.Method == "fast" {
		v := models.GetAuthorizationsFastById(id,true)
		c.Data["json"] = v
	} else {

	}

	c.ServeJSON()
	return
}

// GetAll ...
// @Title Get All
// @Description get Configurations
// @Param	query	query	string	false	"Filter. e.g. col1:v1,col2:v2 ..."
// @Param	fields	query	string	false	"Fields returned. e.g. col1,col2 ..."
// @Param	sortby	query	string	false	"Sorted-by fields. e.g. col1,col2 ..."
// @Param	order	query	string	false	"Order corresponding to each sortby field, if single value, apply to all sortby fields. e.g. desc,asc ..."
// @Param	limit	query	string	false	"Limit the size of result set. Must be an integer"
// @Param	offset	query	string	false	"Start position of result set. Must be an integer"
// @Success 200 {object} models.Configurations
// @Failure 403
// @router / [get]
//自定义开发模式
func (c *AuthorizationsController) GetAll() {
	beego.Debug("GetAll")
	beego.Debug("GetAll")
	beego.Debug(c.Method)
	var fields []string
	var sortby []string
	var order []string
	var query = make(map[string]string)
	var names = make(map[string]string)
	var category_ids string
	var page_size int64 = 200
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
		v := models.GetAllAuthorizationsFast(types, query, names, fields, sortby, order, page, page_size, category_ids)
		c.Data["json"] = v
	} else {
		//v := models.GetAllProducts(types,query,names, fields, sortby, order, page, page_size,category_ids)
		//c.Data["json"] = v
	}

	c.ServeJSON()
	return
}


// Put ... 不存在新增，存在修改
// @Title Put
// @Description update the Configurations
// @Param	id		path 	string	true		"The id you want to update"
// @Param	body		body 	models.Configurations	true		"body for Configurations content"
// @Success 200 {object} models.Configurations
// @Failure 403 :id is not int
// @router /:id [put]
func (c *AuthorizationsController) Put() {
	beego.Debug("Put")
	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)


	if c.Method == "fast" {
		var data map[string]interface{}
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &data)
		if err == nil {
			types := models.GetMapValue("type", data)
			c.Data["json"] = models.UpdateAuthorizationsByIdFast(data, id,types.(string))
		} else {
			c.Data["json"] = models.MessageErrorUint64(0, err.Error())
		}
	} else {
		v := models.ConfigurationsData{Id: id}
		err := json.Unmarshal(c.Ctx.Input.RequestBody, &v)
		if err == nil {
			data := models.UpdateConfigurationsById(&v)
			c.Data["json"] = data
		} else {
			c.Data["json"] = models.MessageErrorUint64(id, err.Error())
		}
	}

	c.ServeJSON()
}

// Delete ...
// @Title Delete
// @Description delete the Configurations
// @Param	id		path 	string	true		"The id you want to delete"
// @Success 200 {string} delete success!
// @Failure 403 id is empty
// @router /:id [delete]
func (c *AuthorizationsController) Delete() {
	beego.Debug("Delete")

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	data := models.DeleteAuthorizations(id)

	c.Data["json"] = data

	c.ServeJSON()
}
