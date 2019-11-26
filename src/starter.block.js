Blockly.Blocks['start'] = {
    init: function () {
        this.appendStatementInput("SETUP_CODE")
            .setCheck(null)
            .appendField("Setup");
        this.appendStatementInput("TICK_CODE")
            .setCheck(null)
            .appendField("Tick");
        this.setInputsInline(true);
        this.setColour(210);
        this.setTooltip("Starter Block - Die Basis deines Programms");
        this.setHelpUrl("");
        this.setMovable(false);
        this.setDeletable(false);
    }
};

Blockly.JavaScript['start'] = function (block) {
    var statements_setup_code = Blockly.JavaScript.statementToCode(block, 'SETUP_CODE');
    var statements_tick_code = Blockly.JavaScript.statementToCode(block, 'TICK_CODE');

    var setupCodeJS = 'var setupFunc = () => {\n' + statements_setup_code + '\n};';
    var tickCodeJS = 'var tickFunc = () => {\n' + statements_tick_code + '\n};';

    return setupCodeJS + '\n' + tickCodeJS;
};
