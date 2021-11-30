import moment from 'moment';
import { getSession, useSession } from 'next-auth/client';
import Header from '../components/Header';
import db from '../../firebase';
import Order from '../components/Order';
import { useRouter } from 'next/router';

function Orders({ orders }) {
   const [session] = useSession();
   const router = useRouter();

   const backToHome = (e) => {
      e.preventDefault();
      router.push('/');
   };

   return (
      <div>
         <Header />
         <main className='max-w-screen-lg p-10 mx-auto'>
            <h1 className='pb-1 mb-2 text-3xl border-b border-yellow-400'>
               Your Orders
            </h1>

            {session ? (
               <h2 className='text-xl'>
                  {orders.length > 0 ? (
                     <>
                        {orders.length} Order{orders.length > 1 && 's'}
                     </>
                  ) : (
                     <>
                        You don't have any order yet. Go visit the{' '}
                        <button
                           onClick={backToHome}
                           className='text-yellow-400 underline link hover:no-underline'
                        >
                           Homepage Store
                        </button>{' '}
                        to purchase some items.
                     </>
                  )}
               </h2>
            ) : (
               <h2>Please sign in to see your orders.</h2>
            )}

            <div className='mt-5 space-y-4'>
               {orders?.map((order) => (
                  <Order
                     key={order.id}
                     id={order.id}
                     amount={order.amount}
                     amountShipping={order.amountShipping}
                     images={order.images}
                     timestamp={order.timestamp}
                     items={order.items}
                  />
               ))}
            </div>
         </main>
      </div>
   );
}

export default Orders;

//server side rendering of thenorders......

export async function getServerSideProps(context) {
   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

   //Getting user credentials

   const session = await getSession(context);

   if (!session) {
      return {
         props: {},
      };
   }

   //orders from firebase db
   const stripeOrders = await db
      .collection('users')
      .doc(session.user.email)
      .collection('orders')
      .orderBy('timestamp', 'desc')
      .get();

   // corresponding stripe orders

   const orders = await Promise.all(
      stripeOrders.docs.map(async (order) => ({
         id: order.id,
         amount: order.data().amount,
         amountShipping: order.data().amount_shipping,
         images: order.data().images,
         timestamp: moment(order.data().timestamp.toDate()).unix(),
         items: (
            await stripe.checkout.sessions.listLineItems(order.id, {
               limit: 100,
            })
         ).data,
      })),
   );

   return {
      props: {
         orders,
      },
   };
}
