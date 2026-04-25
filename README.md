# Andrea Pral · Clases de Masajes

Landing page conectada a Google Calendar a través de una Vercel Serverless Function.
Las credenciales **nunca** aparecen en el código ni en el navegador.

---

## Estructura del proyecto

```
/
├── index.html          ← toda la app (HTML + CSS + React vía CDN)
├── api/
│   └── calendar.js     ← serverless function: proxy hacia Google Calendar
├── vercel.json         ← routing: estático + /api/*
├── .gitignore          ← excluye .env y .vercel
└── README.md
```

---

## Cómo funciona el proxy

```
Navegador  →  GET /api/calendar?year=2026&month=5  →  Vercel Function
                                                            ↓
                                               Lee CALENDAR_ID y API_KEY
                                               desde process.env (servidor)
                                                            ↓
                                               Llama a Google Calendar API
                                                            ↓
Navegador  ←  JSON de eventos mapeados         ←  Vercel Function
```

El usuario nunca ve `CALENDAR_ID` ni `API_KEY` en las DevTools ni en el código fuente.

---

## Configurar Google Calendar

### 1. Hacer el calendario público

1. Google Calendar → tres puntos junto al calendario → **Configuración y uso compartido**.
2. **Permisos de acceso** → activar **"Hacer que esté disponible para el público"**
   → elegir **"Ver todos los detalles del evento"**.

### 2. Obtener el Calendar ID

1. Misma pantalla de configuración → sección **"Integrar el calendario"**.
2. Copiá el valor de **"ID de calendario"**. Se ve así:
   ```
   tu_email@gmail.com                       ← calendario principal
   abc123xyz@group.calendar.google.com      ← calendarios adicionales
   ```
3. Guardalo — lo vas a cargar como variable de entorno en Vercel (ver abajo).

### 3. Crear la API Key en Google Cloud Console

1. Entrá a [console.cloud.google.com](https://console.cloud.google.com).
2. Creá (o seleccioná) un proyecto.
3. **APIs y servicios → Biblioteca** → buscá **"Google Calendar API"** → **Habilitar**.
4. **APIs y servicios → Credenciales** → **+ Crear credenciales → Clave de API**.
5. En la clave creada, **Restricciones de API** → seleccioná **"Google Calendar API"**.
   > No hace falta restringir por referente HTTP: la clave solo se usa en el servidor,
   > nunca en el navegador.
6. Guardala — también va como variable de entorno en Vercel.

---

## Deploy en Vercel

### Paso 1 — Subir a GitHub

```bash
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

> Verificá que `.env` y `.vercel` estén en `.gitignore` antes de hacer push.

### Paso 2 — Conectar con Vercel

1. Entrá a [vercel.com](https://vercel.com) → **Add New… → Project**.
2. Elegí el repositorio.
3. En la pantalla de configuración:
   - **Framework Preset:** `Other`
   - **Build Command:** dejar en blanco
   - **Output Directory:** dejar en blanco
4. Hacé clic en **Deploy** (va a fallar en el primer intento porque aún no tiene las variables — eso es normal).

### Paso 3 — Cargar las variables de entorno ⚠️ Obligatorio

1. En el proyecto en Vercel → **Settings → Environment Variables**.
2. Agregá las dos variables con exactamente estos nombres:

   | Name          | Value                                      |
   |---------------|--------------------------------------------|
   | `CALENDAR_ID` | `abc123xyz@group.calendar.google.com`      |
   | `API_KEY`     | `AIzaSy...` (tu clave de Google Cloud)     |

3. Marcalas para los entornos **Production**, **Preview** y **Development**.
4. Hacé **Save** y luego **Redeploy** desde la pestaña **Deployments**.

### Paso 4 — Verificar

Abrí `https://tu-proyecto.vercel.app/api/calendar?year=2026&month=5` en el navegador.
Deberías ver un array JSON con los eventos del mes. Si ves un error, revisá:
- Que las variables de entorno estén escritas exactamente como `CALENDAR_ID` y `API_KEY`.
- Que el calendario esté marcado como público en Google Calendar.
- Que la API de Google Calendar esté habilitada en el proyecto de Google Cloud.

---

## Desarrollo local

Para probar la función localmente instalá la CLI de Vercel:

```bash
npm i -g vercel
vercel dev
```

Creá un archivo `.env` (ya está en `.gitignore`) con tus credenciales:

```env
CALENDAR_ID=abc123xyz@group.calendar.google.com
API_KEY=AIzaSy...
```

`vercel dev` levanta el servidor en `http://localhost:3000` con hot-reload
y las variables del `.env` disponibles en `process.env`.

---

## Dominio personalizado

En Vercel → **Settings → Domains** → agregá tu dominio.
Vercel provisiona el certificado SSL automáticamente.
