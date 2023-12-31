<script lang="ts">
  import * as collatz from "$lib/collatz";
  import CollatzNumber from "./comps/collatzNumber.svelte";
  import BacktrackVisual from "./comps/backtrackVisual.svelte";
  import { defaultConfig } from "./comps/config";
  import Config from "./comps/config.svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores"; 
  import { onMount } from "svelte";

  let expMode = true;
  let nExp = "11";
  let n = 11;

  // Parse the expression with eval and look for a positive integer
  $: if (nExp) parseExp();

  function parseExp() {
    try {
      let e = parseInt(eval(nExp));
      if (!isNaN(e) && e > 0) n = e;
    } catch (ignored) {}
  }

  function toggleExpMode() {
    expMode = !expMode;

    if (!expMode) {
      nExp = n.toString();
    }

    parseExp();
  }

  let path: number[][];
  $: if (config.sort == 'slope') {
    path = collatz.path.slopeGrouped(n);
  } else {
    path = collatz.path.baseGrouped(n);
  }
  
  $: pathUnwrapped = path.reduce((a, b) => a.concat(b));
  $: basePathLength = path.length;
  $: pathLength = pathUnwrapped.length;

  let configModal: any;
  let config = defaultConfig();

  let backtrackModalController: any;
  let backtrackFloat: any;
  let backtrackRootValue = 0;
  let backtrackFlip = false;
  let backtrackKey = {};

  function handleBacktrack(event: MouseEvent, n: number) {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();

    // if more than half of the screen is on the right, flip the float
    const y = rect.y;
    backtrackFloat.style.top = `${y}px`;
    backtrackFlip = rect.left > window.innerWidth / 2;

    if (backtrackFlip) {
      const x = window.innerWidth - rect.x - rect.width;
      backtrackFloat.style.right = `${x}px`;
      backtrackFloat.style.left = "unset";
    } else {
      const x = rect.x;
      backtrackFloat.style.left = `${x}px`;
      backtrackFloat.style.right = "unset";
    }

    backtrackModalController.showModal();
    backtrackKey = {};
    backtrackRootValue = n;
  }
  
  //   Store state in the URL
  
  {
    // load state from URL
    let params = $page.url.searchParams;
    let nParam = params.get('n');
    let confParam = params.get('conf');
    if (nParam) nExp = nParam;
    if (confParam) config = JSON.parse(confParam);
  }
  
  $: if (typeof window !== 'undefined') {
    // save state to URL
    let params = $page.url.searchParams;
    params.set('n', n.toString());
    params.set('conf', JSON.stringify(config));
    history.pushState({}, '', $page.url.toString());
  }
</script>

<section id="nav" class="navbar bg-base-200 justify-center md:justify-start">
  <button
    on:click={toggleExpMode}
    class="m-2 aspect-square btn btn-xl btn-outline"
    class:btn-secondary={expMode}
  >
    <b class="prose-xl">
      {#if expMode}
        <span class="italic">E</span>
      {:else}
        <span>N</span>
      {/if}
    </b>
  </button>
  {#if expMode}
    <input type="text" bind:value={nExp} class="input input-bordered" />
  {:else}
    <input type="number" bind:value={nExp} class="input input-bordered" />
  {/if}
</section>

<!--  Config section accessible via modal button on < lg  -->
<button
  class="btn btn-sm md:hidden m-3 absolute -right-0"
  on:click={() => configModal.showModal()}
>
  ⇧
</button>
<dialog bind:this={configModal} class="modal modal-bottom">
  <form method="dialog" class="modal-box grid place-items-center">
    <Config bind:config />
  </form>
  <!-- This weird thing is standard for daisy ui -->
  <form method="dialog" class="modal-backdrop">
    <button />
  </form>
</dialog>

<section
  id="stats"
  class="stats w-full justify-center sm:justify-start stats-horizontal"
>
  <div class="stat">
    <div class="stat-value">{pathLength - 1}</div>
    <div class="stat-desc">→ Steps</div>
  </div>

  <div class="stat">
    <div class="stat-value">{basePathLength}</div>
    <div class="stat-desc">↘︎ Bases</div>
  </div>
</section>

<!-- Main collatz stuff & config on right (lg) -->
<div class="flex justify-end m-3 md:m-5 h-full">
  <span class="w-full">
    <section id="collatzViewer">
      <div class="flex flex-col">
        {#each path as row}
          <div class=" flex rounded-md flex-wrap">
            {#each row as n, i}
                <CollatzNumber
                  onClick={(e) => handleBacktrack(e, row[row.length - i - 1])}
                  root={row[row.length - i - 1]}
                  config={config}
                />
            {/each}
          </div>
        {/each}
        <div />
      </div>
    </section>
  </span>
  <!-- Config Section on the right on lg -->
  <div class="hidden lg:flex divider divider-horizontal mx-12">∘</div>
  <span class="hidden lg:block">
    <Config bind:config />
  </span>
</div>

<!-- Backtack modal activates when clicking on a number -->
<dialog bind:this={backtrackModalController} class="modal">
  <form method="dialog" class="z-10">
    <button class="absolute" bind:this={backtrackFloat}>
      {#key backtrackKey}
        <BacktrackVisual root={backtrackRootValue} flip={backtrackFlip} />
      {/key}
    </button>
  </form>
  <!-- This weird thing is standard for daisy ui -->
  <form method="dialog" class="modal-backdrop w-screen h-screen">
    <button />
  </form>
</dialog>
