export const PHONE_TEL = "920348045";
export const PHONE_DISPLAY = "920 34 80 45";
export const EMAIL = "gredosactivo@gredos.com";
export const ADDRESS_DISPLAY = "Ctra. AV-941, Nº 11 · 05635 Navarredonda de Gredos, Ávila";

const PLACE_NAME_ADDRESS = "Estación de Servicio Gredos SL, Ctra. AV-941, 11, 05635 Navarredonda de Gredos, Ávila";
const MAPS_QUERY = encodeURIComponent(PLACE_NAME_ADDRESS);

const LAT = 40.3588;
const LNG = -5.13375;

export const MAPS_EMBED_SRC = `https://www.google.com/maps?ll=${LAT},${LNG}&z=16&output=embed`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;
export const MAPS_REVIEWS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

export const GOOGLE_RATING = 4.1;
export const GOOGLE_REVIEW_COUNT = 169;
