import { createContext, ReactNode, useContext, useReducer } from "react";
import { Action, DataContextType, Post, Comment, State, Result } from "../interfaces/Interfaces";


const API_URL = 'https://blog-backend-lbii.onrender.com';


const initialState: State = {
    posts: { result: [] },
    post: null,
    comments: [],
    authors: [],
    tags: [],
    isfilterApplied: false,
    issearchApplied: false,
    loading: false,
    error: null,
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "FETCH_POSTS":
            return { ...state, loading: true, error: null };
        case "FETCH_POST_SUCCESS":
            return { ...state, posts: action.payload, loading: false };
        case "SEARCH_POSTS":
            return { ...state, loading: true, error: null };
        case "SEARCH_POSTS_SUCCESS":
            return { ...state, posts: action.payload, loading: false };
        case "FILTER_POSTS":
            return { ...state, posts: action.payload }
        case "SET_ISFILTER_APPLIED":
            return { ...state, isfilterApplied: action.payload }
        case "SET_ISSEARCH_APPLIED":
            return { ...state, issearchApplied: action.payload }
        case "UPDATE_POST":
            return { ...state, posts: action.payload }
        case "ADD_POST":
            return { ...state, posts: action.payload }
        case "DELETE_POST":
            return { ...state, posts: action.payload }
        case "FETCH_COMMENTS_SUCCESS":
            return { ...state, comments: action.payload.comments };
        case "ADD_COMMENT":
            return { ...state, comments: action.payload };
        case "DELETE_COMMENT":
            return { ...state, comments: action.payload };
        case "SET_AUTHORS":
            return { ...state, authors: action.payload }
        case "SET_TAGS":
            return { ...state, tags: action.payload }
        case "FETCH_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchPosts = async (page = "1") => {
        dispatch({ type: "FETCH_POSTS" });
        try {
            const response = await fetch(`${API_URL}/posts?page=${page}`);
            const dataResult: Result<Post[]> = await response.json();
            dispatch({ type: "FETCH_POST_SUCCESS", payload: dataResult });

            const authors: string[] = [...new Set(dataResult.result.flatMap(x => x.author))];
            const tags: string[] = [...new Set(dataResult.result.flatMap(x => x.tags))]

            dispatch({ type: "SET_AUTHORS", payload: authors });
            dispatch({ type: "SET_TAGS", payload: tags });
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };

    const searchPosts = async (q = "") => {
        dispatch({ type: "SEARCH_POSTS" });
        try {
            const response = await fetch(`${API_URL}/posts/search?q=${q}`);
            const dataResult: Result<Post[]> = await response.json();
            dispatch({ type: "SEARCH_POSTS_SUCCESS", payload: dataResult });

            const authors: string[] = [...new Set(dataResult.result.flatMap(x => x.author))];
            const tags: string[] = [...new Set(dataResult.result.flatMap(x => x.tags))]

            dispatch({ type: "SET_AUTHORS", payload: authors });
            dispatch({ type: "SET_TAGS", payload: tags });

        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };

    const filterPosts = (tag = '', author = '') => {
        const filteredPosts = state.posts.result.filter(x => {
            let status = false;
            if (tag) status = x.tags.some(y => y === tag);
            if (author) status = x.author === author;
            return status;
        });

        dispatch({ type: "FILTER_POSTS", payload: { result: filteredPosts, count: filteredPosts.length, totalcount: filteredPosts.length } });

        const authors: string[] = [...new Set(filteredPosts.flatMap(x => x.author))];
        const tags: string[] = [...new Set(filteredPosts.flatMap(x => x.tags))]

        dispatch({ type: "SET_AUTHORS", payload: authors });
        dispatch({ type: "SET_TAGS", payload: tags });
    };

    const addPost = async (post: Omit<Post, 'id'>) => {
        try {

            await fetch(`${API_URL}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })

            fetchPosts();

        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };

    const updatePost = async (id: string, post: Post) => {
        try {
            const posts: Result<Post[]> = { ...state.posts, result: state.posts.result.map(x => x.id == id ? post : x) };

            dispatch({ type: "UPDATE_POST", payload: posts });
            await fetch(`${API_URL}/posts/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };
    const deletePost = async (id: string) => {
        try {
            const posts: Result<Post[]> = { ...state.posts, result: state.posts.result.filter(x => x.id !== id) };

            dispatch({ type: "DELETE_POST", payload: posts });
            await fetch(`${API_URL}/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };

    const exportPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/posts/export`);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Posts.zip');
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    }

    const fetchComments = async (postId: string) => {

        try {
            const commentsResponse = await fetch(`${API_URL}/posts/${postId}/comments`);

            const commentsResult: Result<Comment[]> = await commentsResponse.json();
            dispatch({
                type: "FETCH_COMMENTS_SUCCESS",
                payload: { comments: commentsResult.result },
            });

        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                payload: (error as Error).message,
            });
        }
    };

    const addComment = async (postId: string, comment: Omit<Comment, 'id'>) => {
        try {
            const comments: Comment[] = [...state.comments, { ...comment, id: Math.random().toString() }]
            dispatch({ type: "ADD_COMMENT", payload: comments });

            const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(comment),
            });

            if (!response.ok) throw new Error("Failed to add comment");

        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };

    const deleteComment = async (postId: string, commentId: string) => {
        try {

            const comments: Comment[] = state.comments.filter(x => x.id != commentId);

            dispatch({ type: "DELETE_COMMENT", payload: comments });

            await fetch(`${API_URL}/posts/${postId}/comments/${commentId}`, { method: "DELETE" });

        } catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
        }
    };

    const setIsFilterApplied = (val: boolean) => {
        dispatch({ type: "SET_ISFILTER_APPLIED", payload: val })
    };
    const setIsSearchApplied = (val: boolean) => {
        dispatch({ type: "SET_ISSEARCH_APPLIED", payload: val })

    };
    const getIsFilterApplied = () => state.isfilterApplied;
    const getIsSearchApplied = () => state.issearchApplied;



    const getCurrentPost = (postId: string): Post | undefined => {
        return state.posts.result.find(x => x.id === postId)
    };


    return (
        <DataContext.Provider value={{ state, fetchPosts, searchPosts, setIsFilterApplied, setIsSearchApplied, getIsFilterApplied, getIsSearchApplied, addPost, fetchComments, filterPosts, updatePost, deletePost, exportPosts, getCurrentPost, addComment, deleteComment }}>
            {children}
        </DataContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataContext = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataProvider");
    }
    return context;
};
