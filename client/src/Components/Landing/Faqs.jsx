import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Accordion } from "flowbite-react";

const Faqs = () => {
  return (
    
    <section className="mt-8 mx-auto max-w-7xl px-2 py-10 md:px-0">
      <div>
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 lg:mx-auto">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, assumenda
          </p>
        </div>
        <Accordion collapseAll>
        <Accordion.Panel>
        <div className="mx-auto mt-6 max-w-3xl space-y-4 md:mt-16">
          <div className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200">
            <button
              type="button"
              className="flex w-full items-center justify-between px-4 py-5 sm:p-6"
            >
            <Accordion.Title>
              <span className="flex text-lg font-semibold text-black">How do I get started?</span>
              </Accordion.Title>
            </button>
            <Accordion.Content>
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat aliquam adipisci
                iusto aperiam? Sint asperiores sequi nobis inventore ratione deleniti?
              </p>
            </div>
            </Accordion.Content>
          </div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-md border border-gray-400 shadow-lg transition-all duration-200"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between px-4 py-5 sm:p-6 md:items-center"
              >
              <Accordion.Title>
                <span className="flex text-start text-lg font-semibold text-black">
                  What is the difference between a free and paid account?
                </span>
              </Accordion.Title>
              </button>
              <Accordion.Content>
            <div className="px-4 pb-5 sm:px-6 sm:pb-6">
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat aliquam adipisci
                iusto aperiam? Sint asperiores sequi nobis inventore ratione deleniti?
              </p>
            </div>
            </Accordion.Content>
            </div>
          ))}
        </div>
         </Accordion.Panel>
        </Accordion>
        <p className="textbase mt-6 text-center text-gray-600">
          Can&apos;t find what you&apos;re looking for?{' '}
          <a href="/" title="" className="font-semibold text-black hover:underline">
            Contact our support
          </a>
        </p>
      </div>
    </section>
   
  )
}


export default Faqs;



