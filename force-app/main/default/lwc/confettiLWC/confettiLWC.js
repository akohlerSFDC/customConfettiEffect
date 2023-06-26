import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import { loadScript } from "lightning/platformResourceLoader";
import CONFETTI from "@salesforce/resourceUrl/Confetti";

let counter = 0;
const colors = ['#bb0000', '#ffffff'];
 
export default class confettiLWC extends LightningElement {
				
	@api recordId;
	stageName;

	connectedCallback() {
		Promise.all([
			loadScript(this, CONFETTI )
		])
		.then(() => {
			this.checkStageOnPageLoad();
		})
		.catch(error => {
			this.dispatchEvent(
				new ShowToastEvent({
					title: "Error",
					message: error.message,
					variant: error
				})
			);
		});
	}
	
	@wire(getRecord, { recordId: '$recordId', fields: 'Opportunity.StageName' })
	getStageValue({data, error}){
		
		if (data) {
			this.result = data;
			this.stageName = data.fields.StageName.value;
			this.checkStage();
			
		} else if (error) {
			console.error('ERROR => ', JSON.stringify(error));
		}
	}git add 
	
	checkStageOnPageLoad() {
		if(this.stageName === 'Proposal/Price Quote' || 
			this.stageName === 'Negotiation/Review' || 
			this.stageName === 'Closed Won') {
			setTimeout(() => {
				this.basicCannon();
			}, 1250);

		}
		counter++;
	}

	checkStage() {
		if(counter >= 1 && this.stageName === 'Closed Won') {
			setTimeout(() => {
				this.basicCannon();
			}, 1250);
		}
	}

	basicCannon() {
     confetti({
         particleCount: 600,
         spread: 500,
         colors: colors,
         origin: {
             y: 0.6
         }
     });
    }
}