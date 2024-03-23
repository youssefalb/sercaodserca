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
          currency: 'pln',
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
        console.log(`Auction changed from ${oldValue} to ${newValue}`);
        console.log(`AuctionEnded changed from ${oldValue.AuctionEnded} to ${newValue.AuctionEnded}`);
        console.log(`currentHighestBidder changed from ${oldValue.currentHighestBidderEmail} to ${newValue.currentHighestBidderEmail}`);
        if (!oldValue.AuctionEnded && newValue.AuctionEnded && newValue.currentHighestBidderEmail) {
            const auctionId = context.params.auctionId;
            const auctionTitle = newValue.title; // Make sure the title is being retrieved correctly
            
            const mailRef = admin.firestore().collection('mail').doc();
            await mailRef.set({
                to: [newValue.currentHighestBidderEmail],
                message: {
                    subject: `Вітаємо! Ви виграли аукціон за ${auctionTitle}`,
                    text: `Ви виграли аукціон "${auctionTitle}". Будь ласка, перевірте свою електронну пошту для отримання додаткових інструкцій.`,
                    html: `
                       <h1>Вітаємо!</h1>
                        <p>Ви успішно виграли аукціон за <strong>${auctionTitle}</strong>.</p>
                        <h2>Деталі аукціону:</h2>
                        <p><strong>Назва аукціону:</strong> ${auctionTitle}</p>
                        <p><strong>Ідентифікатор аукціону:</strong> ${auctionId}</p>
                        <h2>Інструкції щодо оплати:</h2>
                        <p>Будь ласка, завершіть оплату, використовуючи наведені нижче банківські реквізити:</p>
                        <table>
                            <tr><td>Номер клієнта:</td><td>ZMW8D5</td></tr>
                            <tr><td>Банк:</td><td>BNP PARIBAS</td></tr>
                            <tr><td>SWIFT Код:</td><td>PRABPLPKXXX</td></tr>
                            <tr><td>IBAN:</td><td>PL09160011721749583650000001</td></tr>
                        </table>
                        <p>Використовуйте ідентифікатор вашого аукціону (${auctionId}) як референс для вашого платежу.</p>
                        <p>Після завершення платежу, будь ласка, відповідайте на цей електронний лист із підтвердженням трансферу та вашою контактною інформацією.</p>
                        <p>Якщо вам потрібна допомога або у вас є якісь питання, будь ласка, не соромтеся звертатися до нас.</p>
                        <p>З найкращими побажаннями,</p>
                        <p>Od Serca do Serca</p>
                    `,
                },
            });
            console.log(`Email queued for delivery!`);
        }
    });



exports.checkAndEndAuctions = functions.pubsub.schedule('every 24 hours').onRun(async context => {
    const now = admin.firestore.Timestamp.now();
    const auctionsRef = admin.firestore().collection('auctions');
    console.log(`Checking for auctions that have ended before ${now.toDate()}`);
    console.log(`Current time: ${now.toDate()}`);
    console.log(`Auction: ${auctionsRef}`);
    const querySnapshot = await auctionsRef
        .where('endOfAuction', '<=', now)
        .where('AuctionEnded', '==', false)
        .get();

    querySnapshot.forEach(async (doc) => {
        await auctionsRef.doc(doc.id).update({
            AuctionEnded: true
        });
        console.log(`Auction ${doc.id} ended due to time up.`);
    });
});