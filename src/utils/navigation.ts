import { services } from "@/config/services";

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Contacto", href: "/contacto" },
];

export const servicesNavigation = services.map((service) => ({
  label: service.title,
  href: `/servicios/${service.slug}`,
}));
