<template>
    <div>
        <h1>Main page1</h1>
        <form ref="form" @submit.prevent="">
            <p v-if='message'>{{ message }}</p>
            <input type='file' v-on:change='onFile'/>
            <button type="submit"  @click="send">отправить</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                message: '',
                file: '',
            }
        },
        methods: {
            onFile(e) {
                let files = e.target.files || e.dataTransfer.files;
                this.$parent.uploading = true;
                if (!files.length)
                    return;
                this.file = files[0];
            },
           async send(e){
                let formData = new FormData();
                   let csrf = RegExp('XSRF-TOKEN[^;]+').exec(document.cookie)
                   csrf = decodeURIComponent(csrf ? csrf.toString().replace(/^[^=]+./, '') : '')


                formData.append('file', this.file);
                //formData.append('_token', this.$refs._token.value);
                //console.log(this.$refs._token);
               //console.log({'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content});
               //console.log(csrf);
                //*
               await axios.post( '/api/uploads',
                    formData,
                    {
                        headers: {
                            csrf,
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                })
                .catch(function(){
                    console.log('FAILURE!!');
                });
                //*/
            }
        }
    }
</script>

<style scoped>

</style>
