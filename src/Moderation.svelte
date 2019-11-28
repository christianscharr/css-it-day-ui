<script>
    import {onMount} from 'svelte';

    var HOST_SSL = (window.location.protocol === "https:");
    var HOST_ADRESS = window.location.host;

    var teams = [];
    var savefile = null;

    var blocklyIn = [];
    var blocklyOutVars = [];
    var blocklyOut = null;
    var blocklyTick = () => {};
    var blocklySetup = () => {};
    var isSetupRun = false;

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
        blocklyIn = [];
        blocklyOut = null;
        blocklyOutVars = [];
        blocklyTick = () => {};
        blocklySetup = () => {};
        isSetupRun = false;

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
            var geval = eval;
            var blocklyCode = geval(code)();
            blocklySetup = blocklyCode.setupFn;
            blocklyTick = blocklyCode.tickFn;

            for (var inputVal of blocklyCode.inputVal) {
                blocklyIn.push({
                    "name": inputVal,
                    "value": ""
                });
            }

            for (var outputVal of blocklyCode.outputVal) {
                blocklyOutVars.push(outputVal);
            }
        });
    }

    function executeSetup() {
        blocklySetup();
        var geval = eval;

        for (var inVal of blocklyIn) {
            if (parseInt(inVal.value) == inVal.value) {
                geval(inVal.name + " = " + inVal.value);
            } else {
                geval(inVal.name + " = '" + inVal.value + "'");
            }

            geval("console.log('Input \"" + inVal.name + "\": ', " + inVal.name + ")");
        }

        isSetupRun = true;
    }

    function executeTick() {
        var geval = eval;

        for (var inVal of blocklyIn) {
            if (parseInt(inVal.value) == inVal.value) {
                geval(inVal.name + " = " + inVal.value);
            } else {
                geval(inVal.name + " = '" + inVal.value + "'");
            }

            geval("console.log('Input \"" + inVal.name + "\": ', " + inVal.name + ")");
        }

        blocklyTick();

        var out = [];

        for (var outVar of blocklyOutVars) {
            out.push({
                name: outVar,
                value: geval(outVar)
            });
            console.log("Output '" + outVar + "': ", geval(outVar));
        }

        blocklyOut = out;
    }

    function updateValue(input, event) {
        for (var inVal of blocklyIn) {
            if (inVal.name == input) {
                inVal.value = event.target.value;
            }
        }
    }
</script>

<style>
    .load-and-simulate {
        margin-left: 15pt;
    }

    .main {
        background-color: #ffffff;
        padding: 1rem;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.5);
        box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.5);
    }
</style>

<div class="container main">
    {#if savefile !== null}
        <nav class="panel">
            <p class="panel-heading">
                Simulation von Team "{savefile.team}" in Sprint "{savefile.sprint}"
            </p>
        </nav>
        <div class="columns">
            {#each blocklyIn as { name }}
                <div class="column is-one-third">
                    <div class="field">
                        <label class="label" for="input-{name}">Input "{name}"</label>
                        <div class="control">
                            <input class="input" type="text" id="input-{name}" name="{name}" on:change={(event) => updateValue(name, event)}/>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
        <div class="level">
            <div class="level-right">
                <div class="field has-addons">
                    {#if isSetupRun}
                        <p class="control">
                            <button class="button" disabled="disabled">
                                <span class="icon is-small">
                                    <i class="fas fa-terminal"></i>
                                </span>
                                <span>Setup ausführen</span>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button is-primary" on:click={executeTick}>
                                <span class="icon is-small">
                                    <i class="fas fa-play"></i>
                                </span>
                                <span>Tick ausführen</span>
                            </button>
                        </p>
                    {:else}
                        <p class="control">
                            <button class="button is-primary" on:click={executeSetup}>
                                <span class="icon is-small">
                                    <i class="fas fa-terminal"></i>
                                </span>
                                <span>Setup ausführen</span>
                            </button>
                        </p>
                        <p class="control">
                            <button class="button" disabled="disabled">
                                <span class="icon is-small">
                                    <i class="fas fa-play"></i>
                                </span>
                                <span>Tick ausführen</span>
                            </button>
                        </p>
                    {/if}
                </div>
            </div>
        </div>
        {#if blocklyOut}
            <div class="columns">
                {#each blocklyOut as outVal}
                    <div class="column is-one-third">
                        <div class="field">
                            <label class="label" for="output-{outVal.name}">Output "{outVal.name}"</label>
                            <div class="control">
                                <input class="input" type="text" readonly="readonly" id="output-{outVal.name}" name="{outVal.name}" bind:value="{outVal.value}"/>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
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
                            <i class="fas fa-cloud-download"></i>
                        </span>
                        <span>Simulation laden</span>
                    </button>
                </div>
            {/each}
        </nav>
    {/each}
</div>
