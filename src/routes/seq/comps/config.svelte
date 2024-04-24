<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import type { Config } from "./config";

  export let config: Config;

  let coefficient = config.isolate.coef;
  let constant = config.isolate.const;
  $: if (!isNaN(coefficient)) config.isolate.coef = coefficient;
  $: if (!isNaN(constant)) config.isolate.const = constant;

  let groupByOptions = [
    { key: "base", display: "Base" },
    { key: "slope", display: "Base to Base Slope" },
  ];

  let groupBySelection = config.sort;
  $: config.sort = groupBySelection;

  let baseOptions = [
    { key: 10, display: "Decimal" },
    { key: 2, display: "Binary" },
    { key: 6, display: "Base 6" },
    { key: 3, display: "Base 3" },
  ];

  let baseSelection = config.base;
  $: config.base = baseSelection;

  function resetButton() {
    if (typeof window !== "undefined") {
      // erase all query params
      history.pushState({}, "", $page.url.pathname);
      location = location;
    }
  }
</script>

<div class="flex flex-col w-56">
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Highlight Bases</span>
      <input
        bind:checked={config.colorOdd}
        type="checkbox"
        class="toggle toggle-md toggle-primary"
      />
    </label>
  </div>

  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="label-text">Indicate Primes</span>
      <input
        bind:checked={config.prime}
        type="checkbox"
        class="toggle toggle-md toggle-secondary"
      />
    </label>
  </div>

  <div class="form-control">
    <label class="cursor-pointer label justify-start">
      <span class="label-text mr-2">Isolate</span>
      <span id="isolateControls" class="">
        <span class="prose prose-lg mr-1">(</span>
        <input bind:value={coefficient} type="text" class="text-right" />
        <b><span class="prose prose-lg italic">N</span></b>
        <span class="prose prose-lg m-2"> +</span>
        <input bind:value={constant} type="text" class="text-left" />
        <span class="prose prose-lg mr-1">)</span>
      </span>
    </label>
    <!-- sub section -->
    <div class="mx-5">
      <label class="label">
        <span class="label-text">Hide</span>
        <input
          bind:checked={config.isolate.hide}
          type="checkbox"
          class="toggle toggle-md"
        />
        <span class="label-text">Gray</span>
      </label>
      <label class="label">
        <span class="label-text">Use Inner</span>
        <input
          bind:checked={config.isolate.inner}
          type="checkbox"
          class="toggle toggle-md"
        />
      </label>
    </div>
  </div>

  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        >Group By<span>
          <select
            class="select select-bordered w-48"
            bind:value={groupBySelection}
          >
            {#each groupByOptions as { key, display }}
              <option selected={key === groupBySelection} value={key}>
                {display}
              </option>
            {/each}
          </select>
        </span>
      </span>
    </label>
  </div>

  <div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text"
        >Base<span>
          <select
            class="select select-bordered w-48"
            bind:value={baseSelection}
          >
            {#each baseOptions as { key, display }}
              <option selected={key === baseSelection} value={key}>
                {display}
              </option>
            {/each}
          </select>
        </span>
      </span>
    </label>
  </div>

  <div class="flex justify-center mt-5">
    <button class="btn shadow-lg" on:click={resetButton}> Reset </button>
  </div>
</div>

<style>
  #isolateControls > input {
    @apply w-8 bg-transparent;
  }
</style>
