<script>
    import { createEventDispatcher } from 'svelte';

    var dispatch = createEventDispatcher();

    function navigate2Workspace() {
        dispatch('navigate', {
            page: 'workspace'
        });
    }

    function navigate2Moderation() {
        dispatch('navigate', {
            page: 'moderation'
        });
    }
</script>

<style>

</style>

Bitte wählen Sie
<button on:click={navigate2Workspace}>Workspace</button>
<button on:click={navigate2Moderation}>Moderation</button>
