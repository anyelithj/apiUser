const login = new Vue({
    el: '#login',
    data: {
        userName: "",
        userPassword: "",
        dataUsers: [],
        userCredentials: {},
        authenUser: [],
        dataStorage: [],
    },
    created() {
        this.getData()
        this.dataStorage = JSON.parse(localStorage.getItem("dbUsers") || null)
    },
    methods: {
        async getData() {
            var url = 'https://randomuser.me/api/?results=10'
            await fetch(url)
                .then((response) => response.json())
                .then((data) => (this.dataUsers = data.results))
            this.updateLocalStorage(this.dataUsers)
        }, 
        updateLocalStorage(){
            localStorage.setItem("dbUsers", JSON.stringify(this.dataUsers))
        },
        clearForm() {
            this.userName = "";
            this.userPassword  = "";
          },
        session(e) {
          e.preventDefault();
          this.userCredentials = {
            name: this.userName,
            password: this.userPassword
          }
          this.validateCredentials(this.userCredentials)
        },
        validateCredentials(user, password) {
            this.authenUser = this.dataUsers.filter((user)=> {
                if (user.login.password === this.userPassword && user.login.username === this.userName) {
                    window.location.href = '../view/backlog.html'
                    return user
                } 
        })
        this.authenUser.length === 0 ?  
        this.message(
            "Oops",
            4500,
            "center",
            "Verifique que los datos sean correctos",
            "error"
          ):
          this.message(
            "¡Datos correctos!",
            4500,
            "center",
            "Bienvenida",
            "success"
          );
   
        return this.clearForm();
        },
        message(msj,time,position,text){
            Swal.fire({
              position: position,
              text: text,
              icon: "success",
              title: msj,
              showConfirmButton: false,
              timer: time,
            });
        },

    },
})

