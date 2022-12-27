import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { SiweMessage as SIWEMessage } from 'siwe'
import type { ExternalProvider } from '@ethersproject/providers'
import { loginMessage } from '@/config'
import { Maybe, MeResponse } from '@/types'

declare global {
  interface Window {
    ethereum: ExternalProvider
  }
}

export const useSIWE = () => {
  const [address, setAddress] = useState<Maybe<string>>(null)
  const [ens, setENS] = useState<Maybe<string>>(null)
  const [username, setUsername] = useState<Maybe<string>>(null)
  const [status, setStatus] = useState<Maybe<string>>(null)
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const { host = null, origin = null } = (
    typeof window !== 'undefined' ? window.location : {}
  )
  const [provider] = useState(
    // prettier-ignore
    typeof window !== 'undefined'
    ? new ethers.providers.Web3Provider(window.ethereum)
    : null
  )

  useEffect(() => {
    const check = async () => {
      try {
        const meRes = await fetch('/api/me', {
          method: 'POST',
          credentials: 'same-origin',
        })

        if(meRes.ok) {
          const me = await meRes.json()
          const { ens, address, username } = me
          setENS(ens)
          setUsername(username)
          setAddress(address)
          setConnected(true)
        }
      } catch(error) {
        console.error({ error })
      }
    }

    check()
  }, [])

  const connect = async () => {
    if(!provider) throw new Error('No provider.')
    if(connected) throw new Error('Already connected.')
    if(connecting) throw new Error('Double connect.')

    setConnecting(true)

    try {
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()

      setStatus('Getting nonce…')

      const nonceRes = await fetch(`/api/nonce`, {
        credentials: 'same-origin',
      })
      const nonce = await nonceRes.text()

      setStatus('Building message…')

      const messageBase = new SIWEMessage({
        domain: host ?? 'default',
        address,
        statement: loginMessage,
        uri: origin ?? 'example://default',
        version: '1',
        chainId: 1,
        nonce,
      })
      const message = messageBase.prepareMessage()

      setStatus('Signing message…')

      const signature = await signer.signMessage(message)

      setStatus('Logging in…')

      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, signature }),
        credentials: 'same-origin',
      })
      const auth = await loginRes.json()
      const { ens, username } = auth as MeResponse

      setConnected(true)
      setENS(ens ?? null)
      setUsername(username ?? null)
      setAddress(address)
    } catch(error) {
      console.error({ error })
    } finally {
      setConnecting(false)
      setStatus(null)
    }
  }

  const disconnect = async () => {
    const logoutRes = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'same-origin',
    })

    if (logoutRes.ok) {
      setConnected(false)
      setENS(null)
      setUsername(null)
      setAddress(null)
    }
  }

  return {
    connecting,
    connected,
    connect,
    disconnect,
    address,
    ens,
    username,
    status,
  }
}
