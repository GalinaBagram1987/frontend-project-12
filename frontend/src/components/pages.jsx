import { loremIpsum } from 'lorem-ipsum';
import { Formik} from 'formik'; 

const BuildPage = ({index, name, children}) => (
  <>
    <header>
        <h1>{name || `Page ${index}`}</h1>
    </header>
    <main>
        { children || <p>{name ? `${name} content` : `Page ${index} content`}: {loremIpsum({ count: Math.floor(Math.random() * 5) + 3, // 3-7 предложений
  units: 'sentences'})}</p> }
    </main>
  </>
);

export const PageOne = () => <BuildPage index={1} name="Page One"/>;
export const PageLogin = () => (
  <BuildPage index={2} name="Log in">
      <Form>
        <div>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
      <button type="submit">Login</button>
      </Form>
  </BuildPage>
);

export const Page404 = () => (
    <BuildPage index={404} name="Page not found">
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>404</h2>
        <p>Запрашиваемая страница не существует</p>
        <p>{loremIpsum({ count: 8 })}</p>
        <a href="/">Вернуться на главную</a>
      </div>
    </BuildPage>
);


