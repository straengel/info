## Основные моменты


**[Назад](./README.md)**

- Методы подключения в vue с Laravel

        //Подключение из node_modules
        import 'bootstrap-vue/dist/bootstrap-vue.css'
         
        //Файла в текущей дериктории
        import Index from "./Index"
        
        //Подключение vue
        window.Vue = require('vue')
        
        //import VueRouter from "vue-router";
        
        
- Методы использования в vue с Laravel

         Vue.use(BootstrapVue)
         Vue.use(VueRouter);
         
         
- Методы использования ссылок routes

        {
            //Название ссылки
            path: "/commodity/change",
            //Путь до файла с импортом
            //можно не использовать 
            //import OrderShow from "./components/Orders/OrderShow";
            component: () => import('./pages/commodity/CommodityCreateUpdate'),
            name: "CommodityCreateUpdate",
        },
        
        {
            //Передаем параметр в запросе
            path: "/orders/:id",
            component: OrderShow,
            name: "order",
        },
        
        
**[Назад](./README.md)**
