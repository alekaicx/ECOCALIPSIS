# 📺 Ecocalipsis - IED Pío X (Canal Nativo para Roku TV / Roku OS)

Canal oficial nativo para **Roku TV / Roku OS** desarrollado con **Roku SceneGraph (RSG)** y **BrightScript**. Diseñado específicamente para pantallas de televisión (10-foot UI) con control remoto (D-Pad, OK, Back, Play/Pause).

---

## 📂 Estructura del Proyecto Roku

```text
roku/
├── manifest                      # Metadatos del canal, versiones, resolución FHD/HD e iconos
├── ecocalipsis_roku_channel.zip  # Paquete compilado listo para Sideloading
├── source/
│   ├── main.brs                  # Punto de entrada de la aplicación Roku (roSGScreen)
│   └── utils.brs                 # Persistencia en roRegistry, formateo y modelos de datos
├── components/
│   ├── MainScene.xml / .brs      # Escena principal, navegación 10-foot y gestión de Back Stack
│   ├── HomeScreen.xml / .brs     # Pantalla de inicio, banner de Cine-Foro y métricas
│   ├── WorkshopsScreen.xml / .brs# Lista y detalle de talleres ambientales
│   ├── VideoPlayerScreen.xml / .brs # Reproductor nativo con nodo <Video>, controles y HUD
│   ├── RecyclingGameScreen.xml / .brs # Minijuego de clasificación con control remoto
│   ├── TriviaScreen.xml / .brs   # Eco-Trivia pedagógica con opciones D-Pad
│   ├── EcoIAScreen.xml / .brs    # Consultas al Consejero EcoIA
│   ├── StatsScreen.xml / .brs    # Tablero de impacto ambiental y medallas
│   ├── AboutScreen.xml / .brs    # Información institucional IED Pío X y PRAE
│   └── tasks/
│       └── EcoIATask.xml / .brs  # Tarea asíncrona HTTP en segundo plano (roUrlTransfer)
└── images/
    ├── channel_icon_hd.png       # Icono del canal para resolución HD (336x210)
    ├── channel_icon_fhd.png      # Icono del canal para resolución FHD (540x405)
    ├── splash_hd.png             # Splash screen HD (1280x720)
    └── splash_fhd.png            # Splash screen FHD (1920x1080)
```

---

## 🚀 Cómo probar la aplicación en tu Roku TV (Developer Mode / Sideloading)

### 1. Activar el Modo Desarrollador en el dispositivo Roku
Toma el control remoto físico de tu Roku y presiona la siguiente secuencia exacta:
1. Presiona el botón **Home** (🏠) **3 veces**.
2. Presiona la flecha **Arriba** (▲) **2 veces**.
3. Presiona la flecha **Derecha** (▶) **1 vez**.
4. Presiona la flecha **Izquierda** (◀) **1 vez**.
5. Presiona la flecha **Derecha** (▶) **1 vez**.
6. Presiona la flecha **Izquierda** (◀) **1 vez**.
7. Presiona la flecha **Derecha** (▶) **1 vez**.

Aparecerá la pantalla **Developer Settings**:
* Selecciona **Enable installer and restart**.
* Acepta los términos de licencia de Roku.
* Establece una contraseña de desarrollador (ejemplo: `rokudev2026`).
* El dispositivo Roku se reiniciará automáticamente.

### 2. Instalar el Canal desde tu Computador
1. Asegúrate de que tu computador y tu Roku estén en la misma red Wi-Fi.
2. Abre tu navegador web e ingresa la dirección IP de tu Roku (por ejemplo `http://192.168.1.50`).
3. En el formulario de autenticación, ingresa:
   * **Usuario:** `rokudev`
   * **Contraseña:** la que configuraste en el paso 1.
4. En la sección **Development Application Installer**:
   * Haz clic en **Choose File** (Examinar).
   * Selecciona el archivo `roku/ecocalipsis_roku_channel.zip`.
   * Haz clic en **Install**.
5. ¡Listo! La aplicación **Ecocalipsis** se abrirá inmediatamente en tu televisor.

---

## 📦 Proceso para generar el paquete de publicación (.pkg)

Para subir la aplicación al **Roku Developer Dashboard**:
1. Con la aplicación instalada en tu Roku en Developer Mode, ingresa a la interfaz web de tu Roku.
2. Haz clic en **Packager**.
3. Ingresa el **App Name** (`Ecocalipsis - IED Pío X`) y la **Versión** (`1.0.100`).
4. Ingresa tu clave de firma (o genera una nueva con `genkey`).
5. Haz clic en **Package**.
6. Descarga el archivo `.pkg` generado y súbelo a tu cuenta de desarrollador en [developer.roku.com](https://developer.roku.com).

---

## 🎮 Controles de la Aplicación en Roku

* **▲ / ▼ (Arriba / Abajo):** Navegar entre el menú superior y el contenido de la pantalla.
* **◀ / ▶ (Izquierda / Derecha):** Moverte entre pestañas del menú, opciones de trivia o mover la caneca en el Eco-Juego.
* **OK:** Seleccionar, reproducir video, responder o pausar/reanudar.
* **Back (Atrás):** Volver a la pantalla anterior o salir del reproductor de video.
* **Play / Pause:** Control multimedia directo en el reproductor de video.
