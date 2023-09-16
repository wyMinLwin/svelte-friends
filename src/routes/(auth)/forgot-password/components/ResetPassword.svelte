<script lang="ts">
    import AlertBox from "$lib/components/AlertBox.svelte";
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Icon from "@iconify/svelte";
    let newPassword = '';
    let reNewPassword = '';
    let newPasswordRef:HTMLInputElement;
    let reNewPasswordRef:HTMLInputElement;
    let alertMsg = '';
    let error = false;
    let success = false; 
    let suggestPw = false;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    const submitResetPasswordHandler = () => {
        suggestPw = false;
        if (success) return;
        if (newPassword.length > 0 && reNewPassword.length === 0) {
            reNewPasswordRef?.focus();
            return;
        }
        if (newPassword !== reNewPassword) {
            error = true;
            alertMsg = "Password didn't match.";
            return;
        }
        if (!passwordRegex.test(newPassword)) {
            error = true;
            alertMsg = "Please enter a valid password";
            suggestPw = true;
            return;
        }
        success = true;
        error = false;
        alertMsg = "Password successfully changed."
    }
    onMount(() => {
        newPasswordRef?.focus();
    })
    $: if (newPassword || reNewPassword) alertMsg = "";
</script>

<form on:submit|preventDefault={() => submitResetPasswordHandler()} class="w-full py-3 px-6 sm:px-10 rounded-3xl bg-white-shade-1 flex flex-col justify-center items-center gap-3 text-gray-shade-1 text-sm transition-all box-shadow">
    <div class="font-semibold text-2xl text-black barlow">Reset Password</div>
    {#if !!alertMsg && error }
        <AlertBox text={alertMsg} bg={"bg-red-shade-1"} color="text-red-shade-3" />
    {:else if !!alertMsg && !error}
        <AlertBox text={alertMsg} bg={"bg-green-shade-1"} color={"text-green-shade-2"} />
    {/if}    
    <input disabled={success} bind:value={newPassword} bind:this={newPasswordRef} type="password" class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Enter new password..." />
    <input disabled={success} bind:value={reNewPassword} bind:this={reNewPasswordRef} type="password" class="bg-white-shade-2 form-container-border w-full px-3 py-2 rounded-md focus:outline-gray-shade-1" placeholder="Re-enter new password..." />
    {#if suggestPw}
        <div in:fly={{ y:-5,duration:500}} class="text-xs">&#9888; Password must contain at least one capital letter, one small letter, one number and one special character and minimum length must be 8.</div>
    {/if}
    <button disabled={success} type="submit" class={`w-full px-3 py-2 text-white-shade-2 ${!success ? 'bg-sky-shade-1 click-effect' : 'bg-gray-shade-1'} rounded-md`}>Save</button>
    {#if success}
        <a href="/login" in:fly={{ y:-5,duration:500}} class={`w-full px-3 py-2 text-white-shade-2 bg-sky-shade-1 click-effect rounded-md flex justify-center items-center gap-2`}>
            <span>Back to Login</span> <Icon class='text-lg' icon="solar:route-linear" />
        </a>
    {/if}
</form>