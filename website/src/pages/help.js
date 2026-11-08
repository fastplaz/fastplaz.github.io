import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

const supportLinks = [
  {
    key: 'docs',
    title: <Translate id="help.docs.title">Baca Dokumentasi</Translate>,
    content: (
      <Translate
        id="help.docs.body"
        values={{
          link: (
            <Link to="/docs/introduction">
              <Translate id="help.docs.link">dokumentasi di situs ini</Translate>
            </Link>
          ),
        }}>
        {'Pelajari lebih lanjut lewat {link}.'}
      </Translate>
    ),
  },
  {
    key: 'community',
    title: <Translate id="help.community.title">Gabung Komunitas</Translate>,
    content: (
      <Translate
        id="help.community.body"
        values={{
          link: <Link href="https://t.me/pascalid">Pascal Indonesia Telegram</Link>,
        }}>
        {'Tanyakan seputar dokumentasi dan project di {link}.'}
      </Translate>
    ),
  },
  {
    key: 'news',
    title: <Translate id="help.news.title">Ikuti Perkembangan</Translate>,
    content: (
      <Translate
        id="help.news.body"
        values={{
          link: (
            <Link to="/blog">
              <Translate id="help.news.link">catatan rilis</Translate>
            </Link>
          ),
        }}>
        {'Lihat apa yang baru di project ini pada {link}.'}
      </Translate>
    ),
  },
];

export default function Help() {
  return (
    <Layout
      title={translate({id: 'help.pageTitle', message: 'Bantuan'})}
      description={translate({
        id: 'help.pageDescription',
        message: 'Butuh bantuan dengan FastPlaz?',
      })}>
      <main className="container margin-vert--xl">
        <Heading as="h1">
          <Translate id="help.heading">Butuh bantuan?</Translate>
        </Heading>
        <p>
          <Translate id="help.intro">
            Project ini dikelola oleh sekelompok orang yang berdedikasi.
          </Translate>
        </p>
        <div className="row">
          {supportLinks.map(({key, title, content}) => (
            <div key={key} className="col col--4 margin-bottom--lg">
              <Heading as="h2">{title}</Heading>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
