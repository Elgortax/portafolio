"use client";
import { useState } from "react";
import Image from "next/image";
import casos from "./casos.json";

const grupos = ["Todos", "Inversión", "Comercial", "Finanzas", "Operaciones"];
const base = "https://github.com/Elgortax/terreno-ops";
const vistas: Record<string, string[]> = {
  "cierre-comercial": ["Ventas netas", "Costos", "Caja de cierre"],
  "evaluador-proyectos": ["Costo del predio", "Lotes", "Margen"],
  "proyeccion-ventas": ["Unidades", "Pie", "Cuotas"],
  "panel-seguimiento": ["Leads", "Visitas", "Promesas"],
  "control-promociones": ["Precio de lista", "Descuento", "Precio final"],
  "tareas-vicaper": ["Por hacer", "En progreso", "Completada"],
  "evaluador-broker": ["Aportante", "Hitos de obras", "Flujo neto"],
  "gantt-proyectos": ["Topografía", "Trazado", "Entrega"],
  "radar-terrenos": ["Mercado", "Comparación", "Visita"],
  "gestion-oficina": ["Persona", "Asignación", "Equipo"],
  "gestion-cartera": ["Cotización", "Reserva", "Escritura"],
  "sala-y-camioneta": ["Sala principal", "Sala cocina", "Camioneta"],
  "gestion-flujo": ["Solicitud", "Aprobación", "Pago"],
  "situacion-proyectos": ["Espacio", "Proyecto", "Partida"]
};

export default function CasosProfesionales() {
  const [grupo, setGrupo] = useState("Todos");
  const lista = casos.filter(c => grupo === "Todos" || c.group === grupo);
  return <div className="casos">
    <p className="casos-intro">Creé estas aplicaciones para Grupo Tierras de Chile. Cada ficha explica la decisión que ayuda a tomar, el recorrido y el resultado que puedes probar con datos ficticios. Descarga el ZIP, extrae la carpeta y abre <strong>index.html</strong>.</p>
    <div className="casos-filtros" aria-label="Filtrar proyectos por área">{grupos.map(g => <button key={g} type="button" aria-pressed={g === grupo} onClick={() => setGrupo(g)}>{g}</button>)}</div>
    <p className="casos-cuenta" aria-live="polite">{lista.length} proyectos</p>
    <div className="casos-grid">{lista.map(c => <article key={c.slug} className="caso" data-grupo={c.group}>
      <Image className="caso-vista" src={`/vistas/${c.slug}.webp`} alt="" width={720} height={240} sizes="(max-width: 650px) 100vw, 350px" />
      <div className="caso-area"><span>{c.group}</span><span>2026</span></div>
      <h3>{c.name}</h3><p>{c.purpose}</p>
      <ol className="caso-flujo" aria-label="Etapas o elementos del proyecto">{vistas[c.slug].map(k=><li key={k}>{k}</li>)}</ol>
      <details><summary>Explorar el recorrido</summary>
        <ol className="caso-pasos">{c.steps.map(p=><li key={p}>{p}</li>)}</ol>
        <h4>Resultado</h4><p>{c.result}</p>
        <h4>Alcance de la demo</h4><p>{c.scope}</p>
      </details>
      <div className="caso-enlaces"><a href={`https://raw.githubusercontent.com/Elgortax/terreno-ops/main/descargas/${c.slug}.zip`}>Descargar demo <span aria-hidden="true">↓</span></a><a href={`${base}/tree/main/proyectos/${c.slug}`} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></div>
    </article>)}</div>
  </div>;
}

