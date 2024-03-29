import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Dashboard: NextPage = () => {
    const router = useRouter()

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push('/candy-machines')
    }, [])

    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name='description' content='Generated by create next app' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <div className='d-flex flex-column'>
                <span>Welcome to the candy machines dashboard</span>
            </div>
        </>
    )
}

export default Dashboard
