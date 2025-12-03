import React from 'react'
import pricingPlans from "../../../data/ConsultationPlans.json"
import { redirect } from 'next/navigation';
import ConsultationBookingMechanism from '../../../components/ConsultationBookingMechanism';
redirect

const page = ({params}) => {
  const {plan} = params;
  let planData = null;
  pricingPlans.forEach(planDetails => {
    if(planDetails.slug == plan){ planData = planDetails}
  });

  if(!planData) redirect("/consultation")
  return (
    <main className='my-8 p-4 text-center'>
      <div>
        <h2 className='mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white'>
         Book {planData.title}
        </h2>
      </div>
      <section className='flex md:flex-row md:justify-center flex-col gap-10 md:gap-4'>
        <div className='md:w-1/2 md:px-20 items-center flex justify-center'>
          <ConsultationBookingMechanism planData={planData} />
        </div>
        <div className='md:py-20'>
        <ul role="list" className="mb-8 space-y-8 text-left">
                {planData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className='text-xl text-gray-700'>{feature}</span>
                  </li>
                ))}
                                  <li className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className='text-xl text-gray-700'>PLUS ADDED BENEFITS!!!</span>
                  </li>
              </ul>
        </div>

      </section>
    </main>
  )
}

export default page
