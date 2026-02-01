'use client';

import Image from "next/image";
import { useState } from "react";

type ActionVariant = "primary" | "secondary" | "ghost";

type ActionLink = {
  label: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
  variant: ActionVariant;
};

const navItems = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Certificaciones", href: "#certificaciones" },
  { label: "Contacto", href: "#contacto" },
] as const;

const actionLinks: ActionLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexis-rodriguez-riquelme-565739251",
    iconSrc: "/linkedin_174857.png",
    iconAlt: "Icono de LinkedIn",
    variant: "ghost",
  },
  {
    label: "Ver GitHub",
    href: "https://github.com/Elgortax",
    iconSrc: "/github_3291695.png",
    iconAlt: "Icono de GitHub",
    variant: "ghost",
  },
  {
    label: "Descargar CV",
    href: "/Alexis_Rodriguez_CV.pdf",
    iconSrc: "/cv_8347439.png",
    iconAlt: "Icono de currículum",
    variant: "secondary",
  },
];

const skillTags = [
  "Java",
  "Python",
  "SQL",
  "PHP",
  "MySQL",
  "SQL Server",
  "SQLite",
  "PostgreSQL",
  "n8n",
  "Git",
  "GitHub",
  "Excel",
  "Power BI",
  "Bizagi",
  "Scrum",
  "Ágil",
  "UML",
] as const;

const projects: ProjectInfo[] = [
  {
    id: "polycrochet",
    title: "PolyCrochet – Plataforma Web para Emprendimiento",
    timeframe: "2025",
    summary:
      "Plataforma web desarrollada para un emprendimiento real, enfocada en gestión de productos y presencia digital.",
    description: [
      "PolyCrochet es una plataforma web desarrollada para un emprendimiento real, orientada a mejorar su presencia digital y la gestión de productos.",
      "El proyecto incluye desarrollo frontend y backend, conexión a base de datos, gestión de información, automatización de procesos básicos y despliegue en la nube.",
      "Se aplicaron buenas prácticas de desarrollo web, control de versiones y diseño responsivo.",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "Tailwind CSS",
      "Git / GitHub",
      "Vercel",
    ],
    image: {
      src: "/polycrochet/logo.png",
      alt: "Vista previa del sitio PolyCrochet",
    },
    linkHref: "https://polycrochet.cl",
    linkLabel: "polycrochet.cl",
    gallery: [
      {
        src: "/polycrochet/screen-1.png",
        alt: "Panel principal de PolyCrochet mostrado en escritorio",
      },
      {
        src: "/polycrochet/screen-2.png",
        alt: "Vista de catálogo de productos de PolyCrochet",
      },
      {
        src: "/polycrochet/screen-3.png",
        alt: "Detalle responsive de PolyCrochet en dispositivos móviles",
      },
    ],
  },
] as const;

const certifications: CertificationInfo[] = [
  {
    name: "Scrum Foundation Professional Certification – CertiProf",
    issuer: "Certificación profesional en metodologías ágiles Scrum",
    downloadHref: "/Certificado-Scrum.pdf",
  },
] as const;

type ContactChannel = {
  label: string;
  value: string;
  href?: string;
};

const contactChannels: readonly ContactChannel[] = [
  {
    label: "Email",
    value: "alexis.rodriguez1927@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/alexis-rodriguez-riquelme-565739251",
    href: "https://www.linkedin.com/in/alexis-rodriguez-riquelme-565739251",
  },
  {
    label: "GitHub",
    value: "github.com/Elgortax",
    href: "https://github.com/Elgortax",
  },
];

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

type ProjectInfo = {
  id: string;
  title: string;
  timeframe: string;
  summary: string;
  description: string[];
  technologies: string[];
  image: {
    src: string;
    alt: string;
  };
  linkHref?: string;
  linkLabel?: string;
  gallery?: {
    src: string;
    alt: string;
  }[];
};

type CertificationInfo = {
  name: string;
  issuer: string;
  downloadHref?: string;
};

const buttonVariants: Record<ActionVariant, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900",
  secondary:
    "border border-slate-300 text-slate-900 hover:bg-slate-100 focus-visible:outline-slate-400",
  ghost:
    "bg-white/70 text-slate-900 shadow-sm hover:bg-white focus-visible:outline-slate-200",
};

