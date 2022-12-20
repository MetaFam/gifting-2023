import React from 'react'
import { useSIWE } from '@/hooks'
import Image from 'next/image'

export const LoginButton = ({ ...props }) => {
  const { connected, connect, disconnect, name, address } = useSIWE()

  return connected ? (
    <button
      title="Disconnect"
      onClick={disconnect}
      style={{
        border: '2px solid #00000088',
        height: 'auto',
      }}
      {...props}>
      <Image
        src="/connected.svg"
        alt="Disconnect"
        style={{
          height: '10vh',
          width: '10vh',
        }}
      />
      {(name || address) && (
        <h3 style={{ 'text-align': 'center' }}>
          {name ?? `${address?.slice(0, 5)}…${address?.slice(-5)}`}
        </h3>
      )}
    </button>
  ) : (
    <button
      title="Sign-In With Ethereum"
      onClick={connect}
      style={{ border: '2px solid #00000088' }}
      {...props}>
      <Image
        src="/siwe.svg"
        alt="Sign-In With Ethereum"
        width="200"
        height="50"
      />
    </button>
  )
}
