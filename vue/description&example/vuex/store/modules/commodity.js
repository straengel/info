export default {
    state: {
        commodity: []
    },
    getters: {
        getCommodity : (state) => state.commodity,
        // getCommodityId : (state) => id => {
        //     return state.commodity.find(item => item.id===id)
        // },
        getCommodityId : function(state){
            return function(id){
                return state.commodity.find(item => item.id===id)
            }
        }
    },
    mutations: {
        setCommodity : (state, data) => {
            state.commodity = data.data.data
        },
        DELETE_COMMODITY( state, id) {
            //
            let indexArr = state.commodity.filter( v => v.id != id);
            //console.log(indexArr);
            //debugger
            state.commodity.find((item, index) => {
                if(item.id===id){
                    console.log('item - ' + item, 'index = ' + index);
                    indexArr=index;
                }
            });
            //console.log(index);
            //debugger
            Vue.delete(state.commodity, indexArr);
            //console.log(state.commodity);
        }
    },
    actions: {
        createCommodity({state, commit}, data){
            try {
                axios
                    .post('/api/commodities', data)
                    .then(response => {
                        commit('setCommodity', response)
                        console.log(response)
                    })
            } catch(e){
                console.log('Ошибка записи сырья');
                throw e;
            }
        },
        async getCommodity({state, commit}, data){
            try {
                commit('setCommodity', await axios.get('/api/commodity'));
            } catch(e){
                console.log('Ошибка получения сырья');
                throw e;
            }
        },
        deleteCommodity({commit}, id){
            commit('DELETE_COMMODITY', id.id);
           // axios
           //      .delete(`/api/commodities/${id.id}`)
           //      .then(response => {
           //          commit('DELETE_COMMODITY', id.id)
           //          //console.log(response)7//
           //      })
        }
    },
};
