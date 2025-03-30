import React from 'react'
import './doc.css'

const Doc = () => {
  return (
    <>
      <button class="button1">
        <div class="container1">
          <div class="folder folder_one"></div>
          <div class="folder folder_two"></div>
          <div class="folder folder_three"></div>
          <div class="folder folder_four"></div>
        </div>
        <div class="active_line1"></div>
        <span class="text1">File Explorer</span>
      </button>
    </>
  )
}

export default Doc