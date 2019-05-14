import { LightningElement, api, track } from 'lwc';

export default class SearchButton extends LightningElement {
    @api buttonLabel = 'Search';
    @api placeholderText = 'Enter a search term';
    @api autoSearchMinLength = 0;
    @api autoSearchDelay = 250;

    // Dispatch the `search` event
    dispatchChangeEvent(value) {
        this.dispatchEvent(new CustomEvent('search', { detail: { value } }));
    }

    // Latest search value
    @track value = '';

    // timer id
    timeoutId;

    // Handle <input> change
    handleInput(event) {
        event.preventDefault();
        this.oldValue = this.value;
        this.value = event.srcElement.value;
        this.queueDispatch(this.oldValue, this.value);
    }

    // Queue event dispatch
    queueDispatch(oldValue, value) {
        if (this.autoSearchDelay > 0) {
            this.cancelDispatch();
            // if new value is sufficient length
            if (value.length >= this.autoSearchMinLength) {
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                this.timeoutId = setTimeout(() => {
                    this.dispatchChangeEvent(value);
                }, this.autoSearchDelay);
                // transition from greater than to less thna min length
            } else if (oldValue.length >= this.autoSearchMinLength) {
                // eslint-disable-next-line @lwc/lwc/no-async-operation
                this.timeoutId = setTimeout(() => {
                    this.dispatchChangeEvent(undefined);
                }, this.autoSearchDelay);
            }
        }
    }

    // Cancel queued event dispatch
    cancelDispatch() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }

    // Handle <button> click
    handleClick(event) {
        event.preventDefault();
        this.cancelDispatch();
        this.dispatchChangeEvent(this.value);
    }
}
