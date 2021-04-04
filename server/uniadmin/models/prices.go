package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strconv"
	"strings"
	"time"
)


type Prices struct {
	Id          uint64       `orm:"column(id);pk"`
	Name         string    `orm:"column(name);size(64)" description:"自定义字段"`
	Type         string    `orm:"column(type);size(64)" description:"数据类型"`
	Language    string    `orm:"column(language);size(20)" description:"语言"`
	Remark      string    `orm:"column(remark);size(255)" description:"字段名"`
	Value       float64    `orm:"column(value);size(255)" description:"字段"`
	Format      string    `orm:"column(format);size(255)" description:"数据类型"`
	CreatedTime time.Time `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime time.Time `orm:"column(updated_time);type(timestamp);null"`
}

type Price struct{
	Type string `json:"type"`
	Name string `json:"name"`
	Remark string `json:"remark"`
	Value float64 `json:"value"`
	Format string `json:"format"`
	Language string `json:"language"`
}

func AddPrices(price *Price,SourceId uint64,Type string) (uint64){
	id :=SnowflakeId()
	o := orm.NewOrm()
	sql :="INSERT INTO `prices` (`id`, source_id,`type`, `name`, `language`, `remark`, `value`, `format`,  `created_time`, `updated_time`) " +
		"VALUES (?, ?,?, ?, ?, ?, ?, ?, ?,?);"
	beego.Debug(sql)
	_, err := o.Raw(sql,id,SourceId,Type,price.Name,"zh_CN",price.Remark,price.Value,price.Format,time.Now(),time.Now()).Exec()
	if err != nil {

		return id
	}
	return  id
}




//func UpdatePrice(c *Attribute,SourceId uint64) (bool){
//	orm.Debug = true
//	o := orm.NewOrm()
//	sql :="UPDATE `attributes` SET   `language`=?, `remark`=?, `value`=?," +
//		" `format`=?, `updated_time`=?" +" WHERE `source_id`=? and `name`=?"
//	res, err := o.Raw(sql,c.Language,c.Remark,c.Value,c.Format,time.Now(),SourceId,c.Name).Exec()
//	if err != nil {
//		num, _ := res.RowsAffected()
//		fmt.Println("mysql row affected nums: ", num)
//		return  false
//	}
//	return  true
//}

func DeletePrice(SourceId uint64) (bool){
	orm.Debug = true
	o := orm.NewOrm()
	sql :="delete  from prices where source_id=? "
	res, err := o.Raw(sql,SourceId).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  false
	}
	return  true
}

func GetPrice(id uint64) (data interface{},err error){
	orm.Debug = true
	o := orm.NewOrm()
	var attributes [] orm.Params
	num,err := o.Raw("select * from  attributes where source_id=?",id).Values(&attributes)
	if err != nil  || num <= 0{        //处理err
		return  data,err
	}
	return attributes,nil
}




func FindSourceIdByFromPrice(types string,query map[string]string,fields []string, sortby []string, order []string,
	page int64, page_size int64,category_ids string) (data  [] orm.Params) {
	orm.Debug = true
	o := orm.NewOrm()
	//sqlCount :=""
	sql :=""
	var DataList [] orm.Params

	var SourceIdList [] orm.Params
	var sourceIdsql string
	var sourceIdsqlId string
	//使用分类id先过滤一次
	if category_ids !=""{
		sql:="select DISTINCT source_id  from  relations where target_id in("+category_ids+")"

		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs == nil  {

			for k, _ := range SourceIdList {
				id:=GetMapValue("source_id",SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceIdsqlId +=id+","
			}
			sourceIdsqlId=strings.TrimSuffix(sourceIdsqlId, ",")
			sourceIdsql=" and id in("+sourceIdsqlId+")"

		}else{
			beego.Debug(errs)
		}

	}

	sql ="select * from  products  where  1=1  "+sourceIdsql+"order by created_time desc limit ?,?"

	_, errs := o.Raw(sql,page,page_size).Values(&DataList)
	if errs != nil  {
		beego.Debug(errs)
		return data
	}
	beego.Debug(DataList)

	return DataList
}

func CountSourceIdByFromPrice(types string,query map[string]string, category_ids string) (count  int64) {
	orm.Debug = true
	o := orm.NewOrm()

	var countNum [] orm.Params
	var SourceIdList [] orm.Params
	var sourceIdsql string
	var sourceIdsqlId string
	//使用分类id先过滤一次
	if category_ids !=""{
		sql:="select DISTINCT source_id  from  relations where target_id in("+category_ids+")"

		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs == nil  {

			for k, _ := range SourceIdList {
				id:=GetMapValue("source_id",SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceIdsqlId +=id+","
			}
			sourceIdsqlId=strings.TrimSuffix(sourceIdsqlId, ",")
			sourceIdsql=" and id in("+sourceIdsqlId+")"

		}else{
			beego.Debug(errs)
		}

	}


	sql :="select count(*) as count from  products  where  1=1 " +sourceIdsql

	_, errs := o.Raw(sql).Values(&countNum)
	if errs != nil  {
		beego.Debug(errs)
		return count
	}

	counts :=GetMapValue("count",countNum[0]).(string)
	count, err := strconv.ParseInt(counts, 10, 64)
	if err != nil  || count <=0 {
		beego.Debug(err)
		return count
	}
	beego.Debug(countNum)

	return count

}

func FindSourceIdByNameFromPrice(types string,query map[string]string, names  map[string]string,fields []string, sortby []string, order []string,
	page int64, page_size int64,category_ids string) (data  [] orm.Params)  {

	var i=0
	orm.Debug = true
	o := orm.NewOrm()
	//sqlCount :=""
	sql :=""
	var SourceIdList [] orm.Params
	var sourceIdsql string
	var sourceIdsqlId string
	//使用分类id先过滤一次
	if category_ids !=""{
		sql="select DISTINCT source_id  from  relations where target_id in("+category_ids+")"

		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs == nil  {

			for k, _ := range SourceIdList {
				id:=GetMapValue("source_id",SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceIdsqlId +=id+","
			}
			sourceIdsqlId=strings.TrimSuffix(sourceIdsqlId, ",")
			sourceIdsql=" and source_id in("+sourceIdsqlId+")"

		}else{
			beego.Debug(errs)
		}

	}

	for k, v := range names {
		//第一次
		if(i==0 ||  0>=len(SourceIdList)){

			sql ="select DISTINCT source_id from  attributes  force index(type_name_source_id_language)  " +
				"where type='product'  and "+"  ( name="+k+" and value="+v+" ) " +sourceIdsql

		}else{ //二次查询
			//	var source_id uint64
			var sourceId string
			for k, _ := range SourceIdList {
				id:=GetMapValue("source_id",SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceId +=id+","
			}
			sourceId=strings.TrimSuffix(sourceId, ",")

			sql ="select DISTINCT source_id from  attributes  force index(type_name_source_id_language)  " +
				"where type='product'  and "+"  ( name="+k+" and value="+v+" ) " +" and source_id in("+sourceId+")" +sourceIdsql
		}


		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs != nil  {
			beego.Debug(errs)
			return data
		}
		beego.Debug(SourceIdList)

		i++
	}


	var sourceId string
	var DataList [] orm.Params

	for k, _ := range SourceIdList {
		id:=GetMapValue("source_id",SourceIdList[k]).(string)
		//source_id, _ = strconv.ParseUint(id, 10, 64)
		sourceId +=id+","
	}
	sourceId=strings.TrimSuffix(sourceId, ",")
	sql ="select * from  products   " +
		"where  id in("+sourceId+")"

	_, errs := o.Raw(sql).Values(&DataList)
	if errs != nil  {
		beego.Debug(errs)
		return data
	}
	beego.Debug(DataList)

	return DataList
}

func CountSourceIdByNameFromPrice(types string,query map[string]string, names  map[string]string,category_ids string) (counts  int64) {
	var i=0
	orm.Debug = true
	o := orm.NewOrm()
	//sqlCount :=""
	sql :=""
	var SourceIdList [] orm.Params
	var sourceIdsql string
	var sourceIdsqlId string
	//使用分类id先过滤一次
	if category_ids !=""{
		sql="select DISTINCT source_id  from  relations where target_id in("+category_ids+")"

		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs == nil  {

			for k, _ := range SourceIdList {
				id:=GetMapValue("source_id",SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceIdsqlId +=id+","
			}
			sourceIdsqlId=strings.TrimSuffix(sourceIdsqlId, ",")
			sourceIdsql=" and source_id in("+sourceIdsqlId+")"

		}else{
			beego.Debug(errs)
		}

	}
	for k, v := range names {
		//第一次
		if(i==0 ){

			sql ="select DISTINCT source_id from  attributes  force index(type_name_source_id_language)  " +
				"where type='product'  and "+"  ( name="+k+" and value="+v+" ) " + sourceIdsql

		}else{ //二次查询
			//	var source_id uint64
			var sourceId string
			for k, _ := range SourceIdList {
				id:=GetMapValue("source_id",SourceIdList[k]).(string)
				//source_id, _ = strconv.ParseUint(id, 10, 64)
				sourceId +=id+","
			}
			sourceId=strings.TrimSuffix(sourceId, ",")

			sql ="select DISTINCT source_id from  attributes  force index(type_name_source_id_language)  " +
				"where type='product'  and "+"  ( name="+k+" and value="+v+" ) " +" and source_id in("+sourceId+")"+ sourceIdsql
			beego.Debug("in find")
			beego.Debug(sql)
		}


		_, errs := o.Raw(sql).Values(&SourceIdList)
		if errs != nil  {
			beego.Debug(errs)
			return counts
		}
		beego.Debug(SourceIdList)

		i++
	}


	var sourceId string
	var countNum [] orm.Params

	for k, _ := range SourceIdList {
		id:=GetMapValue("source_id",SourceIdList[k]).(string)
		//source_id, _ = strconv.ParseUint(id, 10, 64)
		sourceId +=id+","
	}
	sourceId=strings.TrimSuffix(sourceId, ",")
	sql ="select count(DISTINCT id) as count from  products   " +
		"where  id in("+sourceId+")"

	_, errs := o.Raw(sql).Values(&countNum)
	if errs != nil  {
		beego.Debug(errs)
		return counts
	}

	count :=GetMapValue("count",countNum[0]).(string)
	counts, err := strconv.ParseInt(count, 10, 64)
	if err != nil  || counts <=0 {
		beego.Debug(err)
		return counts
	}
	beego.Debug(countNum)

	return counts
}