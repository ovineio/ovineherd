package models

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"reflect"
	"strconv"
	"strings"
	"time"
	"errors"
)



type Configurations struct {
	Id          uint64       `orm:"column(id);pk" description:"id"`
	Type        string    `orm:"column(type);size(255);null"`
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


type ConfigurationsData struct {
	Id   uint64 `json:"id"`
	Type string `json:"type"`
	ParentId uint64 `json:"parent_id"`
	Level    uint	`json:"level"`
	Path    string	`json:"path"`
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
}





func (t *Configurations) TableName() string {
	return "configurations"
}

//func (t *Attributes) TableName() string {
//	return "attributes"
//}

func init() {
	orm.RegisterModel(new(Configurations))
	//orm.RegisterModel(new(Attributes))
}





// AddConfigurations insert a new Configurations into database and returns
// last inserted Id on success.
func AddConfigurations(c *ConfigurationsData) (data map[string]interface{}) {
	id :=SnowflakeId()
	orm.Debug = true
	o := orm.NewOrm()
	sql :="INSERT INTO `configurations` (`id`, `parent_id`, `level`, `path`, `type`, `created_time`, `updated_time`)" +
		" VALUES (?, ?, ?, ?, ?, ?, ?)"

	res, err := o.Raw(sql,id,c.ParentId,c.Level,c.Path,c.Type,time.Now(),time.Now()).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorMap(data,"添加失败")
	}
	for i := 0; i < len(c.Attribute); i++ {
		AddAttributes(&c.Attribute[i],id,c.Type)
	}
	return  MessageSucessUint64(id,"添加成功")
}






func GetConfigurationsById(id uint64) (data map[string]interface{}) {
	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  configurations where id=?",id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorMap(data,"获取数据失败")
	}

	attributes,errs := GetAttributes(id)
	if errs != nil {        //处理err
		return  MessageErrorMap(data,"获取数据失败")
	}
	maps[0]["attributes"]=attributes
	return  MessageSucessMap(maps[0],"获取数据成功")
}






// GetAllConfigurations retrieves all Configurations matches certain condition. Returns empty list if
// no records exist

func GetAllConfigurations(types string,query map[string]string, keys map[string]string,fields []string, sortby []string, order []string,
	page int64, page_size int64) (data map[string]interface{}) {

	var sql string
	var  sqlCount string
	//如果是通过keys来进行过滤查询 该方式性能较差,可能是下面查询方式的 二十分之一性能
	if len(keys) != 0{
		sqlCount ="select count(DISTINCT source_id) as count from  attributes  force index(type_name_source_id_language)  " +
			"where type=? "
		sql ="select DISTINCT source_id from  attributes  force index(type_name_source_id_language)  " +
			"where type=? order by created_time desc limit ?,?"
	}else{
		sqlCount="select count(*) as count from  Configurations  where  type=?"
		sql ="select * from  configurations  where  type=? order by created_time desc limit ?,?"
	}
	orm.Debug = true
	o := orm.NewOrm()
	//获取总条数
	fmt.Println("mysql sql: ", sql)
	var countNum [] orm.Params
	_, err := o.Raw(sqlCount,types).Values(&countNum)
	count :=GetMapValue("count",countNum[0]).(string)
	counts, err := strconv.ParseInt(count, 10, 64)
	if err != nil  || counts <=0 {
		beego.Debug(err)
		return MessageErrorMap(data,"获取数据失败,没有查到有效数据")
	}

	//获取配置列表数据
	var ConfigList [] orm.Params
	_, errs := o.Raw(sql,types,page,page_size).Values(&ConfigList)
	if errs != nil  {
		beego.Debug(errs)
		return MessageErrorMap(data,"获取数据失败,没有查到有效数据")
	}
	for i := 0; i < len(ConfigList); i++ {
		beego.Debug(ConfigList[i])
		beego.Debug(ConfigList[i]["id"])



		var source_id uint64
		//不是通过Key搜索的
		if len(keys) != 0{
			id:=GetMapValue("id",ConfigList[i]).(string)
			source_id, _ = strconv.ParseUint(id, 10, 64)
		}else{
			id:=GetMapValue("id",ConfigList[i]).(string)
			source_id, _ = strconv.ParseUint(id, 10, 64)
		}

		//获取详情信息
		attributes,errs := GetAttributes(source_id)
		if errs ==nil{
			ConfigList[i]["attributes"]=attributes
		}
		//fmt.Println("类型t %T\n",reflect.TypeOf(source_id))

	}

	returnData  :=map[string]interface{}{}
	returnData["list"]=ConfigList
	returnData["count"]=counts
	returnData["page"]=page
	returnData["page_size"]=page_size

	return  MessageSucessMap(returnData,"获取数据成功")
}



