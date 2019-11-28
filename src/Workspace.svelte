<script>
    import {onMount} from 'svelte';
    import './starter.block';

    var blocklyDiv;
    var toolbox;
    var workspace;
    var defaultWorkspace;
    var team = '';
    var sprintSelected;
    var HOST_SSL = (window.location.protocol === "https:");
    var HOST_ADRESS = window.location.host;

    onMount(() => {
        console.log('Blockly Div:', blocklyDiv);
        console.log('Toolbox', toolbox);

        workspace = Blockly.inject('blocklyDiv', {
            toolbox: document.getElementById('toolbox'),
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            trashcan: true,
            media: './blockly/media/',
            move: {
                scrollbars: true,
                drag: true,
                wheel: false,
            },
            maxBlocks: Infinity,
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            comments: true,
        });

        Blockly.Xml.domToWorkspace(defaultWorkspace, workspace);
    });

    function onClear() {
        workspace.clear();
        Blockly.Xml.domToWorkspace(defaultWorkspace, workspace);
    }

    async function onSave() {
        if (!!!team || team.trim().length < 3 | /^[a-z]*$/.test(team) === false) {
            alert("Der Teamname sollte mindestens 3 Zeichen lang sein und nur Kleinbuchstaben enthalten!");
            return;
        }

        var blocklyXml = Blockly.Xml.workspaceToDom(workspace);
        var blocklyCode = Blockly.JavaScript.workspaceToCode(workspace);

        if (blocklyXml.outerHTML.match(/<block[^>]*>/g).length < 2) {
            alert("Fehler: Workspace scheint ausser Startblock leer zu sein!");
            return;
        }

        const savepoint = {
            team: team,
            sprint: sprintSelected,
            workspace: btoa(blocklyXml.outerHTML),
            code: btoa(blocklyCode)
        };

        console.log("Saving...", blocklyXml, blocklyCode);

        var response = await fetch('http' + (HOST_SSL ? 's' : '') + '://' + HOST_ADRESS + '/save', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(savepoint)
        });

        if (response.ok) {
            alert('Erfolgreich gespeichert :)');
        } else {
            alert('Ein Fehler ist aufgetreten :(');
        }
    }

    async function onLoad() {
        var response = await fetch('http' + (HOST_SSL ? 's' : '') + '://' + HOST_ADRESS + '/team/' + team + '/sprint/' + sprintSelected + '/latest', {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response.json().then(res => {
            var loadedWs = document.createRange().createContextualFragment(atob(res.body.workspace)).firstChild;
            workspace.clear();
            Blockly.Xml.domToWorkspace(loadedWs, workspace);
        });
    }
</script>

<style>
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

    #defaultWorkspace {
        display: none;
        visibility: hidden;
    }

    #blocklyDiv {
        height: 650px;
        width: 100%;
    }

    #toolbox {
        display: none;
    }

    #footer-right {
        margin-right: 1em;
        margin-top: 5pt;
    }

    #footer label {
        margin-left: 10pt;
        margin-right: 10pt;
    }
</style>

<div class="container main">
    <div id="blocklyDiv" bind:this={blocklyDiv}></div>
    <div class="level" id="footer">
        <div class="level-left">
            <label for="team">Team:</label>
            <div class="control has-icons-left">
                <input id="team" class="input" type="text" placeholder="Teamname" bind:value={team}/>
                <span class="icon is-small is-left">
				<i class="fas fa-users"></i>
			</span>
            </div>
            <label for="team">Sprint:</label>
            <div class="control has-icons-left">
                <select class="input" bind:value={sprintSelected}>
                    <option value="sprint-2">Sprint 2</option>
                    <option value="sprint-3">Sprint 3</option>
                    <option value="sprint-4">Sprint 4</option>
                </select>
                <span class="icon is-small is-left">
				<i class="fas fa-briefcase"></i>
			</span>
            </div>
        </div>
        <div class="level-right" id="footer-right">
            <div class="field has-addons">
                <p class="control">
                    <button class="button is-info" on:click={onSave}>
                    <span class="icon is-small">
                        <i class="fas fa-save"></i>
                    </span>
                        <span>Speichern</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button" on:click={onLoad}>
                    <span class="icon is-small">
                        <i class="fas fa-file-upload"></i>
                    </span>
                        <span>Letzten Speicherpunkt laden</span>
                    </button>
                </p>
                <p class="control">
                    <button class="button is-danger is-light" on:click={onClear}>
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                        <span>Leeren</span>
                    </button>
                </p>
            </div>
        </div>
    </div>
</div>

<xml xmlns="https://developers.google.com/blockly/xml" id="defaultWorkspace" bind:this={defaultWorkspace}>
    <block type="start" id="#W*4-OFCiGl/w@Od)}nQ" x="13" y="13"></block>
</xml>

<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox" bind:this={toolbox}>
    <category name="Logic" colour="210">
        <block type="controls_if"></block>
        <block type="controls_ifelse"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_ternary"></block>
    </category>
    <category name="Lists" colour="260">
        <block type="lists_create_empty"></block>
        <block type="lists_create_with"></block>
        <block type="lists_repeat"></block>
        <block type="lists_reverse"></block>
        <block type="lists_isEmpty"></block>
        <block type="lists_length"></block>
        <block type="lists_indexOf"></block>
        <block type="lists_getIndex"></block>
        <block type="lists_setIndex"></block>
        <block type="lists_sort"></block>
        <block type="lists_split"></block>
    </category>
    <category name="Loops" colour="120">
        <block type="controls_repeat_ext"></block>
        <block type="controls_repeat"></block>
        <block type="controls_whileUntil"></block>
        <block type="controls_for"></block>
        <block type="controls_forEach"></block>
        <block type="controls_flow_statements"></block>
    </category>
    <category name="Math" colour="230">
        <block type="math_number"></block>
        <block type="math_arithmetic"></block>
        <block type="math_single"></block>
        <block type="math_trig"></block>
        <block type="math_constant"></block>
        <block type="math_number_property"></block>
        <block type="math_round"></block>
        <block type="math_on_list"></block>
        <block type="math_modulo"></block>
        <block type="math_constrain"></block>
        <block type="math_random_int"></block>
        <block type="math_random_float"></block>
        <block type="math_atan2"></block>
    </category>
    <category id="catText" colour="160" name="Text">
        <block type="text"></block>
        <block type="text_join"></block>
        <block type="text_append"></block>
        <block type="text_length"></block>
        <block type="text_isEmpty"></block>
        <block type="text_indexOf"></block>
        <block type="text_charAt"></block>
        <block type="text_getSubstring"></block>
        <block type="text_changeCase"></block>
        <block type="text_trim"></block>
        <block type="text_print"></block>
        <block type="text_prompt_ext"></block>
    </category>
    <category name="Variables" colour="330" custom="VARIABLE"></category>
</xml>
