import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AboutPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const apiServiceId = import.meta.env.VITE_THIRD_PARTY_API;
    const userInfo = {
      name: data.name,
      email: data.email,
      access_key: apiServiceId,
      message: data.message,
    };
    const toastId = toast.loading("..loading.");
    try {
      const response = await axios.post(
        "https://api.web3forms.com/submit",
        userInfo
      );
      if (response) {
        toast.success("Thanks for Feedback");
      }
    } catch (er) {
      toast.error("form not worked");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <section className="text-white body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-whtie">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Your inquiries are important to us, and we strive to respond
              promptly to all messages. Thank you for your interest, and we look
              forward to hearing from you!
            </p>
          </div>

          {/* Form applied */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label for="name" className="leading-7 text-sm text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      {...register("name", { required: true })}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border 
                      border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none
                       text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {/* errors will return when field validation fails  */}
                    {errors.name && (
                      <span className=" text=sm text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="email"
                      className="leading-7 text-sm   text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500
                      focus:bg-white focus:ring-2 focus:ring-red-200 text-base outline-none   text-black py-1 px-3 leading-8 
                      transition-colors duration-200 ease-in-out"
                    />
                    {/* errors will return when field validation fails  */}
                    {errors.email && (
                      <span className=" text=sm text-red-400">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      for="message"
                      className="leading-7 text-sm   text-white"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      {...register("message", { required: true })}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-white focus:ring-2
                    focus:ring-red-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.message && (
                    <span className=" text=sm text-red-400">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="p-2 w-full">
                  <button className="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">
                    Thanks for Feedback
                  </button>
                </div>

                {/* Form ended here  */}
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
