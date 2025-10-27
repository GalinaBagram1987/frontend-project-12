import { loremIpsum } from 'lorem-ipsum';

const BuildPage = ({index, name}) => (
  <>
    <header>
        <h1>{name || `Page ${index}`}</h1>
    </header>
    <main>
        <p>{name ? `${name} content` : `Page ${index} content`}: {loremIpsum({ count: Math.floor(Math.random() * 5) + 3, // 3-7 предложений
  units: 'sentences'})}</p>
    </main>
  </>
);

export const PageOne = () => BuildPage(1);
export const PageLogin = () => BuildPage({index: 2, name: "Login"});

export const Page404 = () => (
    <BuildPage>
        index={404}
        name="404 not found"
        customContent={
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>404</h2>
        <p>Запрашиваемая страница не существует</p>
        <p>{loremIpsum({ count: 8 })}</p>
        <a href="/">Вернуться на главную</a>
      </div>
    }
    </BuildPage>
);


