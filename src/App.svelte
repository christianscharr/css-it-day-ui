<script>
    import Start from './Start.svelte';
    import Workspace from './Workspace.svelte';
    import Moderation from './Moderation.svelte';

    var activePage = 'start';

    function handleNavigation(event) {
        activePage = event.detail.page;
    }

    function navigateToStart() {
        activePage = 'start';
    }

    function navigateToWorkspace() {
        activePage = 'workspace';
    }

    function navigateToModeration() {
        activePage = 'moderation';
    }
</script>

<style>
    :global(body) {
        margin-top: 0;
    }

    :global(.hero-body) {
        background-image: url("./img/illustration01.svg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .hero-head {
        border-bottom: 2pt solid #F5F5F5;
    }

    .hero-body {
        padding: 0;
    }

    .hero-foot {
        border-top: 2pt solid #F5F5F5;
    }

    .navbar .navbar-item {
        padding: 0 0 0 .5rem;
    }

    .navbar .navbar-item span {
        padding-left: 15px;
        font-weight: bold;
    }

    .navbar img {
        height: 52px;
        width: 57px;
        max-height: none;
    }

    .svelte-logo {
        display: inline-block;
        height: 24px;
        width: 90px;
        background-image: url("./img/svelte-logo-horizontal.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .bulma-logo {
        display: inline-block;
        height: 24px;
        width: 110px;
        background-image: url("./img/bulma-logo.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .blockly-logo {
        display: inline-block;
        height: 24px;
        width: 64px;
        background-image: url("./img/blockly-logo.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
    }

    .footer {
        padding: 1rem;
    }

    .footer > .content .made-with {
        vertical-align: middle;
    }

    .footer > .content .made-with > a {
        vertical-align: middle;
        line-height: 24px;
        font-size: 12px;
    }

    .footer > .content .made-with > a {
        vertical-align: middle;
        line-height: 24px;
        font-size: 12px;
    }

    .navigation {
        font-size: 16px;
        line-height: 52px;
        padding-left: 1rem;
        vertical-align: middle;
    }

    .navigation .button {
        vertical-align: middle;
    }

    .nav-title {
        font-size: 16px;
        line-height: 52px;
        padding-left: 1rem;
        vertical-align: middle;
        font-weight: bold;
    }
</style>

<section class="hero is-fullheight">
    <div class="hero-head">
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="http://it-day.css-wedoit.com/">
                    <img src="./img/css_logo_d_public.jpg" />
                </a>
                <span class="nav-title">CSS Versicherung @ IT-Day Zürich 2019 - DownHill Challenge</span>
            </div>
            <div class="navigation">
                <div class="field has-addons">
                    <p class="control">
                        <button class="button" on:click={navigateToStart}>Start</button>
                    </p>
                    <p class="control">
                        <button class="button" on:click={navigateToWorkspace}>Workspace</button>
                    </p>
                    <p class="control">
                        <button class="button" on:click={navigateToModeration}>Moderation</button>
                    </p>
                </div>
            </div>
        </nav>
    </div>
    <div class="hero-body">
        {#if activePage == 'start'}
            <Start on:navigate={handleNavigation} />
        {:else if activePage == 'workspace'}
            <Workspace/>
        {:else if activePage == 'moderation'}
            <Moderation/>
        {/if}
    </div>
    <div class="hero-foot">
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    <strong>CSS Versicherung @ IT-Day Zürich 2019</strong> - Blockly UI by <a href="mailto:christian.scharr@css.ch">Christian Scharr</a>.
                </p>
                <div class="made-with">
                    <span>Made with <i class="fas fa-heart" style="color: #F03A5F;"></i> and </span>
                    <a href="https://svelte.dev/" target="_blank" title="Svelte">
                        <div class="svelte-logo"></div>
                    </a>
                    <span>+</span>
                    <a href="https://bulma.io" target="_blank" title="Bulma">
                        <div class="bulma-logo"></div>
                    </a>
                    <span>+</span>
                    <a href="https://developers.google.com/blockly" target="_blank" title="Blockly">
                        <div class="blockly-logo"></div>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</section>
