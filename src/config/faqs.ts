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
      "Las sesiones se realizan a través de Microsoft Teams, una plataforma líder que garantiza el cifrado de extremo a extremo. No se necesita instalar nada complejo; puede unirse desde su navegador o la aplicación, asegurando que nuestra conversación sea totalmente privada.",
    note: "Si la conexión es desde el móvil, se recomienda descargar la app gratuita de Microsoft Teams para una conexión más estable, aunque desde el ordenador funciona perfecto directamente en el navegador.",
  },
  {
    question: "¿Qué necesito para mi primera sesión por Teams?",
    answer:
      "Solo se necesita un dispositivo con cámara y micrófono (ordenador, tablet o móvil) y una conexión a internet estable. Recibirá un enlace de acceso por correo electrónico antes de cada sesión. Recuerde buscar un espacio tranquilo donde pueda hablar con libertad y privacidad.",
  },
];

// General FAQs - for main FAQ page
export const generalFAQs: FAQItem[] = [...onlineTherapyFAQs];

// All FAQs combined
export const allFAQs: FAQItem[] = [...generalFAQs];
