export const APPLICATIONS_URL = '/applications'
export const APPLICATIONS_RECEIPT_URL = (id) => `/applications/${id}/receipt`
export const PRODUCTS_URL = '/products'
export const PRODUCT_URL = (id) => `/products/${id}`
export const USERS_URL = `/users`
export const USER_URL = '/users/profile'
export const COMPANIES_URL = '/companies'
export const RANKINGS_URL = '/rankings'
export const RANKING_COUNT_URL = (id) => `/rankings/count/${id}`
export const RANKING_URL = (id) => `/rankings/${id}`
export const RANKING_PLAYERS_URL = '/rankings/players'
export const SPECIAL_CHARS_REGEXP = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
export const SPECIAL_CHARS_REGEXP_NO_SPACE = /^[A-Za-z0-9]*$/
export const PROVINCES = [
  'Pinar del Río',
  'Artemisa',
  'La Habana',
  'Mayabeque',
  'Matanzas',
  'Cienfuegos',
  'Villa Clara',
  'Sancti Spíritus',
  'Ciego de Ávila',
  'Camagüey',
  'Las Tunas',
  'Holguín',
  'Granma',
  'Santiago de Cuba',
  'Guantánamo',
  'Isla de la Juventud',
]

export const PLATFORM_FUNCTIONALITIES = [
  {
    available: true,
    text: 'Dos juegos gratis. 400 CUP x juego a partir de 2',
  },
  {
    available: true,
    text: 'Soporte personalizado',
  },
  {
    available: true,
    text: 'Monetización por SMS',
  },
  {
    available: true,
    text: 'Acceso a analítica de ventas',
  },
  {
    available: true,
    text: 'Gestión de tienda de manera remota',
  },
]

export const PRICES = [
  {
    title: 'Nivel 1',
    data: ['Ingresos mensuales de 0 a 4999 CUP', '3% de regalías'],
  },
  {
    title: 'Nivel 2',
    data: ['Ingresos mensuales de 5000 a 9999 CUP', '6% de regalías'],
  },
  {
    title: 'Nivel 3',
    data: ['Ingresos mensuales superiores a 10000 CUP', '12% de regalías'],
  },
]
