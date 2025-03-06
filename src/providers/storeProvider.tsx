'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type PostListStore, createPostListStore } from '@/store/postListStore'

export type PostListStoreApi = ReturnType<typeof createPostListStore>

export const PostListStoreContext = createContext<PostListStoreApi | undefined>(
    undefined,
)

export interface PostListStoreProviderProps {
    children: ReactNode
}

export const StoreProvider = ({
    children,
}: PostListStoreProviderProps) => {
    const storeRef = useRef<PostListStoreApi>(null)

    if (!storeRef.current) {
        storeRef.current = createPostListStore()
    }

    return (
        <PostListStoreContext.Provider value={storeRef.current}>
            {children}
        </PostListStoreContext.Provider>
    )
}

export const usePostListStore = <T,>(
    selector: (store: PostListStore) => T,
): T => {
    const postListStoreContext = useContext(PostListStoreContext)

    if (!postListStoreContext) {
        throw new Error(`usePostListStore must be used within PostListStoreProvider`)
    }

    return useStore(postListStoreContext, selector)
}
