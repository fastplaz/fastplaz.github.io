import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
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
    <Layout
      title={translate({id: 'users.pageTitle', message: 'Pengguna'})}
      description={translate({
        id: 'users.pageDescription',
        message: 'Siapa yang menggunakan FastPlaz?',
      })}>
      <main className="container margin-vert--xl text--center">
        <Heading as="h1">
          <Translate id="users.heading">Siapa yang Menggunakan?</Translate>
        </Heading>
        <p>
          <Translate id="users.intro">
            FastPlaz dipakai oleh banyak orang dan organisasi.
          </Translate>
        </p>
        <div className="margin-vert--lg">
          {users.map((user) => (
            <User key={user.infoLink} {...user} />
          ))}
        </div>
        <p>
          <Translate id="users.question">Anda juga menggunakan FastPlaz?</Translate>
        </p>
        <Link
          className="button button--primary"
          href="https://github.com/fastplaz/fastplaz.github.io/edit/main/website/src/pages/users.js">
          <Translate id="users.add">Tambahkan project Anda</Translate>
        </Link>
      </main>
    </Layout>
  );
}
