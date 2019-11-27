Blockly.Blocks['start'] = {
    init: function () {
        this.appendValueInput("INPUT")
            .setCheck("Array")
            .appendField("Input");

        this.appendValueInput("OUTPUT")
            .setCheck("Array")
            .appendField("Output");

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
    var inputVal = Blockly.JavaScript.valueToCode(block, 'INPUT', Blockly.JavaScript.ORDER_ATOMIC);
    var outputVal = Blockly.JavaScript.valueToCode(block, 'OUTPUT', Blockly.JavaScript.ORDER_ATOMIC);
    var setupCode = Blockly.JavaScript.statementToCode(block, 'SETUP_CODE');
    var tickCode = Blockly.JavaScript.statementToCode(block, 'TICK_CODE');
    return '() => { return {"inputVal": ' + inputVal + ', "outputVal": ' + outputVal + ', "setupFn": () => {' + setupCode + '}, "tickFn": () => {' + tickCode + '} }; }';
};
