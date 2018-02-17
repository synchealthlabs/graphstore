/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    {siteConfig.title}
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <Logo img_src={imgUrl('graphstore.svg')} />
        <div className="inner">
          <ProjectTitle />
          <PromoSection>
            <Button href="#why">What is it</Button>
            <Button href="#try">Try It Out</Button>
           <Button href={docUrl('introduction.html', language)}>Read More</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="fourColumn">
    {[
      {
        content: 'API-free access to Firebase et al.; just generate or define the schema and get code-generated object graph in JS',
        image: imgUrl('firebase.svg'),
        imageAlign: 'top',
        imageLink: 'https://firebase.google.com',
        title: '*abstracts* Firebase',
      },
      {
        content: 'Extends MobX with a seamless persistance layer that subscribes and unsubscribes automatically',
        image: imgUrl('mobx.png'),
        imageAlign: 'top',
        imageLink: 'https://mobx.js.org',
        title: '*extends* MobX',
      },
      {
        content: 'No need to learn flux or redux, GraphStore (and MobX) just works as you&rsquo;d expect.  No boilerplate.',
        image: imgUrl('react.svg'),
        imageAlign: 'top',
        imageLink: 'https://reactjs.org',
        title: '*simplifies* React',
      },
    ]}
  </Block>
);

const FeatureCallout = props => (
  <div
    className="productShowcaseSection paddingBottom"
    style={{textAlign: 'center'}}>
    <h2>&ldquo;Anything that can be derived from the application state, should be derived. Automatically.&rdquo;</h2>
    <MarkdownBlock>Such is the philosophy of MobX, and GraphStore now extends this to the remote persistent store or database.</MarkdownBlock>
  </div>
);

const LearnHow = props => (
  <Block id="why" background="light">
    {[
      {
        content: 'GraphStore essentially allows you to treat the persistent datastore as any form of application state.  It just stays in sync with the datastore automatically.  And it&rsquo;s designed for modern graph databases.',
        image: imgUrl('about-graphstore.svg'),
        imageAlign: 'right',
        title: 'The only store you might need for React and React Native',
      },
    ]}
  </Block>
);

const TryOut = props => (
  <Block id="try">
    {[
      {
        content: `
\`\`\` js
let user = stores.UserStore.getbyId(userId);

return autorun(() => {
   if (!user.loading) console.log("Hello " + user.username);
}
\`\`\`
        `,
        image: imgUrl('runkit.svg'),
        imageAlign: 'left',
        imageLink: 'https://npm.runkit.com/@besync/graphstore',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Description = props => (
  <Block background="dark">
    {[
      {
        content: 'Learning React and [Redux...] at the same time is hard.  There are 10,600,000 articles on managing State in React as of 2018.  <br /><br />Tools like Firebase and MobX make this easier for new programmers, but one small piece that was missing: having a single *Store* that understood *Graph*s as well as Facebook, was as simple to use as MobX, and does one thing really well:  keeping the graphstore in sync with everything.',
        image: imgUrl('whatifthedatabasewasthestore.svg'),
        imageAlign: 'right',
        title: 'Motivation',
      },
    ]}
  </Block>
);

const Showcase = props => {
  if ((siteConfig.users || []).length === 0) {
    return null;
  }
  const showcase = siteConfig.users
    .filter(user => {
      return user.pinned;
    })
    .map((user, i) => {
      return (
        <a href={user.infoLink} key={i}>
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

  return (
    <div className="productShowcaseSection paddingBottom">
      <h2>{"Who's Using This?"}</h2>
      <p>This project is used by all these people</p>
      <div className="logos">{showcase}</div>
      <div className="more-users">
        <a className="button" href={pageUrl('users.html', props.language)}>
          More {siteConfig.title} Users
        </a>
      </div>
    </div>
  );
};

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <FeatureCallout />
          <LearnHow />
          <TryOut />
          <Description />
          <Showcase language={language} />
        </div>
      </div>
    );
  }
}

module.exports = Index;
