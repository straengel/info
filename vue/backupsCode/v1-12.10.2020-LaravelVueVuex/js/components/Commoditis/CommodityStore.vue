<template>
    <div>
        <form action="post" @submit.prevent="store()">
            <div class="form-group">
                <input type="text" class="form-control" v-model="commodity.commodity_name" name="commodity_name" placeholder="commodity_name">
            </div>
            <div class="form-group">
                <input type="text" class="form-control"  v-model="commodity.purchase_price" name="purchase_price" placeholder="purchase_price">
            </div>
            <div class="form-group">
                <input type="text" class="form-control"  v-model="commodity.weight" name="weight" placeholder="weight">
            </div>
            <div class="form-group">
                <input type="text" class="form-control"  v-model="commodity.balance" name="balance" placeholder="balance">
            </div>

            <div class="form-group">
                <select name="thickness" id="thickness" v-model="commodity.thickness" class="form-control">
                    <option value="" disabled>Выберите толщину</option>

                    <option v-for="thick in thickness" :value="thick.id"> {{ thick.characteristic_value}} </option>
                </select>
            </div>
            <div class="form-group">
                <select name="width" id="width" v-model="commodity.width" class="form-control">
                    <option value="" disabled>Выберите ширину</option>

                    <option v-for="w in width" :value="w.id"> {{ w.characteristic_value}} </option>
                </select>
            </div>
            <div class="form-group">
                <select name="warehouse_id" id="warehouse_id" v-model="commodity.warehouse_id" class="form-control">
                    <option disabled value="">Выберите склад</option>
                    <option v-for="warehouse in warehouses" :value="warehouse.id" >{{ warehouse.warehouse_name }}</option>
                </select>
                <span> Выбрано: {{ commodity.warehouse_id }}</span>
            </div>
            <button type="submit" class="btn btn btn-secondary btn-block" >Store</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "CommodityStore",
        data() {
            return {
                commodity: {
                    commodity_name:'',
                    purchase_price:'',
                    weight:'',
                    balance:'',
                    thickness:'',
                    width:'',
                    warehouse_id:'',
                },
                warehouses:[],
                thickness:[],
                width:[]

            }
        },
        mounted(){
            axios
                .get('/api/warehouses')
                .then(response => {
                    this.warehouses = response.data;

                });
            axios
                .get('/api/characteristics')
                .then(response => {
                    const data = response.data;
                    // for (let i = 0; i < data.length; i++){
                    //     if (data[i].characteristic_name == 'Толщина'){
                    //         this.thickness.push(data[i])
                    //     }else{
                    //         this.width.push(data[i])
                    //     }
                    // }
                    this.thickness = data.filter(v => v.characteristic_name == 'Толщина');
                    this.width = data.filter(v => v.characteristic_name == 'Ширина');
                    //console.log(this.thickness)
                    //console.log(this.width)
                })
            //console.log(this.$store);
            //this.$store.dispatch('fetchCharacteristics');
        },
        methods: {
            store() {
                //тут по идеи должна быть валидация для дураков
                let data = {
                    commodity_name: this.commodity.commodity_name,
                    purchase_price: this.commodity.purchase_price,
                    weight: this.commodity.weight,
                    balance: this.commodity.balance,
                    thickness: this.commodity.thickness,
                    width: this.commodity.width,
                    warehouse_id: this.commodity.warehouse_id,
                };
                this.$store.dispatch('createCommodity', data);
                this.commodity.commodity_name = '';
                this.commodity.purchase_price = '';
                this.commodity.weight = '';
                this.commodity.balance = '';
                this.commodity.thickness = '';
                this.commodity.width = '';
                this.commodity.warehouse_id = '';
            }
        }
    }
</script>

<style scoped>

</style>
