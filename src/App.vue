<template>
  <div id="app" class="app h-screen flex font-sans overflow-hidden">
    <div
      class="sidebar bg-white border-r-2 h-screen flex-no-shrink overflow-auto flex flex-col"
    >
      <h1 class="font-normal">
        <a href="#" class="logo">
          <img
            src="./assets/logo.png"
            class="-mt-6 -mb-4 -ml-4"
            alt="PrettyHtml"
          >
        </a>
      </h1>
      <div class="settings px-4 text-grey-darkest">
        <div class="section">
          <p
            class="text-sm text-center"
          >The formatter for the modern web</p>
          <h3
            class="section-name mt-8 font-medium tracking-wide text-xxs text-grey-dark uppercase"
          >Editor</h3>
          <div class="section-item flex items-center mt-4">
            <div class="setting-label w-24 text-sm">Source type</div>
            <div class="setting-input flex-1 ml-4">
              <select
                class="bg-grey-lighter text-grey-darker border font-medium w-full text-sm py-1 pl-2 rounded focus:outline-none focus:shadow-outline"
              >
                <option value="markup">HTML-like</option>
                <option value="js" disabled>Javascript</option>
              </select>
            </div>
          </div>
          <div class="section-item flex items-center mt-1">
            <div class="setting-label w-24 text-sm">
              Line Numbers
            </div>
            <AppToggle v-model="linenumbers" class="ml-4"></AppToggle>
          </div>
        </div>
        <div class="section mt-8">
          <h3
            class="section-name font-medium tracking-wide text-xxs text-grey-dark uppercase"
          >Settings</h3>
          <div class="section-item flex items-center mt-4">
            <div class="setting-label w-24 text-sm">Print width</div>
            <div class="setting-input w-16 ml-4">
              <input
                v-model.number="opts.printWidth"
                class="bg-grey-lighter text-grey-darkest border font-medium w-full text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                type="number"
              >
            </div>
          </div>
          <div class="section-item flex items-center mt-2" :class="{'opacity-50': opts.useTabs}">
            <div class="setting-label w-24 text-sm">{{ opts.useTabs ? 'Tab' : 'Space'}} width</div>
            <div class="setting-input w-16 ml-4">
              <input
                v-model.number="opts.tabWidth"
                class="bg-grey-lighter text-grey-darkest border font-medium w-full text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                :disabled="opts.useTabs"
                type="number"
              >
            </div>
          </div>
          <div class="section-item flex items-center mt-1">
            <div class="setting-label w-24 text-sm">
              Use Tabs
            </div>
            <AppToggle v-model="opts.useTabs" class="ml-4"></AppToggle>
          </div>
          <div class="section-item flex items-center">
            <div class="setting-label w-24 text-sm">Single Quote</div>
            <AppToggle v-model="opts.singleQuote" class="ml-4"></AppToggle>
          </div>
          <div class="section-item flex items-center">
            <div class="setting-label w-24 text-sm text-grey">Use Prettier</div>
            <AppToggle v-model="opts.usePrettier" class="ml-4" disabled></AppToggle>
          </div>
        </div>
        <button
          @click="resetToDefaults"
          class="mt-6 text-xs text-grey-dark hover:text-grey-darkest"
        >Reset to defaults</button>
      </div>
      <div class="about mt-auto pt-8 text-grey-dark">
        <div class="section px-4 my-4">
          <div class="flex justify-between">
            <h3 class="section-name font-medium text-xxs uppercase">About</h3>
            <span class="font-medium text-xxs text-grey">{{ prettyHtmlVersion }}</span>
          </div>
          <div class="section-item leading-normal flex items-center mt-4">
            <p class="text-sm font-normal">
              Offline Playground for
              <a
                href="https://github.com/prettyhtml/prettyhtml"
                class="no-underline font-bold text-grey-dark"
                target="_blank"
              >Prettyhtml</a>
              <br>Source code on
              <a
                href="https://github.com/prettyhtml/pretty-html-web"
                class="no-underline font-bold text-grey-dark"
                target="_blank"
              >GitHub</a>
              <br>Built w/ Vue &middot; by
              <a
                href="https://www.mesutkoca.com"
                class="no-underline font-bold text-grey-dark"
                target="_blank"
              >Mesut Koca</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="content bg-white flex flex-1 flex-col overflow-hidden">
      <header class="header border-b-2 flex items-center justify-between p-4">
        <span class="text-sm flex items-center">
          <span class="text-xs text-grey-dark font-medium uppercase p-2">Examples</span>
          <button
            @click="example('html')"
            class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
          >HTML</button>
          <button
            @click="example('vue')"
            class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
          >VUE</button>
          <button
            @click="example('angular')"
            class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
          >ANGULAR</button>
          <button
            @click="example('svelte')"
            class="bg-grey-lighter text-grey-darker font-medium text-xs p-2 hover:bg-grey-darker hover:text-white rounded mx-1 focus:outline-none focus:shadow-outline"
          >SVELTE</button>
        </span>

        <button
          @click="prettify"
          class="ml-2 bg-grey-lighter text-grey-darker uppercase hover:bg-grey-darker hover:text-white font-bold text-sm py-2 px-6 rounded-full inline-flex items-center tracking-wide focus:outline-none focus:shadow-outline"
        >
          <svg
            class="stroke-current w-3 h-3 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="9971 -24 8.766 10.985"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9971.5-23.5l7.766 4.992-4.5 2.892-3.266 2.101z"
            ></path>
          </svg>
          <span class="">Run</span>
        </button>
      </header>
      <main class="section--main flex-1 flex">
        <div
          class="editor flex-no-shrink flex-1 flex flex-col overflow-hidden pt-4"
        >
          <header class="flex relative">
            <h3 class="px-4 flex-no-shrink font-medium tracking-wide text-xxs text-grey-dark uppercase">Source</h3>
            <button
              @click="clear"
              class="absolute text-grey-dark flex items-center pin-r pin-t -mt-2 p-1 font-normal hover:text-grey-darkest rounded mx-1 focus:outline-none focus:shadow-outline"
            >
            <svg class="w-4 h-4 mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </header>
          <prism-editor
            class="my-editor mt-4 px-2"
            :code="code"
            @change="changeCode"
            language="html"
            :line-numbers="linenumbers"
          />
        </div>
        <div
          class="output border-l-2 flex-no-shrink flex-1 flex flex-col overflow-hidden pt-4"
        >
          <h3
            class="px-4 flex-no-shrink font-medium tracking-wide text-xxs text-grey-dark uppercase"
          >Output</h3>
          <prism-editor
            class="my-editor mt-4 px-2 focus:outline-none"
            :code="result"
            language="html"
            :style="{'tab-size': opts.tabWidth}"
            readonly
            :line-numbers="linenumbers"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import "vue-prism-editor/dist/VuePrismEditor.css";
