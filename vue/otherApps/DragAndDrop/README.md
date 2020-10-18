##Drag and Drop



**[Назад](./../vueOtherApps.md)**

**Заметки**

- Основные события dragstart и dragdrop

**Понятия**
- draggable - элементы которые перетаскиваются;
- droppable - элементы, которые принимают перетаскиваемые элементы (draggable);
- dragstart - задается поведение и хранить промежуточные значения в момент перетаскивания


**Плагины заработал**

- vue-draggable

**Плагины в не работают**

- "name": "vue-drag-resize","url": "https://github.com/kirillmurashov/vue-drag-resize.git",
- vue resize тоже не подходят, так как не очень удачно меняют размеры элемента
- "name": "vue-draggable-resizable",  "url": "https://github.com/mauricius/vue-draggable-resizable.git" 
(интересный вариант но не для нас похоже, но некоторые вещи могут пригодиться)

**Вывод**

Нет нормальных плагинов с растяжкой, 
нет отдельно плагинов, 
чтобы растягивать элементы, 
остается только вручную писать растяжку и использовать 
только плагин drag and drop для перемещения элементов

**Рабочий пример**

    <template>
        <div class="row">
            <b-table-simple caption-top responsive bordered fixed>
                <b-thead head-variant="light">
                    <b-tr>
                        <b-th>Часы/Дни</b-th>
                        <b-th v-for="key of daysWeek.keys()" :key="key" >
                            <span>{{daysWeek.get(key).dayTitle}}</span>
                        </b-th>
                    </b-tr>
                </b-thead>
                <b-tbody 
                    //отслеживание события изменение мыши или прикосновения
                    //и высчитывания высоты для изменения
                    @mousemove="doDrag($event)"
                    @touchmove="doDragTouch($event)"
                >
                    <b-tr v-for="h in hours" :key="h">
                        <b-td variant="light">
                            <span class="hours">{{h}}</span>
                        </b-td>
                        <draggable
                            //Контейнеры, которые принимают перетаскиваемые в них элементы
                            v-model="indexes" 
                            //в какой тэг будет обернут (td)
                            tag="b-td"
                            v-for="(k, i) of daysWeek.keys()"
                            :key="i"
                        >
                            //Элементы, которые находяться внутри области контейнера
                            <draggable
                                //перечисления элементов относящихся к контейнеру
                                :list="tasks = getIndex(k, h).getEventsTask"
                                //в какой тэг будет обернут (span.badge)
                                tag="b-badge"
                                //какое элемент будет выполнять функцию переноса (.task-begun)
                                //если убрать, тогда, событие переноса будет осуществляться
                                //при передвижении всего элемента (span.badge)
                                handle=".task-begun"
                                :group="{ name: 'index' }"
                                :style="{ 'z-index': 50 - parseInt(h) }"
                            >
                                    <span
                                        v-for="task in tasks"
                                        :key="task.title"
                                        class="task-wrapper"
                                        style="cursor: grab;"
                                    >
                                        <span class="task" :style="{'height' : task.numOfMin*resize.stepHeight + 'px'}">
                                            <hr class="task-begun" />
                                            <span class="inversion">{{task.title}} + some text for width</span>
                                        </span>
                                        <hr class="task-begun-touch"
                                            //Отслеживания события нажатие мыши или прикосновения
                                            @mousedown.prevent="startDrag($event)"
                                            @touchstart.prevent="startDragTouch($event)"
                                            :style="{'top' : task.numOfMin*resize.stepHeight + 'px'}"
                                        />
                                    </span>
                            </draggable>
                        </draggable>
                    </b-tr>
                </b-tbody>
            </b-table-simple>
        </div>
    </template>
    <script>
        //Подключение компонента
        import draggable from "vuedraggable";
        export default {
            components: {
                //Подключение компонента
                draggable,
            },
            data() {
                return {
                    //объект для изменения размера
                    resize: {
                        dragging: false,
                        startY: 0,
                        startHeight: 0,
                        stepHeight: 2,
                        stepMouseMove: 10,
                        elementHeight: null,
                        elementDrag: null,
                    },
                };
            },
            methods: {
                startDragTouch(event) {
                    //Устанавливаем начала события прикосновения
                    this.resize.dragging = true;
                    //высчитываем начальные параметры высоты элемента и прикосновения (height and top)
                    this.resize.startY = event.touches[0].clientY;
                    this.resize.startHeight = event.target.offsetTop;
                    //элемент у которого будем менять высотe (height)
                    this.resize.elementHeight = event.target.parentElement.querySelector('.task');
                    //элемент у которого будем менять высотe (top)
                    this.resize.elementDrag = event.target;
                },
                doDragTouch(event) {
                    //если прикосновение по элементу было
                    if (this.resize.dragging) {
                        //высчитываем высоту элементов (height and top) и изменения расположения прикосновения 
                        this.resize.elementHeight.style.height = (
                            this.resize.startHeight + event.touches[0].clientY - this.resize.startY
                        ) + 'px';
                        this.resize.elementDrag.style.top = (
                            this.resize.startHeight + event.touches[0].clientY - this.resize.startY
                        ) + 'px';
                    }
                },
                startDrag(event) {
                    this.resize.dragging = true;
                    this.resize.startY = event.clientY;
                    this.resize.startHeight = event.target.offsetTop;
                    this.resize.elementHeight = event.target.parentElement.querySelector('.task');
                    this.resize.elementDrag = event.target;
                },
                doDrag(event) {
                    if (this.resize.dragging) {
                        // console.log(event);
                        // console.log(this.resize);
                        //debugger
                        this.resize.elementHeight.style.height = (
                            this.resize.startHeight + event.clientY - this.resize.startY
                        ) + 'px';
                        this.resize.elementDrag.style.top = (
                            this.resize.startHeight + event.clientY - this.resize.startY
                        ) + 'px';
                    }
                },
                //когда была убираем событие изменения элемента
                //смотреть в 
                stopDrag() {
                    this.resize.dragging = false;
                },
            },
            mounted() {
                //console.log(this.indexes);
                window.addEventListener('mouseup', this.stopDrag);
                window.addEventListener('touchend', this.stopDrag);
            },
    
        };
    </script>
    <style scoped>
        .badge {
            padding: 0 !important;
            display: inline-block;
            vertical-align: top;
            height: 100%;
            width: 100%;
            background: transparent;
            position: relative
        }
        .task-wrapper {
            position: relative;
            display:inline-block;
            width:30px;
            /*min-height: 30px;*/
            vertical-align: top;
        }
        .task {
            position: absolute;
            background: red;
            top: 0;
            width: 100%;
            left: 0;
            min-height: 30px;
        }
        .inversion {
            writing-mode: tb;
        }
        .task-begun {
            position: absolute;
            top: 0;
            width: 100%;
            height: 20px;
            padding: 0;
            margin: 0;
            left: 0;
            display: block;
            cursor: s-resize;
            background: rgba(0, 0, 0, 0.6);
        }
        .task-begun-touch {
            position: absolute;
            width: 100%;
            height: 20px;
            padding: 0;
            margin: 0;
            left: 0;
            display: block;
            cursor: s-resize;
            background: green;
        }
        .task-begun:active {
            cursor: grabbing;
        }
        .buttons {
            margin-top: 35px;
        }
        .row-v {
            height: 150px;
            width: 200px;
        }
        .ghost {
            opacity: 0.5;
            background: #c8ebfb;
        }
    </style>



**[Назад](./../vueOtherApps.md)**
