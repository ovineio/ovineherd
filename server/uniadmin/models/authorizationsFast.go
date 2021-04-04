package models

import (
	"fmt"
	"strconv"
	"time"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type AuthorizationsFast struct {
	Id          uint64 `orm:"column(id);pk" description:"id"`
	Type        string `orm:"column(type);size(255);null"`
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
type AuthorizationRequest struct {
	Type      string      `json:"type"`
	Resource  string      `json:"resource"`
	Entity     string        `json:"entity"`
	Operation      string      `json:"operation"`
}

type AuthorizationsDataFast struct {
	Id        uint64      `json:"id"`
	Type      string      `json:"type"`
	Resource  string      `json:"resource"`
	Entity     string        `json:"entity"`
	Operation      string      `json:"operation"`
	Attribute []Attribute `json:"attributes"`
}

//func (t *AuthorizationsFast) TableName() string {
//	return "authorizations"
//}

//func (t *Attributes) TableName() string {
//	return "attributes"
//}

//func init() {
//	orm.RegisterModel(new(AuthorizationsFast))
//	//orm.RegisterModel(new(Attributes))
//}

// AddConfigurations insert a new Configurations into database and returns
// last inserted Id on success.
func AddAuthorizationsFast(authorization map[string]interface{}, types string) (data map[string]interface{},authorization_id uint64) {
	id := SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()

	resource := GetMapValue("resource", authorization)
	entity := GetMapValue("entity", authorization)
	operation := GetMapValue("operation", authorization)

	if resource == "" || entity=="" ||  operation==""{
		return MessageErrorMap(authorization, "添加权限失败,权限参数不完整"),id
	}


	AuthorizationData := new(Authorizations)
	AuthorizationData.CreatedTime = time.Now()
	AuthorizationData.UpdatedTime = time.Now()
	AuthorizationData.Type = types
	AuthorizationData.Id = id
	AuthorizationData.Resource =  resource.(string)
	AuthorizationData.Entity =   entity.(string)
	AuthorizationData.Operation =  operation.(string)
	AuthorizationData.Relation1 =  GetMapValue("relation1", authorization).(string)
	AuthorizationData.Relation2 =  GetMapValue("relation2", authorization).(string)
	AuthorizationData.Relation3 =  GetMapValue("relation3", authorization).(string)
	AuthorizationData.Relation4 =  GetMapValue("relation4", authorization).(string)
	AuthorizationData.Relation5 =  GetMapValue("relation5", authorization).(string)
	AuthorizationData.Relation6 =  GetMapValue("relation6", authorization).(string)
	AuthorizationData.Relation1Type =  GetMapValue("relation1_type", authorization).(string)
	AuthorizationData.Relation2Type =  GetMapValue("relation2_type", authorization).(string)
	AuthorizationData.Relation3Type =  GetMapValue("relation3_type", authorization).(string)
	AuthorizationData.Relation4Type =  GetMapValue("relation4_type", authorization).(string)
	AuthorizationData.Relation5Type =  GetMapValue("relation5_type", authorization).(string)
	AuthorizationData.Relation6Type =  GetMapValue("relation6_type", authorization).(string)
	num, err := o.Insert(AuthorizationData)
	if err != nil {
		fmt.Println("mysql row affected id: ", num, err)
		return MessageErrorMapInt(id, "添加失败"),id
	}

	AddCategoriesRelation(GetMapValue("category_ids",authorization),id,"authorization_category")
	beego.Debug(authorization)

	deleteMap := make(map[string]interface{})
	deleteMap["relation1"]=""
	deleteMap["relation2"]=""
	deleteMap["relation3"]=""
	deleteMap["relation4"]=""
	deleteMap["relation5"]=""
	deleteMap["relation6"]=""
	deleteMap["relation1_type"]=""
	deleteMap["relation2_type"]=""
	deleteMap["relation3_type"]=""
	deleteMap["relation4_type"]=""
	deleteMap["relation5_type"]=""
	deleteMap["relation6_type"]=""

	deleteMap["type"]=""
	InsertAttributesToDb(authorization,id,deleteMap,"authorization")
	authorization["id"]=uint64ToString(id)
	return MessageSucessMap(authorization, "添加成功"),id
}

func GetAllAuthorizationsFast(types string, query map[string]string, names map[string]string, fields []string, sortby []string, order []string,
	page int64, page_size int64, category_ids string) (data map[string]interface{}) {

	var DataList []orm.Params
	var count int64
	beego.Debug(names)
	//如果是通过names来进行过滤查询 该方式性能较差,可能是下面查询方式的 二十分之一性能
	if len(names) != 0 {
		//参数遍历
		//name:=where(names)
		DataList = FindSourceIdByNameFromAttributes("authorizations", query, names, fields, sortby, order, page, page_size, category_ids,
			"authorization","authorization_category")
		count = CountSourceIdByNameFromAttributes("authorizations", query, names, category_ids, "authorization","authorization_category")

	} else {
		//sqlCount="select count(*) as count from  products  where  1=1"
		DataList = FindSourceIdByFromTables("authorizations", query, fields, sortby, order, page, page_size, category_ids,"authorization_category")
		count = CountSourceIdByFromTables("authorizations", query, category_ids,"authorization_category")
	}

	if count <= 0 {
		return MessageSucessMapEmpty()
	}
	if 0 == len(DataList) {
		return MessageSucessMapEmpty()
	}

	dataList :=[]map[string]interface{}{}
	for i := 0; i < len(DataList); i++ {

		var source_id uint64

		id := GetMapValue("id", DataList[i]).(string)
		source_id, _ = strconv.ParseUint(id, 10, 64)

		//获取详情信息
		attributes, errs := GetAttributes(source_id)
		data :=  make(map[string]interface{})
		if errs == nil {
			for i := 0; i < len(attributes); i++ {
				//var data map[string]string
				key, value := GetMapAttibutesKeyAndValue(attributes[i])
				beego.Debug(key)
				beego.Debug(value)
				//data[key]=value
				fmt.Printf("v1 type:%T\n", key)
				fmt.Printf("v2 type:%T\n", value)
				data[key] = value

			}
			data["id"] = id
			types := GetMapValue("type", DataList[i]).(string)
			created_time := GetMapValue("created_time", DataList[i]).(string)
			updated_time := GetMapValue("updated_time", DataList[i]).(string)
			data["type"] = types
			data["created_time"] = created_time
			data["updated_time"] = updated_time

			returnNewData :=GetDataByRelation(DataList[i],data)
			dataList = append(dataList, returnNewData)

		}

	}
	var returnData map[string]interface{}
	returnData["items"] = dataList
	returnData["count"] = count
	returnData["page"] = page
	returnData["perPage"] = page_size

	return MessageSucessMap(returnData, "")
}


//更新
// UpdateConfigurations updates Configurations by Id and returns error if
// the record to be updated doesn't exist
func UpdateAuthorizationsByIdFast(authorization map[string]interface{},id uint64,types string) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()
	AuthorizationData := Authorizations{Id: id}

	err := o.Read(&AuthorizationData)

	if err != nil {        //处理err
		//权限不存在 调用新增
		if(types !=""){
			authorizationData,_:=  AddAuthorizationsFast(authorization,types)
			return authorizationData
		}else{
			return MessageErrorMapInt(id, "修改权限失败,权限不存在，如新加请传入type")
		}
	}


	AuthorizationData.UpdatedTime = time.Now()
	AuthorizationData.Id = id
	Relation1 :=   GetMapValue("relation1", authorization).(string)
	Relation2 :=  GetMapValue("relation2", authorization).(string)
	Relation3 :=  GetMapValue("relation3", authorization).(string)
	Relation4 :=  GetMapValue("relation4", authorization).(string)
	Relation5 :=  GetMapValue("relation5", authorization).(string)
	Relation6 :=  GetMapValue("relation6", authorization).(string)
	if Relation1 != "" {
		AuthorizationData.Relation1 = Relation1
	}
	if Relation2 != "" {
		AuthorizationData.Relation2 = Relation2
	}
	if Relation3 != "" {
		AuthorizationData.Relation3 = Relation3
	}
	if Relation4 != "" {
		AuthorizationData.Relation4 = Relation4
	}
	if Relation5 != "" {
		AuthorizationData.Relation5 = Relation5
	}
	if Relation6 != "" {
		AuthorizationData.Relation6 = Relation6
	}
	Relation1Type :=  GetMapValue("relation1_type", authorization).(string)
	Relation2Type :=  GetMapValue("relation2_type", authorization).(string)
	Relation3Type := GetMapValue("relation3_type", authorization).(string)
	Relation4Type := GetMapValue("relation4_type", authorization).(string)
	Relation5Type := GetMapValue("relation5_type", authorization).(string)
	Relation6Type :=  GetMapValue("relation6_type", authorization).(string)

	if Relation1Type != "" {
		AuthorizationData.Relation1Type = Relation1Type
	}
	if Relation2Type != "" {
		AuthorizationData.Relation2Type = Relation2Type
	}
	if Relation3Type != "" {
		AuthorizationData.Relation3Type = Relation3Type
	}
	if Relation4Type != "" {
		AuthorizationData.Relation4Type = Relation4Type
	}
	if Relation5Type != "" {
		AuthorizationData.Relation5Type = Relation5Type
	}
	if Relation6Type != "" {
		AuthorizationData.Relation6Type = Relation6Type
	}
	if types != "" {
		AuthorizationData.Type = types
	}

	if num, err := o.Update(&AuthorizationData); err != nil {
		fmt.Println("mysql row affected id: ",num,err)
		return MessageErrorMapInt(id, "修改失败")
	}


	UpdateCategoriesRelation(GetMapValue("category_ids",authorization),id,"authorization_category")

	deleteMap := make(map[string]interface{})
	deleteMap["relation1"]=""
	deleteMap["relation2"]=""
	deleteMap["relation3"]=""
	deleteMap["relation4"]=""
	deleteMap["relation5"]=""
	deleteMap["relation6"]=""
	deleteMap["type"]=""
	UpdateAttributesToDb(authorization,id,deleteMap,"authorization")
	authorization["id"]=uint64ToString(id)
	return MessageSucessMap(authorization, "修改成功")
}
func GetAuthorizationsFastById(id uint64,findRelation bool) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  authorizations where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorEmpty(id,"获取单条权限失败,请检查传入id参数")
	}

	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorEmpty(id,"获取单条权限失败")
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


func DeleteAuthorizations(id uint64) (map[string]interface{}) {
	o := orm.NewOrm()
	v := AuthorizationsFast{Id: id}
	// ascertain id exists in the database
	if err := o.Read(&v);
		err != nil {
		return  MessageErrorMapInt(id,"数据不存在")
	}
	if _, err := o.Delete(&AuthorizationsFast{Id: id});
		err != nil {
		return  MessageErrorMapInt(id,"删除失败")
	}
	DeleteAttributes(id)
	return  MessageSucessMapInt(id,"删除成功")
}