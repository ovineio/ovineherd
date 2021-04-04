package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"time"
)

type FilesFast struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	Type    string    `orm:"column(type)" description:""`
	CreatedTime time.Time `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime time.Time `orm:"column(updated_time);type(timestamp);null"`
}


type FilesFastData struct {
	Id   uint64 `json:"id"`
	Type string `json:"type"`
	Attribute []Attribute `json:"attributes"`
}






// AddUsers insert a new Products into database and returns
// last inserted Id on success.
func AddFilesFast(file map[string]interface{},types string) (data map[string]interface{}) {
	id := SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()

	sql := "INSERT INTO `files` (`id`,  `type`, `created_time`, `updated_time`)" +
		" VALUES (?, ?,?,  ?)"

	res, err := o.Raw(sql, id, types, time.Now(), time.Now()).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return MessageErrorMap(data, "上传失败")
	}

	//
	////填写产品属性
	//

	////添加分类属性
	//for _, v := range c.CategoryIds {
	//	beego.Debug("v")
	//	AddRelations(id,v,"category_product")
	//}
	//
	beego.Debug(file)

	var attribute Attribute
	for key, value := range file {
		attribute.SourceId = id
		attribute.Name = key
		attribute.Value = value.(string)
		attribute.Format = getDataType(value)
		if attribute.Name == "type" {
			continue
		}
		AddAttributes(&attribute, id, "configuration")
	}
	file["id"]=id
	return MessageSucessMap(file, "上传成功")
}

