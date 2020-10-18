##Создание (инициализация)


**[Назад](VUEPAGE.md)**

Первыми в вашем компоненте идут хуки создания. 
Они позволяют вам выполнять действия ещё до того, как компонент будет добавлен в DOM. 
В отличие от прочих, хуки создания также выполняются в ходе отрисовки на стороне сервера.

Используйте хуки создания, когда вам нужно вам нужно 
что-то настроить в компоненте в ходе отрисовки на стороне клиента и сервера. 
Внутри таких хуков у вас не будет доступа к DOM или целевому элементу (mounting element) (this.$el).

##

**Хук beforeCreate** -
выполняется прямо во время инициализации компонента. 
Данные ещё не стали реактивными, а события не настроены.
     
    //Вызывается синхронно сразу после инициализации экземпляра, 
    //до настройки наблюдения за данными, механизмов слежения и событий.
    <script>
    export default {
         beforeCreate() {
            console.log('Nothing gets called before me!')
         }
    }
    </script>
**Хук created** - 
В хуке created вы сможете получить доступ к реактивным данным и активным событиям. 
Шаблоны и виртуальный DOM ещё не встроены (mounted) и не отрисованы.

    <script>
    export default {
          data() {
                return {
                    property: 'Blank'
                }
          },
        
          computed: {
                propertyComputed() {
                      console.log('I change when this.property changes.')
                      return this.property
                }
          },
          //выполняется во время создание страницы
          //хорошо работает для извлечения данных для компонента
          created() {
                this.property = 'Example property update.'
                console.log('propertyComputed will update, as this.property is now reactive.')
          }
    }
    </script>
**[Назад](VUEPAGE.md)**
