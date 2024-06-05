<template>
  <div class="ver-todos-container">
    <h2>Lo más vendido</h2>
    <nuxt-link to="/see_all" class="ver-todos-link">Ver todos</nuxt-link>
  </div>

  <div class="carousel">
    <div class="carousel-wrapper" :style="{ transform: `translateX(-${currentIndex * 100 / visibleItems}%)` }">
      <div v-for="(game, index) in games" :key="index" class="carousel-item" @click="openGameModal(game)">
        <img :src="game.image" :alt="game.name" />
        <div class="overlay">
          <h3>{{ game.name }}</h3>
            <div class="overlay_info">
              <div class="icons">
                <nuxt-link to="/"><div><img src="/shopping_cart_icon.svg" alt="Shopping cart icon" class="icon"/></div></nuxt-link>
                <nuxt-link to="/"><div><img src="/heart_icon.svg" alt="Heart icon" class="icon" :class="{ active: isActive.favorite }" @click="toggleActive('favorite')"/></div></nuxt-link>
              </div>
              <div class="prices">
                <span class="original-price">{{ game.originalPrice }}</span>
                <span class="discounted-price">{{ game.discountedPrice }}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
    <button @click="prev" class="carousel-control prev">‹</button>
    <button @click="next" class="carousel-control next">›</button>
  </div>

  <!-- Modal de Juego -->
  <div v-if="showGameModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeGameModal">&times;</span>
      <h2>{{ selectedGame.name }}</h2>
      <div class="modal-carousel">
        <img v-for="(image, index) in shuffledImages" :key="index" :src="image" :alt="`Image ${index + 1}`" />
      </div>
      <div class="modal-buttons_0">
        <div class="modal-buttons">
          <div v-for="(price, index) in selectedGame.prices" :key="index" class="modal-button">
            <button>{{ price }}</button>
          </div>
        </div>
          <div class="icons">
            <nuxt-link to="/"><div><img src="/shopping_cart_icon.svg" alt="Shopping cart icon" class="icon"/></div></nuxt-link>
            <nuxt-link to="/"><div><img src="/heart_icon.svg" alt="Heart icon" class="icon" :class="{ active: isActive.favorite }" @click="toggleActive('favorite')"/></div></nuxt-link>
          </div>
      </div>
      <div class="description-tech-info">
        <button @click="toggleDescriptionTechInfo('description')" :class="{ active: activeTab === 'description' }">Descripción</button>
        <button @click="toggleDescriptionTechInfo('techInfo')" :class="{ active: activeTab === 'techInfo' }">Información Técnica</button>
        
        <div v-if="activeTab === 'description'">
          <p><strong>Descripción:</strong> {{ selectedGame.description }}</p>
          <div class="sections">
            <div class="section">
              <h3>Categorías</h3>
              <div class="tags">
                <span v-for="(category, index) in selectedGame.categories" :key="index" class="tag">{{ category }}</span>
              </div>
            </div>
            <div class="section">
              <h3>Reseñas</h3>
              <div class="reviews">
                <div v-for="(review, index) in selectedGame.reviews" :key="index" class="review">
                  <div class="stars">
                    <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= review.rating }">★</span>
                  </div>
                  <p>{{ review.text }}</p>
                </div>
              </div>
            </div>
            <div class="section">
              <h3>Juegos Similares</h3>
              <div class="similar-games">
                <div v-for="(similarGame, index) in selectedGame.similarGames" :key="index" class="similar-game">
                  <img :src="similarGame.image" :alt="similarGame.name" />
                  <h4>{{ similarGame.name }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="activeTab === 'techInfo'">
          <div class="tech-info-columns">
            <div>
              <h3>Datos</h3>
              <ul>
                <li v-for="(datum, index) in selectedGame.techInfo.data" :key="index">{{ datum }}</li>
              </ul>
            </div>
            <div>
              <h3>Compatibilidad</h3>
              <ul>
                <li v-for="(compatibility, index) in selectedGame.techInfo.compatibility" :key="index">{{ compatibility }}</li>
              </ul>
            </div>
            <div>
              <h3>Idiomas disponibles</h3>
              <ul>
                <li v-for="(language, index) in selectedGame.techInfo.languages" :key="index">{{ language }}</li>
              </ul>
            </div>
          </div>
          <div class="system-requirements">
            <h3>Requisitos del sistema</h3>
            <div class="requirements-columns">
              <div>
                <h4>Mínimos</h4>
                <ul>
                  <li v-for="(requirement, index) in selectedGame.techInfo.requirements.minimum" :key="index">{{ requirement }}</li>
                </ul>
              </div>
              <div>
                <h4>Recomendado</h4>
                <ul>
                  <li v-for="(requirement, index) in selectedGame.techInfo.requirements.recommended" :key="index">{{ requirement }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: {
        favorite: false,
        cart: false,
      },
      currentIndex: 0,
      showGameModal: false,
      selectedGame: null,
      shuffledImages: [],
      activeTab: 'description',
      games: [
        {
          image: '/article_1.svg',
          name: 'STAR WARS Jedi: Survivor',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_2.svg',
          name: 'Granblue Fantasy: Relink',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_3.svg',
          name: 'Everdell',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_4.svg',
          name: 'The last of us. Part II',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_5.svg',
          name: 'Stardew Valley',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_6.svg',
          name: 'Aegis Defenders',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_7.svg',
          name: 'Sonic Generations',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
        {
          image: '/article_8.svg',
          name: 'One Piece: World seeker',
          discountedPrice: '31,41€',
          description: 'La historia de Cal Kestis continúa en Star Wars Jedi: Survivor™, un juego de acción y aventuras en tercera persona desarrollado por Respawn Entertainment en colaboración con Lucasfilm Games. Este título para un jugador centrado en la historia retoma la aventura 5 años después de los acontecimientos de Star Wars Jedi: Fallen Order™ y sigue la lucha cada vez más desesperada de Cal mientras la galaxia se hunde en la oscuridad. Empujado al exilio por culpa del Imperio, deberá guardarse de nuevas y viejas amenazas. Como uno de los últimos Caballeros Jedi, debe hacer frente a los tiempos más oscuros de la galaxia, pero ¿hasta dónde está dispuesto a llegar para protegerse a sí mismo, a su tripulación y al legado de la Orden Jedi?',
          images: ['/modal_1.svg'],
          prices: ['Juego base: 31,41€', 'Juego deluxe: 45,00€', 'Juego premium: 50,00€'],
          techInfo: {
            data: ['Un jugador', 'Logros en Steam', 'Subtítulos disponibles', 'HDR disponible'],
            compatibility: ['Mandos de XBox', 'Mandos DualShock (solo con USB)', 'Mandos DualSense (solo con USB)'],
            languages: ['Español (España)', 'Español (Hispanoamérica)', 'Inglés', 'Francés', 'Italiano', 'Alemán', 'Japonés', 'Coreano', 'Polaco', 'Portugués (Brasil)', 'Chino simplificado', 'Chino tradicional',],
            requirements: {
              minimum: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.'],
              recommended: ['Requiere un procesador y un sistema operativo de 64 bits.', 'SO: Windows 10 64-bit', 'Procesador: 4 core / 8 threads | Intel Core i7-7700 | Ryzen 5 1400', 'Gráficos: 8GB VRAM | GTX 1070 | Radeon RX 580', 'DirectX: Versión 12', 'Red: Conexión de banda ancha a Internet', 'Almacenamiento: 155 GB de espacio disponible', 'Notas adicionales: Internet required for non-optional patching, no online play.']
            }
          },
          categories: ['Juego de rol', 'Aventura', 'Acción'],
          reviews: [
            { rating: 5, text: 'Increíble juego, muy recomendado!' },
            { rating: 4, text: 'Muy bueno, aunque podría mejorar en algunos aspectos.' },
            { rating: 3, text: 'Es entretenido, pero tiene sus fallas.' },
          ],
          similarGames: [
            { name: 'Eternal Return', image: '/similar_game_1.svg' },
            { name: 'Little Kitty, Big City',image: '/similar_game_2.svg' },
            { name: 'Palia',image: '/similar_game_3.svg' },
          ],
        },
      ],
      visibleItems: 4,
    };
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.games.length;
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.games.length) % this.games.length;
    },
    openGameModal(game) {
      this.selectedGame = game;
      this.showGameModal = true;
      this.shuffleImages();
    },
    closeGameModal() {
      this.showGameModal = false;
    },
    toggleActive(icon, event) {
      event.stopPropagation();
      this.isActive[icon] = !this.isActive[icon];
    },
    shuffleImages() {
      this.shuffledImages = this.selectedGame.images.sort(() => Math.random() - 0.5);
    },
    toggleDescriptionTechInfo(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style postcss>
h2 {
  font-family: 'Cairo', sans-serif;
  font-weight: bold;
  font-size: 26px;
}

h3 {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

.ver-todos-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.4em;
  margin: 1em 0;
}

.ver-todos-link {
  color: #C714E4;
  text-decoration: none;
  font-family: 'Cairo', sans-serif;
  font-weight: lighter;
  font-size: 18px;
}

.ver-todos-link:hover {
  text-decoration: underline;
}

.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease;
  gap: 20px;
  padding-left: 60px;
  margin-right: 100px;
}

