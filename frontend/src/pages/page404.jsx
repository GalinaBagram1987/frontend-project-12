const Page404 = () => {
return (
  <div className='text-center h-100'>
    <img alt='Страница не найдена'
      className='img404'
      style={{ maxWidth: '300px', height: 'auto' }}
      src='/assets/images/404_slack.svg' />
      <h1 className='h4 text-muted'>Страница не найдена</h1>
      <p className='text-muted'>
        Но вы можете перейти
        <a href='/'> на главную страницу</a>
      </p>
  </div>
  ) 
};

export default Page404;