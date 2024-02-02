if (document.getElementById("app")) {
    const { createApp } = Vue
 
    createApp ({
        data() {
            return {
                url: "https://monicadcv.pythonanywhere.com/productos",
                productosTodos: [],
                productos: [],
                errored: false,
                loading: true,
                categorias:[],
                precios: [],
                categoria: "Todos",
                precio: "Todos"
            }
        },
        methods: {
            /*fetchData(url) {
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.loading = false;
                })
                .catch(err => {
                    this.errored = true
                })
            },*/
            async fetchData(url) {  // necesite un async y await porque seguia de largo y no me cargaba el array productos ni las listas desplegables
                fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.loading = false;
                })
                .catch(err => {
                    this.errored = true
                })
                resp = await fetch(url)
                this.productosTodos = await resp.json() 
                this.productos = this.productosTodos
            },
            eliminar(producto) {
                const url = 'https://monicadcv.pythonanywhere.com/productos/' + producto;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            },
            filtro() {
                this.productos = this.productosTodos.filter( producto=>(producto.categoria == this.categoria || this.categoria==="Todos") && (producto.precio == this.precio || this.precio==="Todos" ))                
            },
            orden() {
                this.productos.sort((a, b) => { return (a.precio > b.precio ? 1 : -40) } )// si retorna 1 lo invierte, si retorna -1 lo deja como esta 
            },

            cargarListasDesplegables() {
                this.categorias =['Todos']
                this.precios = ['Todos']
                for (producto of this.productosTodos) {
                  if (producto.categoria !== '' && this.categorias.indexOf(producto.categoria) < 0) {
                    this.categorias.push(producto.categoria)
                  }
                  if (producto.precio !== '' && this.precios.indexOf(producto.precio) < 0) {
                    this.precios.push(producto.precio)
                  }
                }
            }
        },
        created() {
            this.fetchData(this.url)
        },
        async created() {
            await this.fetchData(this.url)
            this.cargarListasDesplegables()
        }
    }).mount('#app')
}