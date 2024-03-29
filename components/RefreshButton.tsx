import { FC } from 'react'
import { Button } from '@primer/react'
import { SyncIcon } from '@primer/octicons-react'

const RefreshButton: FC<{
    isLoading: boolean
    onClick: () => void
}> = ({ isLoading, onClick }) => (
    <Button
        className={isLoading ? 'loading-animation' : ''}
        leadingIcon={SyncIcon}
        onClick={onClick}
        disabled={isLoading}
    >
        Refresh
    </Button>
)
export default RefreshButton
