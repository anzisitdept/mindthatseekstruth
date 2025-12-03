"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import InputField from "./InputField";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Radio } from "@material-tailwind/react";
import PayPalButton from "./PayPalButton";
import { Button } from "@material-tailwind/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import { generateConsultationHtml } from "./EmailEbookSender";
import { redirect } from "next/navigation";

const timeOptions = [
  {
    name: "11AM - 3PM",
    identifier: "11AM - 3PM",
  },
  {
    name: "7PM - 11PM",
    identifier: "7PM - 11PM",
  },
];

const ConsultationBookingMechanism = ({planData}) => {
  const [name, setName] = useState("");
  const [skypeId, setSkypeId] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("11AM - 3PM");
  const [day, setDay] = useState("Monday");
  const [shouldAskToPay, setShouldAskToPay] = useState(false)
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);

  const items = [
    {
      name: planData.title,
      quantity: 1,
      unit_amount: {
        currency_code: "USD",
        value: planData.price,
      },
    },
  ]
  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.unit_amount.value) * item.quantity,
    0
  );

  const handlePostSubmit = async ()=>{
    try {
         const response = await fetch('/api/send-email', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             "x-mailgun-api-key": process.env.NEXT_PUBLIC_MAILGUN_API_KEY
           },
           body: JSON.stringify({
             "recipient": email,
             "subject": `Your consultation is booked, ${name}!`,
             "content": generateConsultationHtml({name, email, skypeId, time, day, planData: planData}),
           }),
         });
   
         const data = await response;
         if (response.ok) {
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "x-mailgun-api-key": process.env.NEXT_PUBLIC_MAILGUN_API_KEY
            },
            body: JSON.stringify({
              "recipient": "Md007m@gmail.com",
              "subject": `You've new consultation, Mehran!`,
              "content": generateConsultationHtml({name, email, skypeId, time, day, planData: planData}),
            }),
          });
          const response2 = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "x-mailgun-api-key": process.env.NEXT_PUBLIC_MAILGUN_API_KEY
            },
            body: JSON.stringify({
                        "recipient": "djam4343@gmail.com",
              "subject": `You've new consultation, Mehran!`,
              "content": generateConsultationHtml({name, email, skypeId, time, day, planData: planData}),
            }),
          });
           const wait = await toast.success("consultation booked with mehran!");
            setEmail("");
            setName("")
            setSkypeId("")
          } else {
         toast.error("Something went wrong, but don't worry we will deliver your order manually, you can even reach out to us on contact us page.")
         }
       } catch (error) {
         console.error('Error:', error);
         toast.error("Something went wrong, but don't worry we will deliver your order manually, you can even reach out to us on contact us page.")
       } finally {
         setShouldAskToPay(false);

       }
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
      // handlePostSubmit()
    setShouldAskToPay(true);
  }

  return (
    <form className="py-4 w-full flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputField
        inputName="Full Name"
        inputType="text"
        inputValue={name}
        inputautoComplete={"name"}
        requiredInput={true}
        valueReturner={setName}
      />
      <InputField
        inputName="Your email"
        inputType="email"
        inputValue={email}
        inputautoComplete={"email"}
        requiredInput={true}
        valueReturner={setEmail}
      />
      <InputField
        inputName="Skype ID"
        inputType="text"
        inputValue={skypeId}
        inputautoComplete={"skype"}
        requiredInput={true}
        valueReturner={setSkypeId}
      />
      <h3 className="text-xl text-left my-5">Your Preferred Time</h3>
      <div className="flex flex-wrap md:gap-4 justify-between gap-2">
        {timeOptions.map((method, i) => {
          return (
            <div
              className={`lg:w-[48%] w-full transition-all duration-300 rounded-xl text-left gap-4 select-none px-3 py-5 relative border-2 cursor-pointer flex items-center ${
                method.identifier === time && "border-blue-500"
              } justify-start`}
              key={i}
              onClick={() => setTime(method.identifier)}
            >
              <div>
                <h3>{method.name}</h3>
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{ __html: method.context }}
                ></div>
              </div>

              <div
                className={`bg-blue-500 w-fit p-1 rounded-full absolute top-0 right-0 translate-x-2 -translate-y-2 ${
                  time === method.identifier ? "flex" : "hidden"
                }`}
              >
                <IoCheckmarkSharp  className="text-white" />
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="text-xl text-left my-5">Your Preferred Day</h3>
      <div className="flex flex-wrap gap-3 w-full">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
          (dayOption, index) => (
            <Radio
              key={index}
              name="day"
              label={dayOption}
              checked={day === dayOption}
              onChange={() => setDay(dayOption)}
            />
          )
        )}
      </div>
      <p className="text-md text-left text-gray-800 italic">
      {`Mehran will consult you, for ${planData.duration} on coming ${day}, between ${time}`}
<br />
All requested appointments are subject to confirmation to avoid double booking on the same time slot
      </p>
      
<Button
              className="w-full bg-black py-3 rounded-xl text-white text-lg flex items-center justify-center gap-2 group my-3 !font-semibold"
              loading={isSubmissionLoading}
              type="submit"
            >
              Clear your mind
              <MdOutlineKeyboardArrowRight className="group-hover:translate-x-2 transition-all duration-200" />
            </Button>
{shouldAskToPay && (
              <section className="w-screen h-screen fixed inset-0 z-20  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 flex items-center justify-center">
                <div className="md:w-1/2 w-full p-4">
                  <PayPalButton
                    items={items}
                    totalAmount={total}
                    onSuccess={handlePostSubmit}
                  />
                </div>
              </section>
            )}
    </form>
  );
};

export default ConsultationBookingMechanism;
