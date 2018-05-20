import React from "react";
import { Link, Match } from "@reactions/router";
import Logo from "./Logo";
import {
  BLACK,
  SMALL_BREAK,
  SMALL_BREAK_QUERY,
  SIDEBAR_SIZE,
  TOPBAR_SIZE
} from "./theme";
import Component from "@reactions/component";
import scrollIntoView from "scroll-into-view-if-needed";
import Media from "react-media";

let Nav = () => (
  <Media query={SMALL_BREAK_QUERY}>
    {isSmall => (
      <Match path="*">
        {({ location }) => (
          <Component
            isSmall={isSmall}
            location={location}
            didUpdate={({ prevProps, state, setState }) => {
              if (
                state.sidebarOpen &&
                (prevProps.location !== location ||
                  prevProps.isSmall !== isSmall)
              ) {
                setState({ sidebarOpen: false });
              }
            }}
            initialState={{ sidebarOpen: false }}
          >
            {({ state, setState }) => (
              <div>
                {isSmall && (
                  <div
                    css={{
                      background: BLACK,
                      position: "fixed",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: TOPBAR_SIZE
                    }}
                  >
                    <button
                      onClick={() =>
                        setState(({ sidebarOpen }) => ({
                          sidebarOpen: !sidebarOpen
                        }))
                      }
                    >
                      toggle
                    </button>
                  </div>
                )}
                <div
                  css={{
                    position: "fixed",
                    top: 0,
                    bottom: 0,
                    overflow: "auto",
                    width: SIDEBAR_SIZE,
                    background: BLACK,
                    padding: 20,
                    color: "white",
                    borderRight: "solid 2px black",
                    " a": { color: "white" },
                    [SMALL_BREAK]: {
                      top: TOPBAR_SIZE
                    },
                    transition: "left 200ms ease"
                  }}
                  style={{
                    left: isSmall && !state.sidebarOpen ? -SIDEBAR_SIZE : 0
                  }}
                >
                  <div css={{ position: "sticky", overflow: "auto" }}>
                    <Logo />

                    <div css={{ fontSize: "85%", marginTop: 20 }}>
                      v1.0.0 <Link to="versions">change</Link>
                    </div>

                    <Header>About</Header>

                    <NavLink to="/">Features</NavLink>
                    <NavLink to="accessibility">Accessibility</NavLink>
                    <NavLink to="origins">Credits and Trade-offs</NavLink>

                    <Header>Examples</Header>
                    <NavLink to="example/basic">Basic Usage</NavLink>
                    <NavLink to="example/url-params">URL Params</NavLink>
                    <NavLink to="example/active-links">Active Links</NavLink>
                    <NavLink to="example/relative-links">
                      Relative Links
                    </NavLink>
                    <NavLink to="example/multiple-routers">
                      Multiple Routers
                    </NavLink>
                    <NavLink to="example/embedded-routers">
                      Embedded Routers
                    </NavLink>
                    <NavLink to="example/authentication">
                      Authentication
                    </NavLink>
                    <NavLink to="example/animation">Animation</NavLink>
                    <NavLink to="example/location-state">
                      Location State
                    </NavLink>
                    <NavLink to="example/query-params">Query Params</NavLink>

                    <Header>Tutorial</Header>
                    <NavLink to="tutorial/installation">Installation</NavLink>
                    <NavLink to="tutorial/router-link">Router and Link</NavLink>
                    <NavLink to="tutorial/index-routes">Index Routes</NavLink>
                    <NavLink to="tutorial/url-params">URL Parameters</NavLink>
                    <NavLink to="tutorial/nesting">Nesting</NavLink>
                    <NavLink to="tutorial/navigate">
                      Navigating Imperatively
                    </NavLink>

                    <Header>Guides</Header>
                    <NavLink to="nesting">
                      Nested Paths, Links, and Routers
                    </NavLink>
                    <NavLink to="redirects">Redirects</NavLink>
                    <NavLink to="ranking">Path Ranking</NavLink>
                    <NavLink to="large-scale">Large Scale Apps</NavLink>
                    <NavLink to="server-rendering">Server Rendering</NavLink>
                    <NavLink to="animation">Animation</NavLink>
                    <NavLink to="scroll-management">Scroll Management</NavLink>
                    <NavLink to="testing">Testing</NavLink>
                    <NavLink to="redux">Redux Integration</NavLink>

                    <Header>API</Header>
                    <div
                      css={{
                        fontFamily: `'SFMono-Regular', Consolas, 'Roboto Mono', 'Droid Sans Mono', 'Liberation Mono', Menlo, Courier, monospace`
                      }}
                    >
                      <NavLink to="api/Link">Link</NavLink>
                      <NavLink to="api/LocationProvider">
                        LocationProvider
                      </NavLink>
                      <NavLink to="api/Match">Match</NavLink>
                      <NavLink to="api/Redirect">Redirect</NavLink>
                      <NavLink to="api/RouteComponent">Route Component</NavLink>
                      <NavLink to="api/Router">Router</NavLink>
                      <NavLink to="api/ServerLocation">ServerLocation</NavLink>
                      <NavLink to="api/createHistory">createHistory</NavLink>
                      <NavLink to="api/createMemorySource">
                        createMemorySource
                      </NavLink>
                      <NavLink to="api/isRedirect">isRedirect</NavLink>
                      <NavLink to="api/navigate">navigate</NavLink>
                      <NavLink to="api/redirectTo">redirectTo</NavLink>
                    </div>
                  </div>
                  <footer
                    css={{ fontSize: "66%", marginTop: 60, opacity: 0.66 }}
                  >
                    <p>Copyright &copy; 2018 Reach Tech</p>
                  </footer>
                </div>
              </div>
            )}
          </Component>
        )}
      </Match>
    )}
  </Media>
);

let Header = ({ children }) => (
  <h2
    css={{
      fontWeight: "200",
      fontStyle: "italic",
      fontSize: "100%",
      marginTop: 30,
      marginBottom: 10,
      opacity: 0.8
    }}
  >
    {children}
  </h2>
);

let NavLink = ({ to, ...props }) => (
  <Match path={to}>
    {({ match }) => (
      <Component
        initialState={{ refs: { node: null } }}
        didUpdate={({
          state: {
            refs: { node }
          }
        }) => {
          if (match) {
            scrollIntoView(node, {
              behavior: "smooth",
              scrollMode: "if-needed",
              block: "nearest",
              inline: "nearest"
            });
          }
        }}
      >
        {({ state }) => (
          <div ref={n => (state.refs.node = n)}>
            <Link
              to={to}
              {...props}
              css={{
                textDecoration: "none",
                display: "block",
                padding: "5px 10px 5px 20px",
                fontSize: "85%",
                position: "relative",
                ...(match
                  ? {
                      ":before": {
                        position: "absolute",
                        content: "•",
                        left: 0
                      }
                    }
                  : null),
                ":hover": {
                  textDecoration: "underline"
                }
              }}
            />
          </div>
        )}
      </Component>
    )}
  </Match>
);

export default Nav;
