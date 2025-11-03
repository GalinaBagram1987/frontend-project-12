const Page404 = () => {
return (
  <div className='text-center flex-grow-1 d-flex flex-column justify-content-center'>
    <img alt='Страница не найдена'
      className='img-fluid h-25'
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