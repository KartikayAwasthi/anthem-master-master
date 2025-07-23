import React, { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { ChevronUp, Mail, Phone, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "What is the warranty on Anthem fans?",
    a: "All Anthem fans come with a 2-year warranty covering manufacturing defects.",
  },
  {
    q: "How do I claim warranty or service?",
    a: "Contact our support team via email or phone with your purchase details. We’ll guide you through the process.",
  },
  {
    q: "Where can I buy spare parts?",
    a: "Spare parts are available through our certified dealers and service centers.",
  },
  {
    q: "How do I register my product?",
    a: "Product registration is automatic if purchased online. For offline purchases, email your invoice to support@anthemfans.com.",
  },
];

const Support = () => (
  <div className="bg-[#1c1c1c] text-white py-10 w-full" id="support">
    <div className="px-4 md:px-12 max-w-4xl mx-auto">
      {/* Heading */}
      <motion.h2
        className="text-4xl font-bold text-center mb-6 text-[#ba6a5a]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        Support & Help Center
      </motion.h2>

      <motion.p
        className="text-gray-300 text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 20 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        We're here to help! Browse FAQs or contact our support team for assistance.
      </motion.p>

      {/* FAQs */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-[#e49385]">
          <HelpCircle className="w-6 h-6" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Disclosure as="div" key={idx} className="border border-[#ba6a5a]/30 rounded-lg bg-[#2f2f2f]">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-5 py-4 text-left font-medium text-[#ba6a5a] hover:bg-[#3c3c3c] transition">
                    <span>{faq.q}</span>
                    <ChevronUp
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-5 w-5 text-[#e49385] transition-transform`}
                    />
                  </Disclosure.Button>
                  <Transition
                    as={Fragment}
                    enter="transition duration-300 ease-out"
                    enterFrom="opacity-0 -translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition duration-200 ease-in"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-2"
                  >
                    <Disclosure.Panel className="px-5 pb-4 text-gray-300">
                      {faq.a}
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-[#2f2f2f] rounded-xl p-6 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-[#ba6a5a]/30">
        <div>
          <h4 className="text-xl font-semibold mb-2 text-[#e49385]">Need more help?</h4>
          <p className="text-gray-300 mb-2">
            Our support team is available Mon–Sat, 10am–6pm.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#efb4a5]">
            <Mail />
            <a
              href="mailto:support@anthemfans.com"
              className="underline hover:text-[#ba6a5a] transition"
            >
              support@anthemfans.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-[#e49385]">
            <Phone />
            <a
              href="tel:+919930101710"
              className="underline hover:text-[#ba6a5a] transition"
            >
              +91 9930101710
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Support;
