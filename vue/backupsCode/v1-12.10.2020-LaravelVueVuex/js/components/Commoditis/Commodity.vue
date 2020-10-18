<template>
    <div  >
        <div class="card" style="width: 18rem;">

            <div class="card-body">
                <div v-if="!loading">
                    <h5 class="card-title">{{ commodity.commodity_name}}</h5>
                    <p class="card-text">{{ commodity.purchase_price}}</p>
                    <p class="card-text">{{ commodity.weight}}}}</p>
                    <p class="card-text">{{ commodity.balance}}</p>
                    <p class="card-text">{{ commodity.thickness}}</p>
                    <p class="card-text">{{ commodity.width}}</p>
                    <p class="card-text">{{ commodity.warehouse_id}}</p>
                    <p class="card-text">{{ commodity.created_at}}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
                <div v-else> Loading </div>
            </div>
        </div>




    </div>
</template>

<script>
    export default {
        name: "Commodity",
        data() {
            return {
              commodity: null,
                loading:false
            }
        },
        created() {
            this.loading = true;
            const request = axios
                .get(`/api/commodity/${this.$route.params.id}`)
                .then( response => {
                    this.commodity = response.data.data;
                    this.loading =false;
                })
        }
    }
</script>

<style scoped>

</style>
