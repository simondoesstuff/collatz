<script>
  export let n = 11;
  $: odd = n % 2 == 1;
</script>

<div class="grid place-items-center min-w-8 min-h-8 p-1" class:bg-primary-content={odd}>
  <p class:text-primary={odd} class="text-center">
    {n}
  </p>
</div>
