const app = new Vue({
    el: '#backlog',
    data: {
        configAdmin:{}  
    },
    created() {   
        this.configAdmin = this.getParsedLocalStorage("dbUsers") 
    },
    methods: {
        getParsedLocalStorage(key) {
            return JSON.parse(localStorage.getItem(key) || null);
          }
    },
})