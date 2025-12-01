'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (value: string) => {
        router.replace(pathname, { locale: value });
    };

    return (
        <Select value={locale} onValueChange={handleChange}>
            <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
                <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                <SelectItem value="ml">മലയാളം</SelectItem>
            </SelectContent>
        </Select>
    );
}
