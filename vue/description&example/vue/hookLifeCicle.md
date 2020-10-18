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

##
##


##Встраивание (вставка в DOM)


Хуки встраивания (mounting) — одни из самых часто используемых. 
Они позволяют получать доступ к компоненту непосредственно перед первой отрисовкой или сразу после неё. 
Однако эти хуки не выполняются в ходе отрисовки на стороне сервера.


**Применяйте** их, если непосредственно перед первичной отрисовкой или сразу после неё 
вам нужно отредактировать DOM компонента или получить к нему доступ.


**Не применяйте** эти хуки, если вам в ходе инициализации нужно извлечь данные для компонента. В этом случае используйте created (или created + activated для keep-alive-компонентов), 
особенно если эти данные вам нужны в ходе отрисовки на стороне сервера.

##

**Хук beforeMount** - Хук beforeMount выполняется до первичной отрисовки, 
а также после компилирования шаблона или функций отрисовки. 
Вероятно, вам никогда не потребуется использовать этот хук. 
Помните, что он не вызывается в ходе отрисовки на стороне сервера.

    <script>
    export default {
          beforeMount() {
                console.log(`this.$el doesn't exist yet, but it will soon!`)
          }
    }
    </script>
**Хук mounted** - В хуке mounted вы получите полный доступ к реактивному компоненту,
 шаблонам и отрисованному DOM (через this.$el). Mounted — самый популярный хук жизненного цикла. 
Обычно его используют для извлечения данных для компонента 
(вместо этого применяйте created) и изменения DOM, зачастую ради интегрирования не-Vue библиотек.

    <template>
        <p>I'm text inside the component.</p>
    </template>
    
    <script>
    export default {
        mounted() {
            console.log(this.$el.textContent) // I'm text inside the component.
        }
    }
    </script>

##
##
    
    
##Обновление (диффы и перерисовка)


Хуки обновления вызываются, когда изменилось реактивное свойство, 
используемое вашим компонентом, или, когда что-то ещё приводит к перерисовке. 
Эти хуки позволяют получить доступ к циклу «отслеживания-вычисления-отрисовки» компонента.

**Применяйте** их, если вам нужно узнать о перерисовке компонента, 
например, для отладки или профилирования.

**Не применяйте** их, если вам нужно узнать об изменении реактивного свойства в компоненте, 
вместо этого используйте вычисленные свойства или «наблюдателей» (watchers).

##

**Хук beforeUpdate** - 
Хук beforeUpdate выполняется после изменения данных в компоненте и начала цикла обновления, 
сразу перед патчингом и перерисовкой DOM. 
Этот хук позволяет получить новое состояние 
любых реактивных данных в компоненте, прежде чем он будет отрисован.

    <script>
    export default {
        data() {
            return {
                counter: 0
            }
        },
        
        beforeUpdate() {
            // Logs the counter value every second, before the DOM updates.
            console.log(this.counter) 
        },
        
        created() {
            setInterval(() => {
                this.counter++
            }, 1000)
        }
    }
    </script>
**Хук updated** - 
Хук updated вызывается после изменения данных 
в компоненте и перерисовки DOM. 
Если вам нужно получить доступ к DOM после 
изменения свойства, такой хук — самое безопасное место для этого.

    <template>
        <p ref=”dom-element”>{{counter}}</p>
    </template>
    <script>
    export default {
        data() {
            return {
                counter: 0
            }
        },
        updated() {
            // Fired every second, should always be true
            console.log(+this.$refs[‘dom-element’].textContent === this.counter)
        },
        
        created() {
            setInterval(() => {
                this.counter++
            }, 1000)
        }
    }
    </script>

##
##
    
    
##Уничтожение 


Хуки уничтожения позволяют действовать, 
например, прибраться или отправить данные для аналитики, 
после уничтожения компонента. 
Эти хуки срабатывают при демонтаже элемента и его удалении из DOM.

##

**Хук beforeDestroy** - 
beforeDestroy выполняется непосредственно перед монтажом. 
Ваш компонент ещё полностью функционирует. 
Если вам нужно очистить события или реактивные подписки, 
то beforeDestroy — самое подходящее для этого место.

    <script>
    export default {
      data() {
        return {
          someLeakyProperty: 'I leak memory if not cleaned up!'
        }
      },
    
      beforeDestroy() {
        // Perform the teardown procedure for someLeakyProperty.
        // (In this case, effectively nothing)
        this.someLeakyProperty = null
        delete this.someLeakyProperty
      }
    }
    </script>
**Хук destroyed** - 
К тому моменту, как вы добрались до хука destroyed, 
от вашего компонента мало что осталось. Всё, что было к нему прикреплено, уже уничтожено. 
Вы можете использовать хук для последней очистки или, 
словно подлый тихушник, проинформировать удалённый сервер об уничтожении компонента. <_<

    <script>
    import MyCreepyAnalyticsService from './somewhere-bad'
    
    export default {
      destroyed() {
        console.log(this) // There's practically nothing here!
        MyCreepyAnalyticsService.informService('Component destroyed. All assets move in on target on my mark.')
      }
    }
    </script>
**[Назад](VUEPAGE.md)**
