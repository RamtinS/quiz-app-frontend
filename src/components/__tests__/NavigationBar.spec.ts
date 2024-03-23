import {expect} from "vitest";
import NavigationBar from "../navigation/NavigationBar.vue";
import {mount} from "@vue/test-utils";
import {createApp} from "vue";
import {createPinia, setActivePinia} from "pinia";

import {beforeEach, test} from 'vitest'
import router from "../../router";

const app = createApp({})
beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    app.use(router)
    setActivePinia(pinia)
})

test("mount", async () => {
    expect(NavigationBar).toBeTruthy();

    const wrapper = mount(NavigationBar, {
        props: {
            links: {
                '/': { label: 'Home', authNeeded: false },
                '/login': { label: 'Login', authNeeded: false },
                '/quiz-browser' : {label: 'Quiz Browser', authNeeded: false}
            }

        }
    });

    expect(wrapper.html()).toContain("Home")
})