<script lang="ts">
  import * as numProps from "$lib/numberProperties";
  import { fade } from "svelte/transition";
  import type { Config } from "./config";

  export let onClick: (event: MouseEvent) => void;
  export let root = 11;
  export let config: Config;

  $: showPrime = numProps.isPrime(root) && config.prime;
  $: showBase = config.base && root % 2 == 1;

  $: inFamilyIsolate = numProps.fitsFamily(
    root,
    config.isolate.coef,
    config.isolate.const
  );
  $: gray = config.isolate.hide && !inFamilyIsolate;
  $: hide = !config.isolate.hide && !inFamilyIsolate;

  let displayRoot: string;
  $: {
    let value = root;
    
    if (config.isolate.inner && inFamilyIsolate) {
      value = numProps.familyInner(
        root,
        config.isolate.coef,
        config.isolate.const
      );
    }
    
    if (config.base == 10) displayRoot = value.toString();
    else {
      // this won't work for bases > 10
      // smashing digits together is a hack
      let str = numProps.inBase(value, config.base)
        .join('');
      displayRoot = str;
    }
  }
</script>

{#if !hide}
  <button
    class="hover:brightness-75 dark:hover:brightness-150 hover:bg-[#00000077] dark:hover:bg-[#ffffff77]
                  hover:rounded-md hover:scale-125 transition-transform duration-300"
    on:click={onClick}
  >
    <p
      class="min-w-8 min-h-8 p-1 transition-bg duration-300 text-center"
      transition:fade={{ delay: 250, duration: 300 }}
      class:bg-primary-content={showBase}
      class:text-primary={showBase}
      class:badge={showPrime}
      class:badge-outline={showPrime}
      class:badge-secondary={showPrime}
      class:opacity-30={gray}
    >
      {displayRoot}
    </p>
  </button>
{/if}
