export const APPLICATIONS_URL = '/applications'
export const APPLICATIONS_RECEIPT_URL = (id) => `/applications/${id}/receipt`
export const PRODUCTS_URL = '/products'
export const PRODUCT_URL = (id) => `/products/${id}`
export const USERS_URL = `/users`
export const USER_URL = '/users/profile'
export const COMPANIES_URL = '/companies'
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

export const PRICES = [
  {
    title: 'Nivel 1',
    data: [
      {
        available: true,
        text: 'Dos juegos gratis',
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
        text: 'Acceso a analítica de Marketing',
      },
      {
        available: true,
        text: 'Gestión de tienda de manera remota',
      },
    ],
    footer: [
      'Ingresos mensuales de 0 a 5000 CUP en el mes',
      '3% de regalías',
      '2 juegos gratis',
    ],
  },
  {
    title: 'Nivel 2',
    data: [
      {
        available: true,
        text: 'Juegos ilimitados',
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
        text: 'Acceso a analítica de Marketing',
      },
      {
        available: true,
        text: 'Gestión de tienda de manera remota',
      },
    ],
    footer: [
      'Ingresos mensuales de 5001 a 10000 CUP en el mes',
      '6% de regalías',
      '400 CUP / Juego',
    ],
  },
  {
    title: 'Nivel 3',
    data: [
      {
        available: true,
        text: 'Juegos ilimitados',
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
        text: 'Acceso a analítica de Marketing',
      },
      {
        available: true,
        text: 'Gestión de tienda de manera remota',
      },
    ],
    footer: [
      'Ingresos mensuales superiores a 10000 CUP',
      '12% de regalías',
      '400 CUP / Juego',
    ],
  },
]
