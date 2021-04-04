package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

type Specifications struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	ProductId    uint64    `orm:"column(product_id)" description:"父ID"`
	CreatedTime string `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime string `orm:"column(updated_time);type(timestamp);null"`
}


type SpecificationsData struct {
	Id   uint64 `json:"id"`
	ProductId uint64 `json:"product_id"`
	Attribute []Attribute `json:"attributes"`
	Price []Price `json:"prices"`
}





func (t *Specifications) TableName() string {
	return "specifications"
}

//func (t *Attributes) TableName() string {
//	return "attributes"
//}

func init() {
	orm.RegisterModel(new(Specifications))
	//orm.RegisterModel(new(Attributes))
}



// GetAllCategories retrieves all Categories matches certain condition. Returns empty list if
// no records exist

func GetAllSpecifications(product_id uint64)  (data map[string]interface{}){


	orm.Debug = true
	o := orm.NewOrm()
	var specifications [] orm.Params
	num,err := o.Raw("select * from  specifications where product_id=?",product_id).Values(&specifications)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条规格失败,请检查传入id参数")
	}


	for i := 0; i < len(specifications); i++ {

		var source_id uint64

		id:=GetMapValue("id",specifications[i]).(string)
		source_id, _ = strconv.ParseUint(id, 10, 64)

		//获取详情信息
		attributes,errs := GetAttributes(source_id)
		if errs ==nil{
			specifications[i]["attributes"]=attributes
		}

		price,errs:=GetPrice(source_id)
		if errs ==nil{
			specifications[i]["attributes"]=attributes
			specifications[i]["price"]=price
		}
	}

	returnData  :=map[string]interface{}{}
	returnData["list"]=specifications

	return  MessageSucessMap(returnData,"获取规格列表成功")
}


// AddSpecifications insert a new Specifications into database and returns
// last inserted Id on success.
func AddSpecifications(c *SpecificationsData) (data map[string]interface{}) {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()
	beego.Debug(c)
	sql :="INSERT INTO `specifications` (`id`, `product_id`,  `created_time`, `updated_time`)" +
		" VALUES (?, ?, ?, ?)"

	res, err := o.Raw(sql,id,c.ProductId,time.Now(),time.Now()).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorMap(data,"添加规格失败")
	}

	//填写规格属性
	beego.Debug("=-================")
	beego.Debug(c.Price)
	for i := 0; i < len(c.Price); i++ {
		AddPrices(&c.Price[i],id,"specification")

		//AddRelations(SourceId,id,"specification_price")
	}

	for i := 0; i < len(c.Attribute); i++ {

		AddAttributes(&c.Attribute[i],id,"specification")
	}


	return  MessageSucessUint64(id,"添加规格成功")
}



//更新规格
// UpdateCategories updates Categories by Id and returns error if
// the record to be updated doesn't exist
func UpdateSpecificationsById(c *SpecificationsData) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  specifications where id=?",c.Id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorUint64(c.Id,"数据不存在")
	}

	//
	//sql:="UPDATE  `specifications` SET `category_id`=?, `updated_time`=? " +
	//	"WHERE (`id`=?);"
	//
	//res, err := o.Raw(sql,m.CategoryId,time.Now(),m.Id).Exec()
	//if err != nil {
	//	num, _ := res.RowsAffected()
	//	fmt.Println("mysql row affected nums: ", num)
	//	return  MessageErrorUint64(m.Id,"修改规格成功")
	//}

	DeletePrice(c.Id)
	//更新价格属性
	for i := 0; i < len(c.Price); i++ {
		AddPrices(&c.Price[i],c.Id,"product")
	}



	for i := 0; i < len(c.Attribute); i++ {

		UpdateAttributes(&c.Attribute[i],c.Id)
	}

	beego.Debug(c.Attribute)


	return  MessageSucessUint64(c.Id,"修改规格成功")
}


func GetSpecificationsById(id uint64) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  specifications where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条规格失败,请检查传入id参数")
	}

	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorMap(data,"获取单条规格失败")
	}
	maps[0]["attributes"]=attributes
	return  MessageSucessMap(maps[0],"获取单条规格成功")
}



// DeleteCategories deletes Categories by Id and returns error if
// the record to be deleted doesn't exist
func DeleteSpecifications(id uint64) (map[string]interface{}) {
	o := orm.NewOrm()
	v := Specifications{Id: id}
	// ascertain id exists in the database
	if err := o.Read(&v);
		err != nil {
		return  MessageErrorUint64(id,"数据不存在")
	}
	if _, err := o.Delete(&Specifications{Id: id});
		err != nil {
		return  MessageErrorUint64(id,"删除规格失败")
	}
	DeleteAttributes(id)
	DeletePrice(id)
	return  MessageSucessUint64(id,"删除规格成功")
}



