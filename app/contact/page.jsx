"use client";
import React, { useRef, useState } from "react";
import InputField from "../components/InputField.jsx";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import Image from "next/image";

const ContactPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Honeypot state to catch bots
  const formRef = useRef(null);

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      setEmail("");
      setName("");
      setMessage("");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setError("");
      return true;
    } else {
      setError("Please enter a valid email address");
      return false;
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Honeypot check
    if (honeypot) {
      toast.error("Spam detected!");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setLoading(false);
    } else if (!message.length) {
      toast.error("Kindly enter something in the message box");
      setLoading(false);
    } else {
      try {
        const escapeHtml = (value) =>
          value.replace(/[&<>"']/g, (character) => {
            const entities = {
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
            };
            return entities[character];
          });
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            notification: true,
            subject: "New Contact Form Submission",
            content: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `<p>You have received a new message:</p><p>Name: ${escapeHtml(name)}<br>Email: ${escapeHtml(email)}<br>Message: ${escapeHtml(message)}</p>`,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send the contact form message.");
        }

        handleReset();
        toast.success("Message sent successfully!");
      } catch (error) {
        toast.error("Failed to send the message. Try again later.");
        console.error("Mailgun Error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="py-10 pb-[10rem]">
      <h1 className="text-5xl my-10 items-center p-8 text-center">
        Contact Us
      </h1>
      <form
        className="w-full flex justify-center gap-8 items-center md:flex-row flex-col-reverse"
        ref={formRef}
        onSubmit={handleSubmission}
      >
        <div className="md:flex hidden w-fit">
          <Image
            src={
              "https://firebasestorage.googleapis.com/v0/b/al-zehra.appspot.com/o/images%2Fpink-abstract-Di78k6pk.webp?alt=media&token=220c363a-d7d3-4734-b0eb-59260fc1a544"
            }
            alt="Break up cure | Mehran Dadbeh | relationship consultant"
            className="max-h-[30rem] rounded-xl md:aspect-auto skeleton-loading"
            height={900}
            width={600}
          />
        </div>
        <div className="w-full p-4 md:p-0 md:w-1/3 flex flex-col gap-4">
          <h3 className="text-2xl text-left">Let's Talk!</h3>

          {/* Honeypot field */}
          <input
            type="text"
            style={{ display: "none" }} // Hidden field
            tabIndex="-1"
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            placeholder="Do not fill this field"
          />

          <InputField
            inputType="text"
            valueReturner={setName}
            inputautoComplete={"name"}
            inputValue={name}
            inputName="Your Name"
            requiredInput={true}
          />
          <InputField
            inputType="email"
            valueReturner={setEmail}
            inputautoComplete={"email"}
            inputValue={email}
            errorMsg={error}
            inputName="Your Email Address"
            requiredInput={true}
          />
          <textarea
            name="message"
            className="min-h-[15rem] p-3 resize-y rounded-md"
            placeholder="Your Message"
            onInput={(e) => setMessage(e.target.value.trim())}
            required
          ></textarea>
          <Button
            className="bg-black flex justify-center"
            loading={loading}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </main>
  );
};

export default ContactPage;
