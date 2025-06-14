import React from 'react'
import { ConfirmationModal } from './ConfirmationModal'

export const TestPage = () => {
  return (
    <div>
    <h1>Test page</h1>
    <ConfirmationModal
    show="true"
    onHide={() => console.log("onHide triggered")}
    onConfirm={() => console.log("onConfirm triggered")}
    title="testing Modal"
    message={"Are you sure you want to delete this note"}
    />
    </div>

  )
}
