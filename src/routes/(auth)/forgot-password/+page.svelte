<script lang="ts">
    import { fly } from "svelte/transition";
    import ConfirmRecovery from "./components/ConfirmRecovery.svelte";
    import RequestResetPassword from "./components/RequestResetPassword.svelte";
    import ResetPassword from "./components/ResetPassword.svelte";
    
    let requestResetPasswordDialog = true;
    let emailOrUsername = "";
    let confirmRecoveryDialog = false;
    let resetPasswordDialog = false;
    let recoveryData = "";
    let recoveryInput = "";

    const requestResetPassword = () => {
        if (emailOrUsername.length < 1) return;
        //fetch recovery data from api but for now just comment
        recoveryData = "testing123@gmail.com";
        requestResetPasswordDialog = false;
        confirmRecoveryDialog = true;
    }

    const confirmRecovery = () => {
        confirmRecoveryDialog = false;
        resetPasswordDialog = true;
    }
</script>

<div class="relative">
    {#if requestResetPasswordDialog}
        <div out:fly={{x:-200,duration:320}} class="box-container">
            <RequestResetPassword bind:emailOrUsername on:requestResetPassword={() => requestResetPassword()} />
        </div>
    {/if}
    {#if confirmRecoveryDialog}
        <div in:fly={{x:200,duration:320}} out:fly={{x:-200,duration:320}} class="box-container">
            <ConfirmRecovery bind:recoveryInput on:confirmRecovery={() => confirmRecovery()} recoveryData={recoveryData} /> 
        </div>
    {/if}
    {#if resetPasswordDialog}
        <div in:fly={{x:200,duration:320}} class="box-container">
            <ResetPassword />
        </div>
    {/if}
</div>

<style>
    .box-container {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>