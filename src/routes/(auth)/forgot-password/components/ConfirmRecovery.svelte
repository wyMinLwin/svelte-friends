<script lang="ts">
    import AlertBox from "$lib/components/AlertBox.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { fly } from "svelte/transition";
    const dispatch = createEventDispatcher();
    export let recoveryData:string;
    export let recoveryInput:string;
    let inputNumberArray:Array<null|number> = [null,null,null,null,null,null];
    let optSent = false;
    let gonnaAutoVerify = true;
    
    let confirmRecoveryRef:HTMLInputElement;
    let inputRefArray:Array<HTMLInputElement|undefined> = [undefined,undefined,undefined,undefined,undefined,undefined];
    
    const getOtpCode = () => {
        gonnaAutoVerify = true;
        inputNumberArray = [null,null,null,null,null,null];
        optSent = true;
        inputRefArray[0]?.focus();
    }
    
    onMount(() => {
        confirmRecoveryRef.focus();
    });

    $: {
        if ((inputNumberArray.lastIndexOf(null) !== -1) && inputNumberArray.findLastIndex(n => typeof n === 'number') > inputNumberArray.findIndex(n => n === null)) {
            gonnaAutoVerify = false;
        } else {
            inputRefArray[inputNumberArray.findIndex(n => n === null)]?.focus()
        }
    }
    $: inputNumberArray = inputNumberArray.map(number => {
        if (number !== null) {
            return Number(number.toString().slice(0,1))
        }
        return number;
    });
</script>

<form on:submit|preventDefault={() => getOtpCode()} class="w-full py-3 px-6 sm:px-10 rounded-3xl bg-white-shade-1 flex flex-col justify-center items-center gap-3 text-gray-shade-1 text-sm transition-all box-shadow">
    <div class="font-semibold text-2xl text-black barlow">Confirm Recovery</div>
    {#if optSent}
        <AlertBox text="OTP code already sent." bg={"bg-green-shade-1"} color={"text-green-shade-2"} />
    {/if}
    <div class="flex justify-center items-center text-black font-semibold">
        <div>{recoveryData.slice(0,3)}</div>
        <div class="w-1 h-1 ml-0.5 rounded-full bg-black"></div>
        <div class="w-1 h-1 ml-0.5 rounded-full bg-black"></div>
        <div class="w-1 h-1 ml-0.5 rounded-full bg-black"></div>
        <div class="w-1 h-1 mx-0.5 rounded-full bg-black"></div>
        <div>{recoveryData.slice(recoveryData.indexOf('@')-3,)}</div>
    </div>
    <input bind:this={confirmRecoveryRef} bind:value={recoveryInput} type="text" class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Enter your recovery email" />
    <button on:click={() => getOtpCode()} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">Send OTP Code</button>  
    {#if optSent}
        <div class="w-full flex flex-col gap-3" in:fly={{ y:-5,duration:500}}>
            <div class="w-full grid grid-cols-6 gap-2">
                <input bind:this={inputRefArray[0]} type="number" bind:value={inputNumberArray[0]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input bind:this={inputRefArray[1]} type="number" bind:value={inputNumberArray[1]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input bind:this={inputRefArray[2]} type="number" bind:value={inputNumberArray[2]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input bind:this={inputRefArray[3]} type="number" bind:value={inputNumberArray[3]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input bind:this={inputRefArray[4]} type="number" bind:value={inputNumberArray[4]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && dispatch('confirmRecovery')} bind:this={inputRefArray[5]} type="number" bind:value={inputNumberArray[5]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
            </div>
            <button on:click={() => dispatch('confirmRecovery')} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">Verify</button>
        </div>
    {/if}  
</form>

<style>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
</style>