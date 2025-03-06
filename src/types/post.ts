export interface Post {
    pub_date: string;
    id: string;
    title: string;
    body: string;
    userId: string;
    author: string;
}

export interface PostListState {
    articles: Post[];
    visibleArticles: Post[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    paginationError: string | null;
    initError: string | null;
    displayLimit: number;
    searchQuery: string;
    currentDate: {
        year: number;
        month: number;
    };
}

export interface PostListActions {
    increaseDisplayLimit: () => void;
    setInitialData: (data: Post[]) => void;
    setInitError: (error: string | null) => void;
    setSearchQuery: (query: string) => void;
}

