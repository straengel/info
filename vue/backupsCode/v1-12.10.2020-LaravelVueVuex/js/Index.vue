<template>
    <div>
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar</b-button>
        <b-sidebar id="sidebar-1" title="Sidebar" shadow>
            <div class="px-3 py-2">
                <nav>
                    <b-nav virtical>
                        <b-form-group class="goBlock">

                                <router-link class="navbar-brand goColor" :to="{name: 'home'}">Home</router-link>

                        </b-form-group>

                        <b-form-group class="goBlock">
                            <router-link class="btn nav-button" :to="{name: 'warehouses'}">Warehouses</router-link>
                        </b-form-group>

                        <b-form-group class="goBlock">
                            <router-link class="btn nav-button" :to="{name: 'CommodityIndex'}">Cырье индекс</router-link>
                        </b-form-group>
                        <b-form-group class="goBlock">
                            <router-link class="btn nav-button" :to="{name: 'characteristic'}">Характеристики</router-link>
                        </b-form-group>
                        <b-form-group class="goBlock">
                            <router-link class="btn nav-button" :to="{name: 'contragents'}">Контрагенты</router-link>
                        </b-form-group>
                        <b-form-group class="goBlock">
                            <router-link class="btn nav-button" :to="{name: 'orders'}">Заказы</router-link>
                        </b-form-group>




                    </b-nav>
                </nav>

            </div>
        </b-sidebar>
        <b-container>
          <transition name="fade"><router-view></router-view></transition>
        </b-container>

    </div>
</template>
<style scope>
    .goBlock {
        display: block;
        width: 100%;
    }
    .goBlock a:hover {
        color: goldenrod;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to  {
        opacity: 0;
    }
</style>

