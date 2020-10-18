import Vue from 'vue';
import Vuex from 'vuex';
import characteristics from 'modules/characteristics';

Vue.use(Vuex);
/*
Обща концепция:
Данные получают в actions делая запросы к бекенду и добавляют данные в state, потом mutations изменяют данные в state,
а getters выводят state. Modules разделение файликов vuex и подключение в одном для удобства.

 */
export const store = new Vuex.Store({
    //state - это динамические данные, тоже самое что и data во vue
    state: {
        characters: []
    },
    //getters - это обработка данных, тоже самое что и контроллер в mvc. Только выводит.
    //Есть два варианта getters, с приемом параметров(по типу id) и без приема
    getters: {
        getCharacters: state => state.characters,
        /*
        getCharacterFilter: function(state){
            return function(characteristic_name){
                //return state.characters.data;
                //*
                return state.characters.data.filter(function(v, k){
                    return v.characteristic_name == characteristic_name;
                });
                //* /
            }
        },
        /**/
        getCharacterFilter: state => characteristic_name => state.characters.data.filter(v => v.characteristic_name === characteristic_name),
    },
    //mutations - извенение состояния в данных, синхронное изменение напрямую и без запросов
    mutations: {

    },
    //actions - это запросы к данным, к бекенду и базе данных сайта
    actions: {
        //state - это данные, commit - метод для передачи в mutations, dispatch - вызов другого action на получение данных

        async fetchCharacteristics({state, commit}, dispatch){
            //await - обработчик, который ждет когда вернуться данные
            // Запрос на характеристики для селекта
            try {
                state.characters = await axios.get('/api/characteristics');
                //console.log(state.characters);
            } catch(e){
                console.log('Ошибка получение характеристик');
                throw e;
            }
        }
    },
    //для импорта других вуикс данных
    modules: {
        characteristics
    }
});






/*
Обща концепция:
Данные получают в actions делая запросы к бекенду и добавляют данные в state, потом mutations изменяют данные в state,
а getters выводят state. Modules разделение файликов vuex и подключение в одном для удобства.

 */
export default {
    //state - это динамические данные, тоже самое что и data во vue
    state: {
        characters: []
    },
    //getters - это обработка данных, тоже самое что и контроллер в mvc. Только выводит.
    //Есть два варианта getters, с приемом параметров(по типу id) и без приема
    getters: {
        getCharacters: state => state.characters,
        /*
        getCharacterFilter: function(state){
            return function(characteristic_name){
                //return state.characters.data;
                //*
                return state.characters.data.filter(function(v, k){
                    return v.characteristic_name == characteristic_name;
                });
                //* /
            }
        },
        /**/
        getCharacterFilter: state => characteristic_name => state.characters.data.filter(v => v.characteristic_name === characteristic_name),
    },
    //mutations - извенение состояния в данных, синхронное изменение напрямую и без запросов
    mutations: {

    },
    //actions - это запросы к данным, к бекенду и базе данных сайта
    actions: {
        //state - это данные, commit - метод для передачи в mutations, dispatch - вызов другого action на получение данных
        //async - асинхронная функция, и await можно использовать только внутри async функциях
        //await - блокирующий оператор, который ждет выполнения промиса
        async fetchCharacteristics({state, commit}, dispatch){
            //await - обработчик, который ждет когда вернуться данные
            // Запрос на характеристики для селекта
            try {
                state.characters = await axios.get('/api/characteristics');
                //console.log(state.characters);
            } catch(e){
                console.log('Ошибка получение характеристик');
                throw e;
            }
        }
    },
};
