import Head from 'next/head';
import { CardFaceChooser } from '../components/CardFaceChooser';
import { LoginButton } from '../components/LoginButton';

export const Home = () => (
  <>
    <Head>
      <title>MG’s Gifts</title>
      <meta name="description" content="MetaGame's 2023 Gifting" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/Little Octo.svg" />
    </Head>
    <header>
      <h1>
        <span className="org">
          <span className="cap-letter">M</span>eta
          <span className="cap-letter">G</span>ame’s
        </span>
        <span className="year">2023</span>
        <span className="event">
          <span className="cap-letter">G</span>ifting
        </span>
      </h1>
      <h1 className="outline">
        <span className="org">
          <span className="cap-letter">M</span>eta
          <span className="cap-letter">G</span>ame’s
        </span>
        <span className="year">2023</span>
        <span className="event">
          <span className="cap-letter">G</span>ifting
        </span>
      </h1>
    </header>
    <main>
      <form>
        <ol id="steps">
          <li>
            <h2>
              Sign-In With Ethereum
              <span className="tooltip">
                <input type="checkbox" id="siwe-tip" />
                <span className="handle">
                  <label htmlFor="siwe-tip">🛈</label>
                </span>
                <span className="tip">
                  <p>
                    <strong>Sign-In With Ethereum</strong> will authenticate
                    you to the site using your Ethereum wallet. In order to
                    participate, the account you connect as must be a player
                    or a patron of{' '}
                    <a href="//metagame.wtf" rel="noreferrer" target="_blank">
                      MetaGame
                    </a>
                    .
                  </p>
                </span>
              </span>
            </h2>

            <LoginButton />
          </li>
          <li>
            <h2>
              Select A Card Front
              <span className="tooltip">
                <input type="checkbox" id="front-tip" />
                <span className="handle">
                  <label htmlFor="front-tip">🛈</label>
                </span>
                <span className="tip">
                  <p>
                    The card front should be an image with a aspect ratio of
                    85.6:54 <i>(the dimensions of a CR-80 card)</i>.
                  </p>
                  <p>
                    Images are ideally in SVG format so they can be easily
                    edited for use by other players.
                  </p>
                </span>
              </span>
            </h2>

            <CardFaceChooser />
          </li>
          <li>
            <h2>
              Select A Card Back
              <span className="tooltip">
                <input type="checkbox" id="back-tip" />
                <span className="handle">
                  <label htmlFor="back-tip">🛈</label>
                </span>
                <span className="tip">
                  <p>
                    The card front should be an image with a aspect ratio of
                    85.6:54 <i>(the dimensions of a CR-80 card)</i>.
                  </p>
                  <p>
                    Images are ideally in SVG format so they can be easily
                    edited for use by other players.
                  </p>
                </span>
              </span>
            </h2>

            <CardFaceChooser />
          </li>
          <li>
            <h2>
              Specify a Mailing Address
              <span className="tooltip">
                <input type="checkbox" id="mail-tip" />
                <span className="handle">
                  <label htmlFor="mail-tip">🛈</label>
                </span>
                <span className="tip">
                  <p>
                    Participants have two options for specifying an address:
                  </p>
                  <ul>
                    <li>
                      Mail can be sent to a Post Office with a recipient name,
                      but no specific delivery address. In this situation the
                      player will need to give their legal name so as to be
                      able to show identification to claim the package.
                    </li>
                    <li>
                      Mail can be addressed as normal with a number and
                      street. In this situation, a participant may use a
                      pseudonym.
                    </li>
                  </ul>
                </span>
              </span>
            </h2>

            <textarea id="address"></textarea>
          </li>
          <li>
            <button id="submit" type="submit">
              Submit
            </button>
          </li>
        </ol>
      </form>
    </main>
  </>
)

export default Home