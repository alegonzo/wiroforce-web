export const APPLICATIONS_URL = '/applications'
export const PRODUCTS_URL = '/products'
export const PRODUCT_URL = (id) => `/products/${id}`
export const USERS_URL = `/users`
export const USER_URL = '/users/profile'
export const COMPANIES_URL = '/companies'
export const SPECIAL_CHARS_REGEXP = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
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
        text: 'Un juego',
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
      {
        available: false,
        text: 'Herramientas de publicidad',
      },
    ],
    footer: ['Ingresos inferiores a 5000 CUP', 'Un juego gratis', ''],
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
      {
        available: false,
        text: 'Herramientas de publicidad',
      },
    ],
    footer: [
      'Ingresos inferiores superiores a 5000 CUP',
      '6% de regalías',
      '500 CUP / Juego',
    ],
  },
  {
    title: 'Nivel 3',
    data: [
      {
        available: true,
        text: 'Un juego',
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
      {
        available: true,
        text: 'Herramientas de publicidad',
      },
    ],
    footer: [
      'Ingresos inferiores superiores a 10000 CUP',
      '12% de regalías',
      '200 CUP / Juego',
    ],
  },
]
