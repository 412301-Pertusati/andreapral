# Copy Hero — Andrea Pral Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el copy del componente `Hero` en `index.html` con los textos aprobados en el spec, y agregar micro-copy debajo de los botones CTA.

**Architecture:** Cambios de texto puros dentro del componente React `Hero` en `index.html`. No hay build, no hay módulos separados — todo el código vive en un único archivo HTML con JSX transpilado en el browser via Babel standalone.

**Tech Stack:** HTML, React 18 (UMD), Babel Standalone, sin bundler ni framework de testing.

---

## Archivos afectados

| Acción  | Archivo      | Qué cambia |
|---------|-------------|------------|
| Modify  | `index.html` | Componente `Hero`: h1, párrafo, micro-copy |

---

### Task 1: Reemplazar el título h1

**Files:**
- Modify: `index.html:274`

- [ ] **Step 1: Localizar la línea exacta**

Buscar en `index.html` la cadena:
```
Masajes desde cero
```
Está en la línea ~274, dentro del `<h1>` del componente `Hero`.

- [ ] **Step 2: Reemplazar el texto del h1**

Cambiar:
```jsx
        Masajes desde cero
```
Por:
```jsx
        Masajes relajantes, descontracturantes y deportivos — desde cero
```

El bloque completo del h1 queda así (sin tocar los estilos):
```jsx
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(48px, 7vw, 88px)",
        fontWeight: 600, lineHeight: 1.1,
        color: "var(--brown)", marginBottom: 8,
        letterSpacing: "-0.03em",
      }}>
        Masajes relajantes, descontracturantes y deportivos — desde cero
      </h1>
```

- [ ] **Step 3: Verificar en browser**

Abrir `index.html` en el browser (o recargar si ya está abierto).
Esperado: el hero muestra el nuevo título en dos líneas naturales a pantalla completa, sin overflow.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "copy: update hero h1 to new approved text"
```

---

### Task 2: Reemplazar el párrafo de presentación

**Files:**
- Modify: `index.html:288-290`

- [ ] **Step 1: Localizar el párrafo**

Buscar en `index.html` la cadena:
```
Aprendé técnicas de masaje con cañas y masaje de espalda desde donde estés
```
Está dentro del `<p>` del hero, líneas ~288-290.

- [ ] **Step 2: Reemplazar el contenido del párrafo**

Cambiar el contenido del `<p>` de:
```jsx
        Masajista profesional con más de <strong style={{color:"var(--brown)", fontWeight:500}}>14 años de experiencia</strong>. Aprendé técnicas de masaje con cañas y masaje de espalda desde donde estés — clases en vivo por Zoom con material de estudio incluido.
```
Por:
```jsx
        Masajista profesional con más de <strong style={{color:"var(--brown)", fontWeight:500}}>14 años de experiencia</strong>. En mis clases aprendés distintas técnicas con cañas, piedras y aromas, con seguimiento en vivo y material de estudio para repasar a tu ritmo.
```

El bloque completo del `<p>` queda así (sin tocar los estilos):
```jsx
      <p style={{
        maxWidth: 540, fontSize: 18, color: "var(--muted)",
        lineHeight: 1.7, marginBottom: 44,
        fontWeight: 300,
      }}>
        Masajista profesional con más de <strong style={{color:"var(--brown)", fontWeight:500}}>14 años de experiencia</strong>. En mis clases aprendés distintas técnicas con cañas, piedras y aromas, con seguimiento en vivo y material de estudio para repasar a tu ritmo.
      </p>
```

- [ ] **Step 3: Verificar en browser**

Recargar `index.html`.
Esperado: el párrafo muestra el nuevo texto. La palabra "experiencia" sigue en negrita.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "copy: update hero paragraph with new approved text"
```

---

### Task 3: Agregar micro-copy bajo los botones CTA

**Files:**
- Modify: `index.html:292-314` (bloque `<div>` de botones)

- [ ] **Step 1: Localizar el cierre del bloque de botones**

Buscar en `index.html` la cadena:
```jsx
      </div>

      {/* scroll hint */}
```
Este `</div>` cierra el `<div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>` que contiene los dos botones CTA.

- [ ] **Step 2: Agregar el micro-copy después del cierre del div de botones**

Insertar inmediatamente después del `</div>` de los botones, antes del comentario `{/* scroll hint */}`:

```jsx
      <p style={{
        fontSize: 13, color: "var(--muted)",
        marginTop: 16, fontWeight: 300,
      }}>
        Escribime por WhatsApp y te envío toda la información para comenzar.
      </p>
```

El bloque final de esa zona del hero queda así:
```jsx
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="#calendario" style={{ ... }}>
          Ver cronograma
        </a>
        <a href="https://wa.me/5492954551339" ... style={{ ... }}>
          Consultar por WhatsApp
        </a>
      </div>

      <p style={{
        fontSize: 13, color: "var(--muted)",
        marginTop: 16, fontWeight: 300,
      }}>
        Escribime por WhatsApp y te envío toda la información para comenzar.
      </p>

      {/* scroll hint */}
```

- [ ] **Step 3: Verificar en browser — desktop**

Recargar `index.html`.
Esperado: aparece la línea de micro-copy centrada, en gris claro, debajo de los dos botones.

- [ ] **Step 4: Verificar en browser — mobile (viewport 375px)**

En DevTools, simular iPhone SE (375×667).
Esperado: el micro-copy se ve completo en una sola línea o rompe limpiamente en dos, sin overflow horizontal.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "copy: add micro-copy below hero CTA buttons"
```
