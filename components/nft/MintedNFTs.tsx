import { FC } from 'react'
import { Spinner } from '@primer/react'
import NftCard from './NftCard'
import { useMintCandyMachine } from 'hooks'
import { useRecoilValue } from 'recoil'
import { nftsState } from 'lib/recoil-store/atoms'
import { ArrayWrapper, FilterArrayContext } from 'contexts/ArrayWrapper'
import { MINIMUM_NFTS_TO_SHOW } from 'lib/constants'

const MintedNFTs: FC<{
    candyMachineAccount: string
    isLoading: boolean
}> = ({ candyMachineAccount, isLoading }) => {
    const { isUserMinting, itemsRemaining, mintAccount, isCaptcha } = useMintCandyMachine(candyMachineAccount)
    const nfts = useRecoilValue(nftsState)

    if (isLoading) {
        return (
            <div className='d-flex flex-items-center'>
                <h3 className='mr-3'>Loading...</h3>
                <Spinner size='small' />
            </div>
        )
    }

    return (
        <div>
            <h4>Minted NFTs - {nfts.length}</h4>
            <div className='nfts-grid mt-3'>
                {itemsRemaining > 0 && isCaptcha && (
                    <NftCard
                        title={'New NFT'}
                        buttons={[
                            {
                                text: 'Captcha enabled',
                                as: 'button',
                                variant: 'outline',
                                disabled: true,
                            },
                        ]}
                    />
                )}
                {itemsRemaining > 0 && !isCaptcha && (
                    <NftCard
                        title={'New NFT'}
                        buttons={[
                            {
                                text: 'Mint 1 NFT',
                                isLoading: isUserMinting,
                                as: 'button',
                                variant: 'primary',
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onClick: () => mintAccount(),
                            },
                        ]}
                    />
                )}
                <ArrayWrapper
                    array={nfts}
                    minimum={itemsRemaining > 0 ? MINIMUM_NFTS_TO_SHOW - 1 : MINIMUM_NFTS_TO_SHOW}
                >
                    <FilterArrayContext.Consumer>
                        {([mintedArray]) => (
                            <div className='nfts-grid'>
                                {mintedArray?.map(({ name, image, mint }) => (
                                    <NftCard
                                        title={name}
                                        imageLink={image}
                                        key={mint?.toBase58()}
                                        buttons={[
                                            {
                                                text: 'View in Solscan',
                                                as: 'link',
                                                variant: 'invisible',
                                                hash: mint?.toBase58(),
                                            },
                                        ]}
                                    />
                                ))}
                            </div>
                        )}
                    </FilterArrayContext.Consumer>
                </ArrayWrapper>
            </div>
        </div>
    )
}

export default MintedNFTs
