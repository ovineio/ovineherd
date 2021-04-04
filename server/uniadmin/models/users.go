package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"strconv"
	"time"
)

type Users struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	Type    string    `orm:"column(type)" description:""`
	Username    string    `orm:"column(username)" description:""`
	Password    string    `orm:"column(password)" description:""`
	Phone    string    `orm:"column(phone)" description:""`
	Email    string    `orm:"column(email)" description:""`
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


type UsersData struct {
	Id   uint64 `json:"id"`
	Type string `json:"type"`
	Relation1 string `json:"relation1"`
	Relation2 string `json:"relation2"`
	Relation3 string `json:"relation3"`
	Relation4 string `json:"relation4"`
	Relation5 string `json:"relation5"`
	Relation6 string `json:"relation6"`
	Relation1Type string `json:"relation1_type"`
	Relation2Type string `json:"relation2_type"`
	Relation3Type string `json:"relation3_type"`
	Relation4Type string `json:"relation4_type"`
	Relation5Type string `json:"relation5_type"`
	Relation6Type string `json:"relation6_type"`
	Attribute []Attribute `json:"attributes"`
}





func (t *Users) TableName() string {
	return "users"
}

//func (t *Attributes) TableName() string {
//	return "attributes"
//}

func init() {
	orm.RegisterModel(new(Users))
	//orm.RegisterModel(new(Attributes))
}



// GetAllCategories retrieves all Categories matches certain condition. Returns empty list if
// no records exist

func GetAllUsers(product_id uint64)  (data map[string]interface{}){


	orm.Debug = true
	o := orm.NewOrm()
	var Users [] orm.Params
	num,err := o.Raw("select * from  users where product_id=?",product_id).Values(&Users)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条用户失败,请检查传入id参数")
	}


	for i := 0; i < len(Users); i++ {

		var source_id uint64

		id:=GetMapValue("id",Users[i]).(string)
		source_id, _ = strconv.ParseUint(id, 10, 64)

		//获取详情信息
		attributes,errs := GetAttributes(source_id)
		if errs ==nil{
			Users[i]["attributes"]=attributes
		}

		price,errs:=GetPrice(source_id)
		if errs ==nil{
			Users[i]["attributes"]=attributes
			Users[i]["price"]=price
		}
	}

	returnData  :=map[string]interface{}{}
	returnData["list"]=Users

	return  MessageSucessMap(returnData,"获取用户列表成功")
}


// AddUsers insert a new Users into database and returns
// last inserted Id on success.
func AddUsers(c *UsersData) (data map[string]interface{}) {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()
	beego.Debug(c)
	sql :="INSERT INTO `users` (`id`, `type`,  `relation1`,  `relation2`,  `relation3`,  `relation4`,  `relation5`,  `relation6`  `created_time`, `updated_time`)" +
		" VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

	res, err := o.Raw(sql,id,c.Type,c.Relation1,c.Relation2,c.Relation3,c.Relation4,c.Relation5,c.Relation6,time.Now(),time.Now()).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorMap(data,"添加用户失败")
	}


	for i := 0; i < len(c.Attribute); i++ {

		AddAttributes(&c.Attribute[i],id,"user")
	}


	return  MessageSucessUint64(id,"添加用户成功")
}



//更新用户
// UpdateCategories updates Categories by Id and returns error if
// the record to be updated doesn't exist
func UpdateUsersById(c *UsersData) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  users where id=?",c.Id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorUint64(c.Id,"用户不存在")
	}



	for i := 0; i < len(c.Attribute); i++ {

		UpdateAttributes(&c.Attribute[i],c.Id)
	}

	beego.Debug(c.Attribute)


	return  MessageSucessUint64(c.Id,"修改用户成功")
}


func GetUsersById(id uint64) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  users where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取单条用户失败,请检查传入id参数")
	}

	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorMap(data,"获取单条用户失败")
	}
	maps[0]["attributes"]=attributes
	return  MessageSucessMap(maps[0],"获取单条用户成功")
}



// DeleteCategories deletes Categories by Id and returns error if
// the record to be deleted doesn't exist
func DeleteUsers(id uint64) (map[string]interface{}) {
	o := orm.NewOrm()
	v := Users{Id: id}
	// ascertain id exists in the database
	if err := o.Read(&v);
		err != nil {
		return  MessageErrorUint64(id,"用户不存在")
	}
	if _, err := o.Delete(&Users{Id: id});
		err != nil {
		return  MessageErrorUint64(id,"删除用户失败")
	}
	DeleteAttributes(id)
	DeletePrice(id)
	return  MessageSucessUint64(id,"删除用户成功")
}



