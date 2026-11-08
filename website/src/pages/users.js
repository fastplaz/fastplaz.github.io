import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const users = [
  {
    caption: 'Showcase',
    image: 'img/undraw_open_source.svg',
    infoLink: '/docs/showcase',
  },
];

function User({caption, image, infoLink}) {
  return (
    <Link to={infoLink}>
      <img src={useBaseUrl(image)} alt={caption} title={caption} style={{maxHeight: 128}} />
    </Link>
  );
}

export default function Users() {
  return (
    <Layout title="Users" description="Who is using FastPlaz?">
      <main className="container margin-vert--xl text--center">
        <Heading as="h1">Who is Using This?</Heading>
        <p>This project is used by many folks</p>
        <div className="margin-vert--lg">
          {users.map((user) => (
            <User key={user.infoLink} {...user} />
          ))}
        </div>
        <p>Are you using this project?</p>
        <Link
          className="button button--primary"
          href="https://github.com/fastplaz/fastplaz.github.io/edit/main/website/src/pages/users.js">
          Add your company
        </Link>
      </main>
    </Layout>
  );
}
