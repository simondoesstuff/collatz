<script lang="ts">
  import type { Config } from "./config";

  export let config: Config;
  
  let coefficient = config.isolate.coefficient;
  let constant = config.isolate.constant;
  $: if (!isNaN(coefficient)) config.isolate.coefficient = coefficient;
  $: if (!isNaN(constant)) config.isolate.constant = constant;
</script>

<div class="flex flex-col w-56">
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Highlight Bases</span> 
      <input bind:checked={config.bases} type="checkbox" class="toggle toggle-md toggle-primary" />
    </label>
  </div>

  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Indicate Prime</span> 
      <input bind:checked={config.primes} type="checkbox" class="toggle toggle-md toggle-secondary" />
    </label>
  </div>
  
 <div class="form-control">
    <label class="cursor-pointer label justify-start">
      <span class="label-text mr-2">Isolate</span> 
      <span id="isolateControls" class="">
        <span class="prose prose-lg mr-1">(</span>
        <input bind:value={coefficient} type="text" class="text-right"/>
        <b><span class="prose prose-lg italic">N</span></b>
        <span class="prose prose-lg m-2"> +</span>
        <input bind:value={constant} type="text" class="text-left"/>
        <span class="prose prose-lg mr-1">)</span>
      </span>
    </label>
    <label class="label mx-5">
      <span class="label-text">Hide</span> 
      <input bind:checked={config.isolate.hideOrGray} type="checkbox" class="toggle toggle-md" />
      <span class="label-text">Gray</span> 
    </label>
  </div>
</div>


<style>
  #isolateControls > input {
    @apply w-8 bg-transparent;
  }
</style>