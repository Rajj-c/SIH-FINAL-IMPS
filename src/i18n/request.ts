import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'hi', 'te', 'kn', 'ml', 'pa'];

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // Validate that the incoming `locale` parameter is valid
    if (!locale || !locales.includes(locale as any)) {
        locale = 'en'; // Fallback to default locale
    }

    return {
        locale: locale as string,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});