function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-lg shadow-slate-200/60 backdrop-blur-sm transition hover:-translate-y-0.5"
    >
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 text-base text-slate-600">{children}</div>
    </section>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectInfo | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleOpenProject = (project: ProjectInfo) => {
    setActiveProject(project);
    setActiveSlide(0);
  };

  const handleCloseProject = () => {
    setActiveProject(null);
    setActiveSlide(0);
  };

  const showPreviousImage = () => {
    if (!activeProject?.gallery?.length) return;
    const totalSlides = activeProject.gallery.length;
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const showNextImage = () => {
    if (!activeProject?.gallery?.length) return;
    const totalSlides = activeProject.gallery.length;
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-10 sm:px-8 lg:px-10">
        <header className="rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-2xl shadow-slate-200">
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-slate-200 bg-slate-50 shadow-lg shadow-slate-200">
            <Image
              src="/foto-perfil.jpg"
              alt="Fotografía de Alexis Rodríguez"
              width={180}
              height={180}
              className="h-36 w-36 rounded-full object-cover"
              priority
            />
          </div>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-6xl">
            Alexis Rodríguez
          </h1>
          <h2 className="mt-2 text-2xl font-semibold text-slate-700">
            Ingeniero en Informática | Junior TI
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-base text-slate-600 sm:text-lg">
            Este es mi portafolio personal. Aquí presento mis proyectos, habilidades
            y certificaciones, enfocados en desarrollo de software, automatización
            de procesos y soporte TI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {actionLinks.map(({ label, href, variant, iconSrc, iconAlt }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${buttonVariants[variant]}`}
              >
                <Image
                  src={iconSrc}
                  alt={iconAlt}
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </header>

        <nav className="sticky top-4 z-10 flex flex-wrap justify-center gap-3 rounded-full border border-slate-200/80 bg-white/90 px-6 py-3 text-sm font-medium text-slate-600 shadow-lg shadow-slate-200 backdrop-blur">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <main className="space-y-8 pb-16">
          <Section id="sobre-mi" title="Sobre mí">
            <div className="space-y-4">
              <p>
                Ingeniero en Informática titulado, con formación integral en
                desarrollo de software, bases de datos, automatización de procesos y
                soporte TI.
              </p>
              <p>
                Cuento con experiencia práctica en automatización mediante
                herramientas low-code/no-code como n8n, integración de sistemas y
                optimización de procesos internos, adquirida durante mi práctica
                profesional.
              </p>
              <p>
                Me considero una persona responsable, proactiva y con alta capacidad
                de aprendizaje, orientada al trabajo en equipo. Busco seguir
                desarrollándome profesionalmente en el área TI y aportar con
                soluciones tecnológicas eficientes y bien estructuradas.
              </p>
            </div>
          </Section>

          <Section id="skills" title="Skills">
            <div className="flex flex-wrap gap-3">
              {skillTags.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>

          <Section id="proyectos" title="Proyectos">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200"
                >
                  <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {project.timeframe}
                    </p>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600">{project.summary}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenProject(project)}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500 hover:bg-slate-50"
                      aria-label={`Ver detalles de ${project.title}`}
                    >
                      Ver detalles
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="certificaciones" title="Certificaciones">
            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li
                  key={cert.name}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">
                      {cert.name}
                    </p>
                    <p className="text-sm text-slate-500">{cert.issuer}</p>
                  </div>
                  {cert.downloadHref && (
                    <a
                      href={cert.downloadHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-500 hover:bg-slate-50"
                    >
                      <Image
                        src="/descarga.png"
                        alt="Icono de descarga"
                        width={24}
                        height={24}
                        className="h-5 w-5"
                      />
                      Descargar
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="contacto" title="Contacto">
            <div className="grid gap-4 sm:grid-cols-3">
              {contactChannels.map((channel) =>
                channel.href ? (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:-translate-y-1 hover:border-slate-400"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {channel.label}
                    </p>
                    <p className="mt-2 text-base text-slate-900">
                      {channel.value}
                    </p>
                  </a>
                ) : (
                  <div
                    key={channel.label}
                    className="rounded-2xl border border-slate-200 bg-white/80 p-4"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {channel.label}
                    </p>
                    <p className="mt-2 text-base text-slate-900">
                      {channel.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Copia y pega el correo para contactarme.
                    </p>
                  </div>
                ),
              )}
            </div>
          </Section>
        </main>

        <footer className="pb-6 text-center text-sm text-slate-500">
          © 2026 Alexis Rodríguez — Portafolio personal. Desarrollado con
          dedicación y ganas de aprender 🚀
        </footer>
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-${activeProject.id}-title`}
          onClick={handleCloseProject}
        >
          <div
            className="relative w-full max-w-3xl rounded-3xl bg-white p-8 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseProject}
              className="absolute right-4 top-4 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              aria-label="Cerrar detalles del proyecto"
            >
              ✕
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              {activeProject.timeframe}
            </p>
            <h3
              id={`project-${activeProject.id}-title`}
              className="mt-2 text-2xl font-semibold text-slate-900"
            >
              {activeProject.title}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {activeProject.technologies.map((tech) => (
                <span
                  key={`${activeProject.id}-modal-${tech}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
            {activeProject.gallery?.length ? (
              <div className="relative mt-6">
                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 sm:h-80">
                  <div className="relative h-full w-full">
                    {activeProject.gallery.map((slide, index) => (
                      <Image
                        key={`${activeProject.id}-slide-${index}-${slide.src}`}
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className={`object-cover transition-all duration-500 ${
                          index === activeSlide
                            ? "opacity-100"
                            : "translate-x-full opacity-0"
                        }`}
                        sizes="(min-width: 1024px) 800px, 100vw"
                        priority={index === activeSlide}
                      />
                    ))}
                  </div>
                </div>
                {activeProject.gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        showPreviousImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-lg text-slate-800 shadow-lg shadow-black/10 transition hover:bg-white"
                      aria-label="Ver imagen anterior"
                    >
                      {"<"}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        showNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-lg text-slate-800 shadow-lg shadow-black/10 transition hover:bg-white"
                      aria-label="Ver imagen siguiente"
                    >
                      {">"}
                    </button>
                    <div className="mt-3 flex justify-center gap-2">
                      {activeProject.gallery.map((_, index) => (
                        <button
                          key={`${activeProject.id}-dot-${index}`}
                          type="button"
                          onClick={() => setActiveSlide(index)}
                          className={`h-2.5 w-2.5 rounded-full transition ${
                            index === activeSlide
                              ? "bg-slate-900"
                              : "bg-slate-200"
                          }`}
                          aria-label={`Ver imagen ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : null}
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {activeProject.description.map((paragraph, index) => (
                <p key={`${activeProject.id}-paragraph-${index}`}>
                  {paragraph}
                </p>
              ))}
            </div>
            {activeProject.linkHref ? (
              <a
                href={activeProject.linkHref}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-800 transition hover:border-slate-500"
              >
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  Link sitio
                </span>
                <span>{activeProject.linkLabel ?? activeProject.linkHref}</span>
              </a>
            ) : (
              <p className="mt-6 text-sm italic text-slate-500">
                {activeProject.linkLabel ?? "Próximamente"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
