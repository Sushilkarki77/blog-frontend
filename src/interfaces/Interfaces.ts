export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
    date: string;
    bookmarked: boolean;
}

export interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
    date: string;
}

export interface State {
    posts: Result<Post[]>;
    post: Post | null;
    comments: Comment[];
    authors: string[];
    tags: string[];
    loading: boolean;
    isfilterApplied: boolean;
    issearchApplied: boolean;
    error: string | null;
}

export interface Result<T> {
    result: T;
    count?: number;
    totalcount?: number;
    page?: number;
}

export type Action =
    | { type: "FETCH_POSTS" }
    | { type: "FETCH_POST_SUCCESS"; payload: Result<Post[]> }
    | { type: "SEARCH_POSTS" }
    | { type: "SEARCH_POSTS_SUCCESS"; payload: Result<Post[]> }
    | { type: "FILTER_POSTS"; payload: Result<Post[]> }
    | { type: "SET_ISFILTER_APPLIED"; payload: boolean }
    | { type: "SET_ISSEARCH_APPLIED"; payload: boolean }
    | { type: "UPDATE_POST"; payload: Result<Post[]> }
    | { type: "ADD_POST"; payload: Result<Post[]> }
    | { type: "DELETE_POST"; payload: Result<Post[]> }
    | { type: "FETCH_COMMENTS_SUCCESS"; payload: { comments: Comment[] } }
    | { type: "ADD_COMMENT"; payload: Comment[] }
    | { type: "DELETE_COMMENT"; payload: Comment[] }
    | { type: "FETCH_ERROR"; payload: string }
    | { type: "SET_AUTHORS"; payload: string[] }
    | { type: "SET_TAGS"; payload: string[] };



export interface DataContextType {
    state: State;
    fetchPosts: (page?: string) => Promise<void>;
    addPost: (post: Omit<Post, 'id'>) => Promise<void>;
    searchPosts: (q: string) => Promise<void>;
    getCurrentPost: (postId: string) => Post | undefined;
    fetchComments: (postId: string) => Promise<void>;
    addComment: (postId: string, comment: Omit<Comment, 'id'>) => Promise<void>;
    deleteComment: (postId: string, commentId: string) => Promise<void>;
    filterPosts: (tag?: string, author?: string) => void;
    setIsFilterApplied: (val: boolean) => void;
    setIsSearchApplied: (val: boolean) => void;
    getIsFilterApplied: () => boolean;
    getIsSearchApplied: () => boolean;
    updatePost: (id: string, post: Post) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    exportPosts: () => Promise<void>
}
