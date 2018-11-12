<template>
  <div id="app" class="app h-screen flex font-sans overflow-hidden">
    <div
      class="fixed h-screen w-screen bg-black z-20 opacity-75 overflow-hidden"
      v-if="showSidebar && isMobile"
      @click="showSidebar = !showSidebar;"
    ></div>

    <div
      class="sidebar bg-white z-30 border-r-2 h-screen"
      :class="{ fixed: isMobile }"
      v-if="showSidebar"
    >
      <div class="overflow-auto flex flex-col h-full">
        <a href="#" class="text-center">
          <img
            src="./assets/logo.png"
            class="w-48 px-4 py-3"
            alt="PrettyHtml"
          />
        </a>
        <div class="settings px-4 text-grey-darkest">
          <div class="section">
            <p class="text-sm text-center mt-1">
              The formatter for the modern web
            </p>
            <h3
              class="section-name mt-8 font-medium tracking-wide text-xxs text-grey-dark uppercase"
            >
              Editor
            </h3>
            <div class="section-item flex items-center mt-4">
              <div class="setting-label w-32 text-sm">Source type</div>
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
              <div class="setting-label w-32 text-sm">Line Numbers</div>
              <AppToggle v-model="linenumbers" class="ml-4"></AppToggle>
            </div>
          </div>
          <div class="section mt-8">
            <h3
              class="section-name font-medium tracking-wide text-xxs text-grey-dark uppercase"
            >
              Settings
            </h3>
            <div class="section-item flex items-center mt-4">
              <div class="setting-label w-32 text-sm">Print width</div>
              <div class="setting-input w-16 ml-4">
                <input
                  v-model.number="opts.printWidth"
                  class="bg-grey-lighter text-grey-darkest border font-medium w-full text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  type="number"
                />
              </div>
            </div>
            <div
              class="section-item flex items-center mt-2"
              :class="{ 'opacity-50': opts.useTabs }"
            >
              <div class="setting-label w-32 text-sm">
                {{ opts.useTabs ? "Tab" : "Space" }} width
              </div>
              <div class="setting-input w-16 ml-4">
                <input
                  v-model.number="opts.tabWidth"
                  class="bg-grey-lighter text-grey-darkest border font-medium w-full text-sm py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  :disabled="opts.useTabs"
                  type="number"
                />
              </div>
            </div>
            <div class="section-item flex items-center mt-1">
              <div class="setting-label w-32 text-sm">Use Tabs</div>
              <AppToggle v-model="opts.useTabs" class="ml-4"></AppToggle>
            </div>
            <div class="section-item flex items-center">
              <div class="setting-label w-32 text-sm">Single Quote</div>
              <AppToggle v-model="opts.singleQuote" class="ml-4"></AppToggle>
            </div>
            <div class="section-item flex items-center">
              <div class="setting-label w-32 text-sm ">Wrap Attributes</div>
              <AppToggle v-model="opts.wrapAttributes" class="ml-4"></AppToggle>
            </div>
            <div class="section-item flex items-center">
              <div class="setting-label w-32 text-sm text-grey">
                Use Prettier
              </div>
              <AppToggle
                v-model="opts.usePrettier"
                class="ml-4"
                disabled
              ></AppToggle>
            </div>
          </div>
          <button
            @click="resetToDefaults"
            class="mt-2 text-xs text-grey-dark hover:text-grey-darkest"
          >
            Reset to defaults
          </button>
        </div>

        <div class="section mt-8 px-2 lg:hidden">
          <h3
            class="section-name px-2 mb-2 font-medium tracking-wide text-xxs text-grey-dark uppercase"
          >
            Examples
          </h3>
          <AppExampleButtons
            class="w-full p-2 flex flex-col flex-no-shrink flex-wrap"
          />
        </div>
        <div class="about mt-auto pt-8 text-grey-dark">
          <div class="section px-4 my-4">
            <div class="flex justify-between">
              <h3 class="section-name font-medium text-xxs uppercase">About</h3>
              <span class="font-medium text-xxs text-grey">
                {{ prettyHtmlVersion }}
              </span>
            </div>
            <div class="section-item leading-normal flex items-center mt-4">
              <p class="text-sm font-normal">
                Offline Playground for
                <a
                  href="https://github.com/prettyhtml/prettyhtml"
                  class="no-underline font-bold text-grey-dark"
                  target="_blank"
                >
                  Prettyhtml
                </a>
                <br />
                Source code on
                <a
                  href="https://github.com/prettyhtml/pretty-html-web"
                  class="no-underline font-bold text-grey-dark"
                  target="_blank"
                >
                  GitHub
                </a>
                <br />
                Built w/ Vue &middot; by
                <a
                  href="https://www.mesutkoca.com"
                  class="no-underline font-bold text-grey-dark"
                  target="_blank"
                >
                  Mesut Koca
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content bg-white flex flex-1 flex-col overflow-hidden z-10">
      <header class="header border-b-2 flex items-center px-4 py-3">
        <button
          class="hamburger focus:outline-none text-grey-darker hover:text-black"
          @click="showSidebar = !showSidebar;"
        >
          <!-- prettier-ignore -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"><g fill="currentColor"><path v-if="showSidebar" d="M20.05 11H5.91l1.3-1.29a1 1 0 0 0-1.42-1.42l-3 3a1 1 0 0 0 0 1.42l3 3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.91 13h14.14a1 1 0 0 0 .95-.95V12a1 1 0 0 0-.95-1z"/><rect x="3" y="11" width="18" height="2" rx=".95" ry=".95"/><rect x="3" y="17" width="18" height="2" rx=".95" ry=".95"/><rect x="3" y="5" width="18" height="2" rx=".95" ry=".95"/></g></svg>
        </button>
        <div v-if="!showSidebar" class="logo-mobile ml-6 flex items-center">
          <a href="#" class="logo w-32 -my-1 ">
            <img src="./assets/logo.png" class="" alt="PrettyHtml" />
          </a>
        </div>
        <div class="ml-auto hidden lg:flex items-center">
          <span class="text-xs text-grey-dark font-medium uppercase pr-2">
            Examples
          </span>
          <AppExampleButtons />
        </div>
        <button
          @click="prettify"
          class="ml-auto bg-grey-lighter text-grey-darker uppercase hover:bg-grey-darker hover:text-white font-bold text-sm py-2 px-6 rounded-full inline-flex items-center tracking-wide focus:outline-none focus:shadow-outline"
        >
          <!-- prettier-ignore -->
          <svg class="stroke-current w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="9971 -24 8.766 10.985"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M9971.5-23.5l7.766 4.992-4.5 2.892-3.266 2.101z"/></svg>
          <span class="">Run</span>
        </button>
      </header>
      <main class="section--main flex-1 flex flex-col lg:flex-row min-h-0">
        <div
          class="editor flex-no-shrink flex-1 flex flex-col overflow-hidden pt-4"
        >
          <header class="flex relative">
            <h3
              class="px-4 flex-no-shrink font-medium tracking-wide text-xxs text-grey-dark uppercase"
            >
              Source
            </h3>
            <button
              @click="clear"
              class="absolute text-grey-dark flex items-center pin-r pin-t -mt-2 mr-2 p-1 font-normal hover:text-grey-darkest rounded mx-1 focus:outline-none focus:shadow-outline"
              title="clear text"
            >
              <!-- prettier-ignore -->
              <svg class="w-4 h-4 mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
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
          class="output border-t-2 lg:border-t-0 lg:border-l-2 flex-no-shrink flex-1 flex flex-col overflow-hidden pt-4"
        >
          <!-- prettier-ignore -->
          <header class="flex relative">
            <h3 class="px-4 flex-no-shrink font-medium tracking-wide text-xxs text-grey-dark uppercase">
              Output
            </h3>
            <button class="btn-copy absolute text-grey-dark flex items-center pin-r pin-t -mt-2 mr-2 p-1 font-normal uppercase text-xs hover:text-grey-darkest rounded mx-1 focus:outline-none focus:shadow-outline group">
              <span class="opacity-0 font-semibold mr-2 text-grey-dark group-hover:opacity-100">
                Copy to clipboard
              </span>
              <svg class="w-5 h-5 mt-px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
            </button>
          </header>
          <prism-editor
            class="my-editor mt-4 px-2 focus:outline-none"
            :code="result"
            language="html"
            :style="{ 'tab-size': opts.tabWidth }"
            readonly
            :line-numbers="linenumbers"
          />
          <header class="flex relative pt-4 border-t-2" v-show="debugMsg">
            <h3
              class="px-4 flex-no-shrink font-medium tracking-wide text-xxs text-grey-dark uppercase"
            >
              Debug
            </h3>
          </header>
          <prism-editor
            v-show="debugMsg"
            class="my-editor debug-editor mt-4 px-2 focus:outline-none"
            :code="debugMsg"
            language="html"
            :style="{ 'tab-size': opts.tabWidth }"
            :readonly="true"
            :line-numbers="false"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import "vue-prism-editor/dist/VuePrismEditor.css";
