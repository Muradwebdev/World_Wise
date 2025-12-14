import L from "leaflet";

// BU YOL VITE + VERCEL ÜÇÜN ƏN STABİLDİR
const iconRetina = new URL(
  "leaflet/dist/images/marker-icon-2x.png",
  import.meta.url
).href;

const icon = new URL(
  "leaflet/dist/images/marker-icon.png",
  import.meta.url
).href;

const shadow = new URL(
  "leaflet/dist/images/marker-shadow.png",
  import.meta.url
).href;

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});
