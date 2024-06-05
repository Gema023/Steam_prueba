<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="columns">
        <div class="column">
          <h3>Acerca de</h3>
          <ul>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Trabajos</a></li>
            <li><a href="#">Socios de Steam</a></li>
            <li><a href="#">Publicaciones</a></li>
          </ul>
        </div>
        <div class="column">
          <h3>Soporte</h3>
          <ul>
            <li><a href="#">¿En qué podemos ayudarte?</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Información de envío</a></li>
            <li><a href="#">Condiciones</a></li>
            <li><a href="#">Formulario de contacto</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        <div class="column">
          <h3>Noticias</h3>
          <ul>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Destacados</a></li>
            <li><a href="#">Sorteos</a></li>
            <li><a href="#">Próximos juegos</a></li>
            <li><a href="#">Lanzamientos recientes</a></li>
          </ul>
        </div>
        <div class="column">
          <h3>Distribución</h3>
          <ul>
            <li><a href="#">Información</a></li>
            <li><a href="#">Normas y directrices</a></li>
            <li><a href="#">Inicia sesión para empezar</a></li>
          </ul>
        </div>
      </div>
      <div class="logo-section">
        <nuxt-link to="/"><img src="/icono_steam.svg" alt="Icono" class="icono" /></nuxt-link>
        <div class="social-media">
          <a href="https://www.facebook.com/Steam" target="_blank">
            <span class="material-icons"><nuxt-link to="/"><div><img src="/logo_facebook.svg" alt="Logo" /></div></nuxt-link></span>
            <span>Facebook</span>
          </a>
          <a href="https://twitter.com/Steam" target="_blank">
            <span class="material-icons"><nuxt-link to="/"><div><img src="/logo_x.svg" alt="Logo" /></div></nuxt-link></span>
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style postcss>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

.footer {
  font-family: 'Cairo', sans-serif;
  font-size: 18px;
  background-color: #2B2B2B;
  color: #DEDEDE;
  padding: 40px 20px;
  margin-top: 80px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.columns {
  display: flex;
  flex: 2;
  gap: 22px;
  padding: 40px;
}

.column {
  margin-right: 20px;
}

.column h3 {
  margin-bottom: 10px;
}

.column ul {
  list-style: none;
  padding: 0;
}

.column ul li {
  margin-bottom: 8px;
}

.column ul li a {
  color: #DEDEDE;
  text-decoration: none;
}

.column ul li a:hover {
  text-decoration: underline;
}

.logo-section {
  text-align: center;
  flex: 1;
}

.icono {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 144px;
  max-width: 200px;
  margin: 60px 60px 60px 170px;
}

.social-media {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-media a {
  display: flex;
  align-items: center;
  color: #DEDEDE;
  margin: 0 10px;
  font-size: 24px;
  text-decoration: none;
}

.social-media a:hover {
  color: #FFFFFF;
}

.social-media span {
  margin-left: 8px;
  font-size: 18px;
}

/* Media queries */
@media screen and (max-width: 768px) {
  .columns {
    flex-direction: column;
  }
  
  .column {
    margin-right: 0;
    margin-bottom: 20px;
  }
  
  .column ul {
    display: none;
  }
  
  .footer-content {
    padding: 20px;
  }
}
</style>