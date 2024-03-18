import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

admin.initializeApp();

// Ensure the Stripe version matches the version you intend to use for your integration
const stripe = new Stripe(functions.config().stripe.secret, { apiVersion: '2023-10-16' });

exports.createStripeCheckoutSession = functions.https.onCall(async (data, context) => {
  // Check authentication. Only authenticated users can create a checkout session.
  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Custom Donation',
          },
          unit_amount: data.amount, // Ensure this amount is in cents (e.g., $10.00 = 1000)
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
    });

    return { sessionId: session.id };
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new functions.https.HttpsError('internal', error.message);
    } else {
      throw new functions.https.HttpsError('internal', 'Unknown error occurred while creating Stripe Checkout session');
    }
  }
});



exports.sendEmailOnAuctionEnd = functions.firestore
    .document('auctions/{auctionId}')
    .onUpdate(async (change, context) => {
        const newValue = change.after.data();
        const oldValue = change.before.data();
        console.log(`AuctionEnded changed from ${oldValue.AuctionEnded} to ${newValue.AuctionEnded}`);
        // Check if AuctionEnded changed to true
        if (!oldValue.AuctionEnded && newValue.AuctionEnded) {
            const auctionId = context.params.auctionId;
            console.log(`Auction ${auctionId} ended`);

            // Here you should add your logic to send an email
            // For example, using the "mail" collection as per the extension:
            const mailRef = admin.firestore().collection('mail').doc();
            await mailRef.set({
                to: ['biurowebokraft@gmail.com'], 
                message: {
                    subject: `Auction ${auctionId} has ended!`,
                    text: `The auction with ID ${auctionId} has successfully ended.`,
                    html: `The auction with ID ${auctionId} has successfully ended.`, // Customize your HTML email content here
                },
            });
            console.log(`Email queued for delivery!`);
        }
    });