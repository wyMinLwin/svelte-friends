<script lang="ts">
    import { fade, fly } from "svelte/transition"
    import appleLogo from "$lib/images/apple.png"
    import googleLogo from "$lib/images/google.png"
    import { tick } from "svelte";
    import { goto } from "$app/navigation";
    import AlertBox from "$lib/components/AlertBox.svelte";
    import { GetRequest, PostRequest } from "$lib/services/apiCaller";
    let emailOrUsername = "";
    let password = "";
    let passwordInput:HTMLInputElement;
    let passwordBox = false;
    let loginError = "";
    const onSubmitHandler = async () => {
        if (emailOrUsername.length < 1) return; 
        if (!passwordBox) {
            passwordBox = true;
            await tick();
            passwordInput.focus();
            return;
        }
        if (passwordBox && password) {
            const res = await PostRequest({path:'login',data:{email:emailOrUsername,password}});
            if (res !== undefined) {
                if (!res.success) {
                    loginError = res.message
                } else {
                    goto('/')
                }
                return;

            }
            loginError = "Something was wrong. Please Try Again."
        }
    }

    $: if (emailOrUsername && password) loginError = "";
</script>

<form on:submit|preventDefault={(e) => onSubmitHandler()} class="w-full py-3 px-6 sm:px-10 rounded-3xl bg-white-shade-1 flex flex-col justify-center items-center gap-3 text-gray-shade-1 text-sm transition-all box-shadow">
    <div class="font-semibold text-2xl text-black barlow">Be With Friends</div>

    {#if loginError}
        <AlertBox text={loginError} bg={"bg-red-shade-1"} color="text-red-shade-3" />
    {/if}

    <input on:keypress={() => loginError = ''} type="text" bind:value={emailOrUsername} class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Email or username" />
    
    {#if passwordBox}
        <input on:keypress={() => loginError = ''} in:fly={{ y:-5,duration:500}} bind:this={passwordInput} type="password" bind:value={password} class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Password" />
    {/if}
    
    <button on:click={() => onSubmitHandler()} class="click-effect w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 rounded-md">{ !passwordBox ? 'Continue' : 'Login'}</button>
    
    <div class="w-full px-3 flex justify-between items-center gap-x-3">
        <div class="bg-gray-shade-1 grow" style="height: 1px;"></div>
        <div>Or</div>
        <div class="bg-gray-shade-1 grow" style="height: 1px;"></div>
    </div>
    
    <button class="click-effect w-full px-3 py-2 text-white-shade-2 bg-white-shade-2 rounded-md flex justify-start items-center gap-x-5" style="box-shadow: 0px 0px 3px -1px rgba(0,0,0,0.75);">
        <img width="20" height="20" src={googleLogo} alt="sign in with google"/>
        <div class="text-black/80">Sign In With Google</div>
    </button>
    
    <button class="click-effect w-full px-3 py-2 text-white-shade-2 bg-black rounded-md flex justify-start items-center gap-x-5">
        <img width="17" height="20" src={appleLogo} alt="sign in with apple"/>
        <div>Sign In With Apple</div>
    </button>
    
    <a href="/forgot-password" class="text-center text-sm text-sky-shade-2 p-0">Forgot Password?</a>
    <a href="/login" class="text-center text-sm text-sky-shade-2">Create Friends Account?</a>
</form>