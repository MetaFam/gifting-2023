import React from 'react'
import { useSIWE } from '@/hooks'
import { noDefault } from '@/helpers'
import style from '../styles/LoginButton.module.css'

export const LoginButton = ({ ...props }) => {
  const {
    connecting, connected, connect, disconnect, address, ens, status,
  } = useSIWE()

  return connected ? (
    <button
      id={style.connection}
      className={style.button}
      title="Disconnect"
      onClick={noDefault(disconnect)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/connected.svg" alt="Disconnect" />
      {(ens || address) && (
        <h3 id={style.account}>
          {ens ?? `${address?.slice(0, 5)}…${address?.slice(-5)}`}
        </h3>
      )}
      {status}
    </button>
  ) : (
    <button
      id={style.connection}
      className={style.button}
      title="Sign-In With Ethereum"
      onClick={noDefault(connect)}
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
