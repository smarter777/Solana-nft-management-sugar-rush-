import type { NextPage } from 'next'
import Head from 'next/head'
import Form from 'components/CreateCM/Form'
import { Title, CheckConnectedWallet } from 'components/Layout'
import { useWallet } from '@solana/wallet-adapter-react'

const CreateCandyMachine: NextPage = () => {

  const { publicKey } = useWallet()

  if (!publicKey) {
    return <CheckConnectedWallet />
  }

  return (
    <div className='relative'>
      <Head>
        <title>Create Candy Machine</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container flex justify-center items-center flex-col'>
        <Title text='Create Candy Machine' />
        <Form />
      </div>
    </div>
  )
}

export default CreateCandyMachine