.carousel-item {
  position: relative;
  min-width: 25%;
  box-sizing: border-box;
}

.carousel-item img {
  width: 100%;
  height: auto;
}

.overlay {
  height: 114px;
  background-color: #FFFFFF;
  color: #2B2B2B;
  padding: 10px;
  border: 2px solid #2B2B2B;
  border-radius: 0 0 40px 40px;
  padding: 12px 12px 12px 24px;
}

.overlay:hover {
  background-color: #C714E4;
  color: #ffffff;
  border: 2px solid #C714E4;
}

.overlay h3 {
  margin: 0;
  font-size: 18px;
}

.overlay_info {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-content: center;
  margin-top: 16px;
  font-size: 16px;
  gap: 80px;
}

.icons {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  gap: 14px;
}

.icon {
  font-family: 'Material Icons';
  font-size: 24px;
  color: #2B2B2B;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
}

.icon:hover {
  color: #FF0000;
}

.icon.active {
  background-color: #FF0000;
}

.prices {
  display: flex;
  margin-top: 5px;
  max-width: 29px;
}

.original-price {
  font-family: 'Cairo', sans-serif;
  font-weight: lighter;
  font-size: 16px;
  text-decoration: line-through;
  color: #2B2B2B;
  margin-right: 10px;
}

.original-price:hover {
  color: #ffffff;
}

