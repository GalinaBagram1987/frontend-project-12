import LeoProfanity from 'leo-profanity'

const filter = LeoProfanity

try {
  filter.loadDictionary('ru')
  filter.loadDictionary('en')
}
catch (e) {
  console.warn('Русский словарь не загружен. Используется английский.')
}
// Расширение словаря дополнительными словами
const additionalWords = [
  // Производные от основных корней
  'хуило', 'хуеплёт', 'хуйня', 'хуйло', 'охуеть', 'охуительно', 'охуенно', 'похуй', 'хуёво',
  'пиздец', 'пиздато', 'пиздеть', 'пиздёж', 'пиздобол', 'распиздяй',
  'выёбываться', 'заебать', 'уебать', 'ебанутый', 'долбоёб', 'ёбарь',
  'блять', 'бля', 'блядина', 'блядовать',
  // Транслитерация/сленг
  'huy', 'bljat', 'pizdec', 'cyka', 'blya', 'yebat',
  // Другие распространенные ругательства
  'сука', 'мудак', 'говно', 'жопа', 'засранец', 'гандон', 'лох',
  // Английские слова
  'boobs', 'boob', 'ass', 'asshole', 'shit', 'fuck', 'fucking',
  'bitch', 'cock', 'cunt', 'dick', 'pussy', 'whore', 'slut',
  'bastard', 'motherfucker', 'retard', 'nigger', 'faggot',
]

filter.add(additionalWords)
console.log(`Словарь расширен на ${additionalWords.length} слов. Всего слов: ${filter.list().length}`)

export default filter
