##Примеры


**[Назад](VUEPAGE.md)**
    
    //указываем что нужно из стора забрать все функции getters
    import {mapGetters} from 'vuex';
    
    export default {
        //тупо переменные и данные
        data() {
            return {
                commodity: {
                    commodity_name:'',
                    purchase_price:'',
                },
                thickness:[],
                width:[]
            }
        },

        //Узнать поподробней
        //функции которые выполняются до прогрузки страницы
        computed: {
            title(){
                return this.$route.params.id ? 'Изменить сырье' : 'Создать сырье'
            },
            commodity(){
                //Получение из стора commodity
                return this.$store.getters.getCommodity
            },
            //в строковом формате описаываем геттеры, и переменная будет getCharacters с массивом данных
            ...mapGetters(['getCharacters']),
            
            //Фильтруем данные по полю ширина
            getWidth: () => this.$store.getters.getCharacterFilter('Ширина'),
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
        created() {
            //get Orders
            axios
                .get('/api/orders')
                .then(response => {
                    this.orders = response.data.data;
                })
        }
        
        //Узнать поподробней
        //Функции, которые срабатывают при событии
        methods: {
            //хтмл код на странице
            /*<input type='file' v-on:change='onFile'/>
            <button type="submit"  @click="send">отправить</button>*/
            //Загрузка файла
            onFile(e) {
                let files = e.target.files || e.dataTransfer.files;
                this.$parent.uploading = true;
                if (!files.length)
                    return;
                this.file = files[0];
            },
            async send(e){
                let formData = new FormData();
                let csrf = RegExp('XSRF-TOKEN[^;]+').exec(document.cookie)
                csrf = decodeURIComponent(csrf ? csrf.toString().replace(/^[^=]+./, '') : '')
                formData.append('file', this.file);
                await axios.post( '/api/uploads',
                    formData,
                    {
                        headers: {
                            csrf,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
            }
            
            create() {
                //тут по идеи должна быть валидация для дураков
                let data = {
                    commodity_name: this.commodity.commodity_name,
                    purchase_price: this.commodity.purchase_price,
                    weight: this.commodity.weight,
                    balance: this.commodity.balance,
                    thickness: this.commodity.thickness,
                    width: this.commodity.width,
                    warehouse_id: this.commodity.warehouse_id,
                };
                //обращаемся в vuex в метод actios function createCommodity
                //и передаем данные
                this.$store.dispatch('createCommodity', this.commodity);
                this.$router.push('/commodity');
                //Сброс формы
                this.$refs.form.reset;
            },
            update(){
                //Сброс формы
                this.$refs.form.reset;
                let data = {
                    commodity_name: this.commodity.commodity_name,
                    purchase_price: this.commodity.purchase_price,
                    weight: this.commodity.weight,
                    balance: this.commodity.balance,
                    thickness: this.commodity.thickness,
                    width: this.commodity.width,
                    warehouse_id: this.commodity.warehouse_id,
                };
                //console.log('update');
                //this.$route.params.id = null;
                //this.$router.push('/commodity');
            }
        },
    }
**[Назад](VUEPAGE.md)**
