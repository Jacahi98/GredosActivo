// Los 66 árboles sueltos de la cortina de montañas (ver mountain-curtain.tsx).
// Estaban escritos uno a uno en el JSX; se extraen aquí para poder filtrarlos
// por ancho de pantalla.
//
// minW es el ancho de ventana a partir del cual aparece cada árbol: al
// estrechar la ventana se QUITAN árboles en vez de juntarlos. Sin esto, las
// posiciones en % del ancho apelotonaban los 66 en una masa verde.
//
// La clave para calibrarlo: el tronco mide ~90px SIEMPRE, porque su tamaño va
// en vh y no depende del ancho de la ventana. Lo que marca la densidad es el
// hueco EN PÍXELES entre troncos, no el porcentaje. Los 66 árboles a 2560px
// dan ~39px de hueco, o sea que cada tronco solapa 2,3 veces al siguiente: esa
// es la referencia que ya se veía bien. El reparto mantiene ese solape entre
// 2,25 y 2,41 en todo el rango, con 9 árboles a 360px y los 66 a 2560px.
//
// Los tramos son finos (~100px) a propósito: con saltos grandes, un ancho
// justo por debajo de un tramo se quedaba demasiado despoblado — a 1016px
// salía un solape de 1,5 en lugar de 2,3.
//
// Qué árbol cae en qué tramo lo decide una secuencia de van der Corput sobre
// los árboles ordenados por posición, para que cualquier subconjunto quede
// repartido a lo ancho en vez de amontonado a un lado. Los subconjuntos están
// anidados: al ensanchar solo se añaden árboles, ninguno se mueve.

export interface CurtainTree {
  left: string;
  top: string;
  height: string;
  aspectRatio: string;
  /** Nombre del PNG en /public que aporta la silueta (canal alfa). */
  png: string;
  /** Ancho de ventana mínimo (px) para mostrarlo. 0 = siempre visible. */
  minW: number;
}