.discounted-price {
  font-family: 'Cairo', sans-serif;
  font-weight: bold;
  font-size: 22px;
  color: #C714E4;
}

.discounted-price:hover {
  color: #FFFFFF;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #C714E4;
  border: none;
  font-size: 4rem;
  cursor: pointer;
  z-index: 1000;
  padding: 0 10px;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}


.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
  width: 90%;
  max-height: 90%;
  overflow-y: auto;
}

.close {
  font-size: 28px;
  cursor: pointer;
  float: right;
}

.modal-carousel  {
  width: 100%;
  height: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.modal-buttons_0 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 60px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: #FFFFFF;
  color: #2B2B2B;
  font-size: 14px;
  padding: 8px 16px;
  border: 2px solid #2B2B2B;
  border-radius: 40px;
  margin-right: 8px;
  margin-bottom: 8px;
  gap: 20px;
}

.modal-button:hover {
  background-color: #2B2B2B;
  color: #C714E4;
  border: 2px solid #2B2B2B;
}

.modal-button .icons {
  display: flex;
  gap: 5px;
}

.description-tech-info {
  margin-bottom: 20px;
  gap: 50px;
}

.description-tech-info button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 18px;
  font-weight: bold;
  color: #838383;
}

.description-tech-info button.active {
  color: #C714E4;
  background-color: #DEDEDE;
  text-decoration: underline;
  margin-bottom: 20px;
}

.sections {
  margin-top: 20px;
}

.section {
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: #C714E4;
  color: white;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.reviews {
  display: flex;
  gap: 42px;
  margin-top: 10px;
}

.review {
  margin-bottom: 10px;
  padding: 20px;
  background-color: #AFAEAE;
  border-radius: 40px;
}

.stars {
  color: #C714E4;
}

.star {
  font-size: 20px;
}

.star.filled {
  color: #C714E4;
}

.similar-games {
  display: flex;
  gap: 44px;
}

.similar-game img {
  width: 273px;
  border-radius: 40px 40px 0 0;
}

.similar-game h4 {
  height: 50px;
  background-color: #2B2B2B;
  color: #ffffff;
  border: 2px solid #2B2B2B;
  border-radius: 0 0 40px 40px;
  padding: 12px 12px 12px 24px;
}

.tech-info-columns {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tech-info-columns div {
  flex: 1;
  padding: 10px;
}

.system-requirements {
  margin-top: 20px;
}

.requirements-columns {
  display: flex;
  justify-content: space-around;
}

.requirements-columns div {
  flex: 1;
  padding: 10px;
}

.requirements-columns h4 {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
