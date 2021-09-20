/*
// store/loggedInUser.js
import {reactive} from 'vue'
// state
const state = reactive({})
export default ()=>({})
*/

import {reactive} from 'vue'
const state = reactive({
    name: 'John Doe',
    email: 'fake@email.com',
    username: 'jd123',
})

export default ()=>({
    state, // shorthand for state:state,
    name: computed(()=> state.name),
    email: computed(()=> state.email),
    username: computed(()=> state.username),
    posts: computed(()=> state.posts),
})
