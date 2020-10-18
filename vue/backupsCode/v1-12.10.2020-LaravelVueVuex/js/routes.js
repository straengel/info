import VueRouter from "vue-router";
import Warehouses from "./components/Warehouses";
//import Commodity from "./components/Commoditis/Commodity";
import Characteristic from "./components/characteristics/Characteristic";
import Contragents from "./components/Contragents/Contragents";
import Orders from "./components/Orders/Orders";
import OrderShow from "./components/Orders/OrderShow";


const routes = [
    {
        path: "/",
        component: ()=>import('./components/Home'),
        name: "home",

    },
    {
        path: "/warehouses",
        component: Warehouses,
        name: "warehouses",
    },
    {
        path: "/commodity",
        component: () => import('./pages/commodity/CommodityIndex'),
        name: "CommodityIndex",
    },

    {
        path: "/commodity/change",
        component: () => import('./pages/commodity/CommodityCreateUpdate'),
        name: "CommodityCreateUpdate",
    },
    //
    // {
    //     path: "/commodities",
    //     component: () => import('./components/Commoditis/Commodities'),
    //     name: "commodities",
    // },
    // {
    //     path: "/commodity/:id",
    //     component: Commodity,
    //     name: "commodity",
    // },
    // {
    //     path: "/commoditis/create",
    //     component: ()=>import('./components/Commoditis/create'),
    //     name: "OrderCreate",
    // },
    {
        path: "/characteristics",
        component: Characteristic,
        name: "characteristic",
    },
    {
        path: "/contragents",
        component: Contragents,
        name: "contragents",
    },
    {
        path: "/orders",
        component: Orders,
        name: "orders",
    },
    {
        path: "/orders/:id",
        component: OrderShow,
        name: "order",
    },

];

const router = new VueRouter({
    routes: routes,
    mode:'history'
});

export default router;
