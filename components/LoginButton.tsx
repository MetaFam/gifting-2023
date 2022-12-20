import React from 'react'
import { useSIWE } from '@/hooks'
import Image from 'next/image'
import { relative } from 'path'

export const LoginButton = ({ ...props }) => {
  const {
    connecting, connected, connect, disconnect, name, address,
  } = useSIWE()

  return connected ? (
    <button
      title="Disconnect"
      onClick={(evt) => {
        evt.preventDefault()
        disconnect()
      }}
      style={{
        border: '2px solid #00000088',
        height: 'auto'
      }}
      {...props}
    >
      <Image src="/connected.svg" alt="Disconnect" width="200" height="50" />
      {(name || address) && (
        <h3 id="account">
          {name ?? `${address?.slice(0, 5)}…${address?.slice(-5)}`}
        </h3>
      )}
    </button>
  ) : (
    <button
      title="Sign-In With Ethereum"
      onClick={(evt) => {
        evt.preventDefault()
        connect()
      }}
      disabled={connecting}
      style={{ border: '2px solid #00000088' }}
      {...props}
    >
      {connecting ? (
        <span className="spinner">⟳</span>
      ) : (
        <Image
          src="/siwe.svg"
          alt="Sign-In With Ethereum"
          width="200"
          height="50"
        />
      )}
    </button>
  )
}
