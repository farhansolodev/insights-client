import React from "react";
import { NavBarItems } from "./items";
import { Link, withRouter } from "react-router-dom";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class NavBar extends React.Component {
  constructor() {
    super();
    this.state = NavBarItems.reduce((acc, item) => {
      acc[item.title] = {showText: false, ...item};
      return acc;
    }, {});
    // {
    //   Communities: {
    //     showText: false,
    //   },
    //   Rooms: {
    //     showText: false,
    //   },
    //   Profile: {
    //     showText: false,
    //   },
    //   Settings: {
    //     showText: false,
    //   },
    // };
  }

  hoverHandler = (bool, title) => {
    return () => {
      this.setState((prevState) => { 
        return {
          ...prevState,
          [title]: {
            ...prevState[title],
            showText: bool
          }
        }
      });
    }
  };

  render() {
    return (
      <nav className={styles.sidebar}>
        <ul className={styles["sidebar-items"]}>
          {NavBarItems.map((item, index) => {
            if (item.title === "Profile") return
            let Icon = item.fontClass
            return (
              <li key={index}>
                <Link
                  to={`${this.props.match.path}${item.url}`}
                  className={styles[item.cName]}
                  onMouseEnter={this.hoverHandler(true, item.title)}
                  onMouseLeave={this.hoverHandler(false, item.title)}
                  onClick={() => console.clear()}
                >
                  <Icon size='30'/>
                {
                  this.state[item.title].showText &&
                  (<p className={styles["display-title"]}>{item.title}</p>) 
                }
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          to={`${this.props.match.path}${this.state.Profile.url}`}
          className={styles[this.state.Profile.cName]}
          onMouseEnter={this.hoverHandler(true, 'Profile')}
          onMouseLeave={this.hoverHandler(false, 'Profile')}
        >
        <FontAwesomeIcon icon={this.state.Profile.fontClass} size="2x" />
        {
          this.state['Profile'].showText &&
          (<p className={styles["display-title"]}>{'Profile'}</p>) 
        }
        </Link>
      </nav>
    );
  }
}

export default withRouter(NavBar)