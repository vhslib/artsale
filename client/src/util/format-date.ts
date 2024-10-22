import { DateTime } from 'luxon'

export function formatDate(millis: number) {
    return DateTime
        .fromMillis(millis)
        .setLocale('ru')
        .toLocaleString(DateTime.DATETIME_MED)
}
