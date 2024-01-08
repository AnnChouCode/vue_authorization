import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            _url:"https://vue3-course-api.hexschool.io/v2",
            _api_path:"annchou",
            products:[],
            productDetail:{}
        }
    },
    methods: {
        checkLogin() {
            axios.post(`${this._url}/api/user/check`)
                .then(res=> {
                    this.getData()
                })
                .catch(err => {
                    alert(err.response.data.message)
                    window.location="index.html"
                })
        },
        getData(){
            axios.get(`${this._url}/api/${this._api_path}/admin/products/all`)
            .then(res => {
                this.products=res.data.products            
            })
            .catch( err => console.log(err.response.data.message))
        },
        getDetail(item){
            this.productDetail = {
                default:{...item},
                imageUrl:item.imageUrl,
                imagesUrl:[item.imageUrl, ...item.imagesUrl]
            }            
        },
        changeImg(item){
            this.productDetail.imageUrl = item
        }
    },
    mounted() {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("hexschool="))
            ?.split("=")[1];
        axios.defaults.headers.common['Authorization'] = token;

        this.checkLogin()
    },
}).mount('#app')