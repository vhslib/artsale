export function createSlug(russian: string) {
    let slug = ''

    for (const letter of russian.toLowerCase()) {
        const previousLetterAppended = slug[slug.length - 1]
        const letterBeingAppended = translateLetter(letter)

        // Only append a dash if the previous letter isn't a dash already
        if (previousLetterAppended === '-' && letterBeingAppended === '-') {
            continue
        }

        slug += letterBeingAppended
    }

    return slug
}

const letterMapping: Record<string, string> = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'e',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'ts',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'sch',
    'ы': 'y',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya',
    ' ': '-'
}

function translateLetter(letter: string) {
    const code = letter.charCodeAt(0)

    // For Latin ASCII letters, return them as-is
    if (code >= 97 && code <= 122) {
        return letter
    }

    return letterMapping[letter] ?? ''
}
