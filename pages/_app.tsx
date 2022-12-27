import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { WagmiConfig, createClient as createWagmiClient, configureChains } from 'wagmi'
import { mainnet, polygon } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/globals.css'

export const { chains, provider } = configureChains(
  [mainnet, polygon], [publicProvider()],
)
const client = createWagmiClient({ autoConnect: true, provider })

export const App = (
  { Component, pageProps: { session, ...props } }:
  AppProps<{ session: Session }>
) => (
  <WagmiConfig {...{ client }}>
    <SessionProvider {...{ session }} refetchInterval={0}>
      <Component {...props} />
    </SessionProvider>
  </WagmiConfig>
)

export default App