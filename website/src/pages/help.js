import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const supportLinks = [
  {
    title: 'Browse Docs',
    content: (
      <>
        Learn more using the{' '}
        <Link to="/docs/introduction">documentation on this site.</Link>
      </>
    ),
  },
  {
    title: 'Join the community',
    content: (
      <>
        Ask questions about the documentation and project on{' '}
        <Link href="https://t.me/pascalid">Pascal Indonesia Telegram</Link>.
      </>
    ),
  },
  {
    title: 'Stay up to date',
    content: (
      <>
        Find out what&apos;s new with this project on the{' '}
        <Link to="/blog">release notes</Link>.
      </>
    ),
  },
];

export default function Help() {
  return (
    <Layout title="Help" description="Need help with FastPlaz?">
      <main className="container margin-vert--xl">
        <Heading as="h1">Need help?</Heading>
        <p>This project is maintained by a dedicated group of people.</p>
        <div className="row">
          {supportLinks.map(({title, content}) => (
            <div key={title} className="col col--4 margin-bottom--lg">
              <Heading as="h2">{title}</Heading>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
