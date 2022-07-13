import { useWallet } from '@solana/wallet-adapter-react'
import { Button, ExplorerLinks, Title } from 'components'
import { useUploadCache, useVerifyCandyMachineV2, useMintCandyMachine } from 'hooks'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const VerifyCandyMachine: NextPage = () => {
    const router = useRouter()
    const candyMachineAccount = router.query.id
    const { cache, uploadCache } = useUploadCache()
    const { connected } = useWallet()
    const { error, isLoading, verifyCandyMachine, message, connection, shouldMint } = useVerifyCandyMachineV2(cache)
    const {
        isUserMinting,
        itemsRemaining,
        nftPrice,
        isActive,
        mintAccount,
        refreshCandyMachineState,
        mintMessage,
        isCaptcha,
    } = useMintCandyMachine(candyMachineAccount as string)

    useEffect(() => {
        refreshCandyMachineState()
    }, [connected, candyMachineAccount])

    return (
        <>
            <Head>
                <title>Verify Candy Machine</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='container flex justify-center items-center flex-col text-center'>
                <Title text='Verify Candy Machine' />
                <div className='mt-8 flex flex-col text-center'>
                    <span className='break-all border border-slate-300 shadow-xl py-2 px-4 rounded-lg text-center'>
                        {candyMachineAccount}{' '}
                    </span>
                    <ExplorerLinks
                        type='account'
                        value={candyMachineAccount as string}
                        connection={connection}
                        text={'View'}
                    />
                </div>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <label
                        htmlFor='cache'
                        className='my-8 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-100 transition-all duration-300 ease-linear font-medium border border-gray-500 inline-block cursor-pointer'
                    >
                        Upload Cache file
                    </label>
                    <input id='cache' type='file' name='cache' onChange={uploadCache} className='w-full p-2 hidden' />
                </div>

                {isLoading && <Button text='Verifying Candy Machine...' isLoading />}

                {!isLoading && (
                    <Button text='Verify Candy Machine' onClick={() => verifyCandyMachine({ candyMachineAccount })} />
                )}
                {!error && message && <div className='text-[hsl(258,52%,56%)] text-center mt-6'>{message}</div>}
                {itemsRemaining === 0 && (
                    <div className='text-[hsl(258,52%,56%)] text-center mt-6'>All NFTs have already been minted</div>
                )}

                {!isLoading && error && <div className='text-red-500 text-center mt-6'>{error}</div>}

                {isCaptcha ? (
                    <>
                        {!shouldMint && itemsRemaining !== 0 && (
                            <div className='text-red-500 text-center mt-6'>Important! Verify before Mint!</div>
                        )}
                        <div
                            className={`border border-gray-500 mt-10 p-5 rounded-xl grid grid-cols-3 justify-items-center gap-5 
                                    ${itemsRemaining === 0 ? 'opacity-50' : ''}`}
                        >
                            <span>Remaining: {itemsRemaining}</span>
                            <span>Price: {nftPrice}</span>
                            <span>Live: {isActive ? 'Yes' : 'No'}</span>
                            <span className='col-span-3 disabled'>
                                {itemsRemaining === 0 ? (
                                    <button
                                        className={`flex items-center justify-center px-4 py-2 mx-auto mt-4 text-white
                                        shadow-lg bg-[hsl(258,52%,65%)] rounded-xl group cursor-not-allowed`}
                                        disabled
                                        type='button'
                                    >
                                        Mint 1 NFT
                                    </button>
                                ) : (
                                    <Button text='Mint 1 NFT' isLoading={isUserMinting} onClick={() => mintAccount()} />
                                )}
                            </span>
                        </div>
                    </>
                ) : (
                    <div className='text-[hsl(258,52%,56%)] text-center mt-6'>
                        Captcha is disabled. You can modify it in Inspect candy machine
                    </div>
                )}

                {!error && mintMessage && (
                    <div
                        className={`${
                            mintMessage.error ? 'text-red-500' : 'text-[hsl(258,52%,56%)]'
                        } text-center mt-6 w-2/4`}
                    >
                        {mintMessage.message}
                    </div>
                )}
            </div>
            )
        </>
    )
}

export default VerifyCandyMachine
