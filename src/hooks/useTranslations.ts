import type { Translations } from '@/types/translations'

import enTranslations from '@/locales/en.json'
import esTranslations from '@/locales/es.json'
import {useLanguage} from "@/lib/lenguage-context";

const translations: Translations = {
    en: enTranslations,
    es: esTranslations
}

export function useTranslation() {
    const { language } = useLanguage()

    const t = (key: string): string => {
        const keys = key.split('.')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return keys.reduce((obj: never, current) => obj?.[current], translations[language]) || key
    }

    return { t }
}