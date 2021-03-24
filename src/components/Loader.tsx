import React from 'react'
import styles from '@styles/Loader.module.css'

type LoaderProps = {
  children?: React.ReactNode
  loading: Boolean
}

const Loader: React.FC<LoaderProps> = ({ loading, children }) => {
  return (
    <>
      {loading ? (
        <div className="container-fluid justify-content-center d-flex">
          <div
            className={`spinner-border text-dark ${styles.loader}`}
            role="status"
          >
            <span className="visually-hidden"></span>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default Loader
