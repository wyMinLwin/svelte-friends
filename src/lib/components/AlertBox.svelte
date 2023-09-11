<script lang="ts">
    import { fade } from "svelte/transition";
    export let text :string;
    export let bg: string = "bg-sky-shade-1";
    export let color: string = "text-white-shade-2";
</script>

<div transition:fade={{duration:200}} class={`w-full ${bg} ${color} px-3 py-2 rounded-md text-center`}>
    {text}
</div>