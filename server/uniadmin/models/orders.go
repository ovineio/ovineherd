package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

type Orders struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	Type    string    `orm:"column(type)" description:"类型"`
	ParentId    string    `orm:"column(parent_id)" description:"父ID"`
	UserId    string    `orm:"column(user_id)" description:"父ID"`
	CreatedTime string `orm:"column(created_time);type(timestamp);null"`
	UpdatedTime string `orm:"column(updated_time);type(timestamp);null"`
}


type OrdersData struct {
	Id   uint64 `json:"id"`
	Type string `json:"type"`
	ParentId uint64 `json:"parent_id"`
	UserId uint64 `json:"user_id"`
	Attribute []Attribute `json:"attributes"`
	Price []Price `json:"prices"`
}





func (t *Orders) TableName() string {
	return "orders"
}

//func (t *Attributes) TableName() string {
//	return "attributes"
//}

func init() {
	orm.RegisterModel(new(Orders))
	//orm.RegisterModel(new(Attributes))
}





// GetAllCategories retrieves all Categories matches certain condition. Returns empty list if
// no records exist

func GetAllOrders(query map[string]string, names map[string]string,fields []string, sortby []string, order []string,
	page int64, page_size int64) (data map[string]interface{}) {

	var DataList [] orm.Params
	var count int64
	//var  sqlCount string
	//如果是通过names来进行过滤查询 该方式性能较差,可能是下面查询方式的 二十分之一性能
	if len(names) != 0{
		//参数遍历
		//name:=where(names)
		DataList=FindSourceIdByNameFromAttributes("orders",query,names, fields, sortby, order, page, page_size,"","order","configuration_category")
		count=CountSourceIdByNameFromAttributes("orders",query,names,"","order","configuration_category")

	}else{
		//sqlCount="select count(*) as count from  products  where  1=1"
		DataList=FindSourceIdByFromTables("orders",query, fields, sortby, order, page, page_size,"","configuration_category")
		count=CountSourceIdByFromTables("orders",query,"","configuration_category")
	}



	if count <=0 {
		return MessageErrorMap(data,"获取订单列表失败,没有查到合法数据")
	}


	if  0== len(DataList){
		return MessageErrorMap(data,"获取订单列表失败,没有查到合法数据")
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
	returnData["list"]=DataList
	returnData["count"]=count
	returnData["page"]=page
	returnData["page_size"]=page_size

	return  MessageSucessMap(returnData,"获取产品列表成功")
}


// GetAllCategories retrieves all Categories matches certain condition. Returns empty list if
// no records exist

func GetAllOrderx(product_id uint64)  (data map[string]interface{}){


	orm.Debug = true
	o := orm.NewOrm()
	var Orders [] orm.Params
	num,err := o.Raw("select * from  orders where product_id=?",product_id).Values(&Orders)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条订单失败,请检查传入id参数")
	}


	for i := 0; i < len(Orders); i++ {

		var source_id uint64

		id:=GetMapValue("id",Orders[i]).(string)
		source_id, _ = strconv.ParseUint(id, 10, 64)

		//获取详情信息
		attributes,errs := GetAttributes(source_id)
		if errs ==nil{
			Orders[i]["attributes"]=attributes
		}

		price,errs:=GetPrice(source_id)
		if errs ==nil{
			Orders[i]["attributes"]=attributes
			Orders[i]["price"]=price
		}
	}

	returnData  :=map[string]interface{}{}
	returnData["list"]=Orders

	return  MessageSucessMap(returnData,"获取订单列表成功")
}


// AddOrders insert a new Orders into database and returns
// last inserted Id on success.
func AddOrders(c *OrdersData) (data map[string]interface{}) {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()
	beego.Debug(c)
	sql :="INSERT INTO `orders` (`id`, `type`, `user_id`,`parent_id`, `created_time`, `updated_time`)" +
		" VALUES (?, ?, ?, ?,?,?)"
	beego.Debug(sql)
	res, err := o.Raw(sql,id,c.Type,c.UserId,c.ParentId,time.Now(),time.Now()).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorMap(data,"添加订单失败")
	}
	//填写规格属性
	beego.Debug("=-================")
	beego.Debug(c.Price)
	for i := 0; i < len(c.Price); i++ {
		AddPrices(&c.Price[i],id,"order")

		//AddRelations(SourceId,id,"specification_price")
	}

	for i := 0; i < len(c.Attribute); i++ {

		AddAttributes(&c.Attribute[i],id,"order")
	}


	return  MessageSucessUint64(id,"添加订单成功")
}



//更新订单
// UpdateCategories updates Categories by Id and returns error if
// the record to be updated doesn't exist
func UpdateOrdersById(c *OrdersData) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  orders where id=?",c.Id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorUint64(c.Id,"数据不存在")
	}

	DeletePrice(c.Id)
	//更新价格属性
	for i := 0; i < len(c.Price); i++ {
		AddPrices(&c.Price[i],c.Id,"order")
	}

	for i := 0; i < len(c.Attribute); i++ {

		UpdateAttributes(&c.Attribute[i],c.Id)
	}

	beego.Debug(c.Attribute)


	return  MessageSucessUint64(c.Id,"修改订单成功")
}


func GetOrdersById(id uint64) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  orders where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条订单失败,请检查传入id参数")
	}
	prices,errs := GetPrice(id)
	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorMap(data,"获取单条订单失败")
	}
	maps[0]["attributes"]=attributes
	maps[0]["prices"]=prices
	return  MessageSucessMap(maps[0],"获取单条订单成功")
}





// DeleteCategories deletes Categories by Id and returns error if
// the record to be deleted doesn't exist
func DeleteOrders(id uint64) (map[string]interface{}) {
	o := orm.NewOrm()
	v := Orders{Id: id}
	// ascertain id exists in the database
	if err := o.Read(&v); 
		err != nil {
		return  MessageErrorUint64(id,"数据不存在")
	}
	if _, err := o.Delete(&Orders{Id: id});
		err != nil {
		return  MessageErrorUint64(id,"删除订单失败")
	}
	DeleteAttributes(id)
	DeletePrice(id)
	return  MessageSucessUint64(id,"删除订单成功")
}



