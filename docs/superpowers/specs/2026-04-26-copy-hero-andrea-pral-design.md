# Optimización de copy — Hero y micro-copy · Andrea Pral

**Fecha:** 2026-04-26
**Alcance:** Sección Hero (`index.html` → componente `Hero`)
**Objetivo:** Reemplazar el copy del hero para que sea más claro, comercial y alineado a la oferta real de Andrea Pral, sin cambiar la estructura visual ni el objetivo de conversión por WhatsApp.

---

## Reglas de redacción aplicadas

- Español rioplatense, tono profesional, cálido y cercano.
- Sin certificaciones inventadas, beneficios médicos ni promesas exageradas.
- Sin sumar técnicas o modalidades fuera de las indicadas por la clienta.
- Textos breves, orientados a consulta por WhatsApp.

---

## Textos aprobados

### Título principal (`h1`)

```
Masajes relajantes, descontracturantes y deportivos — desde cero
```

### Subtítulo (`h2`) — sin cambios

```
con Andrea Pral
```

### Párrafo de presentación

```
Masajista profesional con más de 14 años de experiencia. En mis clases aprendés distintas técnicas con cañas, piedras y aromas, con seguimiento en vivo y material de estudio para repasar a tu ritmo.
```

> Nota: "14 años de experiencia" mantiene la etiqueta `<strong>` existente.

### Micro-copy bajo el botón "Consultar por WhatsApp"

```
Escribime por WhatsApp y te envío toda la información para comenzar.
```

Este texto se agrega como línea de soporte debajo del botón secundario del hero, a modo de micro-copy tranquilizador.

---

## Restricciones de implementación

- No agregar listas nuevas de técnicas ni modalidades no pedidas.
- No modificar la estructura visual del hero (layout, colores, tipografías, botones).
- El botón primario ("Ver cronograma") y el secundario ("Consultar por WhatsApp") no cambian su texto ni su destino.
- El micro-copy va debajo del grupo de botones, centrado, en un `<p>` con estilo `font-size: 13px, color: var(--muted)`.

---

## Coherencia con el resto de la página

- La sección **Programa** y la sección **Material de estudio** ya describen en detalle las técnicas (cañas, espalda, zonas). El hero no las repite; solo las anuncia con "distintas técnicas con cañas, piedras y aromas".
- La sección **Contacto** (`¿Querés inscribirte?`) no requiere cambios; su copy ya es correcto y complementario.
