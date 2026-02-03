# BJ Counter — Contador de Cartas Blackjack

**byHachePe** · PWA · Hi-Lo & KO · Basic Strategy + Desviaciones + Gráfico en Tiempo Real

---

## Qué hace

Contador de cartas profesional con **dos sistemas completos**: Hi-Lo (32 desviaciones) y KO (19 desviaciones). Incluye **gráfico en tiempo real** del conteo, cálculo automático de unidades de apuesta (Kelly Criterion), y recomendaciones de jugada adaptadas al conteo actual.

---

## Nuevas funcionalidades

### Gráfico de Evolución del Conteo

- **Visualización en tiempo real** del Running Count
- Se desplaza horizontalmente mostrando los últimos 50 puntos
- Escala automática según el rango de valores
- Se limpia al cambiar de sistema o resetear
- Fondo semitransparente con grid de referencia

### Centrado automático en KO

Cuando True Count está oculto (modo KO), el box de Running Count se centra automáticamente en su sección para mejor visualización.

---

## Sistemas de conteo

### Hi-Lo (balanceado) — 32 desviaciones

| Cartas | Valor |
|---|---|
| 2, 3, 4, 5, 6 | +1 |
| 7, 8, 9 | 0 |
| 10, J, Q, K, A | −1 |

- RC empieza en 0
- True Count = RC / mazos restantes
- **32 desviaciones** (Fab 4 + I18 + extensiones)

### KO / Knockout (desequilibrado) — 19 desviaciones

| Cartas | Valor |
|---|---|
| 2, 3, 4, 5, 6 | +1 |
| 7, 8, 9 | 0 |
| 10, J, Q, K, A | −1 |

- RC empieza en **−4 × mazos** (8D: −32, 6D: −24)
- **Sin True Count** — RC directo
- **19 desviaciones completas**
- Key Count (pivote) ≈ inicio + 4

---

## Desviaciones KO completas (19)

**Stand — Manos altas (5)**
- 16 vs 10 → RC ≥ pivote + 14
- 16 vs 9 → RC ≥ pivote + 4
- 15 vs 10 → RC ≥ pivote + 16
- 15 vs 9 → RC ≥ pivote + 20
- 14 vs 9 → RC ≥ pivote + 32

**Stand — Manos 12/13 (7)**
- 13 vs 2 → RC ≥ pivote + 0
- 13 vs 3 → RC ≥ pivote − 4
- 12 vs 2 → RC ≥ pivote + 12
- 12 vs 3 → RC ≥ pivote + 8
- 12 vs 4 → RC ≥ pivote + 0
- 12 vs 5 → RC ≥ pivote − 8
- 12 vs 6 → RC ≥ pivote − 4

**Double (5)**
- 11 vs A → RC ≥ pivote + 4
- 10 vs A → RC ≥ pivote + 16
- 10 vs 10 → RC ≥ pivote + 16
- 9 vs 2 → RC ≥ pivote + 4
- 9 vs 7 → RC ≥ pivote + 12

**Split (1)**
- 10s vs 5,6 → RC ≥ pivote + 20

**Insurance (1)**
- Insurance/Even Money → RC ≥ pivote + 12

**Total: 19 desviaciones** (set estándar completo)

**Ejemplo con 8 mazos** (inicio −32, pivote −28):
- Stand 13v2: RC ≥ −28
- Stand 12v5: RC ≥ −36
- Double 9v2: RC ≥ −24
- Stand 16v10: RC ≥ −14
- Split 10s vs 5,6: RC ≥ −8
- Stand 14v9: RC ≥ +4 (extremo)

---

## Desviaciones Hi-Lo (32)

**Fab 4 Surrender (4)**
- 15 vs 10 → TC ≤ 0
- 15 vs A → TC ≤ +2
- 16 vs 9 → TC < +1
- 16 vs 10 → TC ≤ +3

**I18 Stand (15)**
- 12 vs 2 → TC ≥ +3
- 12 vs 3 → TC ≥ +2
- 12 vs 4 → TC ≥ 0
- 12 vs 5 → TC ≥ −2
- 12 vs 6 → TC ≥ −1
- 13 vs 2 → TC ≥ −1
- 13 vs 3 → TC ≥ −2
- 14 vs 9 → TC ≥ +8
- 15 vs 2 → TC ≥ +5
- 15 vs 7 → TC ≥ +10
- 15 vs 9 → TC ≥ +5
- 15 vs 10 → TC ≥ +4
- 16 vs 9 → TC ≥ +1
- 16 vs 10 → TC ≥ +3.5
- 16 vs A → TC ≥ +2

**Hit complementos (2)**
- 13 vs 2 → TC < −1
- 13 vs 3 → TC < −2

