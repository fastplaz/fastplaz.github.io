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
    title: 'Standalone & CGI',
    link: '/docs/standalone',
    image: 'img/home/standalone.svg',
    description: (
      <>
        Satu binary native: jalan sebagai HTTP server sendiri atau sebagai CGI
        di shared hosting cPanel, di Windows, Linux, dan macOS.
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
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction">
            Mulai
          </Link>
          <a className="button button--secondary button--lg" href="#agentPlane">
            AI Agent Plane
          </a>
          <a className="button button--secondary button--lg" href="#featured">
            Featured
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
              Baru di rilis 2026
            </span>
            <Heading as="h2">AI Agent Plane</Heading>
            <p>
              Chat dengan coding agent langsung di Lazarus IDE: Claude Code,
              OpenCode, Pi, GitHub Copilot CLI, dan agent ACP lainnya.
            </p>
            <p>
              Lewat MCP server bawaan, agent bisa membuka unit di baris yang
              tepat, membaca editor, meng-<em>compile</em> project dan
              memperbaiki error-nya, serta membuat controller dan model
              FastPlaz. Setiap perubahan tetap menunggu persetujuan Anda.
            </p>
            <div className={styles.inlineButtons}>
              <Link className="button button--primary" to="/docs/ai-agent-plane">
                Pelajari AI Agent Plane
              </Link>
              <Link className="button button--outline button--primary" to="/docs/ai-agent-plane-mcp">
                MCP Tools
              </Link>
            </div>
          </div>
          <div className="col col--7">
            <img
              className={styles.screenshot}
              src={useBaseUrl('img/agent-plane/editor-chat.png')}
              alt="AI Agent Plane: editor Lazarus dengan chat AI agent"
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
    <Layout title={siteConfig.tagline} description="Dokumentasi FastPlaz, web framework untuk Free Pascal: standalone HTTP & CGI, ORM, template engine, dan AI Agent Plane untuk Lazarus IDE.">
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
