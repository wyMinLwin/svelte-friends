<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let recoveryData:string;
    export let recoveryInput:string;
    let inputNumberArray:Array<null|number> = [null,null,null,null,null,null];
    
    let confirmRecoveryRef:HTMLInputElement;
    onMount(() => {
        confirmRecoveryRef.focus();
    });
    $: inputNumberArray = inputNumberArray.map(number => {
        if (number !== null) {
            return Number(number.toString().slice(0,1))
        }
        return number;
    });
</script>

<form on:submit|preventDefault={() => dispatch('confirmRecovery')} class="w-full py-3 px-6 sm:px-10 rounded-3xl bg-white-shade-1 flex flex-col justify-center items-center gap-3 text-gray-shade-1 text-sm transition-all box-shadow">
    <div class="font-semibold text-2xl text-black barlow">Confirm Recovery</div>
    <div class="flex justify-center items-center text-black font-semibold">
        <div>{recoveryData.slice(0,3)}</div>
        <div class="w-1 h-1 ml-0.5 rounded-full bg-black"></div>
        <div class="w-1 h-1 ml-0.5 rounded-full bg-black"></div>
        <div class="w-1 h-1 ml-0.5 rounded-full bg-black"></div>
        <div class="w-1 h-1 mx-0.5 rounded-full bg-black"></div>
        <div>{recoveryData.slice(recoveryData.indexOf('@')-3,)}</div>
    </div>
    <input bind:this={confirmRecoveryRef} bind:value={recoveryInput} type="text" class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Enter your recovery email" />
    <button on:click={() => dispatch('confirmRecovery')} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">Send OTP Code</button>  
    <div class="w-full grid grid-cols-6 gap-2">
        <input type="number" bind:value={inputNumberArray[0]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
        <input type="number" bind:value={inputNumberArray[1]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
        <input type="number" bind:value={inputNumberArray[2]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
        <input type="number" bind:value={inputNumberArray[3]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
        <input type="number" bind:value={inputNumberArray[4]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
        <input type="number" bind:value={inputNumberArray[5]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
    </div>
    <button on:click={() => dispatch('confirmRecovery')} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">Verify</button>  
</form>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
</style>