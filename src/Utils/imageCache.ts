// Lightweight IndexedDB image cache for storing and retrieving image blobs by URL

const DB_NAME = 'image-cache-db'
const STORE_NAME = 'images'
const DB_VERSION = 1
const CACHE_EXPIRY_DAYS = 7

let dbPromise: Promise<IDBDatabase> | null = null

type ImageRecord = {
    url: string
    blob: Blob
    timestamp: number
}

async function cleanupExpiredEntries(db: IDBDatabase): Promise<void> {
    const cleanupTime = Date.now() - (CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
    
    return new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const store = tx.objectStore(STORE_NAME)
        const req = store.openCursor()
        
        req.onsuccess = () => {
            const cursor = req.result
            if (cursor) {
                const record = cursor.value as ImageRecord
                if (record.timestamp < cleanupTime) {
                    cursor.delete() 
                }
                cursor.continue()
            } else {
                resolve() 
            }
        }

        req.onerror = () => {
            console.error('Error cleaning up expired entries:', req.error)
            reject(req.error)
        }
    })
}

function openDatabase(): Promise<IDBDatabase> {
    if (dbPromise) return dbPromise
    dbPromise = new Promise(async (resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION)
        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'url' })
            }
        }
        request.onsuccess = async () => {
            const db = request.result
            try {
                await cleanupExpiredEntries(db)
                resolve(db)
            } catch (error) {
                console.warn('Cache cleanup failed:', error)
                resolve(db)
            }
        }
        request.onerror = () => reject(request.error)
    })
    return dbPromise
}

export async function getCachedBlob(url: string): Promise<Blob | undefined> {
    try {
        const db = await openDatabase()
        return await new Promise<Blob | undefined>((resolve, reject) => {
            const tx = db.transaction(STORE_NAME, 'readonly')
            const store = tx.objectStore(STORE_NAME)
            const req = store.get(url)
            req.onsuccess = () => {
                const result = req.result as ImageRecord | undefined
                resolve(result?.blob)
            }
            req.onerror = () => reject(req.error)
        })
    } catch {
        return undefined
    }
}

export async function putCachedBlob(url: string, blob: Blob): Promise<void> {
    const db = await openDatabase()
    await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite')
        const store = tx.objectStore(STORE_NAME)
        const record: ImageRecord = { url, blob, timestamp: Date.now() }
        const req = store.put(record)
        req.onsuccess = () => resolve()
        req.onerror = () => reject(req.error)
    })
}

export async function fetchAndCache(url: string): Promise<Blob> {
    const response = await fetch(url, { cache: 'no-store' })
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
    }
    const blob = await response.blob()
    try {
        await putCachedBlob(url, blob)
    } catch {
        // Ignore caching errors; still return the blob
    }
    return blob
}

export async function getOrFetchBlob(url: string): Promise<Blob> {
    const cached = await getCachedBlob(url)
    if (cached) return cached
    return await fetchAndCache(url)
}