import "./assets/styles.css";
import { startWorkers, getWorkers } from "./workers";
import PrismEditor from "vue-prism-editor";
import AppToggle from "./components/AppToggle";
import Examples from "./utils/Examples.js";

startWorkers();
const defaultOpts = {
  tabWidth: 2, // the space width of your indentation level (default: 2)
  useTabs: false, // use tabs instead spaces for indentation (default: false)
  printWidth: 80, // use different maximum line length (default: 80)
  usePrettier: false, // use prettier for embedded content (default: true)
  singleQuote: false // use single quote instead double quotes (default: `"`)
};
export default {
  name: "app",
  components: {
    AppToggle,
    PrismEditor
  },
  data() {
    return {
      prettifier: null,
      prettyHtmlVersion: "0.2.1",
      linenumbers: true,
      opts: { ...defaultOpts },
      result: "",
      code: ""
    };
  },
  async mounted() {
    this.prettifier = getWorkers().prettyhtml.run;
  },
  methods: {
    async prettify() {
      this.result = await this.prettifier(this.code, this.opts);
    },
    resetToDefaults() {
      this.opts = { ...defaultOpts };
    },
    clear() {
      this.code = "";
      this.result = "";
    },
    changeCode(code) {
      this.code = code;
    },
    example(lang) {
      this.code = Examples[lang];
      this.prettify();
    }
  }
};
</script>

<style>
.section--main {
  background: #fafafa;
  max-width: 100vw;
}
.text-xxs {
  font-size: 0.7rem;
}
.sidebar {
  width: 17.5rem;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%23606f7b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' class='feather feather-chevron-down' viewBox='0 0 24 24'%3e %3cpath d='M6 9l6 6 6-6'/%3e %3c/svg%3e");
  background-repeat: no-repeat;
  background-size: 1rem auto;
  background-position: right 0.25rem center;
  padding-right: 1rem;
}
</style>
