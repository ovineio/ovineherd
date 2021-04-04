package models

import (
    "time"
	"github.com/astaxie/beego/orm"
)

type Authorizations struct {
	Id           uint64 `orm:"column(id);pk" description:"id"`
	Type         string `orm:"column(type);size(255);null"`
	Resource     string `orm:"column(resource);size(255);null"`
	Entity       string `orm:"column(entity);size(255);null"`
	Operation    string `orm:"column(operation);size(255);null"`
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


type AuthorizationsData struct {
	Id        uint64      `json:"id"`
	Type      string      `json:"type"`
	Resource  string      `json:"resource"`
	Entity     string        `json:"entity"`
	Operation      string      `json:"operation"`
	Attribute []Attribute `json:"attributes"`
}

func (t *Authorizations) TableName() string {
	return "authorizations"
}



func init() {
	orm.RegisterModel(new(Authorizations))
}
