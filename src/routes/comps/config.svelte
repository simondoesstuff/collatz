<script>
  export let config = {
    bases: true,
    primes: false,
    slope: false,
    family: false,
  };
</script>

<div class="flex flex-col">
  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Highlight Bases</span> 
      <input bind:checked={config.bases} type="checkbox" class="toggle toggle-md toggle-primary" />
    </label>
  </div>

  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Indicate Primes</span> 
      <input bind:checked={config.primes} type="checkbox" class="toggle toggle-md toggle-secondary" />
    </label>
  </div>
  
  <!-- <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Indicate Slope</span> 
      <input bind:checked={config.slope} type="checkbox" class="toggle toggle-md toggle-accent" />
    </label>
  </div>
  
  <div class="form-control w-52">
    <label class="cursor-pointer label">
      <span class="label-text">Indicate Family</span> 
      <input bind:checked={config.family} type="checkbox" class="toggle toggle-md toggle-success" />
    </label>
  </div> -->
</div>