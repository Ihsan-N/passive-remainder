import Head from 'next/head';
import Reminder from '../components/Remainder';
import { FaBell, FaClock } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Passive-Aggressive Reminder</title>
        <meta name="description" content="Get the motivation you didn’t ask for" />
      </Head>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#152331] to-[#000000] relative overflow-hidden">
        {/* Background sarcastic text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 opacity-10 text-[10vw] font-bold tracking-widest">
          <p>Hurry up.</p>
          <p>You’re late.</p>
          <p>Don’t be lazy.</p>
          <p>Get it done.</p>
        </div>

        {/* Main content */}
        <div className="text-center text-white z-10">
          <h1 className="text-4xl mb-4 flex items-center justify-center">
            <FaBell className="mr-2" /> Passive-Aggressive Reminder <FaClock className="ml-2" />
          </h1>
          <Reminder />
        </div>
      </main>
    </div>
  );
}
