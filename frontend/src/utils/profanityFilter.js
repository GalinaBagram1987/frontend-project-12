import LeoProfanity from 'leo-profanity';

const filter = LeoProfanity;

try {
  filter.loadDictionary('ru');
} catch (e) {
  console.warn('Русский словарь не загружен. Используется английский.');
}

export default filter;