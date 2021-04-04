package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strings"
	"time"
)

type Relations struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	SourceId    uint64    `orm:"column(source_id)" description:"如产品id "`
	TargetId    uint64    `orm:"column(source_id)" description:"如分类id"`
	Type        string    `orm:"column(type);size(255);null"`
	CreatedTime string `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime string `orm:"column(updated_time);type(timestamp);null"`
}





func (t *Relations) TableName() string {
	return "relations"
}
//添加分类关联关系
func AddCategoriesRelation(categories interface{},id uint64,types string){

	if categories !=""{
		categories_ids :=strings.Split(categories.(string), ",")
		beego.Debug(categories_ids)
		for _, v := range categories_ids {
			beego.Debug("v")
			beego.Debug(v)
			AddRelations(id,StringToUint64(v),types)
		}
	}
}

//更新分类关联关系
func UpdateCategoriesRelation(categories interface{},id uint64,types string){

	if  categories !=""{
		categories_ids :=strings.Split(categories.(string), ",")
		beego.Debug(categories_ids)
		//添加分类属性

		//更新分类属性
		for _, v := range categories_ids {
			beego.Debug("v")
			beego.Debug(v)
			DeleteRelations(id,types)
			AddRelations(id,StringToUint64(v),types)
		}
	}
}

// AddCategories insert a new Categories into database and returns
// last inserted Id on success.
func DeleteRelations(SourceId uint64, Type string) bool {
	orm.Debug = true
	o := orm.NewOrm()
	sql :="delete  from `relations` where (source_id=? or target_id=? ) and type=?"
	beego.Debug(sql)
	res, err := o.Raw(sql,SourceId,SourceId,Type).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  false
	}
	return  true
}




// AddCategories insert a new Categories into database and returns
// last inserted Id on success.
func AddRelations(SourceId uint64,TargetId uint64,Type string) bool {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()
	sql :="INSERT INTO `relations` (`id`, `source_id`, `target_id`,`type`, `created_time`, `updated_time`)" +
		" VALUES (?, ?, ?, ?, ?, ?)"
	beego.Debug(sql)
	_, err := o.Raw(sql,id,SourceId,TargetId,Type,time.Now(),time.Now()).Exec()
	if err != nil {
		beego.Debug(err)
		return false
	}

	return true
}
// Params stores the Params
type Params map[string]interface{}

// ParamsList stores paramslist
type ParamsList []interface{}
//通过relation 字段获取关联数据
func GetDataByRelation(data  orm.Params, returnData map[string]interface{}) map[string]interface{}{
	beego.Debug("GetDatasByRelation")


	relation1 := GetMapValue("relation1", data).(string)
	relation2 := GetMapValue("relation2", data).(string)
	relation3 := GetMapValue("relation3", data).(string)
	relation4 := GetMapValue("relation4", data).(string)
	relation5 := GetMapValue("relation5", data).(string)
	relation6 := GetMapValue("relation6", data).(string)
	relation1_type := GetMapValue("relation1_type", data).(string)
	relation2_type := GetMapValue("relation2_type", data).(string)
	relation3_type := GetMapValue("relation3_type", data).(string)
	relation4_type := GetMapValue("relation4_type", data).(string)
	relation5_type := GetMapValue("relation5_type", data).(string)
	relation6_type := GetMapValue("relation6_type", data).(string)

	//beego.Debug(relation1)
	//beego.Debug(relation1_type)
	if relation1 !="" && relation1_type !=""{
		returnData["relation1"]=relation1
		returnData["relation1_data"]=executeRelationSql(StringToUint64(relation1),relation1_type)
	}
	if relation2 !="" && relation2_type !=""{
		returnData["relation2"]=relation2
		returnData["relation2_data"]=executeRelationSql(StringToUint64(relation2),relation2_type)
	}
	if relation3 !="" && relation3_type !=""{
		returnData["relation3"]=relation3
		returnData["relation3_data"]=executeRelationSql(StringToUint64(relation3),relation3_type)
	}
	if relation4 !="" && relation4_type !=""{
		returnData["relation4"]=relation4
		returnData["relation4_data"]=executeRelationSql(StringToUint64(relation4),relation4_type)
	}
	if relation5 !="" && relation5_type !=""{
		returnData["relation5"]=relation5
		returnData["relation5_data"]=executeRelationSql(StringToUint64(relation5),relation5_type)
	}
	if relation6 !="" && relation6_type !=""{
		returnData["relation6"]=relation6
		returnData["relation6_data"]=executeRelationSql(StringToUint64(relation6),relation6_type)
	}

		return returnData
}

func executeRelationSql(id uint64,types string) (returnData interface{}){
	beego.Debug("executeRelationSql")
	var data map[string]interface{}
	switch types {
		case "user":
			data= GetUsersByIdFast(id,false)
		case "product":
			data= GetProductsFastById(id,false)
		case "authorization":
			data= GetAuthorizationsFastById(id,false)
		case "category":
			data= GetCategoriesFastById(id,false)
		case "config":
			data= GetConfigurationsByIdFast(id,false)

	}

	for key, value := range data {


		if key=="data"{
			 returnData=value
		}

	}
	return returnData
}
