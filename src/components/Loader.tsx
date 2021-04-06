import React from 'react'
import '@styles/Loader.css'

type LoaderProps = {
  children?: React.ReactNode
  loading: boolean
  fallbackMsg?: string
  statusMessage?: string
}

const Loader: React.FC<LoaderProps> = ({
  loading,
  children,
  statusMessage,
}) => {
  return (
    <>
      {loading ? (
        <div
          className={`customContainer flex-column container-fluid align-items-center justify-content-center d-flex`}
        >
          <div
            className={`spinner-border text-dark loader`}
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
          {statusMessage && <h1 className="mt-3">{statusMessage}</h1>}
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Loader
