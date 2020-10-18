##Структура приложения


**[Назад](VUEPAGE.md)**
    
    //Графическое отображение данных
    //Обязательно должен быть обернут в какой нить тег
    <template>
        <div>
            <h1>{{order.order_name}}</h1>
        </div>
    </template>
    
    //Подключение сторонних библиотек, компонентов, модулей и т.п.
    //Методы для манипуляции контентом
    <script>
        import {mapGetters} from 'vuex';
        export default {
            name: "OrderCreate",
            data() {
                return {
                    ex_v: ''
                }
            },
                    
            //Узнать поподробней
            //функция, которая выполняет действия до прогрузки страницы
            mounted() {
                //Проверяем есть ли в ссылке переметр id
                if(this.$route.params.id){
                    //Получаем данные из метода getters функции getCommodityId и передаем 
                    //ей id ссылки
                    let all = this.$store.getters.getCommodityId(this.$route.params.id);
                    this.commodity = all;
                }
            },
            
            //Узнать поподробней
            //функции которые выполняются до прогрузки страницы
            computed: {
                title(){
                    return this.$route.params.id ? 'Изменить сырье' : 'Создать сырье'
                },
            },
            
            //Узнать поподробней
            //Функции, которые срабатывают при событии
            methods: {
                //Загрузка файла
                onFile(e) {
                    let files = e.target.files || e.dataTransfer.files;
                    this.$parent.uploading = true;
                    if (!files.length)
                        return;
                    this.file = files[0];
                },
            },
            
            //Узнать поподробней
            created() {
                //get Orders
                axios
                    .get('/api/orders')
                    .then(response => {
                        this.orders = response.data.data;
                    })
            }
        };
    </script>
    //Стили только для этой странице
    <style scoped>
        .example_style {color:#fff}
    </style>
**[Назад](VUEPAGE.md)**
