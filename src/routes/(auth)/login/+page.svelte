<script lang="ts">
    import { fly } from "svelte/transition"
    import appleLogo from "$lib/images/apple.png"
    import googleLogo from "$lib/images/google.png"
    import { tick } from "svelte";
    let name = "";
    let password = "";
    let passwordInput:HTMLInputElement;
    let passwordBox = false;
    const onSubmitHandler = async () => {
        if (!passwordBox) {
            passwordBox = true;
            await tick();
            passwordInput.focus();
            return;
        }
    }
</script>

<form on:submit|preventDefault={(e) => onSubmitHandler()} class="w-full py-3 px-6 sm:px-10 rounded-md form-container-border bg-white-shade-1 flex flex-col justify-center items-center gap-3 text-gray-shade-1 text-sm transition-all">
    <div class="font-semibold text-2xl text-black barlow">Be With Friends</div>

    <input type="text" bind:value={name} class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Email or username" />
    
    {#if passwordBox}
    <div class="w-full p-0 flex flex-col items-start gap-3" in:fly={{ y:-5,duration:500}}>
        <input bind:this={passwordInput} type="password" bind:value={password} class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Password" />
        <a href="/login" class="text-end text-xs ml-auto">Forgot Password?</a>
    </div>
    {/if}
    
    <button on:click={() => onSubmitHandler()} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">{ !passwordBox ? 'Continue' : 'Login'}</button>
    
    <div class="w-full px-3 flex justify-between items-center gap-x-3">
        <div class="bg-gray-shade-1 grow" style="height: 1px;"></div>
        <div>Or</div>
        <div class="bg-gray-shade-1 grow" style="height: 1px;"></div>
    </div>
    
    <button class="click-effect w-full px-3 py-2 text-white-shade-2 bg-white-shade-2 rounded-md flex justify-start items-center gap-x-5">
        <img width="20" height="20" src={googleLogo} alt="sign in with google"/>
        <div class="text-black/80">Sign In With Google</div>
    </button>
    
    <button class="click-effect w-full px-3 py-2 text-white-shade-2 bg-black rounded-md flex justify-start items-center gap-x-5">
        <img width="17" height="20" src={appleLogo} alt="sign in with apple"/>
        <div>Sign In With Apple</div>
    </button>
    
    <a href="/login" class="text-end text-xs ml-auto">New to Friends? Sign up here</a>
</form>