<script lang="ts">
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

{#if requestResetPasswordDialog}
    <RequestResetPassword bind:emailOrUsername on:requestResetPassword={() => requestResetPassword()} />
{/if}

{#if confirmRecoveryDialog}
   <ConfirmRecovery bind:recoveryInput on:confirmRecovery={() => confirmRecovery()} recoveryData={recoveryData} /> 
{/if}

{#if resetPasswordDialog}
    <ResetPassword />
{/if}