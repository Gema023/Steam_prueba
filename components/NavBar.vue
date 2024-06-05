<template>
  <div>
    <!-- Barra de navegación -->
    <nav>
      <!-- Logo -->
      <div class="logo">
        <nuxt-link to="/"><div><img src="/logo_steam.svg" alt="Logo" /></div></nuxt-link>
      </div>

      <!-- Enlaces de navegación -->
      <div class="nav-links">
        <ul>
          <li><nuxt-link to="/">Tienda</nuxt-link></li>
          <li><nuxt-link to="/community">Comunidad</nuxt-link></li>
          <li><nuxt-link to="/categories">Categorías</nuxt-link></li>
          <li><nuxt-link to="/points">Puntos</nuxt-link></li>
        </ul>
      </div>

      <!-- Buscador -->
      <div class="search-bar">
        <input type="text" placeholder="Buscar..." v-model="searchQuery" @keyup.enter="search">
        <div class="search_icon">
          <nuxt-link to="/"><div><img src="/search_icon.svg" alt="Search icon" /></div></nuxt-link>
        </div>
      </div>

      <!-- Selector de idioma -->
      <div class="language-selector">
        <select v-model="selectedLanguage">
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="cn">Chino</option>
          <option value="nl">Holandés</option>
          <option value="de">Alemán</option>
          <option value="it">Italiano</option>
        </select>
      </div>

      <!-- Botón de inicio de sesión o icono y nombre de usuario -->
      <div class="login-btn">
        <div v-if="!loggedIn">
          <button @click="showLoginModal = true">Iniciar sesión</button>
        </div>
        <div v-else>
          <span @click="showProfileModal = true" class="profile-icon material-icons">person</span>
          <span @click="showProfileModal = true">{{ username }}</span>
        </div>
      </div>
    </nav>

    <!-- Modal de inicio de sesión -->
    <div v-if="showLoginModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showLoginModal = false">&times;</span>
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="login" class="form-column">
          <label for="login-username">Usuario:</label>
          <input type="text" id="login-username" v-model="username" required>
          <label for="login-password">Contraseña:</label>
          <input type="password" id="login-password" v-model="password" required>
          <button type="submit" class="action-button">Iniciar sesión</button>
        </form>
        <p>¿Todavía no tienes cuenta de Steam? <a href="#" @click="showRegisterModal = true; showLoginModal = false;">Regístrate aquí.</a></p>
      </div>
    </div>

    <!-- Modal de registro -->
    <div v-if="showRegisterModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showRegisterModal = false">&times;</span>
        <h2>Registro</h2>
        <form @submit.prevent="register" class="form-column">
          <label for="register-username">Nombre de usuario:</label>
          <input type="text" id="register-username" v-model="registerData.username" required>
          <label for="register-email">Correo electrónico:</label>
          <input type="email" id="register-email" v-model="registerData.email" required>
          <label for="register-password">Contraseña:</label>
          <input type="password" id="register-password" v-model="registerData.password" required>
          <label for="confirm-password">Confirmar Contraseña:</label>
          <input type="password" id="confirm-password" v-model="registerData.confirmPassword" required>
          <div>
            <input type="checkbox" id="terms" v-model="registerData.terms" required>
            <label for="terms">Acepto los <a href="#">términos y condiciones</a></label>
          </div>
          <button type="submit" class="action-button">Registrarse</button>
        </form>
        <p>¿Ya tienes cuenta de Steam? <a href="#" @click="showLoginModal = true; showRegisterModal = false;">Inicia sesión aquí</a></p>
      </div>
    </div>

    <!-- Modal de perfil -->
    <div v-if="showProfileModal" class="profile-modal">
      <div class="profile-modal-content">
        <span class="close" @click="showProfileModal = false">&times;</span>
        <ul class="profile-options">
          <li><span class="material-icons">shopping_cart</span> Carrito</li>
          <li><span class="material-icons">account_balance_wallet</span> Monedero</li>
          <li><span class="material-icons">favorite_border</span> Lista de deseos</li>
          <li><span class="material-icons">folder</span> Mi contenido</li>
          <li><span class="material-icons">people</span> Mis amigos</li>
          <li><span class="material-icons">star</span> Mis insignias</li>
          <li><span class="material-icons">settings</span> Configuración</li>
          <li class="logout"><span class="material-icons">logout</span> <button @click="logout">Cerrar sesión</button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    loggedIn() {
      return this.username !== '';
    }
  },
  name: 'LoginRegisterModal',
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ]
  },
  data() {
    return {
      searchQuery: '',
      selectedLanguage: 'es',
      showLoginModal: false,
      showRegisterModal: false,
      showProfileModal: false,
      username: '',
      password: '',
      loggedIn: false,
      registerData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      }
    }
  },
  methods: {
    search() {
      console.log('Buscando:', this.searchQuery);
    },
    login() {
      console.log('Inicio de sesión:', this.username, this.password);
      this.loggedIn = true;
      this.showLoginModal = false;
    },
    register() {
      if (this.registerData.password !== this.registerData.confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }
      console.log('Registro:', this.registerData);
      this.showRegisterModal = false;
    },
    logout() {
      console.log('Cerrando sesión');
      this.loggedIn = false;
      this.username = '';
      this.password = '';
      this.showProfileModal = false;
    }
  }
}
</script>

