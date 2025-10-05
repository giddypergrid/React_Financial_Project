import { useEffect, useRef, useState } from 'react'
import { getOrFetchBlob } from 'Utils/imageCache'
//return local cached url
export async function loadCachedImage(url: string | undefined): Promise<string | undefined> {
    if (!url) return undefined
    
    return new Promise<string | undefined>(async (resolve, reject) => {
        try {
            const blob = await getOrFetchBlob(url)
            const objectUrl = URL.createObjectURL(blob)
            resolve(objectUrl)
        } catch (e: any) {
            console.error('Failed to load cached image:', e)
            resolve(undefined)
        }
    })
}

