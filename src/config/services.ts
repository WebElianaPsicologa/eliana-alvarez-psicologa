// =============================================================================
// SERVICES CONFIGURATION
// src/config/services.ts
// =============================================================================

export interface Service {
  slug: string;
  title: string;
  description: string;
  seoDescription: string;
  image?: string;
  icon?: string;
  duration?: string;
  tag?: string;
  cta?: string;
  benefits?: string[];
}

export const services: Service[] = [
  {
    slug: "asesoria-psicologica",
    title: "Asesoría Psicológica",
    description:
      "Orientación puntual para crisis o decisiones inmediatas. Una intervención de corto plazo diseñada para quienes necesitan herramientas concretas, dirección clara y estrategias efectivas para avanzar.",
    seoDescription:
      "Asesoría psicológica online de corto plazo: orientación psicológica, vocacional y entrenamiento en habilidades (3 a 8 sesiones).",
    icon: "compass",
    duration: "Corto plazo · 3 a 8 sesiones",
    tag: "Enfoque Focalizado | 100% Online",
    cta: "Necesito orientación hoy",
    benefits: [
      "Orientación psicológica para conflictos puntuales",
      "Orientación vocacional y profesional",
      "Entrenamiento en habilidades sociales y emocionales",
      "Plan de acción personalizado",
    ],
  },
  {
    slug: "proceso-psicologico-integral",
    title: "Proceso Psicológico Integral",
    description:
      "Un viaje de autoconocimiento para sanar raíces y cambiar patrones de conducta. Proceso terapéutico de mediano o largo plazo que combina psicoterapia y entrenamiento en habilidades para una transformación sostenible.",
    seoDescription:
      "Proceso psicoterapéutico integral online: terapia profunda con enfoque pluralista (TCC, Humanismo y Sistémica) para transformación duradera.",
    icon: "sprout",
    duration: "Mediano o largo plazo",
    tag: "Psicoterapia + Entrenamiento en Habilidades",
    cta: "Quiero iniciar mi proceso",
    benefits: [
      "Psicoeducación: entiende cómo funciona tu mente",
      "Modelado y práctica guiada en sesión",
      "Herramientas para comunicación, límites y crianza",
      "Retroalimentación constructiva a tu ritmo",
    ],
  },
];
