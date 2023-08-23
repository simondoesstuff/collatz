<script>
  import * as collatz from "$lib/collatz.ts";
  import CollatzNumber from "../comps/collatzNumber.svelte";

  let n = 11;
  $: path = collatz.path.normalGrouped(n);
  $: basePathLength = path.length;
  $: pathLength = path.reduce((a, b) => a.concat(b)).length - 1;
</script>

<div class="navbar bg-base-200 justify-center md:justify-start">
  <b> <h1 class="p-3 prose prose-2xl">N</h1> </b>
  <input type="number" bind:value={n} class="input input-bordered" />
</div>

<div
  id="stats"
  class="stats w-full justify-center sm:justify-start stats-horizontal"
>
  <div class="stat">
    <div class="stat-value">{pathLength}</div>
    <div class="stat-desc">→ Steps</div>
  </div>

  <div class="stat">
    <div class="stat-value">{basePathLength}</div>
    <div class="stat-desc">↘︎ Bases</div>
  </div>
</div>

<main id="collatzViewer" class="m-3 md:m-5">
  <div class="flex flex-col">
    {#each path as row}
      <div class=" flex rounded-md">
        {#each row as n, i}
          <div class="">
            <CollatzNumber n={row[row.length - i - 1]} />
          </div>
        {/each}
      </div>
    {/each}
    <div />
  </div>
</main>