export const CURTAIN_TREES: CurtainTree[] = [
  { left: "50%", top: "12%", height: "20vh", aspectRatio: "125 / 242", png: "first-tree-green.png", minW: 0 },
  { left: "62%", top: "10.23%", height: "20vh", aspectRatio: "103 / 299", png: "second-tree-green.png", minW: 0 },
  { left: "38%", top: "11.48%", height: "20vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 0 },
  { left: "8%", top: "11.59%", height: "20vh", aspectRatio: "179 / 217", png: "fourth-tree-green.png", minW: 1664 },
  { left: "46%", top: "11.51%", height: "20vh", aspectRatio: "124 / 195", png: "fifth-tree-green.png", minW: 1920 },
  { left: "58%", top: "12.31%", height: "20vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1152 },
  { left: "94%", top: "13.37%", height: "20vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 1920 },
  { left: "15%", top: "11.79%", height: "20vh", aspectRatio: "179 / 394", png: "eighth-tree-green.png", minW: 1536 },
  { left: "23%", top: "9.08%", height: "20vh", aspectRatio: "113 / 267", png: "ninth-tree-green.png", minW: 1152 },
  { left: "30%", top: "8.02%", height: "20vh", aspectRatio: "115 / 310", png: "tenth-tree-green.png", minW: 2112 },
  { left: "70%", top: "8.14%", height: "20vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 1920 },
  { left: "78%", top: "10.47%", height: "20vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 2112 },
  { left: "86%", top: "10.75%", height: "20vh", aspectRatio: "118 / 357", png: "thirteenth-tree-green.png", minW: 0 },
  { left: "1.0%", top: "12.83%", height: "17.1vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 0 },
  { left: "2.8%", top: "12.6%", height: "16.5vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 1408 },
  { left: "4.6%", top: "12.21%", height: "18.6vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 736 },
  { left: "6.4%", top: "11.82%", height: "19.6vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 448 },
  { left: "10.0%", top: "11.52%", height: "19.0vh", aspectRatio: "179 / 394", png: "eighth-tree-green.png", minW: 1024 },
  { left: "11.8%", top: "11.62%", height: "16.6vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 2304 },
  { left: "13.6%", top: "11.76%", height: "21.8vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 0 },
  { left: "17.2%", top: "11.55%", height: "17.6vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 2304 },
  { left: "19.0%", top: "11.02%", height: "22.6vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 544 },
  { left: "20.8%", top: "10.21%", height: "18.8vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 1920 },
  { left: "24.4%", top: "8.43%", height: "16.3vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 2560 },
  { left: "26.2%", top: "7.84%", height: "18.0vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 0 },
  { left: "28.0%", top: "7.67%", height: "16.8vh", aspectRatio: "179 / 394", png: "eighth-tree-green.png", minW: 1536 },
  { left: "31.6%", top: "8.64%", height: "21.7vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 448 },
  { left: "33.4%", top: "9.53%", height: "20.1vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 1792 },
  { left: "35.2%", top: "10.44%", height: "18.6vh", aspectRatio: "113 / 267", png: "ninth-tree-green.png", minW: 1152 },
  { left: "40.6%", top: "11.79%", height: "16.4vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 928 },
  { left: "42.4%", top: "11.73%", height: "17.4vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 2304 },
  { left: "44.2%", top: "11.58%", height: "19.0vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 640 },
  { left: "47.8%", top: "11.62%", height: "20.1vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 2560 },
  { left: "51.4%", top: "12.32%", height: "18.1vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 1408 },
  { left: "53.2%", top: "12.69%", height: "20.9vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 2112 },
  { left: "55.0%", top: "12.84%", height: "20.0vh", aspectRatio: "115 / 310", png: "tenth-tree-green.png", minW: 448 },
  { left: "60.4%", top: "11.17%", height: "22.1vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 2560 },
  { left: "64.0%", top: "9.09%", height: "18.0vh", aspectRatio: "115 / 310", png: "tenth-tree-green.png", minW: 1536 },
  { left: "65.8%", top: "8.33%", height: "16.8vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 928 },
  { left: "67.6%", top: "7.96%", height: "21.3vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 2304 },
  { left: "73.0%", top: "9.09%", height: "19.4vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 2560 },
  { left: "74.8%", top: "9.73%", height: "20.7vh", aspectRatio: "91 / 362", png: "eleventh-tree-green.png", minW: 0 },
  { left: "76.6%", top: "10.24%", height: "20.0vh", aspectRatio: "115 / 310", png: "tenth-tree-green.png", minW: 832 },
  { left: "80.2%", top: "10.58%", height: "18.2vh", aspectRatio: "113 / 267", png: "ninth-tree-green.png", minW: 544 },
  { left: "82.0%", top: "10.54%", height: "20.2vh", aspectRatio: "118 / 434", png: "seventh-tree-green.png", minW: 1792 },
  { left: "83.8%", top: "10.53%", height: "19.2vh", aspectRatio: "115 / 310", png: "tenth-tree-green.png", minW: 1152 },
  { left: "87.4%", top: "11.09%", height: "22.6vh", aspectRatio: "115 / 310", png: "tenth-tree-green.png", minW: 1664 },
  { left: "89.2%", top: "11.71%", height: "20.6vh", aspectRatio: "179 / 394", png: "eighth-tree-green.png", minW: 1024 },
  { left: "91.0%", top: "12.43%", height: "20.9vh", aspectRatio: "75 / 391", png: "third-tree-green.png", minW: 2304 },
  { left: "96.4%", top: "13.43%", height: "23.0vh", aspectRatio: "179 / 394", png: "eighth-tree-green.png", minW: 2560 },
  { left: "98.2%", top: "12.96%", height: "18.0vh", aspectRatio: "113 / 471", png: "twelfth-tree-green.png", minW: 0 },
  { left: "5.4%", top: "12.03%", height: "21.7vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 2112 },
  { left: "15.8%", top: "11.76%", height: "17.4vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 928 },
  { left: "28.8%", top: "7.75%", height: "19.1vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 832 },
  { left: "36.6%", top: "11.04%", height: "17.7vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 2560 },
  { left: "39.2%", top: "11.7%", height: "19.2vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1664 },
  { left: "47.0%", top: "11.55%", height: "19.3vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1280 },
  { left: "52.2%", top: "12.5%", height: "17.4vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 736 },
  { left: "56.1%", top: "12.77%", height: "19.1vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1792 },
  { left: "69.1%", top: "7.99%", height: "20.7vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 640 },
  { left: "71.7%", top: "8.62%", height: "17.3vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1280 },
  { left: "75.6%", top: "9.98%", height: "19.9vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1536 },
  { left: "84.7%", top: "10.58%", height: "20.1vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 2560 },
  { left: "92.5%", top: "12.98%", height: "18.8vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 640 },
  { left: "95.1%", top: "13.49%", height: "18.8vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1280 },
  { left: "99.0%", top: "12.63%", height: "20.3vh", aspectRatio: "130 / 247", png: "sixth-tree-green.png", minW: 1408 },
];
