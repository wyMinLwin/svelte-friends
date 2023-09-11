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
    let input1Ref:HTMLInputElement;
    let input2Ref:HTMLInputElement;
    let input3Ref:HTMLInputElement;
    let input4Ref:HTMLInputElement;
    let input5Ref:HTMLInputElement;
    let input6Ref:HTMLInputElement;

    const getOtpCode = () => {
        gonnaAutoVerify = true;
        inputNumberArray = [null,null,null,null,null,null];
        optSent = true;
        input1Ref.focus();
    }

    const jumpInput = () => {

    }

    onMount(() => {
        confirmRecoveryRef.focus();
    });

    $: {
        if ((inputNumberArray.lastIndexOf(null) !== -1) && inputNumberArray.findLastIndex(n => typeof n === 'number') > inputNumberArray.findIndex(n => n === null)) {
            gonnaAutoVerify = false;
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
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && input2Ref.focus()} bind:this={input1Ref} type="number" bind:value={inputNumberArray[0]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && input3Ref.focus()} bind:this={input2Ref} type="number" bind:value={inputNumberArray[1]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && input4Ref.focus()} bind:this={input3Ref} type="number" bind:value={inputNumberArray[2]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && input5Ref.focus()} bind:this={input4Ref} type="number" bind:value={inputNumberArray[3]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && input6Ref.focus()} bind:this={input5Ref} type="number" bind:value={inputNumberArray[4]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
                <input on:keyup={(e) => !!Number(e.key) && gonnaAutoVerify && dispatch('confirmRecovery')} bind:this={input6Ref} type="number" bind:value={inputNumberArray[5]} max="9" min="0" step="1" class="h-14 bg-white-shade-2 form-container-border rounded-md text-center text-2xl">
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