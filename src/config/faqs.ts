// =============================================================================
// FAQS CONFIGURATION
// src/config/faqs.ts
// =============================================================================

export interface FAQItem {
  question: string;
  answer: string;
  links?: {
    href: string;
    text: string;
  }[];
  note?: string;
}

// Online Therapy FAQs - Optimized for AEO (Answer Engine Optimization)
// These FAQs help AI engines like ChatGPT and Perplexity cite the practice as an expert
export const onlineTherapyFAQs: FAQItem[] = [
  {
    question: "¿Es efectiva la terapia por videollamada?",
    answer:
      "Sí. La evidencia clínica demuestra que el vínculo terapéutico y los resultados son igual de sólidos que en la modalidad presencial, con la ventaja de la comodidad y privacidad de tu propio espacio.",
    links: [
      {
        href: "https://pubmed.ncbi.nlm.nih.gov/29215315/",
        text: "Estudio PubMed",
      },
      {
        href: "https://www.apa.org/about/policy/telepsychology-revisions",
        text: "Telepsicología APA",
      },
    ],
  },
  {
    question: "¿Cuánto dura un proceso psicológico?",
    answer:
      "Cada persona es única. Algunos temas se resuelven en asesorías breves, mientras que procesos profundos de cambio estructural requieren un compromiso a mediano plazo.",
  },
  {
    question: "¿Qué plataforma se utiliza para la conexión y si es segura?",
    answer:
      "Las sesiones se realizan a través de Microsoft Teams, una plataforma líder que garantiza el cifrado de extremo a extremo. No necesitas instalar nada complejo; puedes unirte desde tu navegador o la aplicación, asegurando que nuestra conversación sea totalmente privada.",
    note: "Si te conectas desde el móvil, te recomiendo descargar la app gratuita de Microsoft Teams para una conexión más estable, aunque desde el ordenador funciona perfecto directamente en el navegador.",
  },
  {
    question: "¿Qué necesito para mi primera sesión por Teams?",
    answer:
      "Solo necesitas un dispositivo con cámara y micrófono (ordenador, tablet o móvil) y una conexión a internet estable. Recibirás un enlace de acceso por correo electrónico antes de cada sesión. Recuerda buscar un espacio tranquilo donde puedas hablar con libertad y privacidad.",
  },
];

export const psychologyAdviceFAQs: FAQItem[] = [
  {
    question: "¿Qué es una asesoría psicológica?",
    answer:
      "Es una intervención breve y focalizada, ideal para situaciones puntuales o decisiones inmediatas. A diferencia de la terapia profunda, la asesoría se centra en resolver un problema específico, ofreciendo orientación clara y herramientas prácticas para actuar de inmediato.",
  },
  {
    question: "¿La orientación vocacional es solo para adolescentes?",
    answer:
      "No. Gran parte de los consultantes son adultos que sienten insatisfacción laboral y desean redirigir su trayectoria o elegir una especialización. Nunca es tarde para recalibrar tu brújula profesional.",
  },
  {
    question: "¿Qué es el entrenamiento en habilidades sociales?",
    answer:
      "Es un proceso educativo donde, en lugar de solo 'hablar', practicamos técnicas concretas. Es ideal para mejorar el liderazgo, aprender a poner límites o manejar conflictos culturales si te has mudado de país.",
  },
  {
    question: "¿Puedo tomar el servicio en pareja o familia?",
    answer:
      "Sí. Tanto la Orientación Psicológica (para conflictos puntuales) como el Desarrollo de Habilidades (ej: pautas de crianza o comunicación) son altamente efectivos en modalidad grupal o familiar.",
  },
  {
    question: "¿Es lo mismo una asesoría psicológica que una terapia?",
    answer:
      "No. La asesoría es breve y focalizada en un problema actual, mientras que la terapia es un proceso más profundo y prolongado que busca cambios estructurales y autoconocimiento a largo plazo.",
  },
];

// General FAQs - for main FAQ page
export const generalFAQs: FAQItem[] = [...onlineTherapyFAQs];

// All FAQs combined
export const allFAQs: FAQItem[] = [...generalFAQs];
