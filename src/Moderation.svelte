<script>
    import {onMount} from 'svelte';

    var HOST_SSL = (window.location.protocol === "https:");
    var HOST_ADRESS = window.location.host;

    var teams = [];
    var savefile = null;

    var blocklyIn = [];
    var blocklyOut = [];
    var blocklyTick = () => {};
    var blocklySetup = () => {};

    onMount(() => {
        loadTeams();
    });

    async function loadTeams() {
        var response = await fetch('http' + (HOST_SSL ? 's' : '') + '://' + HOST_ADRESS + '/teams', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response.json().then(res => {
            teams = res.body;
        });
    }

    async function loadSavefile(team, sprint, timestamp) {
        var response = await fetch('http' + (HOST_SSL ? 's' : '') + '://' + HOST_ADRESS + '/team/' + team + '/sprint/' + sprint + '/timestamp/' + timestamp, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response.json().then(res => {
            savefile = res.body;
            var code = atob(savefile.code).replace(/(?:\r\n|\r|\n)/g, ' ');
            var blocklyCode = eval(code)();

            for (var inputVal of blocklyCode.inputVal) {
                blocklyIn.push({
                    "name": inputVal
                });
            }

            for (var outputVal of blocklyCode.outputVal) {
                blocklyOut.push({
                    "name": outputVal
                });
            }
        });
    }
</script>

<style>
    .load-and-simulate {
        margin-left: 15pt;
    }
</style>

<div class="container">
    {#if savefile !== null}
        <nav class="panel">
            <p class="panel-heading">
                Simulation von Team "{savefile.team}" in Sprint "{savefile.sprint}"
            </p>
        </nav>
        {#each blocklyIn as { name }}
            <div class="field">
                <label class="label" for="input-{name}">Input "{name}"</label>
                <div class="control">
                    <input id="input-{name}" class="input" type="text" name="{name}">
                </div>
            </div>
        {/each}
    {/if}
    {#each teams as { name, versions }, i}
        <nav class="panel">
            <p class="panel-heading">
                Team "{name}"
            </p>
            {#each versions as { sprint, timestamp }, j}
                <div class="panel-block">
                    <span class="panel-icon">
                        <i class="fas fa-save" aria-hidden="true"></i>
                    </span>
                    <span>Sprint "{sprint}" - {new Date(timestamp).toLocaleString()}</span>
                    <button class="load-and-simulate button is-primary" on:click={e => loadSavefile(name, sprint, timestamp) }>
                        <span class="icon is-small">
                            <i class="fas fa-cog"></i>
                        </span>
                        <span>Simulation laden</span>
                    </button>
                </div>
            {/each}
        </nav>
    {/each}
</div>
