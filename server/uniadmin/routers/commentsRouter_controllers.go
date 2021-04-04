package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context/param"
)

func init() {

    beego.GlobalControllerRouter["base_service/controllers:CategoriesController"] = append(beego.GlobalControllerRouter["base_service/controllers:CategoriesController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:CategoriesController"] = append(beego.GlobalControllerRouter["base_service/controllers:CategoriesController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:CategoriesController"] = append(beego.GlobalControllerRouter["base_service/controllers:CategoriesController"],
        beego.ControllerComments{
            Method: "GetAlloption",
            Router: "/option",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:CategoriesController"] = append(beego.GlobalControllerRouter["base_service/controllers:CategoriesController"],
        beego.ControllerComments{
            Method: "GetOne",
            Router: "/:id",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:CategoriesController"] = append(beego.GlobalControllerRouter["base_service/controllers:CategoriesController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:CategoriesController"] = append(beego.GlobalControllerRouter["base_service/controllers:CategoriesController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: "/:id",
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"],
        beego.ControllerComments{
            Method: "GetOne",
            Router: "/:id",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ConfigurationsController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: "/:id",
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:OrdersController"] = append(beego.GlobalControllerRouter["base_service/controllers:OrdersController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:OrdersController"] = append(beego.GlobalControllerRouter["base_service/controllers:OrdersController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:OrdersController"] = append(beego.GlobalControllerRouter["base_service/controllers:OrdersController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ProductsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ProductsController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ProductsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ProductsController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ProductsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ProductsController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:SpecificationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:SpecificationsController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:SpecificationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:SpecificationsController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:SpecificationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:SpecificationsController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:UsersController"] = append(beego.GlobalControllerRouter["base_service/controllers:UsersController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:UsersController"] = append(beego.GlobalControllerRouter["base_service/controllers:UsersController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:UsersController"] = append(beego.GlobalControllerRouter["base_service/controllers:UsersController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:UsersController"] = append(beego.GlobalControllerRouter["base_service/controllers:UsersController"],
        beego.ControllerComments{
            Method: "Login",
            Router: "/login",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:UsersController"] = append(beego.GlobalControllerRouter["base_service/controllers:UsersController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: "/:id",
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
    beego.GlobalControllerRouter["base_service/controllers:UsersController"] = append(beego.GlobalControllerRouter["base_service/controllers:UsersController"],
        beego.ControllerComments{
            Method: "GetOne",
            Router: "/:id",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
    beego.GlobalControllerRouter["base_service/controllers:FilesController"] = append(beego.GlobalControllerRouter["base_service/controllers:FilesController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
    beego.GlobalControllerRouter["base_service/controllers:ProductsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ProductsController"],
        beego.ControllerComments{
            Method: "GetOne",
            Router: "/:id",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ProductsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ProductsController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:ProductsController"] = append(beego.GlobalControllerRouter["base_service/controllers:ProductsController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: "/:id",
            AllowHTTPMethods: []string{"delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})

    beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"],
        beego.ControllerComments{
            Method: "Post",
            Router: "/",
            AllowHTTPMethods: []string{"post"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
    beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"],
        beego.ControllerComments{
            Method: "Delete",
            Router: "/:id",
            AllowHTTPMethods: []string{"Delete"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})        
    beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"],
        beego.ControllerComments{
            Method: "GetAll",
            Router: "/",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
    beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"],
        beego.ControllerComments{
            Method: "Put",
            Router: "/:id",
            AllowHTTPMethods: []string{"put"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
    beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"] = append(beego.GlobalControllerRouter["base_service/controllers:AuthorizationsController"],
        beego.ControllerComments{
            Method: "GetOne",
            Router: "/:id",
            AllowHTTPMethods: []string{"get"},
            MethodParams: param.Make(),
            Filters: nil,
            Params: nil})
}
