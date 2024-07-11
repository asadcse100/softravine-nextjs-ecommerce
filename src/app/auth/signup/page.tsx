import React, { FC } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp = () => {
  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="container mb-12 lg:mb-12">
        <h2 className="my-10 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-slate-900 dark:text-slate-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 bg-white dark:bg-slate-700 p-5 rounded-xl">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a key={index}
                href={item.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-slate-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  sizes="40px"
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-gray-500 dark:text-slate-400 dark:bg-slate-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-slate-100 dark:border-slate-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-slate-800 dark:text-slate-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-slate-800 dark:text-slate-200">
                Password
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-slate-700 dark:text-slate-300">
            Already have an account? {` `}
            <Link className="text-green-600" href="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
