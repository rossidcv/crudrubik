if (document.getElementById("app")) {
    const { createApp } = Vue
 
    createApp ({
        data() {
            return {
                url: "https://monicadcv.pythonanywhere.com/productos/",
                productosAll: [],
                productos: [],
                errored: false,
                loading: true,
                categorias:[],
                precios: [],
                categoria: "All",
                precio: "All"
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
                this.productosAll = await resp.json() 
                this.productos = this.productosAll
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
                    console.log("eliminado")
                    alert("Se eliminará este producto")
                    window.location.href = "./index.html";  //NUEVO 
                    },
            filtro() {
                this.productos = this.productosAll.filter( producto=>(producto.categoria == this.categoria || this.categoria==="All") && (producto.precio == this.precio || this.precios==="All" ))                
            },
            orden() {
                this.productos.sort((a, b) => { return (a.precio > b.precio ? 1 : -1) } )// si retorna 1 lo invierte, si retorna -1 lo deja como esta 
            },
            cargarListasDesplegables() {
                this.categorias =['All']
                this.precios = ['All']
                for (producto of this.productosAll) {
                  if (producto.categoria !== '' && this.categorias.indexOf(producto.categoria) < 0) {
                    this.categoria.push(producto.categoria)
                  }
                  if (producto.precio !== '' && this.precios.indexOf(producto.precio) < 0) {
                    this.precio.push(producto.precio)
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
