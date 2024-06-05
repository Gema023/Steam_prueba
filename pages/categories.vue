<template>
    <div><NavBar /></div>

  <div><ArticleCard_5 /></div>
  <div><ArticleCard_5_1 /></div>
  <div><ArticleCard_5_2 /></div>
  <div><ArticleCard_5_3 /></div>
  <div><ArticleCard_5_4 /></div>
  <div><ArticleCard_5_5 /></div>
  <div><ArticleCard_5_6 /></div>
  <div><Footer /></div>

  </template>
  
  <script>
  import ArticleCard_5_1 from '~/components/ArticleCard_5_1.vue';
  import ArticleCard_5_2 from '~/components/ArticleCard_5_2.vue';
  import ArticleCard_5_3 from '~/components/ArticleCard_5_3.vue';
  import ArticleCard_5_4 from '~/components/ArticleCard_5_4.vue';
  import ArticleCard_5_5 from '~/components/ArticleCard_5_5.vue';
  import ArticleCard_5_6 from '~/components/ArticleCard_5_6.vue';
  import Footer from '~/components/Footer.vue'

  export default {
    data() {
      return {
        searchQuery: '',
        selectedLanguage: 'es',
        showLoginModal: false,
        username: '',
        password: ''
      }
    },
    methods: {
      search() {
        // Lógica para realizar la búsqueda
        console.log('Búsqueda realizada:', this.searchQuery)
      },
      login() {
        // Lógica para iniciar sesión
        console.log('Inicio de sesión:', this.username, this.password)
        this.showLoginModal = false
      }
    },
    components: {
    Footer
  }
  }

  </script>
  
  <style postcss>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #2B2B2B;
    color: #DEDEDE;
    padding: 22px;
    gap: 4px;
  }

  h1 {
  font-family: 'Cairo', sans-serif;
  font-weight: bold;
  font-size: 30px;
  margin: 10px;
}
  
  .nav-links ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .nav-links li {
    margin-right: 20px;
  }
  
  .nav-links a {
    color: #DEDEDE;
    text-decoration: none;
  }
  
  .search-bar input {
    padding: 5px;
  }
  
  .search-bar button {
    padding: 5px 10px;
  }
  
  .language-selector select {
    padding: 5px;
  }
  
  .login-btn button {
    padding: 5px 10px;
  }
  
  /* Estilos para el modal */
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .modal-content {
    background-color: #DEDEDE;
    margin: 3% auto;
    padding: 20px;
    border-radius: 15px;
    width: 800px;
    height: 600px;
  }
  
  .close {
    color: #2B2B2B;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>