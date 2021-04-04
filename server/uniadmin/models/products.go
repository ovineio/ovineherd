package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

type Products struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	Type    string    `orm:"column(type)" description:"产品类型"`
	Relation1    string    `orm:"column(relation1)" description:""`
	Relation2    string    `orm:"column(relation2)" description:""`
	Relation3    string    `orm:"column(relation3)" description:""`
	Relation4    string    `orm:"column(relation4)" description:""`
	Relation5    string    `orm:"column(relation5)" description:""`
	Relation6    string    `orm:"column(relation6)" description:""`
	Relation1Type    string    `orm:"column(relation1_type)" description:""`
	Relation2Type    string    `orm:"column(relation2_type)" description:""`
	Relation3Type    string    `orm:"column(relation3_type)" description:""`
	Relation4Type    string    `orm:"column(relation4_type)" description:""`
	Relation5Type    string    `orm:"column(relation5_type)" description:""`
	Relation6Type    string    `orm:"column(relation6_type)" description:""`
	CreatedTime time.Time `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime time.Time `orm:"column(updated_time);type(timestamp);null"`
}


type ProductsData struct {
	Id   uint64 `json:"id"`
	CategoryId uint64 `json:"category_id"`
	Type string `json:"type"`
	Relation1    string    `orm:"column(relation1)" description:""`
	Relation2    string    `orm:"column(relation2)" description:""`
	Relation3    string    `orm:"column(relation3)" description:""`
	Relation4    string    `orm:"column(relation4)" description:""`
	Relation5    string    `orm:"column(relation5)" description:""`
	Relation6    string    `orm:"column(relation6)" description:""`
	Relation1Type string `json:"relation1_type"`
	Relation2Type string `json:"relation2_type"`
	Relation3Type string `json:"relation3_type"`
	Relation4Type string `json:"relation4_type"`
	Relation5Type string `json:"relation5_type"`
	Relation6Type string `json:"relation6_type"`
	Attribute []Attribute `json:"attributes"`
	CategoryIds []uint64 `json:"category_ids"`
}




func (t *Products) TableName() string {
	return "products"
}


func init() {
	orm.RegisterModel(new(Products))
	//orm.RegisterModel(new(Attributes))
}



// GetAllCategories retrieves all Categories matches certain condition. Returns empty list if
// no records exist

func GetAllProducts(types string,query map[string]string, names map[string]string,fields []string, sortby []string, order []string,
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



	if count <=0 {
		return MessageErrorMap(data,"获取产品失败,没有查到合法数据")
	}


	if  0== len(DataList){
		return MessageErrorMap(data,"获取产品失败,没有查到合法数据")
	}

	for i := 0; i < len(DataList); i++ {

		var source_id uint64

		id:=GetMapValue("id",DataList[i]).(string)
		source_id, _ = strconv.ParseUint(id, 10, 64)

		//获取详情信息
		attributes,errs := GetAttributes(source_id)
		if errs ==nil{
			DataList[i]["attributes"]=attributes
		}
	}

	returnData  :=map[string]interface{}{}
	returnData["items"]=DataList
	returnData["count"]=count
	returnData["page"]=page
	returnData["perPage"]=page_size

	return  MessageSucessMap(returnData,"获取产品列表成功")
}





// AddProducts insert a new Products into database and returns
// last inserted Id on success.
func AddProducts(c *ProductsData) (data map[string]interface{}) {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()
	beego.Debug(c)
	sql :="INSERT INTO `products` (`id`,  `type`, `created_time`, `updated_time`)" +
		" VALUES (?, ?,?,  ?)"

	res, err := o.Raw(sql,id,c.Type,time.Now(),time.Now()).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorMap(data,"添加失败")
	}

	//填写产品属性

	beego.Debug("CategoryIds")
	beego.Debug(c.CategoryIds)
	//添加分类属性
	for _, v := range c.CategoryIds {
		beego.Debug("v")
		AddRelations(id,v,"product_category")
	}

	for i := 0; i < len(c.Attribute); i++ {

		AddAttributes(&c.Attribute[i],id,"product")
	}


	return  MessageSucessUint64(id,"添加产品成功")
}



//更新产品
// UpdateCategories updates Categories by Id and returns error if
// the record to be updated doesn't exist
func UpdateProductById(m *ProductsData) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  products where id=?",m.Id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorUint64(m.Id,"数据不存在")
	}


	sql:="UPDATE  `products` SET `category_id`=?, `updated_time`=? " +
		"WHERE (`id`=?);"

	res, err := o.Raw(sql,m.CategoryId,time.Now(),m.Id).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorUint64(m.Id,"修改产品成功")
	}


	//更新分类属性
	if(0< len(m.CategoryIds)){
		for _, v := range m.CategoryIds {
			beego.Debug("v")
			DeleteRelations(m.Id,"product_category")
			AddRelations(m.Id,v,"product_category")
		}
	}


	for i := 0; i < len(m.Attribute); i++ {

		UpdateAttributes(&m.Attribute[i],m.Id)
	}

	beego.Debug(m.Attribute)

	return  MessageSucessUint64(m.Id,"修改产品成功")
}

func GetProductsById(id uint64) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  products where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条产品失败,请检查传入id参数")
	}

	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorMap(data,"获取单条产品失败")
	}
	maps[0]["attributes"]=attributes
	return  MessageSucessMap(maps[0],"获取单条产品成功")
}



// DeleteCategories deletes Categories by Id and returns error if
// the record to be deleted doesn't exist
func DeleteProducts(id uint64) (map[string]interface{}) {
	o := orm.NewOrm()
	v := Products{Id: id}
	// ascertain id exists in the database
	if err := o.Read(&v);
		err != nil {
		return  MessageErrorUint64(id,"数据不存在")
	}
	if _, err := o.Delete(&Products{Id: id});
		err != nil {
		return  MessageErrorUint64(id,"删除失败")
	}
	DeleteAttributes(id)
	DeleteRelations(id,"product_category")
	return  MessageSucessUint64(id,"删除成功")
}



