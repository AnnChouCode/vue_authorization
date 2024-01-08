import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

createApp({
    data() {
        return {
            user: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            const _url = "https://vue3-course-api.hexschool.io/v2/admin/signin"           
           
            axios.post(_url, this.user)
            .then( res => {
                const {token, expired} = res.data                

                document.cookie = `hexschool = ${token}; expires = ${new Date(expired)}`

                window.location = "product.html"
            })
            .catch(err => {
                alert(err.response.data.message)
            }               
                )


        }
    }
}).mount('#app')