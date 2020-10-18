##Уничтожение 


**[Назад](VUEPAGE.md)**

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
