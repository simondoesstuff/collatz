<script lang="ts">
  export let root = 0;
  let history: number[] = [];
  $: right = root * 2;
  $: up = (root - 1) % 3 == 0 ? (root - 1) / 3 : 0;

  export let flip = false;

  function push(n: number) {
    history.push(root);
    root = n;
  }
  
  function pop(e: Event) {
    if (history.length == 0) return;
    root = history.pop()!;
    e.preventDefault();
  }
</script>

<div class:-translate-y-[55%]={up}>
  <div id="backtrackFloat" class="grid grid-cols-2">
    {#if up}
      <button on:click|preventDefault={() => push(up)} class="btn btn-primary">
        {up}
      </button>
    {:else}
      <button />
    {/if}
    <button />
    <button 
    on:click={pop}
    class:order-3={flip}
    class="btn">
      {root}
    </button>
    <button
      on:click|preventDefault={() => push(right)}
      class:order-2={flip}
      class="btn btn-neutral"
    >
      {right}
    </button>
  </div>
</div>

<style>
  div > .btn {
    @apply btn-circle outline outline-1;
  }
</style>
