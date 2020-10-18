<template>
    <div class="row">
        <div class="col-xs-12">
            <h1>Сырье - индекс</h1>
            <div style="margin-top: 15px; margin-bottom: 15px" class="col-xs-12"><router-link :to="{name: 'CommodityCreateUpdate' }">Создать сырье</router-link></div>
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Название сырья</th>
                    <th scope="col">Цена закупки</th>
                    <th scope="col">Сумма</th>
                    <th scope="col">Вес</th>
                    <th scope="col">Остаток</th>
                    <th scope="col">Толщина</th>
                    <th scope="col">Ширина</th>
                    <th scope="col">Дата поставки</th>
                    <th scope="col">Производитель</th>
                    <th scope="col">Владелец</th>
                    <th scope="col">Склад</th>

                </tr>
                </thead>
                <tbody v-for="(item, index) in commodity" :key="index" v-bind="commodity">
                <tr>
                    <th scope="row">{{ item.id }}</th>

                    <td>{{ item.commodity_name }}</td>
                    <td>{{ item.purchase_price }}</td>
                    <td>{{ item.purchase_sum }}</td>
                    <td>{{ item.weight }}</td>
                    <td>{{ item.balance }}</td>
                    <td>{{ item.thickness }}</td>
                    <td>{{ item.width }}</td>
                    <td>{{ item.supply_date }}</td>
                    <td>{{ item.manufacturer_id }}</td>
                    <td>{{ item.owner_id }}</td>
                    <td>{{ item.warehouse_id }}</td>
                    <th scope="row">
                        <router-link :to="{ name: 'CommodityCreateUpdate', params: { id: item.id}}">{{ item.id }} - изменить</router-link>
                        <button @click="deleteCommodity(item)">{{ item.id }} - удалить</button>
                    </th>

                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'CommodityIndex',
        mounted() {
            //Добавление в сторе commodity
           this.$store.dispatch('getCommodity');
        },
        computed: {
            commodity(){
                //Получение из стора commodity
                return this.$store.getters.getCommodity
            },
        },
        methods: {
            deleteCommodity(item){
                this.$store.dispatch('deleteCommodity', item);
            },
        }
    }
</script>
