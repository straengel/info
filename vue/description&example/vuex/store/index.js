import Vue from 'vue';
import Vuex from 'vuex';
import characteristics from './modules/characteristics';
import commodity from './modules/commodity';

Vue.use(Vuex);
/*
Обща концепция:
Данные получают в actions делая запросы к бекенду и добавляют данные в state, потом mutations изменяют данные в state,
а getters выводят state. Modules разделение файликов vuex и подключение в одном для удобства.

 */
export const store = new Vuex.Store({
    //для импорта других вуикс данных
    modules: {
        characteristics,
        commodity
    }
});
