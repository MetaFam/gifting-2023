
import {
  getCsrfToken, signIn, signOut, useSession,
} from 'next-auth/react'
import { SiweMessage } from 'siwe'
import {
  useAccount, useConnect, useSignMessage,
  useEnsAvatar, useEnsName, useNetwork,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { useCallback, useEffect, useState } from 'react'
import { loginMessage as statement } from '@/config'
import { noDefault } from '@/helpers'

import style from '../styles/LoginButton.module.css'

export const SIWE = ({ ...props }) => {
  const { signMessageAsync } = useSignMessage()
  const { chain } = useNetwork()
  const { address, isConnected: connected } = useAccount()
  const { data: avatar } = useEnsAvatar({ address, chainId: 1 })
  const { data: ens } = useEnsName({ address, chainId: 1 })
  const { connect, isLoading: connecting } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession()

  const [authed, setAuthed] = useState(false)
  useEffect(() => {
    setAuthed(connected && !!session)
  }, [connected, session])

  const login = useCallback(
    async () => {
      try {
        const callbackURL = '/protected'
        const msg = new SiweMessage({
          domain: window.location.host,
          address,
          statement,
          uri: window.location.origin,
          version: '1',
          chainId: chain?.id,
          nonce: await getCsrfToken(),
        })
        const signature = await signMessageAsync({
          message: msg.prepareMessage(),
        })
        signIn('credentials', {
          message: JSON.stringify(msg),
          redirect: false,
          signature,
          callbackURL,
        })
      } catch(error) {
        console.error({ error })
        window.alert(error)
      }
    },
    [address, chain?.id, signMessageAsync]
  )

  return authed ? (
    <button
      id={style.connection}
      className={style.button}
      title="Disconnect"
      onClick={noDefault(() => signOut({ redirect: false }))}
      {...props}
    > 
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/connected.svg" alt="Disconnect" />
      {(ens || address) && (
        <h3 id={style.account}>
          {ens ?? `${address?.slice(0, 6)}…${address?.slice(-4)}`}
        </h3>
      )}
      {status}
    </button>
  ) : (
    <button
      id={style.connection}
      className={style.button}
      title="Sign-In With Ethereum"
      onClick={noDefault(() => {
        if(!connected) {
          connect()
        }
        login() // this will race & likely lose
      })}
      disabled={connecting}
      {...props}
    >
      {connecting ? (
        <span className={style.spinner}>⟳</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/siwe.svg" alt="Sign-In With Ethereum"/>
      )}
      {status}
    </button>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default SIWE