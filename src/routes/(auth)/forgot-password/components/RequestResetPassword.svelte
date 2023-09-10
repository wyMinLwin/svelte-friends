
<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let emailOrUsername:string;
    let emailOrUsernameRef:HTMLInputElement;
    onMount(() => {
        emailOrUsernameRef.focus();
    });
</script>

<form on:submit|preventDefault={() => dispatch('requestResetPassword')} class="w-full py-3 px-6 sm:px-10 rounded-3xl bg-white-shade-1 flex flex-col justify-center items-center gap-3 text-gray-shade-1 text-sm transition-all box-shadow">
    <div class="font-semibold text-2xl text-black barlow">Request Reset Password</div>
    <input bind:this={emailOrUsernameRef} bind:value={emailOrUsername} type="text" class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Email or username" />
    <button on:click={() => dispatch('requestResetPassword')} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">Continue</button> 
    <a href="/login" class="text-center text-sm text-sky-shade-2 p-0">Try To Login?</a>
    <a href="/login" class="text-center text-sm text-sky-shade-2">Create Friends Account?</a>
</form>
