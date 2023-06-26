# Confetti On Demand!

We all love the OOTB confetti effect [available on the Sales Path](https://admin.salesforce.com/blog/2019/introducing-salesforcecelebration), but its use case is somewhat limited in that it only fires once on a record change (specifically, a field picklist change that corresponds to an individual Path chevron).

It’s possible to have a customizable confetti effect that can be fired through code, with the ability to customize the confetti color, direction and more (for example, having the confetti fire on page load)!

**Note:** I did not invent this; I have aggregated what I’ve taken from these resources:

* [Add Confetti via Aura Components and Flows](https://forcepanda.wordpress.com/2019/07/19/add-confetti-effect-to-lightning-components-and-flows/);
* [LWC example](https://salesforceohana.wordpress.com/2020/10/23/custom-confetti-generator-reusable-lwc-component-in-salesforce-lightning/)

and adapted it for my client’s requirements, which were:

1. Fire on page load for three particular Opportunity Stages (use case being, if another user updated the record in question to one of those three stages, they wanted the user loading the page to see the success confetti);
2. Also fire whenever the user updated the record to ‘Closed Won’.

 Hopefully with this article I’ve made a faster path to implementation for your use case. 

# Implementing Through VSCode: 
This repo contains an example of my confettiLWC, and the static resource file that makes the magic happen.

You’ll need to: 

* Deploy the confettiLWC bundle and static resource to your org (edit the LWC as needed for your use case);
* Drag the custom LWC component onto the appropriate record page (it can go anywhere on the page; it’ll only serve as an invisible canvas for the confetti);
* Create a new Sales Path component and drag it onto the above-mentioned record page.

In the example LWC, I have it configured to fire when the page loads and if the Opp stage is:

* Proposal/Price Quote;
* Negotiation/Review;
* Closed Won.

It also fires if the stage is changed to ‘Closed Won’ by the user. 

# Implementing Through Unmanaged Package: 

* If you are installing into a sandbox org, skip this step: 
  * [Click on this link](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t8b000000qVrQ) and then sign into your org;
* If you are installing into a sandbox org, [click this link](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t8b000000qVrQ) and then sign into your org;
* Install the package;
* If you have the [Salesforce Advanced Code Searcher extension](https://chrome.google.com/webstore/detail/salesforce-advanced-code/lnkgcmpjkkkeffambkllliefdpjdklmi) installed and enabled, you can edit the confettiLWC in the UI as needed for your use case;
* Open the record page that you wish the confetti to appear on and click the gear and “edit page”;
* Drag the custom confettiLWC component onto the record page (it can go anywhere on the page; it’ll only serve as an invisible canvas for the confetti);
* Create a new Sales Path component with the proprietary elements needed for your use case and drag it onto the above-mentioned record page.

In the example LWC, I have it configured to fire when the page loads and if the Opportunity stage is:

* Proposal/Price Quote;
* Negotiation/Review;
* Closed Won.

It also fires if the stage is changed to ‘Closed Won’ by the user. 

**Final note:** The OOTB confetti effect can work in tandem with this custom-coded effect. For example, you can retain the OOTB confetti effect while still implementing the code that makes the confetti fire on page load. They will even fire simultaneously, but that’s a lot of confetti!