func GetAllConfigurationss(query map[string]string, keys map[string]string,fields []string, sortby []string, order []string,
	offset int64, limit int64) (ml []interface{}, err error) {
	o := orm.NewOrm()
	qs := o.QueryTable(new(Configurations))
	// query k=v
	for k, v := range query {
		// rewrite dot-notation to Object__Attribute
		k = strings.Replace(k, ".", "__", -1)
		if strings.Contains(k, "isnull") {
			qs = qs.Filter(k, (v == "true" || v == "1"))
		} else {
			qs = qs.Filter(k, v)
		}
	}
	// order by:
	var sortFields []string
	if len(sortby) != 0 {
		if len(sortby) == len(order) {
			// 1) for each sort field, there is an associated order
			for i, v := range sortby {
				orderby := ""
				if order[i] == "desc" {
					orderby = "-" + v
				} else if order[i] == "asc" {
					orderby = v
				} else {
					return nil, errors.New("Error: Invalid order. Must be either [asc|desc]")
				}
				sortFields = append(sortFields, orderby)
			}
			qs = qs.OrderBy(sortFields...)
		} else if len(sortby) != len(order) && len(order) == 1 {
			// 2) there is exactly one order, all the sorted fields will be sorted by this order
			for _, v := range sortby {
				orderby := ""
				if order[0] == "desc" {
					orderby = "-" + v
				} else if order[0] == "asc" {
					orderby = v
				} else {
					return nil, errors.New("Error: Invalid order. Must be either [asc|desc]")
				}
				sortFields = append(sortFields, orderby)
			}
		} else if len(sortby) != len(order) && len(order) != 1 {
			return nil, errors.New("Error: 'sortby', 'order' sizes mismatch or 'order' size is not 1")
		}
	} else {
		if len(order) != 0 {
			return nil, errors.New("Error: unused 'order' fields")
		}
	}

	var l []Configurations
	qs = qs.OrderBy(sortFields...)
	if _, err = qs.Limit(limit, offset).All(&l, fields...); err == nil {
		if len(fields) == 0 {
			for _, v := range l {
				ml = append(ml, v)
			}
		} else {
			// trim unused fields
			for _, v := range l {
				m := make(map[string]interface{})
				val := reflect.ValueOf(v)
				for _, fname := range fields {
					m[fname] = val.FieldByName(fname).Interface()
				}
				ml = append(ml, m)
			}
		}
		return ml, nil
	}
	return nil, err
}


//更新配置
// UpdateConfigurations updates Configurations by Id and returns error if
// the record to be updated doesn't exist
func UpdateConfigurationsById(m *ConfigurationsData) (map[string]interface{}) {

	orm.Debug = true
	o := orm.NewOrm()
	var maps [] orm.Params
	num,err := o.Raw("select * from  Configurations where id=?",m.Id).Values(&maps)
	if err != nil  || num <= 0{        //处理err
		return  MessageErrorUint64(m.Id,"数据不存在")
	}

	sql:="UPDATE  `configurations` SET `parent_id`=?, `level`=?, `path`=?, `type`=?, `updated_time`=? " +
		"WHERE (`id`=?);"

	res, err := o.Raw(sql,m.ParentId,m.Level,m.Path,m.Type,time.Now(),m.Id).Exec()
	if err != nil {
		num, _ := res.RowsAffected()
		fmt.Println("mysql row affected nums: ", num)
		return  MessageErrorUint64(m.Id,"修改失败")
	}

	for i := 0; i < len(m.Attribute); i++ {
		UpdateAttributes(&m.Attribute[i],m.Id)
	}

	beego.Debug(m.Attribute)
	//如果配置存在则更新

	return  MessageSucessUint64(m.Id,"修改成功")
}

// DeleteConfigurations deletes Configurations by Id and returns error if
// the record to be deleted doesn't exist
func DeleteConfigurations(id uint64) (map[string]interface{}) {
	o := orm.NewOrm()
	v := Configurations{Id: id}
	// ascertain id exists in the database
	if err := o.Read(&v);
		err != nil {
		return  MessageErrorUint64(id,"数据不存在")
	}
	if _, err := o.Delete(&Configurations{Id: id});
		err != nil {
		return  MessageErrorUint64(id,"删除失败")
	}
	DeleteAttributes(id)
	return  MessageSucessUint64(id,"删除成功")
}


