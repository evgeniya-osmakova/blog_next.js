import { createStore } from 'zustand/vanilla'
import { Post, PostListState, PostListActions } from '@/types/post'

export type PostListStore = PostListState & PostListActions

export const defaultInitState: PostListState = {
    articles: [],
    visibleArticles: [],
    loading: false,
    loadingMore: false,
    error: null,
    paginationError: null,
    initError: null,
    displayLimit: 10,
    searchQuery: '',
    currentDate: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    }
}

export const createPostListStore = (
    initState: PostListState = defaultInitState,
) => {
    return createStore<PostListStore>()((set) => ({
        ...initState,
        setInitialData: (data: Post[]) => {
            set((state) => ({
                articles: data,
                visibleArticles: data.slice(0, state.displayLimit),
                loading: false,
                initError: null
            }));
        },
        setInitError: (error: string | null) => {
            set(() => ({
                initError: error
            }));
        },
        setSearchQuery: (query: string) => {
            set((state) => {
                const filteredArticles = query
                    ? state.articles.filter(article =>
                        article.title.toLowerCase().includes(query.toLowerCase()) ||
                        article.body.toLowerCase().includes(query.toLowerCase())
                    )
                    : state.articles;

                return {
                    searchQuery: query,
                    visibleArticles: filteredArticles.slice(0, state.displayLimit)
                };
            });
        },
        increaseDisplayLimit: () => set((state) => {
            const filteredArticles = state.searchQuery
                ? state.articles.filter(article =>
                    article.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                    article.body.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
                : state.articles;

            return {
                displayLimit: state.displayLimit + 10,
                visibleArticles: filteredArticles.slice(0, state.displayLimit + 10),
            };
        }),
    }))
}
