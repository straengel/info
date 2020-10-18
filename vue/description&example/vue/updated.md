##Обновление (диффы и перерисовка)


**[Назад](VUEPAGE.md)**

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
**[Назад](VUEPAGE.md)**
