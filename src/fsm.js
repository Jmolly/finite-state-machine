class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config.states;
        this.state = config.initial;
        this.undone = '';
        this.previousState = false;
        this.undoAction = false;
        this.redoAction = false;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config[state]) throw new Error();
    
        this.previousState = this.state;
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (!this.config[this.state].transitions[event]) throw new Error();
        this.previousState = this.state;
        this.state = this.config[this.state].transitions[event];
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];

        for (const name in this.config) {
            if (this.config[name].transitions.hasOwnProperty(event)) {
                result.push(name)
            }
          }
        
        return event ? result : Object.keys(this.config)
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        this.undoAction = false;
        if (this.previousState) {
            this.undone = this.state;
            this.state = this.previousState;
            this.previousState = '';
            this.undoAction = true;
            this.redoAction = false;
        }

        return this.undoAction;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        this.redoAction = false;
        if (this.undone) {
            this.state = this.undone;
            this.previousState = this.state;
            this.undone = '';
            this.undoAction = false;
            this.redoAction = true;
        }

        return this.redoAction;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.undoAction = false;
        this.redoAction = false;
        this.undone = '';
        this.previousState = '';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