import ClipboardJS from "clipboard";
import "./assets/styles.css";
import { startWorkers, getWorkers } from "./workers";
import PrismEditor from "vue-prism-editor";
import AppToggle from "./components/AppToggle";
import AppExampleButtons from "./components/AppExampleButtons";
import Examples from "./utils/Examples.js";
import EventBus from "./EventBus.js";

startWorkers();
const defaultOpts = {
  tabWidth: 2, // the space width of your indentation level (default: 2)
  useTabs: false, // use tabs instead spaces for indentation (default: false)
  printWidth: 80, // use different maximum line length (default: 80)
  usePrettier: false, // use prettier for embedded content (default: true)
  singleQuote: false, // use single quote instead double quotes (default: `"`)
  wrapAttributes: false, // force to wrap attributes (when it has multiple)
};
export default {
  name: "app",
  components: {
    AppToggle,
    AppExampleButtons,
    PrismEditor,
  },

  data() {
    return {
      isMobile: false,
      showSidebar: true,
      prettifier: null,
      prettyHtmlVersion: preval`
        module.exports = require('../package.json').devDependencies['@starptech/prettyhtml'].substr(1);
      `,
      linenumbers: true,
      opts: { ...defaultOpts },
      debugMsg: "",
      result: "",
      code: "",
    };
  },
  async mounted() {
    this.prettifier = getWorkers().prettyhtml.run;
    new ClipboardJS(".btn-copy", {
      text: () => this.result,
    });
    let screenSize = 0;
    const checkScreenSize = () => {
      if (screenSize !== window.innerWidth && window.innerWidth <= 576) {
        this.isMobile = true;
        this.showSidebar = false;
      } else if (window.innerWidth > 576 && window.innerWidth <= 991) {
        this.isMobile = false;
        this.showSidebar = false;
      } else if (window.innerWidth > 991) {
        this.isMobile = false;
        this.showSidebar = true;
      }
      screenSize = window.innerWidth;
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    EventBus.$on("example", this.example);
  },
  methods: {
    async prettify() {
      try {
        this.debugMsg = "";
        this.result = await this.prettifier(this.code, this.opts);
      } catch (err) {
        const workerMsg = err.message;
        this.debugMsg = `❌  ${workerMsg.name} - ${workerMsg.ruleId ||
          "Error"}: ${workerMsg.message}`;
        // eslint-disable-next-line
        console.error(`❌  ${workerMsg.ruleId || "Error"}:`, workerMsg);
      }
    },
    resetToDefaults() {
      this.opts = { ...defaultOpts };
    },
    clear() {
      this.debugMsg = "";
      this.code = "";
      this.result = "";
    },
    changeCode(code) {
      this.code = code;
    },
    example(lang) {
      this.clear();
      this.code = Examples[lang];
      this.prettify();
    },
  },
};
</script>

<style>
.sidebar {
  -webkit-overflow-scrolling: touch;
}

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
.debug-editor {
  height: 150px;
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.35s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translate3d(-101%, 0, 0);
}
</style>