<style postcss>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');

body {
  font-family: 'Cairo', sans-serif;
  margin: 0;
  padding: 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2B2B2B;
  color: #DEDEDE;
  padding: 18px;
  font-size: 1.4rem;
}

.logo img {
  height: 40px;
}

input {
  border-radius: 40px;
  padding: 8px;
  width: 60%;
  color: #C714E4;
  background-color: #C7C5C5;
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

.nav-links li:hover {
  color: #C714E4;
  text-decoration: underline;
  font-weight: bold;
}

.nav-links a {
  color: #DEDEDE;
  text-decoration: none;
}

.nav-links a:hover {
  color: #C714E4;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  background-color: #2B2B2B;
  padding: 10px;
  border: 2px solid #DEDEDE;
  border-radius: 40px;
  color: #DEDEDE;
  font-size: 1rem;
}

.search-bar .search_icon img {
  width: 24px;
  height: 24px;
}

.language-selector select {
  background-color: #2B2B2B;
  padding: 10px;
  border: 2px solid #DEDEDE;
  border-radius: 40px;
  color: #DEDEDE;
  font-size: 1rem;
}

.login-btn button {
  font-weight: bold;
  padding: 5px 10px;
  background-color: #C714E4;
  border-radius: 40px;
  color: #DEDEDE;
  border: none;
  cursor: pointer;
}

.login-btn .profile-icon {
  cursor: pointer;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #DEDEDE;
  margin: auto;
  padding: 20px;
  border-radius: 15px;
  width: 90%;
  box-sizing: border-box;
}

.close {
  color: #C714E4;
  font-size: 1.75rem;
  font-weight: bold;
  align-self: flex-end;
  cursor: pointer;
}

.form-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
}

.action-button {
  background-color: #C714E4;
  border-radius: 40px;
  color: #DEDEDE;
  border: none;
  padding: 10px;
  margin-top: 20px;
  cursor: pointer;
  font-weight: bold;
}

.profile-modal {
  position: absolute;
  z-index: 1;
  right: 0;
  top: 80px;
  width: 240px;
  height: 540px;
  overflow: auto;
  background-color: #2B2B2B;
  padding: 20px;
}

.profile-modal-content {
  color: #FFFFFF;
  padding: 20px;
}

.profile-options {
  list-style: none;
  padding: 0;
  margin-top: 40px;
}

.profile-options li {
  display: flex;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
}

.profile-options li + li {
  border-top: 1px solid #C714E4;
}

.logout-button {
  background: none;
  border: none;
  color: #C714E4;
  cursor: pointer;
  font-size: inherit;
}

@media only screen and (max-width: 768px) {
  .nav-links li {
    display: none;
  }

  .search-bar input {
    width: 100%;
  }

  .language-selector select {
    width: 100%;
  }
  
  .modal {
    width: 100%;
  }

  .modal-content {
    width: 90%;
  }
}

</style>
