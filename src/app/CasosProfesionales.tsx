"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import casos from "./casos.json";

const grupos = ["Todos", "Inversión", "Comercial", "Finanzas", "Operaciones"];
const base = "https://github.com/Elgortax/aplicaciones-internas";
const descripciones: Record<string, string> = {
  "gestion-cartera": "Cotización de prueba con la estructura de pago y los vencimientos del pie.",
  "situacion-proyectos": "Vista general de GTX con los proyectos activos, pendientes y próximos hitos.",
  "radar-terrenos": "Seguimiento de terrenos en Nexo Tierra con estados de evaluación y filtros de búsqueda.",
  "evaluador-proyectos": "Resumen del evaluador con una tabla de predios, margen y utilidad proyectada.",
  "evaluador-broker": "Evaluación de un loteo con precios por categoría y monto destinado a obras.",
  "panel-seguimiento": "Detalle del embudo comercial desde los leads generados hasta las promesas firmadas.",
  "cierre-comercial": "Tablero de Cierre Comercial con indicadores del período e históricos.",
  "gestion-flujo": "Tablero de Gestión de Flujo con ingresos, presupuesto y proyección mensual.",
  "sala-y-camioneta": "Pantalla de las dos salas con una reunión activa y una sala disponible.",
  "tareas-vicaper": "Formulario Nueva tarea con descripción, proyecto, prioridad y responsable.",
  "gestion-oficina": "Portada de Gestión de Oficina con computadores, teléfonos y recursos de trabajo."
};

function Recorrido({ caso }: { caso: (typeof casos)[number] }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const tituloId = `recorrido-${caso.slug}`;
  return <>
    <button className="caso-recorrido" type="button" aria-haspopup="dialog" onClick={() => dialogo.current?.showModal()}>
      Ver recorrido y requisitos
    </button>
    <dialog ref={dialogo} className="caso-dialogo" aria-labelledby={tituloId}>
      <div className="caso-dialogo-cabecera">
        <h3 id={tituloId}>{caso.name}</h3>
        <button type="button" onClick={() => dialogo.current?.close()}>Cerrar</button>
      </div>
      <h4>Recorrido</h4>
      <ol className="caso-pasos">{caso.steps.map(paso => <li key={paso}>{paso}</li>)}</ol>
      <h4>Resultado</h4><p>{caso.result}</p>
      <h4>Cómo abrirla</h4>
      <p>Extrae el ZIP completo y abre <strong>{caso.entry}</strong>. {caso.requirements}</p>
      <p>{caso.scope} La guía incluida es <strong>{caso.guide}</strong>.</p>
    </dialog>
  </>;
}

export default function CasosProfesionales() {
  const [grupo, setGrupo] = useState("Todos");
  const lista = casos.filter(c => grupo === "Todos" || c.group === grupo);
  return <div className="casos">
    <p className="casos-intro">Creé estas aplicaciones como Analista TI de Grupo Tierras de Chile. Puedes probar cómo se evalúa un terreno, se prepara un cierre o se coordina el trabajo de la oficina. Cada ZIP incluye la aplicación, una guía y datos de ejemplo.</p>
    <div className="casos-filtros" aria-label="Filtrar proyectos por área">
      {grupos.map(g => <button key={g} type="button" aria-pressed={g === grupo} onClick={() => setGrupo(g)}>{g}</button>)}
    </div>
    <p className="casos-cuenta" aria-live="polite">{lista.length} {lista.length === 1 ? "proyecto" : "proyectos"}</p>
    <div className="casos-grid">{lista.map(c => <article key={c.slug} className="caso" data-grupo={c.group}>
      <a className="caso-miniatura" href={`/miniaturas/${c.slug}.jpg`} target="_blank" rel="noreferrer" aria-label={`Ampliar imagen de ${c.name} en otra pestaña`}>
        <Image src={`/miniaturas/${c.slug}.jpg`} alt={descripciones[c.slug]} fill sizes="(max-width: 650px) 95vw, (max-width: 1000px) 46vw, 350px" />
      </a>
      <div className="caso-area"><span>{c.group}</span><span>2026</span></div>
      <h3>{c.name}</h3><p>{c.purpose}</p>
      <ol className="caso-flujo" aria-label="Funciones principales">{c.tags.map(t => <li key={t}>{t}</li>)}</ol>
      <Recorrido caso={c} />
      <div className="caso-enlaces">
        <a href={`${base}/releases/download/v3.0.0/${c.slug}.zip`} aria-label={`Descargar demo de ${c.name}`}>Descargar demo ↓</a>
        <a href={`${base}/tree/main/proyectos/${c.slug}`} target="_blank" rel="noreferrer" aria-label={`Ver ${c.name} en GitHub`}>GitHub ↗</a>
      </div>
    </article>)}</div>
  </div>;
}
