"use client";
import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import InputField from "../components/InputField";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import PayPalButton from "../components/PayPalButton";
import Image from "next/image";
import { toast } from "react-toastify";

export default function AskQuestionPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [shouldAskToPay, setShouldAskToPay] = useState(false);

  const items = [
    {
      name: "Question Submission",
      quantity: 1,
      unit_amount: {
        currency_code: "USD",
        value: "45.00",
      },
    },
  ];

  const total = items.reduce(
    (acc, item) => acc + parseFloat(item.unit_amount.value) * item.quantity,
    0
  );

  const handleSubmission = (e) => {
    e.preventDefault();
    setShouldAskToPay(true);
   
  };

  const handlePostSubmit = async (e) => {
    const data = {
      customer: {
        name,
        email,
        gender
      },
      question,
      status: "unanswered"
    };
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-mailgun-api-key": process.env.NEXT_PUBLIC_MAILGUN_API_KEY
        },
        body: JSON.stringify({
          "recipient": "Md007m@gmail.com",
          "subject": `A new paid question, Mehran!`,
          "content": `Hello Mehran,\n\nA new question has been submitted and is awaiting your response.\n\nCustomer Details:\n- Name: ${data.customer.name}\n- Email: ${data.customer.email}\n- Gender: ${data.customer.gender}\n\nQuestion:\n\"${data.question}\"\n\n\n\nPlease review and respond as soon as possible.\n\nBest,\nYour Team`,
        }),
      });
      const response3 = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-mailgun-api-key": process.env.NEXT_PUBLIC_MAILGUN_API_KEY
        },
        body: JSON.stringify({
          "recipient": "djam4343@gmail.com",
          "subject": `A new paid question, Mehran!`,
          "content": `Hello Mehran,\n\nA new question has been submitted and is awaiting your response.\n\nCustomer Details:\n- Name: ${data.customer.name}\n- Email: ${data.customer.email}\n- Gender: ${data.customer.gender}\n\nQuestion:\n\"${data.question}\"\n\n\n\nPlease review and respond as soon as possible.\n\nBest,\nYour Team`,
        }),
      });
      toast.success("Your message is received, you will get a reply on your email.")
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            aria-hidden="true"
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base/7 font-semibold text-blue-500">
                  Ask your question
                </p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-left text-gray-900 sm:text-5xl">
                  Get Mehran's guidance for life’s challenges
                </h1>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <Image
              alt="Mehran's guidance illustration"
              src="https://i.ibb.co/KmF6HyC/tanja-cotoaga-oj-LZ1-Zfghlg-unsplash-1.jpg"
              width={720}
              height={720}
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] skeleton-loading"
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-gray-700 lg:max-w-lg">
                <p>
                  Get personalized answers from Mehran Dadbeh. Whether you're
                  battling intrusive thoughts or navigating through a complex
                  relationships, and how to move on from break up, Mehran is here to help you find clarity.
                </p>
                <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <CloudArrowUpIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-blue-500"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Easy and secure.
                      </strong>{" "}
                      Submit your question quickly with secure
                      payment options.
                    </span>
                  </li>

                  <li className="flex gap-x-3">
                    <ServerIcon
                      aria-hidden="true"
                      className="mt-1 size-5 flex-none text-blue-500"
                    />
                    <span>
                      <strong className="font-semibold text-gray-900">
                        Mehran's advice.
                      </strong>{" "}
                      Receive detailed answers from Mehran Dadbeh with
                      vast experience in mental health, relationships (how to move on from break ups), OCD, OCD subsets (HOCD) and intrusive thoughts.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  No matter your question, you’re not alone. Get the support you
                  need today to move forward with confidence and peace of mind.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                  How it works
                </h2>
                <p className="mt-6">
                  Submit your question, complete the secure payment, and receive
                  a detailed response from Mehran Dadbeh. (Mehran Will Send you a personalized voice recording directly to your mail) Every step is designed
                  to provide clarity and guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full justify-center items-center">
        <div className="my-4">
          <h2 className="md:text-4xl text-2xl font-bold uppercase  text-center">
            Ask Mehran to Empty your <strong className="before:bg-blue-400">heart</strong>
          </h2>
          <p className="text-center text-xl    text-gray-500">
            Feel free to ask mehran anything, and everything. 
          </p>
          
          <p className="text-center text-xl    text-gray-500">
            $45 /  question 
          </p>

          <form
            onSubmit={handleSubmission}
            className="p-4 md:w-[50%] mx-auto my-10 gap-3 flex flex-col"
          >
            <InputField
              inputAutoComplete={"email"}
              inputName={"Email"}
              valueReturner={setEmail}
              inputValue={email}
              requiredInput={true}
              className="w-1/2"
            />
            <InputField
              inputAutoComplete={"name"}
              inputName={"Name"}
              valueReturner={setName}
              inputValue={name}
              requiredInput={true}
              className="w-1/2"
            />
            <InputField
              inputAutoComplete={"gender"}
              inputName={"Gender"}
              valueReturner={setGender}
              inputValue={gender}
              requiredInput={true}
              className="w-1/2"
            />
            <textarea
              required
              placeholder="Be bold in asking your question.."
              value={question}
              onInput={(e) => {
                setQuestion(e.target.value);
              }}
              className="border-2 border-gray-300 rounded-lg p-2 min-h-[15rem] max-h-[30rem]"
            ></textarea>
            <Button
              className="w-full bg-black py-3 rounded-xl text-white text-lg flex items-center justify-center gap-2 group my-3 !font-semibold"
              loading={isSubmissionLoading}
              type="submit"
            >
              Submit your question
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
        </div>
      </section>
    </main>
  );
}
