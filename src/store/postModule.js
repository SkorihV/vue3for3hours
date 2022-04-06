import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 100,
        sortOptions: [
            {value: 'title', name: 'По описанию'},
            {value: 'body', name: 'По заголовку'},
        ]
    }),
    getters: {
        sortPosts(state) {
            return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]));
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostingLoading = bool;
        },
        setPage(state, page) {
            state.page = page;

        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;

        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;

        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;

        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
            } catch (e) {
                alert("Ошибка");
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                this.page +=1;
                commit('setPage', state.page + 1)
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                alert("Ошибка");
            }
        }
    },
    namespaced: true
}