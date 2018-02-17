/**
 * Copyright (c) 2018-present, Sync Health Labs
 * Portions Copright (c) 2017-present, Facebook, Inc.
 *
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }

  render() {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Docs</h5>
            <a href={this.docUrl('introduction.html', this.props.language)}>
              Getting Started
            </a>
            <a href={this.docUrl('api-readme.html', this.props.language)}>
              API Reference
            </a>
          </div>
          <div>
            <h5>Community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              User Showcase
            </a>
            <a
              href="https://stackoverflow.com/search?q=@besync/graphstore"
              target="_blank">
              Stack Overflow
            </a>
          </div>
          <div>
            <h5>More</h5>
            {/* <a href={this.props.config.baseUrl + 'blog'}>Blog</a> */}
            <a href="https://github.com/besync/graphstore">GitHub</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/besync/graphstore/stargazers"
              data-show-count={true}
              data-count-aria-label="# stargazers on GitHub"
              aria-label="Star this project on GitHub">
              Star
            </a>
          </div>
        </section>
        <a
          href="https://github.com/besync"
          target="_blank"
          className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/oss_logo.png'}
            alt="Sync Health Labs Open Source"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} Sync Health Labs
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
