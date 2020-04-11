import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

export default ({ escursione }) => (
  <div className={styles.preview}>
    <Img alt="" fluid={escursione.immagineDiCopertina.fluid} />
    <h3 className={styles.previewTitle}>
      <Link to={`/escursioni/${escursione.url}`}>{escursione.titolo}</Link>
    </h3>
    <small>{escursione.data}</small>
    <p
      dangerouslySetInnerHTML={{
        __html: escursione.resoconto.childMarkdownRemark.html,
      }}
    />
  </div>
)
