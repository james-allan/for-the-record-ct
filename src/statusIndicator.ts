/**
 * The Status Indicator statuses.
 *
 * Running => represents when the clock is running and the app hasn't been terminated.
 * Idle => represents when the clock is paused/halted or the app has been terminated.
 */
export enum Status {
	Running,
	Idle
}

export class StatusIndicator {

	/**
	 * The input field.
	 */
	indicator: HTMLElement | null;

	/**
	 * Constructor.
	 */
	constructor() {
		this.indicator = document.getElementById( 'indicator' ) as HTMLElement | null;
	}

	/**
	 * Sets the status of the indicator.
	 *
	 * @param indicatorStatus The indicator status.
	 */
	setStatus( indicatorStatus: Status ): void {
		if ( this.indicator ) {
			this.indicator.style.display =
				indicatorStatus === Status.Running
					? 'block'
					: 'none';
		}
	}
}