package controllers

import (
	"base_service/models"
	"crypto/md5"
	"fmt"
	"os"
	"path"
	"strings"
	"time"

	"github.com/astaxie/beego"
)

type FilesController struct {
	baseController
}

// URLMapping ...
func (c *FilesController) URLMapping() {
	beego.Debug(c.Ctx.Input.Param(":method"))
	if c.Ctx.Input.Param(":method") == GetFast() {
		c.Method = "agility"
	} else {
		c.Method = "fast"
	}
	c.Mapping("Post", c.Post)

}

// Post ...
// @Title Post
// @Description create Categories
// @Param	body		body 	models.Categories	true		"body for Categories content"
// @Success 201 {int} models.Categories
// @Failure 403 body is empty
// @router / [post]
func (c *FilesController) Post() {
	beego.Debug("Post")
	beego.Debug(c.Method)
	var haSdomain string
	var domainAddress string
	//	var requestDomainAddress string
	if v := c.GetString("has_domain"); v != "" {
		haSdomain = v
	}
	if v := c.GetString("domain_address"); v != "" {
		domainAddress = v
	}

	if c.Method == "fast" {
		//快速开发模式

		// uploadfilename，这是一个key值，对应的是html中input type-‘file’的name属性值
		file, h, err := c.GetFile("file")

		if err != nil {
			beego.Debug("getfile err", err)
		}
		//1.限定格式
		//拿到文件的后缀名
		fileExt := path.Ext(h.Filename)
		//if fileExt != ".jpg" && fileExt != ".png" {
		//	beego.Info("上传文件格式错误")
		//	return
		//}
		//2.限制大小
		//if h.Size > 500000 {
		//	beego.Info("上传文件过大")
		//	return
		//}

		//3.对文件重命名避免重复+时间戳 2006-01-02 15:04:05 go语言诞生时间 可正常格式化时间
		fileName := time.Now().Format("2006-01-02")
		errs := os.Mkdir("static/upload/images/"+fileName, 0755)
		if errs != nil {
			c.Data["json"] = models.MessageErrorUint64(0, errs.Error())
		}
		beego.Info(fileExt)
		beego.Debug(h.Filename)
		// 关闭上传的文件，不然的话会出现临时文件不能清除的情况
		defer file.Close()
		// 保存位置在 static/upload, 没有文件夹要先创建
		id := models.SnowflakeId()
		name := Md5Crypt(fileName + h.Filename + models.Uint64ToStrings(id))
		beego.Info(name)
		//     “.”必须
		err2 := c.SaveToFile("file", "static/upload/images/"+fileName+"/"+name+fileExt)

		if err2 != nil {
			c.Data["json"] = models.MessageErrorUint64(0, err2.Error())
		}

		returnData := make(map[string]interface{})
		if domainAddress != "" && haSdomain == "yes" {
			returnData["value"] = domainAddress + "/static/upload/images/" + fileName + "/" + name + fileExt
		} else if haSdomain == "yes" {
			beego.Debug(haSdomain)
			beego.Debug(c.Ctx.Input.Domain())
			beego.Debug(c.Ctx.Input.Port())
			beego.Debug(c.Ctx.Input.Protocol())
			var domain string
			var port string
			port = models.ToString(c.Ctx.Input.Port())
			if port != "" {
				port = ":" + port
			}
			domain = c.Ctx.Input.Domain()
			if c.Ctx.Input.Protocol() == "HTTP/1.1" {
				domain = "http://" + domain + port
			} else {
				domain = "https://" + domain + port
			}
			returnData["value"] = domain + "/static/upload/images/" + fileName + "/" + name + fileExt
		} else {
			returnData["value"] = "static/upload/images/" + fileName + "/" + name + fileExt
		}

		c.Data["json"] = models.MessageSucessMap(returnData, "上传成功")
	}

	c.ServeJSON()
	return

}

func Md5Crypt(str string, salt ...interface{}) (CryptStr string) {
	if l := len(salt); l > 0 {
		slice := make([]string, l+1)
		str = fmt.Sprintf(str+strings.Join(slice, "%v"), salt...)
	}
	return fmt.Sprintf("%x", md5.Sum([]byte(str)))
}
