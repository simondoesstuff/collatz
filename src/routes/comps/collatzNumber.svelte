<script lang="ts">
  import * as numProps from "$lib/numberProperties";
  import { fade } from "svelte/transition";
  import type { Config } from "./config";

  export let onClick: (event: MouseEvent) => void;
  export let root = 11;
  export let config: Config;

  $: showPrime = numProps.isPrime(root) && config.primes;
  $: showBase = config.bases && root % 2 == 1;

  $: inFamilyIsolate = numProps.fitsFamily(
    root,
    config.isolate.coefficient,
    config.isolate.constant
  );
  $: gray = config.isolate.hideOrGray && !inFamilyIsolate;
  $: hide = !config.isolate.hideOrGray && !inFamilyIsolate;

  let shownRoot: number;
  $: if (config.isolate.useInner) {
    if (inFamilyIsolate) {
      shownRoot = numProps.familyInner(
        root,
        config.isolate.coefficient,
        config.isolate.constant
      );
    } else {
      shownRoot = root;
    }
  } else {
    shownRoot = root;
  }

  $: binary = numProps
    .inBinary(shownRoot)
    .map((x) => (x ? 1 : 0))
    .join("");
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
      {#if config.binary}
        {binary}
      {:else}
        {shownRoot}
      {/if}
    </p>
  </button>
{/if}
