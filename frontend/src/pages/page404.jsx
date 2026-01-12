import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <div className='text-center h-100'>
      <img alt='Страница не найдена'
        className='img404'
        style={{ maxWidth: '300px', height: 'auto' }}
        src='/assets/images/404_slack.svg' />
        <h1 className='h4 text-muted'>{t('errorPage.noPage')}</h1>
        <p className='text-muted'>
          {t('errorPage.goTo')}
          <a href='/'> {t('errorPage.mainPage')}</a>
        </p>
    </div>
    ) 
  };

export default Page404;