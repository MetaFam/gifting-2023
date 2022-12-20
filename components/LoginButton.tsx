import React from 'react'
import { useSIWE } from '@/hooks'
import Image from 'next/image'
import { noDefault } from '@/helpers'

export const LoginButton = ({ ...props }) => {
  const {
    connecting, connected, connect, disconnect, name, address,
  } = useSIWE()

  return connected ? (
    <button
      id="connection"
      title="Disconnect"
      onClick={noDefault(disconnect)}
      {...props}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/connected.svg" alt="Disconnect" />
      {(name || address) && (
        <h3 id="account">
          {name ?? `${address?.slice(0, 5)}…${address?.slice(-5)}`}
        </h3>
      )}
    </button>
  ) : (
    <button
      id="connection"
      title="Sign-In With Ethereum"
      onClick={noDefault(connect)}
      disabled={connecting}
      {...props}
    >
      {connecting ? (
        <span className="spinner">⟳</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/siwe.svg" alt="Sign-In With Ethereum"/>
      )}
    </button>
  )
}
