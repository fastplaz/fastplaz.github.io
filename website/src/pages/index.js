import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Default text is Bahasa Indonesia; English lives in i18n/en/code.json.
const features = [
  {
    title: 'MVC',
    link: '/docs/architecture',
    image: 'img/home/mvc.png',
    description: (
      <Translate
        id="homepage.features.mvc"
        values={{term: <em>(model-view-controller)</em>}}>
        {'Dengan metode MVC {term} akan memudahkan developer dalam mengembangkan aplikasi.'}
      </Translate>
    ),
  },
  {
    title: 'ORM',
    link: '/docs/orm',
    image: 'img/home/orm.png',
    description: (
      <Translate
        id="homepage.features.orm"
        values={{term: <em>(Object Relationship Mapping)</em>}}>
        {'Akses database dengan mudah menggunakan Model ORM {term}.'}
      </Translate>
    ),
  },
  {
    title: 'Standalone & CGI',
    link: '/docs/standalone',
    image: 'img/home/standalone.svg',
    description: (
      <Translate id="homepage.features.standalone">
        Satu binary native: jalan sebagai HTTP server sendiri atau sebagai CGI
        di shared hosting cPanel, di Windows, Linux, dan macOS.
      </Translate>
    ),
  },
  {
    title: 'FTE',
    link: '/docs/fte',
    image: 'img/home/fte.png',
    description: (
      <Translate
        id="homepage.features.fte"
        values={{term: <em>Template Engine</em>}}>
        {'{term} yang simple akan makin membuat menarik hati.'}
      </Translate>
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
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">
            Aplikasi web native yang cepat, dengan Free Pascal.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            <Translate id="homepage.hero.start">Mulai</Translate>
          </Link>
          <a className="button button--secondary button--lg" href="#agentPlane">
            AI Agent Plane
          </a>
          <a className="button button--secondary button--lg" href="#featured">
            <Translate id="homepage.hero.featured">Fitur</Translate>
          </a>
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

function AgentPlane() {
  return (
    <section id="agentPlane" className={styles.section}>
      <div className="container">
        <div className="row row--align-center">
          <div className="col col--5">
            <span className="badge badge--primary margin-bottom--sm">
              <Translate id="homepage.agentPlane.badge">Baru di rilis 2026</Translate>
            </span>
            <Heading as="h2">AI Agent Plane</Heading>
            <p>
              <Translate id="homepage.agentPlane.p1">
                Chat dengan coding agent langsung di Lazarus IDE: Claude Code,
                OpenCode, Pi, GitHub Copilot CLI, dan agent ACP lainnya.
              </Translate>
            </p>
            <p>
              <Translate id="homepage.agentPlane.p2">
                Lewat MCP server bawaan, agent bisa membuka unit di baris yang
                tepat, membaca editor, meng-compile project dan memperbaiki
                error-nya, serta membuat controller dan model FastPlaz. Setiap
                perubahan tetap menunggu persetujuan Anda.
              </Translate>
            </p>
            <div className={styles.inlineButtons}>
              <Link className="button button--primary" to="/docs/ai-agent-plane">
                <Translate id="homepage.agentPlane.learn">
                  Pelajari AI Agent Plane
                </Translate>
              </Link>
              <Link
                className="button button--outline button--primary"
                to="/docs/ai-agent-plane-mcp">
                MCP Tools
              </Link>
            </div>
          </div>
          <div className="col col--7">
            <img
              className={styles.screenshot}
              src={useBaseUrl('img/agent-plane/editor-chat.png')}
              alt={translate({
                id: 'homepage.agentPlane.imgAlt',
                message: 'AI Agent Plane: editor Lazarus dengan chat AI agent',
              })}
            />
          </div>
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
            <Heading as="h2">
              <Translate id="homepage.theme.title">Theme Template Siap Pakai</Translate>
            </Heading>
            <p>
              <Translate
                id="homepage.theme.body"
                values={{
                  featured: (
                    <strong>
                      <Translate id="homepage.theme.featured">siap pakai</Translate>
                    </strong>
                  ),
                  fte: <Link to="/docs/fte">FastPlaz Theme Engine</Link>,
                }}>
                {'Setiap project FastPlaz baru sudah dilengkapi theme template {featured}. {fte} akan membuat tampilan aplikasi lebih mudah diatur.'}
              </Translate>
            </p>
          </div>
          <div className="col col--6">
            <img
              className={styles.sectionImage}
              src={useBaseUrl('img/undraw_youtube_tutorial.svg')}
              alt="Theme Template"
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
        <Heading as="h2">
          <Translate id="homepage.showcase.title">Siapa yang Menggunakan?</Translate>
        </Heading>
        <p>
          <Translate id="homepage.showcase.body">
            FastPlaz dipakai di berbagai project, dari bot percakapan sampai
            dashboard.
          </Translate>
        </p>
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
            <Translate id="homepage.showcase.more">Pengguna FastPlaz Lainnya</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({
        id: 'homepage.title',
        message: 'Aplikasi web native yang cepat, dengan Free Pascal',
      })}
      description={translate({
        id: 'homepage.description',
        message:
          'Dokumentasi FastPlaz, web framework untuk Free Pascal: standalone HTTP & CGI, ORM, template engine, dan AI Agent Plane untuk Lazarus IDE.',
      })}>
      <HomeSplash />
      <main>
        <Features />
        <AgentPlane />
        <ThemeTemplate />
        <Showcase />
      </main>
    </Layout>
  );
}
