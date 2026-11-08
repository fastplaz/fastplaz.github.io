import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const features = [
  {
    title: 'MVC',
    link: '/docs/architecture',
    image: 'img/home/mvc.png',
    description: (
      <>
        Dengan metode MVC <em>(model-view-controller)</em> akan memudahkan
        developer dalam mengembangkan aplikasi.
      </>
    ),
  },
  {
    title: 'ORM',
    link: '/docs/orm',
    image: 'img/home/orm.png',
    description: (
      <>
        Akses database dengan mudah menggunakan Model ORM{' '}
        <em>(Object Relationship Mapping)</em>.
      </>
    ),
  },
  {
    title: 'Multi Platform',
    image: 'img/home/multi.png',
    description: (
      <>
        Mudah didistribusikan ke berbagai platform, termasuk untuk shared
        hosting cPanel dan juga Serverless.
      </>
    ),
  },
  {
    title: 'FTE',
    link: '/docs/fte',
    image: 'img/home/fte.png',
    description: (
      <>
        <em>Template Engine</em> yang simple akan makin membuat menarik hati.
      </>
    ),
  },
];

function HomeSplash() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img
          className={styles.heroLogo}
          src={useBaseUrl('img/undraw_monitor.svg')}
          alt="FastPlaz"
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <a className="button button--secondary button--lg" href="#featured">
            Featured
          </a>
          <a className="button button--secondary button--lg" href="#themeTemplate">
            Template Engine
          </a>
          <Link className="button button--secondary button--lg" to="/docs/orm">
            ORM
          </Link>
        </div>
      </div>
    </header>
  );
}

function Feature({title, link, image, description}) {
  return (
    <div className={clsx('col col--3', styles.feature)}>
      <img className={styles.featureImage} src={useBaseUrl(image)} alt={title} />
      <Heading as="h3">{link ? <Link to={link}>{title}</Link> : title}</Heading>
      <p>{description}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="featured" className={styles.section}>
      <div className="container">
        <div className="row">
          {features.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ThemeTemplate() {
  return (
    <section id="themeTemplate" className={clsx(styles.section, styles.light)}>
      <div className="container">
        <div className="row row--align-center">
          <div className="col col--6">
            <Heading as="h2">Featured Theme Template</Heading>
            <p>
              Each new FastPlaz project has <strong>featured</strong> theme
              template.
              <br />
              <Link to="/docs/fte">FastPlaz Theme Engine</Link> will make the
              world happy.
            </p>
          </div>
          <div className="col col--6">
            <img
              className={styles.sectionImage}
              src={useBaseUrl('img/undraw_youtube_tutorial.svg')}
              alt="Featured Theme Template"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className={clsx(styles.section, 'text--center')}>
      <div className="container">
        <Heading as="h2">Who is Using This?</Heading>
        <p>This project is used by all these people</p>
        <Link to="/docs/showcase">
          <img
            className={styles.showcaseLogo}
            src={useBaseUrl('img/undraw_open_source.svg')}
            alt="Showcase"
            title="Showcase"
          />
        </Link>
        <div>
          <Link className="button button--primary" to="/users">
            More FastPlaz Users
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.tagline} description="Dokumentasi FastPlaz Web Framework">
      <HomeSplash />
      <main>
        <Features />
        <ThemeTemplate />
        <Showcase />
      </main>
    </Layout>
  );
}
