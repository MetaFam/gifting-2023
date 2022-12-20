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
            <h2>Sign-In With Ethereum</h2>
            <section className="explanation">
              <p>This will authenticate you to the site using your Ethereum wallet. In order to participate for free, the account you connect as must be a player or a patron of <a href="//metagame.wtf" rel="noreferrer" target="_blank">MetaGame</a>.</p>
              <p>If you’re not a member of MetaGame and would still like to participate, <a href="mailto:MetaGame%20%3Dyo@metagame.wtf%3E">drop us a line</a> or <a href="//discord.gg/ce3KWtKcYZ"><abbr title="Direct Message">DM</abbr></a>.</p>
            </section>

            <LoginButton />
          </li>
          <li>
            <h2>Select A Card Front</h2>
            <section className="explanation">
              <p>A card image should have an aspect ratio of 85.6:54 <i>(the dimensions of a CR-80 card)</i>.</p>
              <p>Images are ideally in <abbr title="Scalable Vector Graphic">SVG</abbr> format so they can be easily edited for use by other players.</p>
            </section>

            <CardFaceChooser />
          </li>
          <li>
            <h2>Select A Card Back</h2>
            <section className="explanation">
              <p>The back is the same as the front, just in back.</p>
            </section>

            <CardFaceChooser />
          </li>
          <li>
            <h2>Specify a Mailing Address</h2>
            <section className="explanation">
              <p>Participants have two options for specifying an address:</p>
              <ul>
                <li>Mail can be sent to a Post Office with no specific delivery address. The player will need to give their legal name, so they can show identification & claim the package.</li>
                <li>Alternatively, mail can be addressed as normal with a number and street. In this situation, a participant may use a pseudonym.</li>
              </ul>
            </section>

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