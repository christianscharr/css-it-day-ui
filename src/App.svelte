<script>
    import Start from './Start.svelte';
    import Workspace from './Workspace.svelte';
    import Moderation from './Moderation.svelte';

    var activePage = 'start';

    function handleNavigation(event) {
        activePage = event.detail.page;
    }
</script>

<style>

</style>

<h1 class="title is-1 has-text-info has-text-centered">CSS Versicherung - Agile DownHill Challenge</h1>
{#if activePage == 'start'}
    <Start on:navigate={handleNavigation} />
{:else if activePage == 'workspace'}
    <Workspace/>
{:else if activePage == 'moderation'}
    <Moderation/>
{/if}
