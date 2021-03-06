import defaultPosts from '@/config/defaultPosts.js'
export const state = () => {
    return {
        list: null,
        content: null,
        isExtendPost: false
    }
}

export const mutations = {
    changeExendPost(state, payload) {
        state.isExtendPost = payload
    },
    updateList(state, payload) {
        // state.list = payload&&payload.length?payload:defaultPosts
        state.list = payload
    },
    updateContent(state, payload) {
        state.content = payload
    },
}

export const actions = {
    getArticleList(store, payload) {
        const plateList = ["note", "life"];
        if (payload&&!plateList.includes(payload.category)) {
            store.commit('updateList', null)
            return
        }
        const request = payload ? this.$axios.$get('/post/list', {
            params: payload
        }) : this.$axios.$get('/post/list')
        return request.then(res => {
            store.commit('updateList', res.data)
        }).catch(res => {
            store.commit('updateList', null)
        });
    },
    getArticleContent(store, payload) {
        return this.$axios.$get(`/post/${payload.id}`).then(res => {
            store.commit('updateContent', res.data)
        }).catch(res => {
            store.commit('updateContent', {})
        });
    }
}