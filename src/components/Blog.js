/* eslint-disable react/no-danger */
import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './Blog.module.css';
import Wrapper from './shared/Wrapper';
import Hero from './landing/Hero';

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  return (
    <Wrapper>
      <div className="my-24 container">
        <Hero />

        <Helmet>
          <title>{frontmatter.title} | Reactive Resume</title>
          <link
            rel="canonical"
            href={`https://rxresu.me/blog/${frontmatter.slug}`}
          />
        </Helmet>

        <h1 className="mt-16 text-3xl">{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </Wrapper>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
