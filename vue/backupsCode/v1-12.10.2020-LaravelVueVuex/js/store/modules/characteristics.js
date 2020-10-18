
export default {
    state: {
        characters: []
    },
    getters: {
        getCharacters: state => state.characters,
        getCharacterFilter: state => characteristic_name => state.characters.data.filter(v => v.characteristic_name === characteristic_name),
    },
    mutations: {
        setCharacters : (state, data) => {
            state.characters = data
        },
    },
    actions: {
        async fetchCharacteristics({state, commit}, dispatch){
            try {
                commit('setCharacters', await axios.get('/api/characteristics'));
            } catch(e){
                console.log('Ошибка получение характеристик');
                throw e;
            }
        }
    },
};
