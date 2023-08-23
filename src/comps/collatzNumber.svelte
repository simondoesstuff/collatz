<script>
    import * as numProps from "$lib/numberProperties";
    
  export let n = 11;
  
  export let indicateIfPrime = false;
  $: showPrime = numProps.isPrime(n) && indicateIfPrime;
  
  export let highlightBases = true;
  $: showBase = highlightBases && (n % 2 == 1);
</script>

<div
  class="grid place-items-center min-w-8 min-h-8 p-1 transition-bg duration-300"

  class:bg-primary-content={showBase}
  class:text-primary={showBase}

  class:badge={showPrime}
  class:badge-outline={showPrime}
  class:badge-secondary={showPrime}
>
  <p class="text-center">
    {n}
  </p>
</div>
