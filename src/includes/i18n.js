import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import vi from '@/locales/vi.json'

export default createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  defaultScope: 'global',
  messages: {
    en,
    vi
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    vi: {
      currency: {
        style: 'currency',
        currency: 'VND'
      }
    }
  }
})
