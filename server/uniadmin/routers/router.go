// @APIVersion 1.0.0
// @Title beego Test API
// @Description beego has a very cool tools to autogenerate documents for your API
// @Contact astaxie@gmail.com
// @TermsOfServiceUrl http://beego.me/
// @License Apache 2.0
// @LicenseUrl http://www.apache.org/licenses/LICENSE-2.0.html
package routers

import (
	"base_service/controllers"
	"github.com/astaxie/beego"
)

func init() {
	//极速模式
	ns := beego.NewNamespace("/v1",

		beego.NSNamespace("/config",
			beego.NSInclude(
				&controllers.ConfigurationsController{},
			),
		),
		beego.NSNamespace("/category",
			beego.NSInclude(
				&controllers.CategoriesController{},
			),
		),
		beego.NSNamespace("/product",
			beego.NSInclude(
				&controllers.ProductsController{},
			),
		),
		beego.NSNamespace("/specification",
			beego.NSInclude(
				&controllers.SpecificationsController{},
			),
		),
		beego.NSNamespace("/user",
			beego.NSInclude(
				&controllers.UsersController{},
			),
		),
		beego.NSNamespace("/order",
			beego.NSInclude(
				&controllers.OrdersController{},
			),
		),

		beego.NSNamespace("/file",
			beego.NSInclude(
				&controllers.FilesController{},
			),
		),
		beego.NSNamespace("/authorization",
			beego.NSInclude(
				&controllers.AuthorizationsController{},
			),
		),
	)

		//自定义模式
	fast := beego.NewNamespace("/v1/:method",

		beego.NSNamespace("/config",
			beego.NSInclude(
				&controllers.ConfigurationsController{},
			),
		),
		beego.NSNamespace("/category",
			beego.NSInclude(
				&controllers.CategoriesController{},
			),
		),



		beego.NSNamespace("/product",
			beego.NSInclude(
				&controllers.ProductsController{},
			),
		),
		beego.NSNamespace("/specification",
			beego.NSInclude(
				&controllers.SpecificationsController{},
			),
		),
		beego.NSNamespace("/user",
			beego.NSInclude(
				&controllers.UsersController{},
			),
		),
		beego.NSNamespace("/order",
			beego.NSInclude(
				&controllers.OrdersController{},
			),
		),

		beego.NSNamespace("/file",
			beego.NSInclude(
				&controllers.FilesController{},
			),
		),

		beego.NSNamespace("/authorization",
			beego.NSInclude(
				&controllers.AuthorizationsController{},
			),
		),
	)
	beego.AddNamespace(ns)
	beego.AddNamespace(fast)
}
