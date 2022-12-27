import Head from 'next/head'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CardFaceChooser } from '../components/CardFaceChooser'
import { LoginButton } from '../components/LoginButton'
import style from '../styles/Home.module.css'
import { TitleHeader } from 'components/TitleHeader'
import SIWE from './siwe'

type Inputs = {
  title: string
  description: string
  image: File
}

export const Home = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  const submit: SubmitHandler<Inputs> = (data) => console.log(data)
  
  return (
    <>
      <Head>
        <title>MG’s Gifts</title>
        <meta name="description" content="MetaGame's 2023 Gifting" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Little Octo.svg" />
      </Head>
      <TitleHeader/>
      <main>
        <form
          onSubmit={handleSubmit(submit)}
        >
          <ol id={style.steps}>
            <li>
              <h2>Sign-In With Ethereum</h2>
              <section className={style.explanation}>
                <p>This will authenticate you to the site using your Ethereum wallet. In order to participate for free, the account you connect as must be a player or a patron of <a href="//metagame.wtf" rel="noreferrer" target="_blank">MetaGame</a>.</p>
                <p>If you’re not a member of MetaGame and would still like to participate, <a href="mailto:MetaGame%20%3Cyo@metagame.wtf%3E">drop us a line</a> or <a href="//discord.gg/ce3KWtKcYZ"><abbr title="Direct Message">DM</abbr></a>.</p>
              </section>

              <SIWE/>
            </li>
            <li>
              <h2>Select A Card Front</h2>
              <section className={style.explanation}>
                <p>A card image should have an aspect ratio of 85.6:54 <i>(the dimensions of a CR-80 card)</i>.</p>
                <p>Images are ideally in <abbr title="Scalable Vector Graphic">SVG</abbr> format so they can be easily edited for use by other players.</p>
              </section>

              <CardFaceChooser />
            </li>
            <li>
              <h2>Select A Card Back</h2>
              <section className={style.explanation}>
                <p>The back is the same as the front, just in back.</p>
                <p>Gold and silver foil accents are available. If you would like some on your card, create a multipage SVG using <a href="//inkscape.org" target="_blank" rel="noreferrer">Inkscape</a> where the first page is the composite of your entire image, and there are three other pages with the color, silver, and gold masks.</p>
              </section>

              <CardFaceChooser />
            </li>
            <li>
              <h2>Specify a Mailing Address</h2>
              <section className={style.explanation}>
                <p>Participants have two options for specifying an address:</p>
                <ul>
                  <li>Mail can be sent to a Post Office with no specific delivery address. The participant will need to give their legal name, so they can show identification to claim the package.</li>
                  <li>Alternatively, mail can be addressed as normal with a number and street, and the recipient may remain pseudonymous.</li>
                </ul>
              </section>

              <textarea id={style.address}></textarea>
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
}

export default Home