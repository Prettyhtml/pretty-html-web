export default {
  html: `<!DOCTYPE html>
  <html lang="en">
    <head>
    </head>

    <body class="text-center">
      <form class="form-signin">
        <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
  <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
              <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    </body>
  </html>`,
  vue: `
<div id="app">
      <div class="header">
    <button @click="prettify">Prettify</button>
  </div>
  <textarea wrap/>
      <div style="display:flex">
    <prism-editor class="my-editor" :code="code" @change="changeCode" language="html" />
<prism-editor :code="result" language="html" />
  </div>
</div>`,
  angular: `<form #heroForm (ngSubmit)="onSubmit(heroForm)">
  <input type="text" class="input too much classes" [(onChange)]="dede" name="test" />
    <button [style.color]="isSpecial ? 'red' : 'green'"></button></form>`,
  svelte: `<input bind:value='newCat' placeholder='Cat name + [ENTER]' on:keydown='addCat(event.keyCode===13)'>
  <button on:click='addCat()'>Add</button>
    <ul>
        {{#each cats as cat}}
    <Cat cat='{{ cat }}'></Cat>
  {{/each}}
  </ul>
<p>Count: {{count}}</p>`
};
