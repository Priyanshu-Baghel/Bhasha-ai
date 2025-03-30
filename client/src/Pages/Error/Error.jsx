import React from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const Error = () => {
  return (

    <div className="px-2 text-center">
      <div>
        <p className="text-sm font-bold text-black">404 error</p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center justify-center gap-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Contact us
          </button>
        </div>
      </div>
      <div className="mt-10 space-y-6">
        <div>
          <a
            href="/"
            className="hover:underlin inline-flex items-center gap-x-2 text-sm font-semibold text-black"
          >
            <span>Documentation</span>
            <ArrowRight size={16} />
          </a>
          <p className="mt-2 text-sm text-gray-500">Dive in to learn all about our product.</p>
        </div>
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-x-2 text-sm font-semibold text-black hover:underline"
          >
            <span>Our blog</span>
            <ArrowRight size={16} />
          </a>
          <p className="mt-2 text-sm text-gray-500">Read the latest posts on our blog.</p>
        </div>
        <div>
          <a
            href="/"
            className="inline-flex items-center gap-x-2 text-sm font-semibold text-black hover:underline"
          >
            <span>Chat to support</span>
            <ArrowRight size={16} />
          </a>
          <p className="mt-2 text-sm text-gray-500">Our friendly team is here to help.</p>
        </div>
      </div>
    </div>
  )
}

export default Error