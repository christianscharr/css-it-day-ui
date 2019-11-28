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

<div class="container">
    <div class="columns">
        <div class="column is-offset-one-quarter-desktop is-half-desktop is-offset-one-quarter-fullhd is-half-fullhd is-three-fifths-tablet is-offset-one-fifth-tablet is-three-fifths-mobile is-offset-one-fifth-mobile">
            <article class="message is-info">
                <div class="message-header">
                    <p>Bitte wählen Sie:</p>
                </div>
                <div class="message-body">
                    <div class="columns">
                        <div class="column is-half has-text-centered">
                            <button class="button is-primary is-large" on:click={navigate2Workspace}>Workspace</button>
                        </div>
                        <div class="column is-half has-text-centered">
                            <button class="button is-primary is-large" on:click={navigate2Moderation}>Moderation</button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</div>