**Double (7)**
- 9 vs 2 → TC ≥ +1
- 9 vs 3 → TC ≥ 0
- 9 vs 7 → TC ≥ +3
- 10 vs 10 → TC ≥ +4
- 10 vs A → TC ≥ +4
- 11 vs A → TC ≥ +1
- S19 vs 6 → TC ≥ +1

**Split (4)**
- 4s vs 5,6 → TC ≥ +2
- 10s vs 4 → TC ≥ +4
- 10s vs 5,6 → TC ≥ +5
- 9s vs 7 → NO split, TC ≥ +3
- 8s vs 10 → NO split, TC ≤ −1
- 8s vs A → NO split, TC ≤ −1

---

## Apuestas (Kelly Criterion)

### Hi-Lo (TC-based)

| TC | Unidades |
|---|---|
| ≤ +1 | 1 |
| +2 | 2 |
| +3 | 3 |
| +4 | 4 |
| +5 | 6 |
| +6 | 8 |
| +7 | 9 |
| +8 | 10 |
| +9 | 11 |
| > +9 | 12 |

Spread 1:12. Progresión en medios puntos para reducir varianza.

### KO (RC-based)

| RC relativo | Unidades |
|---|---|
| ≤ +4 | 1 |
| +5–+8 | 2 |
| +9–+12 | 3 |
| +13–+16 | 4 |
| +17–+20 | 6 |
| +21–+24 | 8 |
| +25–+28 | 10 |
| > +28 | 12 |

**Ejemplo 8 mazos** (inicio −32):
- RC −28 → 4 rel → 1u
- RC −20 → 12 rel → 3u
- RC −4 → 28 rel → 10u

---

## Caso 14 vs 9

**Basic Strategy:** PEDIR

**Con conteo extremadamente favorable:**
- Hi-Lo: Stand si TC ≥ +8
- KO (8D): Stand si RC ≥ +4

Solo ocurre en ~1 de cada 100+ manos con conteo favorable. La app sugiere correctamente PEDIR en situaciones normales.

---

## Reglas de mesa

- 6–8 mazos
- Dealer hits S17 (H17)
- DAS permitido
- Late surrender disponible

---

## Gráfico en tiempo real

- **Canvas nativo** 460×120px
- Muestra últimos **50 puntos** de datos
- **Escala automática** según rango de RC
- Grid de referencia semitransparente
- **Marcador verde** en valor actual
- Se limpia al cambiar sistema/mazos/reset

**Helper text dinámico:**
- Hi-Lo: "Gráfico de Running Count en tiempo real"
- KO: "Evolución del RC (inicia en −32)" [según mazos]

---

## Instalación APK

```kotlin
// MainActivity.kt
val webView = WebView(this)
setContentView(webView)
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
}
webView.loadUrl("file:///android_asset/blackjack-counter.html")
```

```xml
<!-- styles.xml -->
<style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
    <item name="android:statusBarColor">#065f46</item>
    <item name="android:navigationBarColor">#065f46</item>
</style>
```

```xml
<!-- AndroidManifest.xml -->
<activity android:screenOrientation="portrait" ...>
```

---

## Estado actual

✅ **Hi-Lo:** 32 desviaciones completas  
✅ **KO:** 19 desviaciones completas (set estándar)  
✅ **Gráfico:** Tiempo real, 50 puntos, auto-scale  
✅ **UI:** RC centrado en KO, TC oculto, grid responsive  
✅ **Bugs:** Ninguno activo  
✅ **Líneas:** ~920  

---

## Próximos sistemas

### Hi-Opt II (Coming Soon)

Sistema nivel 2 con valores +2/−2 y side count de Ases. Máxima precisión para jugadores avanzados.

---

## Archivos

- `blackjack-counter.html` (~920 líneas, completo)
- `manifest.json` (PWA)
- `sw.js` (offline)

---

## Notas técnicas

### Centrado automático KO

Cuando `currentSystem === 'ko'`:
```javascript
statsGrid.style.gridTemplateColumns = '1fr';
statsGrid.style.justifyItems = 'center';
```

El box de RC queda perfectamente centrado en su sección.

### Chart rendering

Canvas 2D nativo. Mantiene historial de `{rc, tc, cards}` en array. Dibuja línea con gradiente automático según rango. Limpia al cambiar contexto.

### Performance

- Chart re-dibuja solo al añadir cartas
- Historial limitado a 100 puntos (muestra últimos 50)
- Sin dependencias externas
- Render < 16ms en hardware moderno

---

**Última actualización:** Febrero 2026  
**Versión:** 2.0 (con gráfico y KO completo)
