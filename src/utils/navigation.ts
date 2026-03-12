import { services } from "@/config/services";

export const navigation = [
  { label: "Inicio", path: "/" },
  { label: "Sobre mí", path: "/sobre-mi" },
  { label: "Contacto", path: "/contacto" },
];

export const servicesNavigation = services.map((service) => ({
  name: service.title,
  path: `/servicios/${service.slug}`,
}));
