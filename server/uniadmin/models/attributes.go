package models

import (
	"errors"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type Attributes struct {
	Id          uint64    `orm:"column(id);pk"`
	SourceId    uint64    `orm:"column(source_id)" description:"目标id"`
	Name        string    `orm:"column(name);size(64)" description:"自定义字段"`
	Type        string    `orm:"column(type);size(64)" description:"数据类型"`
	Language    string    `orm:"column(language);size(20)" description:"语言"`
	Remark      string    `orm:"column(remark);size(255)" description:"字段名"`
	Value       string    `orm:"column(value);size(255)" description:"字段"`
	Format      string    `orm:"column(format);size(255)" description:"数据类型"`
	v1          string    `orm:"column(v1);size(255)" description:"预留字段"`
	v2          string    `orm:"column(v2);size(255)" description:"预留字段"`
	v3          string    `orm:"column(format);size(255)" description:"预留字段"`
	v4          string    `orm:"column(format);size(255)" description:"预留字段"`
	v5          string    `orm:"column(format);size(255)" description:"预留字段"`
	v6          string    `orm:"column(format);size(255)" description:"预留字段"`
	CreatedTime time.Time `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime time.Time `orm:"column(updated_time);type(timestamp);null"`
}

type Attribute struct {
	SourceId uint64 `json:"source_id"`
	Type     string `json:"type"`
	Name     string `json:"name"`
	Remark   string `json:"remark"`
	Value    string `json:"value"`
	Format   string `json:"format"`
	Language string `json:"language"`
	v1       string `json:"v1"`
	v2       string `json:"v2"`
	v3       string `json:"v3"`
	v4       string `json:"v4"`
	v5       string `json:"v5"`
	v6       string `json:"v6"`
}


func InsertAttributesToDb(data map[string]interface{},id uint64,deleteMap map[string]interface{},table_type string){
	var  attribute Attribute
	beego.Debug("InsertAttributesToDb-data",data)
	for key, value := range data {

		attribute.SourceId=id
		attribute.Name=key
		attribute.Language = "zh_CN"
		attribute.Value=ToString(value)
		attribute.Format=getDataType(value)
		if HandleDeleteMap(key,deleteMap) ==true{
			beego.Debug("deleteMap-"+key)
			continue
		}
		AddAttributes(&attribute,id,table_type)
	}
}

func HandleDeleteMap(name string ,deleteMap map[string]interface{}) bool{

	for k,_ :=range  deleteMap{
		if name==k {
			return true
		}
	}
	return false
}


func AddAttributes(attribute *Attribute, SourceId uint64, Type string) bool {
	id := SnowflakeId()
	o := orm.NewOrm()
	sql := "INSERT INTO `attributes` (`id`, `source_id`,`type`, `name`, `language`, `remark`, `value`, `format`,  `created_time`, `updated_time`) " +
		"VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?);"

	_, err := o.Raw(sql, id, SourceId, Type, attribute.Name, attribute.Language,attribute.Remark, attribute.Value, attribute.Format, time.Now(), time.Now()).Exec()
	if err != nil {

		return false
	}
	return true
}


func UpdateAttributesToDb(data map[string]interface{},id uint64,deleteMap map[string]interface{},table_type string){
	var attribute Attribute
	beego.Debug("UpdateAttributesToDb-data",data)

	for key, value := range data {

		attribute.SourceId = id
		attribute.Name = key
		attribute.Language = "zh_CN"
		attribute.Value =ToString(value)
		attribute.Format = getDataType(value)
		if(HandleDeleteMap(attribute.Name,deleteMap) ==true){
			continue
		}
		attributeData, errs := GetAttributesByName(id, key, table_type)
		beego.Debug(attributeData)
		beego.Debug(errs)
		if errs == nil { //修改
			UpdateAttributes(&attribute, id)
		} else { //添加
			AddAttributes(&attribute, id, table_type)
		}
	}

}
func UpdateAttributes(c *Attribute, SourceId uint64) bool {
	orm.Debug = true
	o := orm.NewOrm()
	sql := "UPDATE `attributes` SET   `language`=?, `remark`=?, `value`=?," +
		" `format`=?, `updated_time`=?" + " WHERE `source_id`=? and `name`=?"
	res, err := o.Raw(sql, c.Language, c.Remark, c.Value, c.Format, time.Now(), SourceId, c.Name).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return false
	}
	return true
}

func DeleteAttributes(SourceId uint64) bool {
	orm.Debug = true
	o := orm.NewOrm()
	sql := "delete  from attributes where source_id=? "
	res, err := o.Raw(sql, SourceId).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return false
	}
	return true
}

func GetAttributes(id uint64) (data []orm.Params, err error) {
	orm.Debug = true
	o := orm.NewOrm()
	var attributes []orm.Params
	num, err := o.Raw("select * from  attributes where source_id=?", id).Values(&attributes)
	if err != nil || num <= 0 { //处理err
		return data, err
	}
	return attributes, nil
}

func GetAttributesByName(id uint64, name string, types string) (data []orm.Params, err error) {
	orm.Debug = true
	o := orm.NewOrm()
	var attributes []orm.Params
	num, err := o.Raw("select * from  attributes where source_id=? and name=? and type=?", id, name, types).Values(&attributes)
	beego.Error(err)
	if err != nil || num <= 0 { //处理err
		return data, errors.New("not data in attributes")
	}
	return attributes, nil
}

func GetMapAttibutesKeyAndValue(data map[string]interface{}) (key string, value string) {
	for k, v := range data {
		if k == "name" {
			key = v.(string)
		}
		if k == "value" {
			value = v.(string)
		}
	}
	return key, value
}

//where 条件组装
//func Where(names map[string]string) string{
//	sql:="( "
//	for k, v := range names {
//		sql+="  ( name="+k+" and value="+v+" ) and"
//	}
//	sql=strings.TrimSuffix(sql, "and")
//	return sql+" )"
//}

func FindSourceIdByFromTables(table string, query map[string]string, fields []string, sortby []string, order []string,
	page int64, page_size int64, category_ids string,category_type string) (data []orm.Params) {
	orm.Debug = true
	o := orm.NewOrm()
	sql := ""
	if page != 0 {
		page = page - 1
	}
	page = page * page_size

	//组装query 查询条件
	var queryWhere string
	if len(query) != 0 {
		for k, v := range query {
			queryWhere += " and `" + k + "` = '" + v + "'"
		}
	}

	var DataList []orm.Params
	var sourceIdsql string
	//使用分类id先过滤一次
	if category_ids != "" && category_type !="" {
		sourceIdsql =getSourceIdByCategoryId(category_ids,category_type,false)
	}

	sql = "select * from  " + table + "  where  1=1 " + queryWhere + " " + sourceIdsql + " order by updated_time desc limit ?,? "

	_, errs := o.Raw(sql, page, page_size).Values(&DataList)
	if errs != nil {
		return data
	}

	return DataList
}

func CountSourceIdByFromTables(table string, query map[string]string, category_ids string,category_type string) (count int64) {
	orm.Debug = true
	o := orm.NewOrm()

	var countNum []orm.Params
	var sourceIdsql string

	//组装query 查询条件
	var queryWhere string
	if len(query) != 0 {
		for k, v := range query {
			queryWhere += " and `" + k + "` = '" + v + "'"
		}
	}

	//使用分类id先过滤一次
	if category_ids != "" && category_type !="" {
		sourceIdsql =getSourceIdByCategoryId(category_ids,category_type,false)
	}

	sql := "select count(*) as count from  " + table + "  where  1=1 " + queryWhere + " " + sourceIdsql

	_, errs := o.Raw(sql).Values(&countNum)
	if errs != nil {
		return count
	}

	counts := GetMapValue("count", countNum[0]).(string)
	count, err := strconv.ParseInt(counts, 10, 64)
	if err != nil || count <= 0 {
		return count
	}

	return count

}


func getSourceIdByCategoryId(category_ids string,category_type string,attribute bool) string {
	orm.Debug = true
	o := orm.NewOrm()
	sql := ""
	var SourceIdList []orm.Params
	var sourceIdsql string
	var sourceIdsqlId string
	sql = "select DISTINCT source_id  from  relations where target_id in(" + category_ids + ") and type='"+category_type+"'"

	_, errs := o.Raw(sql).Values(&SourceIdList)
	if errs == nil {

		for k, _ := range SourceIdList {
			id := GetMapValue("source_id", SourceIdList[k]).(string)
			//source_id, _ = strconv.ParseUint(id, 10, 64)
			sourceIdsqlId += id + ","
		}
		sourceIdsqlId = strings.TrimSuffix(sourceIdsqlId, ",")
		if sourceIdsqlId !=""{
			if attribute ==true {
				sourceIdsql = " and source_id in(" + sourceIdsqlId + ")"
			}else{
				sourceIdsql = " and id in(" + sourceIdsqlId + ")"
			}
			return sourceIdsql
		}
	}
	return " and 1=0 "
}


func FindSourceIdByNameFromAttributes(table string, query map[string]string, names map[string]string, fields []string, sortby []string, order []string,
	page int64, page_size int64, category_ids string, types string,category_type string) (data []orm.Params) {

	var i = 0
	orm.Debug = true
	o := orm.NewOrm()
	sql := ""
	var SourceIdList []orm.Params
	var sourceIdsql string

	if page != 0 {
		page = page - 1
	}
	page = page * page_size

	//组装query 查询条件
	var queryWhere string
	if len(query) != 0 {
		for k, v := range query {
			queryWhere += "and `" + k + "` = '" + v + "'"
		}
	}

	//使用分类id先过滤一次
	if category_ids != "" && category_type !="" {
		sourceIdsql =getSourceIdByCategoryId(category_ids,category_type,true)
	}
	if types != " " {
		types = " and `type`='" + types + "'"
	}
	for k, v := range names {

	
		//第一次
		if i == 0 || 0 >= len(SourceIdList) {

			sql = "select DISTINCT source_id from  attributes  force index(type_name_source_id)  " +
				"where 1=1 " + types + "  and " + "  ( name=" + k + " and value=" + v + " ) " + sourceIdsql

		} else { //二次查询
			//	var source_id uint64
			var sourceId string
			for k, _ := range SourceIdList {
				id := GetMapValue("source_id", SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceId += id + ","
			}
			sourceId = strings.TrimSuffix(sourceId, ",")

			sql = "select DISTINCT source_id from  attributes  force index(type_name_source_id)  " +
				"where 1=1 " + types + "  and " + "  ( name=" + k + " and value=" + v + " ) " + " and source_id in(" + sourceId + ")" + sourceIdsql
		}


		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs != nil {
			return data
		}

		i++
	}

	var sourceId string
	var DataList []orm.Params

	for k, _ := range SourceIdList {
		id := GetMapValue("source_id", SourceIdList[k]).(string)
		//source_id, _ = strconv.ParseUint(id, 10, 64)
		sourceId += id + ","
	}
	sourceId = strings.TrimSuffix(sourceId, ",")
	sql = "select * from  " + table + "   where  1=1 " + queryWhere + " and id in(" + sourceId + ")  order by updated_time desc limit ?,?"
	beego.Debug(sql)
	_, errs := o.Raw(sql, page, page_size).Values(&DataList)
	if errs != nil {
		beego.Debug(errs)
		return data
	}

	return DataList
}

func CountSourceIdByNameFromAttributes(table string, query map[string]string, names map[string]string, category_ids string, types string,category_type string) (counts int64) {
	var i = 0
	orm.Debug = true
	o := orm.NewOrm()
	//sqlCount :=""
	sql := ""
	var SourceIdList []orm.Params
	var sourceIdsql string

	//组装query 查询条件
	var queryWhere string
	if len(query) != 0 {
		for k, v := range query {
			queryWhere += "and `" + k + "` = '" + v + "'"
		}
	}

	//使用分类id先过滤一次
	if category_ids != "" && category_type !="" {
		sourceIdsql =getSourceIdByCategoryId(category_ids,category_type,true)
	}


	if types != "" {
		types = " and type='" + types + "'"
	}

	for k, v := range names {
		
		//第一次
		if i == 0 {

			sql = "select DISTINCT source_id from  attributes  force index(type_name_source_id)  " +
				"where 1=1 " + types + " " + " and ( name=" + k + " and value=" + v + " ) " + sourceIdsql

		} else { //二次查询
			//	var source_id uint64
			var sourceId string
			for k, _ := range SourceIdList {
				id := GetMapValue("source_id", SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceId += id + ","
			}
			sourceId = strings.TrimSuffix(sourceId, ",")

			sql = "select DISTINCT source_id from  attributes  force index(type_name_source_id)  " +
				"where 1=1 " + types + "  and " + "  ( name=" + k + " and value=" + v + " ) " + " and source_id in(" + sourceId + ")" + sourceIdsql
			beego.Debug("in find")
			beego.Debug(sql)
		}


		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs != nil {
			beego.Debug(errs)
			return counts
		}
		beego.Debug(SourceIdList)

		i++
	}

	var sourceId string
	var countNum []orm.Params

	for k, _ := range SourceIdList {
		id := GetMapValue("source_id", SourceIdList[k]).(string)
		//source_id, _ = strconv.ParseUint(id, 10, 64)
		sourceId += id + ","
	}
	sourceId = strings.TrimSuffix(sourceId, ",")
	sql = "select count(DISTINCT id) as count from     " + table +
		" where  1=1 " + queryWhere + " and id in(" + sourceId + ") "

	_, errs := o.Raw(sql).Values(&countNum)
	if errs != nil {
		beego.Debug(errs)
		return counts
	}

	count := GetMapValue("count", countNum[0]).(string)
	counts, err := strconv.ParseInt(count, 10, 64)
	if err != nil || counts <= 0 {
		beego.Debug(err)
		return counts
	}
	beego.Debug(countNum)

	return counts
}
