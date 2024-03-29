/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react'

const useUploadCache = () => {
    const [cache, setCache] = useState<File>()

    function uploadCache(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length == 0) {
            window.alert('No files uploaded')
            return
        }

        setCache(e.target.files[0])
    }

    return {
        uploadCache,
        cache: cache!,
    }
}

export default useUploadCache
