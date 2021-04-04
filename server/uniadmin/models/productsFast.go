package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

type ProductsFast struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	Type    string    `orm:"column(type)" description:"产品类型"`
	CreatedTime string `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime string `orm:"column(updated_time);type(timestamp);null"`
}




// AddProducts insert a new Products into database and returns
// last inserted Id on success.
func AddProductsFast(product map[string]interface{},types string) (data map[string]interface{}) {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()

	ProductsData := new(Products)
	ProductsData.CreatedTime = time.Now()
	ProductsData.UpdatedTime = time.Now()
	ProductsData.Type = types
	ProductsData.Id = id
	ProductsData.Relation1 =  GetMapValue("relation1", product).(string)
	ProductsData.Relation2 =  GetMapValue("relation2", product).(string)
	ProductsData.Relation3 =  GetMapValue("relation3", product).(string)
	ProductsData.Relation4 =  GetMapValue("relation4", product).(string)
	ProductsData.Relation5 =  GetMapValue("relation5", product).(string)
	ProductsData.Relation6 =  GetMapValue("relation6", product).(string)
	ProductsData.Relation1Type =  GetMapValue("relation1_type", product).(string)
	ProductsData.Relation2Type =  GetMapValue("relation2_type", product).(string)
	ProductsData.Relation3Type =  GetMapValue("relation3_type", product).(string)
	ProductsData.Relation4Type =  GetMapValue("relation4_type", product).(string)
	ProductsData.Relation5Type =  GetMapValue("relation5_type", product).(string)
	ProductsData.Relation6Type =  GetMapValue("relation6_type", product).(string)
	num, err := o.Insert(ProductsData)
	if err != nil {
		fmt.Println("mysql row affected id: ", num, err)
		return MessageErrorMapInt(id, "添加失败")
	}

	AddCategoriesRelation(GetMapValue("category_ids",product),id,"product_category")
	deleteMap := make(map[string]interface{})
	deleteMap["type"]=types
	InsertAttributesToDb(product,id,deleteMap,"product")
	product["id"]=uint64ToString(id)
	return  MessageSucessMap(product,"添加成功")
}


func GetProductsFastById(id uint64,findRelation bool) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  products where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorEmpty(id,"获取数据失败,请检查传入id参数")
	}

	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorEmpty(id,"获取数据失败")
	}



	returnData := make(map[string]interface{})
	for i := 0; i < len(attributes); i++ {
		//var data map[string]string
		key,value:=GetMapAttibutesKeyAndValue(attributes[i])
		beego.Debug(key)
		beego.Debug(value)
		//data[key]=value
		fmt.Printf("v1 type:%T\n", key)
		fmt.Printf("v2 type:%T\n", value)
		returnData[key]=value

	}
	returnData["id"]=uint64ToString(id)
	types:=GetMapValue("type",maps[0]).(string)
	created_time:=GetMapValue("created_time",maps[0]).(string)
	updated_time:=GetMapValue("updated_time",maps[0]).(string)
	returnData["type"]=types
	returnData["created_time"]=created_time
	returnData["updated_time"]=updated_time
	//获取关联数据
	if findRelation ==true{
		returnNewData :=GetDataByRelation(maps[0],returnData)
		return MessageSucessMap(returnNewData,"获取数据成功")
	}
	return MessageSucessMap(returnData,"获取数据成功")
}




func GetAllProductsFast(types string,query map[string]string, names map[string]string,fields []string, sortby []string, order []string,
	page int64, page_size int64,category_ids string) (data map[string]interface{}) {

	var DataList [] orm.Params
	var count int64

	//如果是通过names来进行过滤查询 该方式性能较差,可能是下面查询方式的 二十分之一性能
	if len(names) != 0{
		//参数遍历
		//name:=where(names)
		DataList=FindSourceIdByNameFromAttributes("products",query,names, fields, sortby, order, page, page_size,category_ids,"product","product_category")
		count=CountSourceIdByNameFromAttributes("products",query,names,category_ids,"product","product_category")

	}else{
		//sqlCount="select count(*) as count from  products  where  1=1"
		DataList=FindSourceIdByFromTables("products",query, fields, sortby, order, page, page_size,category_ids,"product_category")
		count=CountSourceIdByFromTables("products",query,category_ids,"product_category")
	}



	if count <= 0 {
		return MessageSucessMapEmpty()
	}
	if 0 == len(DataList) {
		return MessageSucessMapEmpty()
	}


	dataList := []map[string]interface{}{}
	for i := 0; i < len(DataList); i++ {

		var source_id uint64

		id:=GetMapValue("id",DataList[i]).(string)
		source_id, _ = strconv.ParseUint(id, 10, 64)

		//获取详情信息
		attributes,errs := GetAttributes(source_id)
		data :=  make(map[string]interface{})
		if errs ==nil{
			for i := 0; i < len(attributes); i++ {
				//var data map[string]string
				key,value:=GetMapAttibutesKeyAndValue(attributes[i])
				beego.Debug(key)
				beego.Debug(value)
				//data[key]=value
				fmt.Printf("v1 type:%T\n", key)
				fmt.Printf("v2 type:%T\n", value)
				data[key]=value

			}
			data["id"]=id
			types:=GetMapValue("type",DataList[i]).(string)
			created_time:=GetMapValue("created_time",DataList[i]).(string)
			updated_time:=GetMapValue("updated_time",DataList[i]).(string)
			data["type"]=types
			data["created_time"]=created_time
			data["updated_time"]=updated_time
			returnNewData :=GetDataByRelation(DataList[i],data)
			dataList = append(dataList, returnNewData)

		}

		beego.Debug(dataList)
	}
	beego.Debug(data)
	returnData  :=map[string]interface{}{}
	returnData["items"]=dataList
	returnData["count"]=count
	returnData["page"]=page
	returnData["perPage"]=page_size

	return  MessageSucessMap(returnData,"")
}


//更新产品
// UpdateCategories updates Categories by Id and returns error if
// the record to be updated doesn't exist
func UpdateProductByIdFast(product map[string]interface{},id uint64) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()

	ProductData := Products{Id: id}

	err := o.Read(&ProductData)
	if err != nil  {
		return  MessageErrorMapInt(id,"数据不存在")
	}

	ProductData.UpdatedTime = time.Now()
	ProductData.Id = id
	types :=  GetMapValue("type", product).(string)
	Relation1 :=   GetMapValue("relation1", product).(string)
	Relation2 :=  GetMapValue("relation2", product).(string)
	Relation3 :=  GetMapValue("relation3", product).(string)
	Relation4 :=  GetMapValue("relation4", product).(string)
	Relation5 :=  GetMapValue("relation5", product).(string)
	Relation6 :=  GetMapValue("relation6", product).(string)
	if Relation1 != "" {
		ProductData.Relation1 = Relation1
	}
	if Relation2 != "" {
		ProductData.Relation2 = Relation2
	}
	if Relation3 != "" {
		ProductData.Relation3 = Relation3
	}
	if Relation4 != "" {
		ProductData.Relation4 = Relation4
	}
	if Relation5 != "" {
		ProductData.Relation5 = Relation5
	}
	if Relation6 != "" {
		ProductData.Relation6 = Relation6
	}

	Relation1Type :=  GetMapValue("relation1_type", product).(string)
	Relation2Type :=  GetMapValue("relation2_type", product).(string)
	Relation3Type := GetMapValue("relation3_type", product).(string)
	Relation4Type := GetMapValue("relation4_type", product).(string)
	Relation5Type := GetMapValue("relation5_type", product).(string)
	Relation6Type :=  GetMapValue("relation6_type", product).(string)

	if Relation1Type != "" {
		ProductData.Relation1Type = Relation1Type
	}
	if Relation2Type != "" {
		ProductData.Relation2Type = Relation2Type
	}
	if Relation3Type != "" {
		ProductData.Relation3Type = Relation3Type
	}
	if Relation4Type != "" {
		ProductData.Relation4Type = Relation4Type
	}
	if Relation5Type != "" {
		ProductData.Relation5Type = Relation5Type
	}
	if Relation6Type != "" {
		ProductData.Relation6Type = Relation6Type
	}

	if types != "" {
		ProductData.Type = types
	}

	if num, err := o.Update(&ProductData); err != nil {
		fmt.Println("mysql row affected id: ",num,err)
		return MessageErrorMapInt(id, "修改失败")
	}
	UpdateCategoriesRelation(GetMapValue("category_ids",product),id,"product_category")

	sql:="UPDATE  `products` SET  `updated_time`=? " +
		"WHERE (`id`=?);"
	_, errs := o.Raw(sql,time.Now(),id).Exec()

	if errs != nil {
		return  MessageErrorMapInt(id,"修改失败")
	}


	beego.Debug(product)
	deleteMap := make(map[string]interface{})
	deleteMap["type"]=types
	UpdateAttributesToDb(product,id,deleteMap,"product")
	product["id"]=uint64ToString(id)
	return MessageSucessMap(product, "修改成功")
}