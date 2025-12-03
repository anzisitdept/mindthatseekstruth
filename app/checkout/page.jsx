"use client";
import React, { Suspense, useEffect, useState } from "react";

import InputField from "../components/InputField";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Timestamp } from "firebase/firestore";

import { setDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase/firbaseConfig";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PayPalButton from "../components/PayPalButton";
import preparePayPalData from "../helper/preparePayPalData";
import { redirect } from "next/navigation";
import { getProductData } from "../components/getProductData";
import { generateEbookHtml } from "../components/EmailEbookSender";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const quantity = searchParams.get("quantity");
  const coupon = searchParams.get("coupon");
  const selectedVariantIndex = searchParams.get("selectedVariantIndex");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [products, setProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(null);
  const [total, setTotal] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [calculationsLoading, setCalculationsLoading] = useState(true);
  const [isSubmissionLoading, setIsSubmissionLoading] = useState(false);
  const [allProductTags, setAllProductTags] = useState([]);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState(null);
  const [shippingFees, setShippingFees] = useState(null);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);
  const [shouldAskToPay, setShouldAskToPay] = useState(false);
  const [items, setItems] = useState([]);
  const [orderDataCache, setOrderDataCache]= useState({})
  // const [cartItems, setCartItems] = useState([]);
  const router = useRouter();
  // const {items} = preparePayPalData(products)

  let localOrderData = {};

  useEffect(() => {
    setCalculationsLoading(true);
    let subtotal = 0;
    products.forEach((product) => {
      subtotal += JSON.parse(product.selectedVariant.price) * product.quantity;
    });
    setSubTotal(subtotal);
    setShippingFees(subtotal > 1500 ? 0 : 300);
    setCalculationsLoading(false);
  }, [products]);

  useEffect(() => {
    setProductsLoading(true);
    const getProducts = async () => {
      if (source == "cart") {
        const cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
        
        if (cartItems?.length) {
          let subtotal = 0;
          const productTags = [];
          cartItems.forEach((item) => {
            subtotal +=
              parseInt(item.selectedVariant.price) * parseInt(item.quantity);
            productTags.push(item.tags);
          });
          setProducts([...cartItems]);
          setProductsLoading(false);
          setSubTotal(subtotal);
          const shipping_fees = subtotal > 1500 ? 0 : 300;
          setShippingFees(shipping_fees);
          setAllProductTags(productTags);
        } else {
          router.push(`/cart`);
        }
      } else {
        const slug = source;
        try {
          const productData = await getProductData(slug);
          

          setProducts([
            {
              productId: slug,
              quantity: parseInt(quantity),
              selectedVariant: productData.variants[selectedVariantIndex],
              product: productData,
            },
          ]);
          setProductsLoading(false);

        } catch (error) {
          router.push(`/`);
        }
      }
      if (coupon) {
        setCouponCodeApplied(coupon);
      }
    };

    getProducts();
  }, [source, quantity]);
  useEffect(() => {
    const totalAmount = products.reduce((acc, item) => {
      return acc + item.quantity * (item.selectedVariant.price || 0);
    }, 0);
    if (products.length < 1 || !totalAmount) return;
    const { items, paypalTotal, itemTotal } = preparePayPalData(
      products,
      totalAmount
    );
    
    setTotal(paypalTotal);
    setItems(items);
  }, [products, subTotal, shippingFees, discountValue]);

  function generateOrderId(length = 8) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let orderId = "";
    for (let i = 0; i < length; i++) {
      orderId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return orderId;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmissionLoading(true);
    const orderData = {
      orderId: generateOrderId(),
      customer: {
        firstName,
        lastName,
        email,
        phoneNumber,
        shippingAddress: {
          street: address,
          nearSpot: extraAddress,
          city,
          state,
        },
      },
      createdAt: Timestamp.fromDate(new Date()),
      status: "pending",
      items: [...products],
      payment: {
        amount: total,
        currency: "USD",
      },
      subTotalAmount: subTotal,
      grandTotal: total,
      ConfirmationEmailSent: false,
    };
    setOrderDataCache(orderData);
    try {
      await setDoc(doc(db, "orders", orderData.orderId), orderData);
      setShouldAskToPay(true);
    } catch (error) {
      toast.error("something went wrong");
      console.log("there a error");
    } finally {
    }
  };

  const handlePostSubmit = async (orderData) => {
    setShouldAskToPay(false);
    const items =[]
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-mailgun-api-key": process.env.NEXT_PUBLIC_MAILGUN_API_KEY
        },
        body: JSON.stringify({
          "recipient": orderData.customer.email,
          "subject": `Enjoy your order, ${orderData.customer.firstName}!`,
          "content": generateEbookHtml(orderData.items),
        }),
      });

      const data = await response;
      
      if (response.ok) {
        toast.success("Order delivered on your email!")
      } else {
      toast.error("Something went wrong, but don't worry we will deliver your order manually, you can even reach out to us on contact us page.")
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Something went wrong, but don't worry we will deliver your order manually, you can even reach out to us on contact us page.")
    } finally {
      setShouldAskToPay(false);
      redirect("/shop")

    }
  };

  return (
    <>
      <header className=" py-8 text-center bg-white border-b-4">
        <h1 className="text-4xl">MIND THAT SEEKS TRUTH</h1>
      </header>
      <main className="w-full bg-[#F9FAFB] py-10 flex md:flex-row flex-col-reverse">
        <section className="md:w-1/2 px-8 w-full">
          <h3 className="text-xl text-left my-9">Contact information</h3>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="border-b pb-8 gap-4 flex md:flex-row flex-col">
              <InputField
                inputAutoComplete={"email"}
                inputName={"Email"}
                valueReturner={setEmail}
                inputValue={email}
                requiredInput={true}
                className="w-1/2"
              />
              <InputField
                inputAutoComplete={"tel"}
                inputType="tel"
                inputName="Phone Number"
                inputValue={phoneNumber}
                valueReturner={setPhoneNumber}
                className="w-1/2"
              />
            </div>

            <div className="flex flex-col gap-4 border-b pb-8">
              <h3 className="text-xl text-left my-5 Shipping information">
                Shipping Information
              </h3>

              <div className="flex md:flex-row flex-col gap-4">
                <InputField
                  inputAutoComplete={"given-name"}
                  requiredInput={true}
                  inputValue={firstName}
                  valueReturner={setFirstName}
                  inputName="First Name"
                />
                <InputField
                  requiredInput={true}
                  inputAutoComplete={"family-name"}
                  inputValue={lastName}
                  valueReturner={setLastName}
                  inputName="Last Name"
                />
              </div>
              <InputField
                requiredInput={true}
                inputAutoComplete={"street-address"}
                inputValue={address}
                valueReturner={setAddress}
                inputName="Street Address"
              />
              <InputField
                inputAutoComplete={"address-line2"}
                inputName="Apartment, Suite, etc. (optional)"
                inputValue={extraAddress}
                valueReturner={setExtraAddress}
              />
              <div className="flex gap-4 md:flex-row flex-col">
                <InputField
                  requiredInput={true}
                  inputAutoComplete={"address-level2"}
                  inputName="City"
                  inputValue={city}
                  valueReturner={setCity}
                />
                <InputField
                  inputAutoComplete={"address-level1"}
                  inputName="Province"
                  inputValue={state}
                  valueReturner={setState}
                />
              </div>
            </div>

            <Button
              className="w-full bg-black py-3 rounded-xl text-white text-lg flex items-center justify-center gap-2 group my-3 !font-semibold"
              loading={isSubmissionLoading}
              type="submit"
            >
              Confirm Order
              <MdOutlineKeyboardArrowRight className="group-hover:translate-x-2 transition-all duration-200" />
            </Button>

            {shouldAskToPay && (
              <section className="w-screen h-screen fixed inset-0 z-20  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 flex items-center justify-center">
                <div className="md:w-1/2 w-full p-4">
                  <PayPalButton
                    items={items}
                    totalAmount={total}
                    onSuccess={()=>{handlePostSubmit(orderDataCache)}}
                  />
                </div>
              </section>
            )}
          </form>
        </section>

        <section className="md:w-1/2 w-full px-8 md:!sticky top-4">
          <div
            className="flex w-full justify-between"
            onClick={() => {
              setIsSummaryExpanded(!isSummaryExpanded);
            }}
          >
            <h3 className="text-xl text-left my-9">Order summary</h3>
            <h3
              className={`text-xl flex gap-4 items-center text-left my-9 ${
                productsLoading ? "skeleton-loading" : ""
              }`}
            >
              {products.length} Items{" "}
              <div
                className={`"flex md:hidden  ${
                  isSummaryExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                {/* <svg
                    className="ml-2 my-auto"
                    width={16}
                    viewBox="0 0 12 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L4.58578 5.08578C5.25245 5.75245 5.58579 6.08579 6 6.08579C6.41421 6.08579 6.74755 5.75245 7.41421 5.08579L11 1.5"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg> */}
              </div>
            </h3>
          </div>

          <div>
            <div
              className={`products md:flex flex-wrap px-4 md:flex-row flex-col gap-y-4 ${
                isSummaryExpanded ? "flex " : "hidden"
              }`}
            >
              {productsLoading ? (
                <div className="flex text-left  gap-4 md:w-1/2 w-full">
                  <div>
                    <img className="w-[7rem] skeleton-loading aspect-square rounded" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="skeleton-loading">Best Perfumes</h3>
                    <h4 className="text-gray-600 skeleton-loading w-fit">
                      $1500
                    </h4>
                    <h5 className="text-gray-400 skeleton-loading w-fit">
                      x 2
                    </h5>
                  </div>
                </div>
              ) : (
                products.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className="flex text-left  gap-4 md:w-1/2 w-full"
                    >
                      <div>
                        <img
                          src={product.product.image_url}
                          className="w-[7rem] skeleton-loading aspect-square rounded"
                          alt={product.product.title}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h3>{product.product.title}</h3>
                        <h4 className="text-gray-600">
                          ${product.selectedVariant.price}
                        </h4>
                        <h5 className="text-gray-400">x {product.quantity}</h5>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div
              className={`py-8 md:flex flex-col gap-4 ${
                isSummaryExpanded ? "flex " : "hidden"
              }`}
            >
              <div>
                <div>
                  <div className="flex items-center justify-between ">
                    <p className="font-medium text-md leading-8 text-gray-800">
                      Sub Total
                    </p>
                    <p
                      className={`font-semibold text-md leading-8 text-red-800 ${
                        productsLoading ? "skeleton-loading" : ""
                      }`}
                    >
                      ${subTotal}
                    </p>
                  </div>
                </div>
                <div></div>
                {discountValue ? (
                  <div>
                    {/* <div className="flex items-center justify-between ">
                        <p className="font-medium text-md leading-8 text-gray-800">
                          Coupon Discount
                        </p>
                        <p className="font-semibold text-md leading-8 text-red-800">
                          - ${discountValue}
                        </p>
                      </div> */}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                <div className="flex items-center justify-between ">
                  <p className="font-medium text-xl leading-8 text-gray-800">
                    Total
                  </p>
                  <p
                    className={`font-semibold text-2xl leading-8 text-red-800 ${
                      productsLoading ? "skeleton-loading" : ""
                    }`}
                  >
                    ${total}
                  </p>
                </div>

                {/* 
                    {discountValue > 0 && <div className="flex items-center justify-between ">
                        <p className="font-medium text-md leading-8 text-gray-800">
                          Coupon Discount:
                        </p>
                        <p className="font-semibold text-md leading-8 text-red-800">
                            - $discountValue
                        </p>
                      </div>} */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <CheckoutPage />
    </Suspense>
  );
};

export default page;
